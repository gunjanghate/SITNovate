import Job from "../model/job.js";
// import { v4 as uuidv4 } from "uuid";

export const handleJobUpload = async (req, res) => {
    let { jobRole, jobDescription, yearsOfExperience, interviewId, questions } = req.body;
    console.log(req.body);

    // ✅ Ensure all required fields are provided
    if (!jobRole || !jobDescription || !yearsOfExperience) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        // ✅ Check if `questions` is a string (which happens when sent incorrectly)
        if (typeof questions === "string") {
            try {
                questions = JSON.parse(questions);  // Parse into an array
            } catch (error) {
                return res.status(400).json({ error: "Invalid questions format" });
            }
        }

        // ✅ Ensure `questions` is always an array
        if (!Array.isArray(questions)) {
            return res.status(400).json({ error: "Questions must be an array" });
        }

        const newJob = new Job({
            jobRole,
            jobDescription,
            yearsOfExperience,
            interviewId,
            questions
        });

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


export const handleGetQuestionsById = async (req, res) => {
    try {
        const job = await Job.findOne({ interviewId: req.params.interviewId }); // Use findOne()

        if (!job) {
            return res.status(404).json({ error: "Job not found" });
        }

        res.status(200).json(job.questions); // Directly access job.questions
    } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({ error: "Failed to fetch job questions" });
    }
};



