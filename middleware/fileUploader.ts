import * as datasetModel from "../model/Datasets.js";
import * as userModel from "../model/Users.js";
import * as fileModel from "../model/Files.js"

let fs = require('fs');
let path = require('path')
let AdmZip = require("adm-zip");

export async function saveImgFS(req, res, next, currentFile){
	if( fs.copyFile(currentFile, res.locals.FSpath, fs.constants.COPYFILE_EXCL, (err) => {
			if (err){
				console.log("File '"+res.locals.FSpath+"' copy to FileSystem failed");
				return false;
			}
			else return true;
		})
	) return true;
} 


export async function billUpload(req, res, next){
	let currentBudget = (await userModel.getBudget(req.user.email)).dataValues.budget
	console.log("Current budget: "+ currentBudget);
	console.log("N of files to Upload: "+req.user.files.length)
	if(currentBudget >= 0.5*req.user.files.length){
		req.budgetProposal = currentBudget - (0.5*req.user.files.length);
		console.log("New budget proposal: "+ req.budgetProposal)
		next();
	}
	else{
		console.log("Not enough credit for user")
		res.status(401).send("Not enough credit for user: "+req.user.email)
	}
}


export async function billSegmentation(req, res){
	let currentBudget = (await userModel.getBudget(req.user.email)).dataValues.budget
	console.log( "current budget: "+ currentBudget );
	res.locals.fileCount = (await fileModel.readFiles( await datasetModel.getdatasetPK(req.user.dataset, req.user.email) ) ).length
	console.log( "N of files to segment: "+res.locals.fileCount )
	if(currentBudget >= 4*res.locals.fileCount ){
		let budgetProposal = currentBudget - (4*res.locals.fileCount );
		userModel.updateBudget(budgetProposal, req.user.email);
		console.log("New budget: "+ budgetProposal)
		return true;
	}
	else{
		console.log("Not enough credit for user")
		return false;
	}
}


export function checkFormat(req, res, next) {
	const accepted_extensions = [".jpg",".jpeg",".bmp",".png",".zip"];
	let accepted = true;
	req.user.files.forEach( 
			function(element){
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