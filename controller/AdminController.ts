import * as userModel from "../model/Users.js";
import * as datasetModel from "../model/Datasets.js";

export class AdminController{

	public setBudget = async (req, res) => {
		if(req.user.role == "0"){
			await userModel.updateBudget(req.user.budget, req.user.receiver);
			res.status(200).send("New budget for user "+ req.user.receiver+ " is "+ req.user.budget);
		}
		else 
			res.status(401).send("User "+req.user.email+" not (admin) authorized!");
	}

	public showDatasets = async (req, res) => {
		if(req.user.role == "0"){
			let data: any = datasetModel.getDatasets(req.user.role, req.user.email);
			res.status(200).send("Available datasets are: "+ data);
		}
		else{
			let data: any = datasetModel.getDatasets(req.user.budget, req.user.receiver);
			res.status(200).send("Your ("+ req.user.receiver+ ") datasets are "+ data);
		}
	}
}