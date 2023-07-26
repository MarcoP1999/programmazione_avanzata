import * as fileModel from "../model/Files.js";
import * as datasetModel from "../model/Datasets.js";
import { INTEGER } from "sequelize";

const uuid = require('crypto'); //UUID generator
let fs = require('fs');
let formidable = require('formidable');
let form = new formidable.IncomingForm();

export async function upload(req, res, currentPath) {

	let dataset = await datasetModel.getDatasetIndex(req.user.dataset, req.user.email)
	let newPath = "./images/" + uuid.randomUUID().toString() + ".jpg";

	form.parse(req, function () {
		try{	
			//Copy the uploaded file to a custom folder
			fs.copyFile(currentPath, newPath,fs.constants.COPYFILE_EXCL, async function () {
				
				console.log("File '"+currentPath+" ' copied to application path: "+newPath);
				if(! dataset){
					res.status(200).send("Dataset '"+req.user.dataset+"' not found");
					return false;
				}
				else if( await fileModel.saveImg(dataset, newPath) )
					return newPath;
			});
		}
		catch(err){
			console.log("File copy failed" + err);
			return false;
		}
	});
	return newPath;
}

export function bill(){

}