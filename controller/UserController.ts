import * as userModel from "../model/Users.js";
import * as datasetModel from "../model/Datasets.js";

export class UserController{

	public getBudget = async (req, res) => {
		try{
			let retrieved: any = await userModel.getBudget(req.user.email);
			res.send(retrieved);
		} 
		catch { res.sendStatus(400);}
	}

	public createDataset = async (req, res) => {
		if( datasetModel.newDataset(req.user.email, req.user.datasetName) )
			res.status(200).send("Dataset '"+req.user.datasetName+"' created");
		else res.sendStatus(400);
	}

}