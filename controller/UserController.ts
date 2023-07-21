import * as userModel from "../model/Users.js";

export class UserController{

	public retrieveUser = async (req, res) => {
		try{
			let retrieved: any = await userModel.checkUser(req.user.email);
			res.send(retrieved);
		} 
		catch { res.sendStatus(400);}
	}

	public getBudget = async (req, res) => {
		try{
			let retrieved: any = await userModel.getBudget(req.user.budget);
			res.send(retrieved);
		} 
		catch { res.sendStatus(400);}
	}
}