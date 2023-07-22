import * as userModel from "../model/Users.js";

export class UserController{

	public getBudget = async (req, res) => {
		try{
			let retrieved: any = await userModel.getBudget(req.user.email);
			res.send(retrieved);
		} 
		catch { res.sendStatus(400);}
	}

}