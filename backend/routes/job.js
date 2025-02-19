import express from "express";
import { handleJobFetch, handleJobUpload , handleJobByIdFetch } from '../controller/job.js';
const router = express.Router();

router.post('/job', handleJobUpload);
router.get('/job/:interviewId', handleJobByIdFetch);
router.get('/job/', handleJobFetch);



export default router;
