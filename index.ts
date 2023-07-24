import * as dotenv from "dotenv";
dotenv.config({ path: './.env' });

import express from 'express'
var app = express();


app.use('/', require("./routes/routes"));

app.listen(process.env.APPPORT, process.env.APPHOST);
console.log(`Running on http://${process.env.APPHOST}:${process.env.APPPORT}`);