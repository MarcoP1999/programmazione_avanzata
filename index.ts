import * as express from 'express';

//const express = require('express');
const app = express();

const PORT = 8080;
const HOST = '0.0.0.0';

app.get('/', require("./routes/route"));

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);