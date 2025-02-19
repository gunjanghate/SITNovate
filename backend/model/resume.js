import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  mimetype: { type: String, required: true },
  size: { type: Number, required: true },
  path: { type: String, required: true }, // Stores file location
  uploadedAt: { type: Date, default: Date.now, index: true }, // Indexed for fast retrieval
});

const Resume = mongoose.models.Resume || mongoose.model("Resume", resumeSchema);
export default Resume;
