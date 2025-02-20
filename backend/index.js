import express from "express"
import {connectDB} from './connectDb.js';
import cors from 'cors';
import jobRoutes from './routes/job.js';
import interviewRoutes from './routes/interviewDetails.js';
import dotenv from 'dotenv';
import bodyParser from "body-parser";
import { handleGetInterviewDetails } from "./controller/interviewDetails.js";
import feedbackRoutes from './routes/feedback.js';
dotenv.config();


const PORT = 3000;
const app = express();
app.use(cors({
   origin: '*',
   methods: ['POST', 'GET', 'PUT', 'DELETE'],
   allowedHeaders: ['Content-Type'],
}));


app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api',jobRoutes);
app.use('/interview',interviewRoutes);
app.use ('/feed',feedbackRoutes);

app.get('/', (req, res) => {  
    return res.send('Hello world received a request.');
 });


 app.get('/prevInterviews/:interviewId',handleGetInterviewDetails );

 app.post('/resume', (req, res) => {  
    return res.send('Received a POST HTTP method');
 });


 app.listen(PORT, () => {  
    connectDB();
    console.log('server is running on http://localhost:3000');    

 });