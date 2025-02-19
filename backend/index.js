import express from "express"
import {connectDB} from './connectDb.js';
import jobRoutes from './routes/job.js';
import dotenv from 'dotenv';
import bodyParser from "body-parser";
dotenv.config();

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api',jobRoutes);

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