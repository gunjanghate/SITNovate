import feedback from "../model/feedback.js";
export const handlePostFeedback = async (req, res) => {

    const { feedback,rating, interviewId } = req.body;

    try {
        const newFeedback = new feedback({
            interviewId,
            feedback,
            rating
        });

        await newFeedback.save();

        res.status(201).json({ message: "Feedback saved successfully!", data: newFeedback });
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

export const handleGetFeedback = async (req, res) => {
    const interviewId = req.params.interviewId;
    try {
        const feedbacks = await feedback.find(interviewId);
        res.status(200).json({ feedbacks });
    } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({ error: "Failed to fetch feedbacks" });
    }
}