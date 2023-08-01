import { spawn } from 'child_process';
const { once } = require('events');

let pyOutput = String();

export async function segmentation(imgList){
															//just one image
	let process = spawn('python3', ['./python/SAM_model.py', imgList] );

	process.stdout.on('data', (data) => {
		pyOutput = data.toString();
	});

	process.stdout.on('end', async ()=> {
		console.log("Segmentation completed => send a new 'InferenceStatus' request");
    });

    await once(process, 'close');
	return pyOutput;
}