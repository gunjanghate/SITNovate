import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        default: ""  
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
        required: true,
    },
    questions: {
        type: [questionSchema], 
        default: []   
    }
}, { timestamps: true });

const Job = mongoose.model("Job", jobSchema);

export default Job;
