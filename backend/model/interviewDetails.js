import mongoose from 'mongoose';

const responseSchema = new mongoose.Schema({
    question: { type: String, required: true },
    userAnswer: { type: String, required: true },
    expectedAnswer: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 }
}, { _id: false });

const interviewDetailsSchema = new mongoose.Schema({
    interviewId: { type: String, required: true },
    interviewDate: { type: Date, required: true, default: Date.now },
    interviewTime: { type: String, required: true },
    responses: [responseSchema] // Store all questions & answers together
});

const interviewDetails = mongoose.model('interviewDetails', interviewDetailsSchema);

export default interviewDetails;
