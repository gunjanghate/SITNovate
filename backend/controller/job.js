import Job from "../model/job.js";
// import { v4 as uuidv4 } from "uuid";

export const handleJobUpload = async (req, res) => {
    const { jobRole, jobDescription, yearsOfExperience, interviewId } = req.body;
    console.log(req.body);
    // const uuid = uuidv4();
    if (!jobRole || !jobDescription || !yearsOfExperience) {
        return res.status(400).json({ error: "All fields are required" });
    }  
    try {
        
        const newJob = new Job({ jobRole, jobDescription, yearsOfExperience, interviewId});
        await newJob.save();
        res.status(201).json({ message: "Job uploaded successfully", job: newJob });
        
    } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({ error: "Failed to save job" });
        
    }
};


export const handleJobFetch = async (req, res) => {
    try {
        const jobs = await Job.find();
        res.status(200).json({ jobs });
    } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({ error: "Failed to fetch jobs" });
    }
}

;

// GET -> Fetch a specific job by ID
export const handleJobByIdFetch = (async (req, res) => {
    try {
        const job = await Job.find({interviewId: req.params.interviewId});
        if (!job) {
            return res.status(404).json({ error: "Job not found" });
        }
        res.status(200).json({ job });
    } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({ error: "Failed to fetch job" });
    }
});


