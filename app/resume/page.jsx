"use client"; // This tells Next.js that it's a Client Component

import { useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Typography,
  CircularProgress,
  Select,
  MenuItem,
  Container,
} from "@mui/material";

const API_URL = "https://supa-resume-backend.onrender.com/analyze_resume/";

export default function Home() {
  const [jobDescription, setJobDescription] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [promptType, setPromptType] = useState("resume_analysis");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const analyzeResume = async () => {
    if (!jobDescription || !file) {
      alert("Please provide a job description and upload a resume.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("job_description", jobDescription);
    formData.append("file", file);
    formData.append("prompt_type", promptType);

    try {
      const response = await axios.post(API_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResult(response.data.response);
    } catch (error) {
      setResult("Error processing request. Please try again.");
    }

    setLoading(false);
  };

  // Map promptType to a user-friendly button label
  const buttonLabels = {
    resume_analysis: "Analyze Resume",
    ats_match: "Check ATS Match",
    project_suggestions: "Get Project Ideas",
    resume_improvement: "Improve Resume",
  };

  return (
    <Container maxWidth="md" style={{ marginTop: "20px", textAlign: "center" }}>
      <Typography variant="h4" gutterBottom>
        ATS Resume Analyzer
      </Typography>

      <TextField
        fullWidth
        label="Job Description"
        multiline
        rows={4}
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
        margin="normal"
      />

      <input type="file" accept="application/pdf" onChange={handleFileChange} style={{ margin: "10px 0" }} />

      {/* Dropdown for selecting prompt type */}
      <Select
        value={promptType}
        onChange={(e) => setPromptType(e.target.value)}
        fullWidth
        displayEmpty
        sx={{ marginTop: 2, marginBottom: 2 }}
      >
        <MenuItem value="resume_analysis">Resume Analysis</MenuItem>
        <MenuItem value="ats_match">ATS Match</MenuItem>
        <MenuItem value="project_suggestions">Project Ideas</MenuItem>
        <MenuItem value="resume_improvement">Resume Improvements</MenuItem>
      </Select>

      <Button variant="contained" color="primary" onClick={analyzeResume} disabled={loading} fullWidth>
        {loading ? <CircularProgress size={24} /> : buttonLabels[promptType]}
      </Button>

      {result && (
        <Typography variant="h6" marginTop={2} color="primary">
          {result}
        </Typography>
      )}
    </Container>
  );
}
