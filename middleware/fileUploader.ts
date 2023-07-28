import * as datasetModel from "../model/Datasets.js";
import * as userModel from "../model/Users.js";

let fs = require('fs');
let path = require('path')
const DecompressZip = require('decompress-zip');


export async function upload(req, res, next) {
	
	/*else{ //is an image
		bill(req, res, next),
		await saveImgFS(req, res, next);
	}*/
}

export async function unpackZip(req, res, next){
	if(path.extname(req.user.file[0]) == ".zip"){
		console.log("is a zip");
		
		let unzipper = new DecompressZip( req.user.file[0] );

		await fs.readFile( req.user.file[0], (err, data) => {
			console.log("file read")
			if (err) 
				return res.status(400).send("Failed reading: "+req.user.file[0]);
			
			unzipper.extract( {path: "./unzipped/"} ); 
		});

		unzipper.on('progress', function (fileIndex, fileCount) {
			console.log('Extracted file ' + (fileIndex + 1) + ' of ' + fileCount);         
		});

		unzipper.on('extract', function (log) {
			console.log('log es', log);
			console.log('Extracted');
			return next();
		});
		return next();
		//bill(req,res, next)
	}
	else next();
}


export async function saveImgFS(req, res, next){
	try{
		fs.copyFile(req.user.file, req.FSpath, fs.constants.COPYFILE_EXCL, function () {
			console.log("File '"+req.user.file+" ' copied to application path: "+ req.FSpath);
			return next();
		});
	}
	catch(err){
		res.status(404).send("File '"+req.FSpath+"' copy to FileSystem failed");
	}
} 


export async function bill(req, res, next){
	let currentBudget = await userModel.getBudget(req.user.email)
	console.log("current budget"+ currentBudget.dataValues.budget);
	console.log("n of files"+req.user.file.length)
	if(currentBudget.dataValues.budget >= 0.5*req.user.file.length){
		req.currentBudget = currentBudget.dataValues.budget;
		req.budgetProposal = currentBudget.dataValues.budget - (0.5*req.user.file.length);
		console.log("budget proposal"+ req.budgetProposal)
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
	req.user.file.forEach( 
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
	else res.status(400).send("Files unsupported"+req.user.file);
}
