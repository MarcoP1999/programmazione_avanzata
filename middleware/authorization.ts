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
			console.log("Answered to Authenticated Client");
			next();
		} else {
			res.sendStatus(401);
		}
	} catch (e) {
		res.sendStatus(401);
	}
}


export async function checkUser(req, res, next) {
	if ( await (userModel.checkUser(req.user.email)) != null)
		next();
	else 
		res.status(400).send("User "+req.user.email+" not found!");
}


export async function checkOwner(req, res, next) {
	if ( await true )
		next();
	else 
		res.status(401).send("User "+req.user.email+" not authorized to access here!");
}