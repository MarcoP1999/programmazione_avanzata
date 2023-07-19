import * as dotenv from "dotenv";
dotenv.config({ path: '../.env' });

import express from 'express'
const app = express();
app.listen(process.env.APPPORT, process.env.APPHOST);

console.log(`Running on http://${process.env.APPPORT}:${process.env.APPPORT}`);

const router = express.Router();
router.use(express.json());

//----------------- AUTH ------------------------------------------
import * as auth from "./middleware/authorization.js";
router.use([auth.checkHeader, auth.checkToken, auth.verifyAndAuthenticate]);
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
import { UserController } from "./controller/UserController.js"
let userCnt = new UserController();

app.get('/', 
	async (req, res) => {
		res;
	} 
);

app.get("/user",
	auth.checkUser,
	async (req, res) => {
  		userCnt.retrieveUser(req,res);
	}
);


//-------------------- Error Fallback --------------------------------------
router.get("*", async (req, res) => {
  res.sendStatus(404);
});
router.post("*", async (req, res) => {
  res.sendStatus(404);
});