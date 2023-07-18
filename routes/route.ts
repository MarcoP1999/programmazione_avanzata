import * as auth from "../middleware/authorization";

const express = require("express");
const router = express.Router();

//let cntrModel = new ModelController();
router.use(express.json());


//middleware per verificare che le richieste siano un json
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

router.use([auth.checkHeader, auth.checkToken, auth.verifyAndAuthenticate]);

router.get("/user",
	auth.checkUser
);

/* 
router.post(
  "/admin",
  admin.checkAdmin,
  admin.CheckReceiver,
  async (req, res) => {
    cntrModel.creditCharge(req, res);
  }
);

router.get(
  "/getSimulation",
  auth.checkUser,
  solve.checkCreditSimulation,
  solve.checkDoSimulation,
  async (req, res) => {
    cntrSimulation.doSimulation(req, res);
  }
); 
*/

router.get("*", async (req, res) => {
  res.sendStatus(404);
});
router.post("*", async (req, res) => {
  res.sendStatus(404);
});

module.exports = router;