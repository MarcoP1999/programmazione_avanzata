import * as fileModel from "../model/Files.js";
import * as datasetModel from "../model/Datasets.js";
import * as userModel from "../model/Users.js";

const uuid = require('crypto'); //UUID generator
let fs = require('fs');
let formidable = require('formidable');
let form = new formidable.IncomingForm();

export async function upload(req, res, currentPath) {

	let dataset = await datasetModel.getDatasetIndex(req.user.dataset, req.user.email)
	let newPath = "./images/" + uuid.randomUUID().toString() + ".jpg";

	form.parse(req, function () {
		try
		{
			fs.copyFile(currentPath, newPath,fs.constants.COPYFILE_EXCL, async function () {
				console.log("File '"+currentPath+" ' copied to application path: "+newPath);
				if(! dataset){
					res.status(404).send("Dataset '"+req.user.dataset+"' not found");
					return false;
				}
				else if( await fileModel.saveImg(dataset, newPath) ){
					if( await bill(req) )
						return newPath;
					else
						res.status(401).send("Not enough credit for user "+req.user.email)
				}
			});
		}
		catch(err){
			console.log("File copy failed" + err);
			return false;
		}
	});
	return newPath;
}


export async function bill(req){
	let currentBudget = await userModel.getBudget(req.user.email)
	if(currentBudget.dataValues.budget >= 0.5){
		await userModel.updateBudget(currentBudget.dataValues.budget - 0.5, req.user.email)
		return true;
	}
	else return false;
}