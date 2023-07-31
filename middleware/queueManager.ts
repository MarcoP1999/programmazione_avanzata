export function sendResponse(req, res, state){
	switch( state ){
		case "completed":
			res.status(200).send("Job "+req.user.pid+ " completed")
			//res.status(200).send("Job "+job.id+" completed (QUEUE)")
			//res.status(200).json( JSON.parse( pyOutput ) );
		break;
		case "error":
		break;
		case "waiting":
		break;
		case "active":
			res.status(200).send("Job "+req.user.pid+ " is RUNNING")
		break;
		case "failed":
		break;
	}
}