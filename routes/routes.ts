import express from "express"
const router = express.Router();

router.use(express.json());

//----------------- AUTH ------------------------------------------
import * as auth from "../middleware/authorization.js";

router.use( [auth.checkHeader, auth.checkToken, auth.verifyAndAuthenticate] );

router.use((err, req, res, next) => {
	try {
	  if (err instanceof SyntaxError && "body" in err) {
		throw "JSON not valid";
	  }
	  next();
	} catch (e){
	  res.sendStatus(400);
	}
});

//-------------------- USER ------------------------------------------
import { UserController } from "../controller/UserController.js"
import { AdminController } from "../controller/AdminController.js";
let userCnt = new UserController();
let adminCnt = new AdminController();


router.get("/budget",
	auth.checkUser,
	async (req, res) => {
  		userCnt.getBudget(req,res);
	}
);

router.patch("/budget",
	auth.checkUser,
	async (req, res) => {
		adminCnt.setBudget(req,res);
	}
);

router.get("/dataset",
	auth.checkUser,
	async (req, res) => {
		adminCnt.showDatasets(req,res);
	}
);

router.post("/dataset",
	auth.checkUser,
	async (req, res) => {
		userCnt.createDataset(req,res);
	}
);

router.delete("/dataset",
	auth.checkUser,
	async (req, res) => {
		adminCnt.deleteDataset(req,res);
	}
);

router.patch("/dataset",
	auth.checkUser,
	async (req, res) => {
		userCnt.renameDataset(req,res);
	}
);

import * as uploader from "../middleware/fileUploader.js";
router.post("/upload",
	auth.checkUser,
	uploader.checkFormat,
	uploader.unpackZip,
	uploader.billUpload,
	async (req, res, next) => {
		await userCnt.upload(req, res, next);
	}
);



//-------------------- Queues ------------------------------------------
import * as pythonAdapter from "../middleware/pythonAdapter.js"

const Queue = require('bull');
const queue = new Queue('python', {
	redis: {
	  host: '127.0.0.1',
	  port: 6379
	},
	settings:{
		lockDuration: 360000
	}
});


queue.process(async (job) => {
	if( uploader.billSegmentation ){
		console.log("Started a process consumer")
		return pythonAdapter.segmentation(job.data.images);
	}
	else
		job.moveToFailed();
});


const jobStates = Object.create(null)

queue.on('global:completed', function(jobId){
	console.log("Inference completed (Queue)");
	jobStates[jobId] = "completed"; //then remove from Dict
	console.log("ID:"+jobId);
})

queue.on('error', function(error) {
})
  
queue.on('waiting', function(job){
	// A Job is waiting to be processed as soon as a worker is idling.
	//res.jobStates(200).send("jobStates: ", job.id, " is waiting to be executed");
	jobStates[job.name] = "waiting";
});

queue.on('active', function(job, jobPromise){
	//res.jobStates(200).send("Job: "+job.id+ "=> Model is running: "+progress*100+"%");
	jobStates[job.name] = "active";
})

queue.on('failed', function(job){
	//res.jobStates(401).send("Job: "+job.id+"failed.\nRequired " +(4*res.locals.fileCount )+ 
		//" credits to start segmentation.\n "+req.user.email+" has just "+ userCnt.getBudget(req, res) );
	jobStates[job.name] = "failed";
})



//-------------------- Python ------------------------------------------
router.get("/py",
	auth.checkUser,
	userCnt.getDBfiles,
	//uploader.billSegmentation,
	async (req, res) => {
		//pythonAdapter.segmentation(res, req.user.files);
	}
);



router.get("/process",
	auth.checkUser,
	userCnt.getDBfiles,
	async (req, res) => {
		let pid = "pid_" + Math.random().toString(36).slice(10);
		await queue.add( {images: req.user.files} ).then();
		res.status(200).send("Job: "+pid+" added to processing queue")
	}
);

import * as qManager from "../middleware/queueManager.js"
router.get("/status",
	auth.checkUser,
	async (req, res, next) => {
		qManager.sendResponse(req, res, jobStates[req.pid] );
	}
);




//-------------------- Error Fallback --------------------------------------
router.get("*", async (req, res) => {
	res.sendStatus(404);
  });
  router.post("*", async (req, res) => {
	res.sendStatus(404);
  });


module.exports = router;