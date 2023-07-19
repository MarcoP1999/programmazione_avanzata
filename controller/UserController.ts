import * as userModel from "../model/Users.js";

export class UserController{

	public retrieveUser = async (req, res) => {
		try{
			let retrieved: any = await userModel.checkUser(req.email);
			res.send(retrieved);
		} 
		catch { res.sendStatus(400);}
	}
}

export default UserController;