import { SingletonDB } from "./model/Database";
import * as express from 'express';

const express = require('express');
const sequelize = require('sequelize')
const Pool = require('pg').Pool
const pool = new Pool()
const getUserById = (request, response) =>{
    const id = parseInt(request.params.id);
    pool.query("SELECT * from users WHERE id = $1", [id], (error, result)=> {
        if(error) 
            throw error
        response.status(200).json(result.rows);
    })
}

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World');
});



app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);