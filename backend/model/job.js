import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        default: ""  // Allow empty answers
    }
}, { _id: false });

const jobSchema = new mongoose.Schema({
    jobRole: {
        type: String,
        required: true
    },
    jobDescription: {
        type: String,
        required: true
    },
    yearsOfExperience: {
        type: Number,
        required: true
    },
    interviewId: {
        type: String,
        required: true,// Ensures no duplicate interview IDs
    },
    questions: {
        type: [questionSchema], 
        default: []   // Ensures it's an array by default
    }
}, { timestamps: true });

const Job = mongoose.model("Job", jobSchema);

export default Job;
