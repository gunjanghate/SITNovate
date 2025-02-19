import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    jobRole:{
        type: String,
        required: true
    },
    jobDescription:{
        type: String,
        required: true
    },
    yearsOfExperience:{
        type: Number,
        required: true
    },
    interviewId:{
        type:String,    
        required: true
    },
},{timestamps: true});
const Job = mongoose.model("Job", jobSchema);

export default Job;