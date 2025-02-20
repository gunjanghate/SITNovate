'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { LoaderPinwheel } from 'lucide-react';
import { v4 as uuidv4 } from "uuid";
import { chatSession } from '../../utils/gemini.ts';

function AddNew() {
    const [dialogState, setDialogState] = useState(false);
    const [jobRole, setJobRole] = useState('');
    const [jobDescription, setJobDescription] = useState('');
    const [yearsOfExperience, setYearsOfExperience] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [jsonResponse, setJsonResponse] = useState('');
    const [loading, setLoading] = useState(false);
    const [questions, setQuestions] = useState([]);
    const router = useRouter();

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = {
            jobRole,
            jobDescription,
            yearsOfExperience: Number(yearsOfExperience),
            interviewId: uuidv4(),
            questions: [...questions], // Ensure questions is an array
        };

        const InputPrompt = `Generate 5 tailored interview questions based on the ${jobRole}, ${jobDescription}, and ${yearsOfExperience}. Carefully consider the candidate's level of expertise based on ${yearsOfExperience}, the job requirements based on the ${jobDescription}, and the necessary skills and qualifications needed for the position based on ${jobRole}. 
        Aim is to create a list of pertinent, technical, and insightful interview questions that will effectively assess the candidate's suitability for the given ${jobRole}. 
        Only Generate Questions and their Answers in JSON format with no Markdown tags, new lines, or extra text.`;

        try {
            const result = await chatSession.sendMessage(InputPrompt);
            let rawResponse = result.response.text();

            // Remove Markdown formatting like ```json and ```
            let cleanedResponse = rawResponse.replace(/```json|```/g, "").trim();

            let parsedJSON;
            try {
                parsedJSON = JSON.parse(cleanedResponse);
            } catch (error) {
                console.error("❌ Failed to parse JSON response:", error);
                console.log("⚠️ Raw Response:", cleanedResponse);
                return;
            }

            setJsonResponse(parsedJSON);
            setQuestions(parsedJSON); // ✅ Set as an array
            formData.questions = parsedJSON; // ✅ Assign parsed array to formData.questions

            console.log("✅ Parsed Questions:", formData.questions);

            const response = await axios.post('http://localhost:3000/api/job', formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            console.log("✅ Response from server:", response.data.job);

            if (response.data.job.interviewId) {
                router.replace(`/interview/${response.data.job.interviewId}`);
            } else {
                console.error("❌ interviewId is missing in the response:", response.data);
            }
        } catch (error) {
            console.error("❌ Error processing request:", error);
        } finally {
            setLoading(false);
            setDialogState(false);
        }
    };

    React.useEffect(() => {
        setIsButtonDisabled(!(jobRole && jobDescription && yearsOfExperience));
    }, [jobRole, jobDescription, yearsOfExperience]);

    return (
        <div>
            <div
                className='p-12 rounded-lg border border-slate-300 bg-slate-100 hover:bg-slate-200 transition-colors shadow-md cursor-pointer'
                onClick={() => setDialogState(true)}
            >
                <h2 className='font-semibold text-lg text-center'>+ Create New</h2>
            </div>

            {dialogState && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
                        <h2 className="text-2xl font-bold">Before we start! Let's get to know some details</h2>
                        <form onSubmit={onSubmit} className="flex flex-col gap-4 mt-4">
                            <label className="font-semibold">Job Role 📝</label>
                            <input
                                type="text"
                                className="p-2 border rounded-md"
                                placeholder="Enter Job Role..."
                                value={jobRole}
                                onChange={(e) => setJobRole(e.target.value)}
                                required
                            />
                            
                            <label className="font-semibold">Job Description/Tech Stack 🌐</label>
                            <textarea
                                className="p-2 border rounded-md resize-none"
                                placeholder="Keep it concise and to the point..."
                                value={jobDescription}
                                maxLength={220}
                                onChange={(e) => setJobDescription(e.target.value)}
                                required
                            />
                            
                            <label className="font-semibold">Years of Experience 📈</label>
                            <input
                                type="number"
                                className="p-2 border rounded-md"
                                placeholder="..."
                                value={yearsOfExperience}
                                onChange={(e) => setYearsOfExperience(e.target.value)}
                                required
                                max={50}
                            />
                            
                            <div className="flex justify-end gap-4 mt-2">
                                <button
                                    type="button"
                                    className="bg-gray-300 p-2 rounded-md hover:bg-gray-400"
                                    onClick={() => setDialogState(false)}
                                >Cancel</button>
                                <button
                                    type="submit"
                                    className={`p-2 rounded-md transition-all ${isButtonDisabled || loading ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
                                    disabled={isButtonDisabled}
                                >
                                    {loading ? (
                                        <div className="flex items-center">
                                            <LoaderPinwheel className="w-5 h-5 animate-spin" />
                                            <span className="mx-1">Generating 🪄</span>
                                        </div>
                                    ) : (
                                        <span className="mx-2">Start Interview</span>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AddNew;
