// import axios from "axios";
// import dotenv from 'dotenv'

// dotenv.config();

// const backendUrl = process.env.REACT_APP_BACKEND_URL;

// export const getMentorResponse = async (mentorType, query) => {
//   try {
//     const response = await axios.post(`${backendUrl}/get-mentor-response`, {
//       mentor_type: mentorType,
//       query: query,
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching mentor response:", error);
//     throw error;
//   }
// };

// export const generateScenario = async (mentorType, difficulty) => {
//   try {
//     const response = await axios.post(`${backendUrl}/generate-scenario`, {
//       mentor_type: mentorType,
//       difficulty: difficulty,
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Error generating scenario:", error);
//     throw error;
//   }
// };

// export const provideFeedback = async (mentorType, scenario, solution) => {
//   try {
//     const response = await axios.post(`${backendUrl}/provide-feedback`, {
//       mentor_type: mentorType,
//       scenario: scenario,
//       solution: solution,
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Error providing feedback:", error);
//     throw error;
//   }
// };
import axios from "axios";

// Access the environment variable using import.meta.env
const backendUrl = "http://localhost:8000";
console.log(backendUrl);

export const getMentorResponse = async (mentorType, query) => {
  try {
    const response = await axios.post(`${backendUrl}/get-mentor-response`, {
      mentor_type: mentorType,
      query: query,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching mentor response:", error);
    throw error;
  }
};

export const generateScenario = async (mentorType, difficulty) => {
  try {
    const response = await axios.post(`${backendUrl}/generate-scenario`, {
      mentor_type: mentorType,
      difficulty: difficulty,
    });
    return response.data;
  } catch (error) {
    console.error("Error generating scenario:", error);
    throw error;
  }
};

export const provideFeedback = async (mentorType, scenario, solution) => {
  try {
    const response = await axios.post(`${backendUrl}/provide-feedback`, {
      mentor_type: mentorType,
      scenario: scenario,
      solution: solution,
    });
    return response.data;
  } catch (error) {
    console.error("Error providing feedback:", error);
    throw error;
  }
};