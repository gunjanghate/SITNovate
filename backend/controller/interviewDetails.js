import interviewDetails from '../model/interviewDetails.js';

export const handleInterviewDetails = async (req, res) => {
    const { interviewId, interviewDate, interviewTime, responses } = req.body;

    try {
        const newInterviewDetails = new interviewDetails({
            interviewId,
            interviewDate,
            interviewTime,
            responses, // Store all responses together
        });

        await newInterviewDetails.save();

        res.status(201).json({ message: "Interview details saved successfully!", data: newInterviewDetails });
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

export const handleGetInterviewDetails = async (req, res) => {
    try {
        const { interviewId } = req.params;

        const details = await interviewDetails.findOne({ interviewId });

        if (!details) {
            return res.status(404).json({ message: "Interview details not found" });
        }

        res.status(200).json(details);
    } catch (error) {
        console.error("Error fetching interview details:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
