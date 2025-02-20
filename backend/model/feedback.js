import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
    interviewId: { type: String, required: true},
    feedback: { type: String, required: true},
    rating: { type: Number, required: true, min: 0, max: 5}
},{timestamps: true});
const Feedback = mongoose.model("feedback", feedbackSchema);

export default Feedback;
