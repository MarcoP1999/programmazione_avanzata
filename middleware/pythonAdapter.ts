const {spawn} = require('child_process');
let returns = [];

export class PythonAdapter{
	
	public read = async (req, res) => {
		// spawn new child process to call the python script
		const python = spawn('python', ['./python/SAM_model.py', String(req.user.email) ] );
		
		python.stdout.on('data', (data) => {
			// Do something with the data returned from python script
			returns.push(data.toString().split("\n"));
		});
		   
		
		python.on('close', (code) => {
			console.log("Executed python script " + code);
			// send data to browser
			res.status(200).send(returns);
		});
	}
}