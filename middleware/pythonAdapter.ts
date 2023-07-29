const {spawn} = require('child_process');
let pyOutput = [];

export async function configModel(req, res, next){
		//if(! res.locals.configured){
			const process = await spawn('python3', ['./python/SAM_model.py'] );

			process.stdout.on('data', (data) => {
				// Do something with the data returned from python script
				pyOutput.push(data.toString().split("\n"));
			});

			await process.on('close', await function(req, res, next){
				//res.locals.configured = true;
				console.log("Model configured: "/*+res.locals.configured*/);
			});
		next();
}


export async function read(req, res){
		// spawn new child process to call the python script
		const python = spawn('python3', ['./python/basic_test.py', req.user.email ] );
		
		python.stdout.on('data', (data) => {
			// Do something with the data returned from python script
			pyOutput.push(data.toString().split("\n"));
		});
		
		python.on('close', (code) => {
			console.log("Executed model configuration " + code);
			// send data to browser
			res.status(200).send(pyOutput);
		});
}


export async function segmentation(req, res){
	// spawn new child process to call the python script
	const process = await spawn('python3', ['./python/SAM_inference.py', req.user.files[0] ] );
	
	process.stdout.on('data', (data) => {
		// Do something with the data returned from python script
		pyOutput.push(data.toString().split("\n"));
	});
	   
	process.on('close', (code) => {
		console.log("Inference completed");
		//res.status(200).send(pyOutput);
	});
}