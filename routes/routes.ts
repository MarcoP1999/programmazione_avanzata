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
	uploader.bill,
	async (req, res, next) => {
		userCnt.upload(req, res, next);
	}
);


//-------------------- Python ------------------------------------------
import * as pythonAdapter from "../middleware/pythonAdapter";

router.get("/py",
	auth.checkUser,
	pythonAdapter.configModel,
	async (req, res, next) => {
		pythonAdapter.read(req,res);
	}
);

router.get("/process",
	auth.checkUser,
	//pythonAdapter.configModel,
	async (req, res) => {
		res.locals.pid = "pid_" + Math.random().toString(36).slice(10);
		await queue.add( res.locals.pid, 
			pythonAdapter.segmentation(req, res)
		);
		res.status(200).send("Added: "+res.locals.pid +" to processing queue")
	}
);

router.get("/status",
	auth.checkUser,
	//pythonAdapter.configModel,
	async (req, res, next) => {
		const job = await queue.add({
			foo: 'bar'
		  });
	}
);


//-------------------- Queues ------------------------------------------
//brew services start redis  //required for local usage of Bull
const Queue = require('bull');
const queue = new Queue('python');

/*The process function will be called every time the worker 
is idling and there are jobs to process in the queue*/
queue.process(async (req,res) => {
	return pythonAdapter.segmentation(req,res);
});


queue.on('progress', function(job, progress){
	console.log( job.id+"is RUNNING" )
})

queue.on('error', function(job, progress){
	console.log( job.id+"is RUNNING" )
})

queue.on('completed', (job, result) => {
	console.log(`Job ${job.id} COMPLETED with result ${result}`);
})


//-------------------- Error Fallback --------------------------------------
router.get("*", async (req, res) => {
  res.sendStatus(404);
});
router.post("*", async (req, res) => {
  res.sendStatus(404);
});

module.exports = router;