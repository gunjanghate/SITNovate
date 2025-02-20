import express from 'express';
import {handleGetFeedback , handlePostFeedback} from '../controller/feedback.js'
const router = express.Router();

router.post('/feedback',handlePostFeedback );
router.get('/feedback/:interviewId', handleGetFeedback);

export default router;