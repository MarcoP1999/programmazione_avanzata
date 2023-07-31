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

//brew services start redis  //required for local usage of Bull
const Queue = require('bull');
const queue = new Queue('python');


//-------------------- Python ------------------------------------------
import * as pythonAdapter from "../middleware/pythonAdapter";

router.get("/py",
	auth.checkUser,
	//pythonAdapter.configModel,
	userCnt.getDBfiles,
	uploader.billSegmentation,
	async (req, res, next) => {
		//await pythonAdapter.segmentation(req, res, next);
	}
);

router.get("/process",
	auth.checkUser,
	userCnt.getDBfiles,
	async (req, res, next) => {
		res.locals.pid = "pid_" + Math.random().toString(36).slice(10);

		queue.add( {images: req.user.files} );
		
		queue.on('global:completed', (jobId, result) => {
			console.log(`Job ${jobId} COMPLETED with result ${result}`);
			console.log(res.locals.segmented)
			res.status(200).send(`Job ${jobId} COMPLETED with result ${result}`)
		})

		queue.process( (job, done) => {
			if(  <unknown>uploader.billSegmentation == true ){
				res.locals.segmented = pythonAdapter.segmentation(job.data.images, done);
			}
			else{
				job.moveToFailed();
			}
		});
		//res.status(200).send("Added process: "+ res.locals.pid +" to the queue")
	}
);

router.get("/status",
	auth.checkUser,
	async (req, res, next) => {

		queue.on('completed', function(job, result){
			console.log("Inference completed (Queue)");
			res.status(200).send("Job "+job.id+" completed (QUEUE)")
			//res.status(200).json( JSON.parse( pyOutput ) );
		})

		queue.on('error', function(error) {
			res.status(401).send(error);
		})
		  
		queue.on('waiting', function(job){
			// A Job is waiting to be processed as soon as a worker is idling.
			res.status(200).send("Process: ", job.id, " is waiting to be executed");
		});

		queue.on('progress', function(job, progress){
			res.status(200).send("Job: "+job.id+ "=> Model is running: "+progress*100+"%");
		})

		queue.on('failed', function(job){
			res.status(401).send("Job: "+job.id+"failed.\nRequired " +(4*res.locals.fileCount )+ 
								" credits to start segmentation.\n "+req.user.email+" has just "+ userCnt.getBudget(req, res) );
		})
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