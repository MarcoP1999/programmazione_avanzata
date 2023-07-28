import * as datasetModel from "../model/Datasets.js";
import * as userModel from "../model/Users.js";

let fs = require('fs');
let path = require('path')
let AdmZip = require("adm-zip");

export async function saveImgFS(req, res, next, current){
	try{
		fs.copyFile(req.user.files[current], req.FSpath, fs.constants.COPYFILE_EXCL, function () {
			console.log("File '"+req.user.files[current]+" ' copied to application path: "+ req.FSpath);
			return next();
		});
	}
	catch(err){
		res.status(404).send("File '"+req.FSpath+"' copy to FileSystem failed");
	}
} 


export async function bill(req, res, next){
	let currentBudget = await userModel.getBudget(req.user.email)
	console.log("current budget: "+ currentBudget.dataValues.budget);
	console.log("n of files: "+req.user.files.length)
	if(currentBudget.dataValues.budget >= 0.5*req.user.files.length){
		req.currentBudget = currentBudget.dataValues.budget;
		req.budgetProposal = currentBudget.dataValues.budget - (0.5*req.user.files.length);
		console.log("budget proposal: "+ req.budgetProposal)
		next();
	}
	else{
		console.log("Not enough credit for user")
		res.status(401).send("Not enough credit for user: "+req.user.email)
	}
}


export function checkFormat(req, res, next) {
	const accepted_extensions = [".jpg",".jpeg",".bmp",".png",".zip"];
	let accepted = true;
	req.user.files.forEach( 
			function(element){
				console.log("Current file is "+ element)
				if(! accepted_extensions.includes( path.extname(element) ) )
					accepted = false;
			}
		)
	if(accepted){
		console.log("checkFormat OK");
		next();
	}
	else res.status(400).send("Files unsupported"+req.user.files);
}


export async function unpackZip(req, res, next){
	if( path.extname( req.user.files[0] ) == ".zip" ){
		console.log("is a zip");
		
		let zip = new AdmZip( req.user.files[0] );
		var zipEntries = zip.getEntries();
		await zip.extractAllTo("./unzipped", true);

		updateFilesList(req, zipEntries);
		next();
	}
	else //was an image => skipping
		next();
}


function updateFilesList(req, elemList){
	req.user.files = []; //clear request file list => not a zip anymore

	elemList.forEach(function (element) {
		if(! element.isDirectory)
			req.user.files.push("./unzipped/"+element.name)
	});
}