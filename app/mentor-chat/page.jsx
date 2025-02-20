"use client";

import React, { useState } from "react";
import { getMentorResponse } from "../../utils/api";

const MentorChat = () => {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [mentorType, setMentorType] = useState("software_engineering");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log("Sending request to API with:", { mentorType, query });

      const result = await getMentorResponse(mentorType, query);

      console.log("API Response:", result);
      setResponse(result);
    } catch (error) {
      console.error("Error fetching mentor response:", error);

      if (error.response) {
        console.error("Response Data:", error.response.data);
        console.error("Status Code:", error.response.status);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <div className="p-6 bg-gray-900 text-center shadow-md">
        <h1 className="text-3xl font-bold text-green-400">Industry Mentor AI</h1>
      </div>

      {/* Mentor Selection */}
      <div className="mt-6 flex justify-center">
        <select
          value={mentorType}
          onChange={(e) => setMentorType(e.target.value)}
          className="p-3 bg-gray-800 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-400"
        >
          <option value="software_engineering">Software Engineering</option>
          <option value="data_science">Data Science</option>
          <option value="product_management">Product Management</option>
        </select>
      </div>

      {/* Main Content */}
      <div className="flex-grow flex items-center justify-center p-6">
        <div className="max-w-3xl w-full mx-auto bg-gray-900 p-8 rounded-lg shadow-lg">
          {/* Heading */}
          <h2 className="text-2xl font-bold mb-4 text-center">
            Ask {mentorType.replace("_", " ")} Mentor
          </h2>

          {/* Introduction Text */}
          <p className="mb-4 text-gray-400 text-center">
            🚀 Meet <span className="font-semibold text-white">Aman</span>, a Computer Science student struggling to land a job.
            He applied to <span className="font-semibold text-white">50+ jobs</span> but faced rejections due to poor resume optimization & interview anxiety.
          </p>
          <p className="mb-6 text-gray-400 text-center">
            💡 <span className="text-green-400">SupaPrep</span> changed his career by providing AI-driven mentorship, job listings, and resume improvements.
          </p>

          {/* Query Form */}
          <form onSubmit={handleSubmit} className="mb-6">
            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask your mentor a question..."
              required
              className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-600 focus:ring-2 focus:ring-green-400"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition"
            >
              {isLoading ? "Loading..." : "Get Response"}
            </button>
          </form>

          {/* Mentor Response Section */}
          {response && (
            <div className="mt-8 p-6 bg-gray-800 rounded-lg">
              <h3 className="text-lg font-semibold text-green-400">Response:</h3>
              <p className="mt-2 text-white">{response.primary_response}</p>

              <h4 className="mt-4 text-md font-semibold text-green-400">Additional Insights:</h4>
              <pre className="bg-gray-700 p-4 rounded-lg text-white text-sm">
                {JSON.stringify(response.enrichment, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full bg-gray-900 text-center py-4 text-gray-400">
        &copy; {new Date().getFullYear()} SupaPrep - AI-Powered Skilling & Career Acceleration
      </footer>
    </div>
  );
};

export default MentorChat;
