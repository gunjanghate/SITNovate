import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    job_role:{
        type: String,
        required: true
    },
    job_description:{
        type: String,
        required: true
    },
    years_of_experience:{
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