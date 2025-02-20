import express from 'express';
import {handleGetFeedback , handleAddFeedback} from '../controller/feedback.js'
const router = express.Router();

router.post('/feedback',handleAddFeedback );
router.get('/feedback/:interviewId', handleGetFeedback);

export default router;