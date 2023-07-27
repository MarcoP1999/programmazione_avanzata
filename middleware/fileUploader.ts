import * as datasetModel from "../model/Datasets.js";
import * as userModel from "../model/Users.js";

let fs = require('fs');
let path = require('path')
const DecompressZip = require('decompress-zip');


export async function upload(req, res, next) {
	const accepted_extensions = [".jpg",".jpeg",".bmp",".png",".zip"]
 
	if( accepted_extensions.includes( path.extname(req.user.files) ) ){
		if(path.extname(req.user.files) == ".zip"){
			await extractZip(req, res, next),
			fs.readdir("./unzipped", (err, files) => {
				console.log(files.length);
			});
			bill(req,res, next)
		}
		else{ //is an image
			bill(req, res, next),
			req.uploader.imagePath = await saveImgFS(req, res, next);
		}
	}
	else 
		res.send(400).send("File "+req.user.files+" unsupported");
}


async function bill(req, res, next){
	let currentBudget = await userModel.getBudget(req.user.email)

	if(currentBudget.dataValues.budget >= 0.5*req.user.files.length){
		req.uploader.currentBudget = currentBudget.dataValues.budget;
		next();
	}
	else
		res.status(401).send("Not enough credit for user: "+req.user.email)
}

async function saveImgFS(req, res, next){
	try{
		fs.copyFile(req.user.files, req.uploader.FSpath, fs.constants.COPYFILE_EXCL, async function () {
			console.log("File '"+req.user.files+" ' copied to application path: "+ req.uploader.FSpath);
			if(! req.uploader.datasetIndex)
				res.status(404).send("Dataset '"+req.user.dataset+"' not found");
			else
				next();
		});
	}
	catch(err){
		res.status(404).send("File '"+req.uploader.FSpath+"' copy to FileSystem failed");
	}
} 

async function extractZip(req, res, next) {
	let unzipper = new DecompressZip( req.user.files );

	fs.readFile( req.user.files, (err, data) => {
		if (err)  res.status(400).send("Failed reading: "+req.user.files)

		unzipper.extract({
			path: "./unzipped/"
		}); 
	});
	unzipper.on('extract', function (log) {
		console.log('log es', log);
		console.log('Extracted');
		next();
	});
	next();
}