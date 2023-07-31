const { spawnSync } = require('child_process').spawnSync;
let pyOutput = String();


export async function segmentation(imgList){
																	//just one image
	let process = spawnSync('python3', ['./python/SAM_inference.py', imgList[0] ], { encoding : 'utf8' });
	console.log(process);
	return process.stdout;

	/*
	process.stdout.on('data', (data) => {
		pyOutput = data
	});
	   
	process.on('close', () => {
		console.log("Inference completed");
		return pyOutput;
		//res.status(200).json( JSON.parse( pyOutput ) );
	});
	*/
}