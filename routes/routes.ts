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

import { Job, Queue, Worker } from 'bullmq';

const queue = new Queue('AsyncProc');

const worker = new Worker(queue.name, async (job: Job) => {
	if( uploader.billSegmentation ){
		console.log("Started an async job")
		return await pythonAdapter.segmentation(job.data.images);
	}
	else{
		let err = new Error("Not enough credit")
		job.moveToFailed(err,null,true);
	}
	},{
		removeOnComplete: { count: 1000 },
		removeOnFail: { count: 5000 },
	}
);

//-------------------- Python ------------------------------------------

router.get("/process",
	auth.checkUser,
	userCnt.getDBfiles,
	async (req, res, next) => {
		let pid:string = "pid_" + Math.random().toString(36).slice(10);
		await queue.add(queue.name, {images: req.user.files}, { jobId: pid});
		res.status(200).send("Job: "+pid+" added to processing queue")
	}
);

router.get("/status",
	auth.checkUser,
	async (req, res, next) => {
		let requestedJob = await queue.getJob(req.user.pid);
		let state = await requestedJob.getState();

		if( state == "completed")
			res.status(200).json( JSON.parse(requestedJob.returnvalue) );
		else
			res.status(200).send("Job: "+requestedJob.id+" is "+ state.toUpperCase());
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