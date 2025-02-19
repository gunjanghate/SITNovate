import express from "express"
import {connectDB} from './connectDb.js';
import dotenv from 'dotenv';
dotenv.config();

const PORT = 3000;
const app = express();

app.get('/', (req, res) => {  
    return res.send('Hello world received a request.');
 });

 app.post('/resume', (req, res) => {  
    return res.send('Received a POST HTTP method');
 });

 app.listen(PORT, () => {  
    connectDB();
    console.log('server is running on http://localhost:3000');    

 });