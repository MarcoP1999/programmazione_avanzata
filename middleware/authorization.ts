import * as jwt from "jsonwebtoken";
import * as userModel from "../model/Users.js";
/**
 * jwt per lo user 
 * {
	*  "email":"user@user.com",
	*  "role":"1"
 * }
 */

export var checkHeader = function (req, res, next) {
	const authHeader = req.headers.authorization;
	if (authHeader) {
		console.log("OK checkHeader");
		next();
	} else {
		res.sendStatus(401);
	}
};

export function checkToken(req, res, next) {
	const bearerHeader = req.headers.authorization;
	if (typeof bearerHeader !== "undefined") {
		const bearerToken = bearerHeader.split(" ")[1];
		req.token = bearerToken;
		console.log("OK checkToken");
		next();
	} else {
		res.sendStatus(401);
	}
}

export function verifyAndAuthenticate(req, res, next) {
	try {
		let decoded = jwt.verify(req.token, process.env.SECRET_KEY);
		if (decoded !== null) {
			req.user = decoded;
			console.log(String(req.user));
			console.log("OK verify");
			next();
		} else {
			res.sendStatus(401);
		}
	} catch (e) {
		res.sendStatus(401);
	}
}

export async function checkUser(req, res, next) {
	if ( userModel.checkUser(req.user.email) && req.user.role === "1" ) {
		next();
	} else {
		res.sendStatus(401).json({message: "User not found", status: 401});
	}
}
/* export const valore = (variabile, object) => {
  // se la variabile corrente è dentro binaries o generals costerà 0.1, altrimenti 0.05
  if (object.binaries && object.binaries.includes(variabile)) {
	return 0.1;
  } else if (object.generals && object.generals.includes(variabile)) { 
	return 0.1;
  } else {
	return 0.05;
  }
};

export async function checkCredito(req, res, next) {
	try {
	let object = req.body;
	let totalCost: number = costContraint(object) + checkBinOrInt(object);
	const budget: any = await User.getBudget(req.user.email);
	if (budget.budget > totalCost) { // vediamo se c'è credito a sufficienza
		next();
	} else {
		res.sendStatus(401);
	}
	} catch (e) {
		res.sendStatus(401);
	}
}*/