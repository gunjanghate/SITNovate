import Feedback from "../model/feedback.js";


export const handleAddFeedback = async (req, res) => {
    const {interviewId, feedback , rating} = req.body;
    const newFeedback = new Feedback({interviewId, feedback , rating});
    try {
        await newFeedback.save();
        res.status(201).json({ message: "Feedback added successfully" });
    } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({ error: "Failed to add feedback" });
    }
}


export const handleGetFeedback = async (req, res) => {
    const interviewId = req.params.interviewId;
    try {
        const feedbacks = await Feedback.find({interviewId});
        res.status(200).json({ feedbacks });
    } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({ error: "Failed to fetch feedbacks" });
    }
}