import * as userModel from "../model/Users.js";
import * as datasetModel from "../model/Datasets.js";
import * as fileModel from "../model/Files.js";


export class UserController{

	public getBudget = async (req, res) => {
		let retrieved: any = null;
		retrieved = await userModel.getBudget(req.user.email);
		if(retrieved)
			res.status(200).send("Budget for '"+req.user.email+"' is: "+retrieved.budget);
		else
			res.status(404).send("User '"+req.user.email+"' not found")
	}


	public createDataset = async (req, res) => {
		let yourDatasets = [];
		let datasets: any = await datasetModel.getDatasets(req.user.role, req.user.email);
		datasets.forEach((item) => {
			yourDatasets.push(item.dataValues.name);
		});
		if( yourDatasets.includes(req.user.dataset) )
			res.status(400).send("Dataset '"+req.user.dataset+"' already exists for user: "+req.user.email);
		else if( datasetModel.newDataset(req.user.email, req.user.dataset) )
			res.status(200).send("Dataset '"+req.user.dataset+"' created");
		else res.sendStatus(400);
	}

	
	public renameDataset = async (req, res) => {
		
		let yourDatasets = [];
		let datasets: any = await datasetModel.getDatasets(req.user.role, req.user.email);
		datasets.forEach((item) => {
			yourDatasets.push(item.dataValues.name);
		});
		
		if( yourDatasets.includes(req.user.newName) )
			res.status(400).send("Dataset '"+req.user.dataset+"' already exists");
		else{
			if( datasetModel.updateDataset(req.user.dataset, req.user.newName) )
				res.status(200).send("Dataset '"+req.user.dataset+"' renamed to: "+ req.user.newName);
			else
				res.status(404).send("Dataset to rename doesn't exist");
		}
	}


	public getDatasetId = async (req, res, next) => {
		res.locals.datasetPK = await datasetModel.getdatasetPK(req.user.dataset, req.user.email);
		if(! res.locals.datasetPK){
			console.log("Dataset '"+req.user.dataset+"' not found")
			res.status(404).send("Dataset '"+req.user.dataset+"' not found");
		}
		else{
			console.log("This dataset: '"+req.user.dataset+"' has PK: "+res.locals.datasetPK)
			next();
		}
	}


	public getDBfiles =  async (req, res, next) => {
		req.user.files = [] //clears file list
		let datasetPK = await datasetModel.getdatasetPK(req.user.dataset, req.user.email);
		if(! datasetPK)
			res.status(404).send("Dataset not found");
		let datasetElems = await fileModel.readFiles(datasetPK);
		console.log()
		if(! datasetElems)
			res.status(404).send("No files in this dataset");
		datasetElems.forEach(element => {
			req.user.files.push(element.dataValues.filepath)
		});
		next();
	}

	
}