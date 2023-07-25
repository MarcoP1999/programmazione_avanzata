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
		let list = [];
		let datasets: any = await datasetModel.getDatasets(req.user.role, req.user.email);
		datasets.forEach((item) => {
			list.push(item.dataValues.name);
		});
		res.status(200).send("Available datasets are: "+ String(list) );
	}


	/* La verifica dei permessi di accesso è realizzato nel controller
	* evitando di appesantire le funzionalità del Model, che rimane generico */
	public deleteDataset = async (req, res) => {
		if(req.user.role == "0"){
			datasetModel.deleteDataset(req.user.dataset);
			res.status(200).send("Admin deleted '"+ req.user.dataset+ "' dataset");
		}
		else{
			let yourDatasets: any = datasetModel.getDatasets(req.user.role, req.user.email)
			if(req.user.dataset in yourDatasets)
				if( datasetModel.deleteDataset(req.user.dataset) )
					res.status(200).send("Your dataset '"+ req.user.dataset+ "' has been removed");
				else 
					res.status(401).send("User '"+ req.user.email+ "' can't remove dataset' "+req.user.dataset);
		}
	}
}