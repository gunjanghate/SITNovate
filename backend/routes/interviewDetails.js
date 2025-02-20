import express from "express";
import {handleInterviewDetails , handleGetInterviewDetails } from '../controller/interviewDetails.js';
const router = express.Router();

//router.post('/', handleInterviewDetails);

router.get('/:interviewId', handleGetInterviewDetails);

export default router;