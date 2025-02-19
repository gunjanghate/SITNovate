'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { LoaderPinwheel } from 'lucide-react';
import { v4 as uuidv4 } from "uuid";
function AddNew() {
    const [dialogState, setDialogState] = useState(false);
    const [jobRole, setJobRole] = useState('');
    const [jobDescription, setJobDescription] = useState('');
    const [yearsOfExperience, setYearsOfExperience] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
    
        const formData = {
            jobRole,
            jobDescription,
            yearsOfExperience: Number(yearsOfExperience),
            interviewId: uuidv4()
        };
    
        try {
            const response = await axios.post('http://localhost:3000/api/job', formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            console.log("Response from server:", response.data);
            
            setLoading(false);
            setDialogState(false);
            console.log(response);
            router.push(`/dashboard/interview/${response.data.interviewId}`); // Adjust based on API response
        } catch (error) {
            console.error("Error saving data:", error);
            setLoading(false);
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
