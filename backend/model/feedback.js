import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
    interviewId: { type: String, required: true},
    feedback: { type: String, required: true},
    rating: { type: Number, required: true, min: 1, max: 5}
},{timestamps: true});
const feedback = mongoose.model("feedback", feedbackSchema);

export default feedback;