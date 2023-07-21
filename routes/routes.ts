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
let userCnt = new UserController();


router.get('/test', async (req, res) => {
	res.send("test function");
});

router.get("/user",
	auth.checkUser,
	async (req, res) => {
  		userCnt.retrieveUser(req,res);
	}
);

router.get("/budget",
	auth.checkUser,
	async (req, res) => {
  		userCnt.getBudget(req,res);
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