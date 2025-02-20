"use client";

import React, { useState } from "react";
import { generateScenario } from "../../utils/api";

const ScenarioGenerator = ({ mentorType }) => {
  const [scenario, setScenario] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateScenario = async () => {
    setIsLoading(true);
    try {
      const result = await generateScenario(mentorType, "intermediate");
      setScenario(result);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-950 px-4">
      <div className="p-8 bg-gray-900 text-white rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-100">
          Generate Practice Scenario
        </h2>

        <button
          onClick={handleGenerateScenario}
          disabled={isLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 ease-in-out disabled:bg-gray-700 disabled:cursor-not-allowed"
        >
          {isLoading ? "Generating..." : "Generate Scenario"}
        </button>

        {scenario && (
          <div className="mt-8 p-6 bg-gray-800 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-100 mb-3">
              Scenario:
            </h3>
            <pre className="text-sm text-gray-300 bg-gray-700 p-4 rounded-md overflow-x-auto whitespace-pre-wrap">
              {JSON.stringify(scenario, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScenarioGenerator;
