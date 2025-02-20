'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { GraduationCap } from 'lucide-react';
import Link from 'next/link';

function Feedback({ params }) {
    const [feedbackResponse, setFeedBackResponse] = useState([]);
    const [feedbackPage, setFeedbackPage] = useState(false);

    useEffect(() => {
        fetchFeedback();
    }, []);

    const fetchFeedback = async () => {
        try {
            const response = await axios.get(`/api/feedback?interviewId=${params.interviewId}`);
            if (response.data.length > 0) {
                setFeedBackResponse(response.data.slice(0, 5)); // Limit to 5 items
                setFeedbackPage(true);
            } else {
                setFeedbackPage(false);
            }
        } catch (error) {
            console.error('Error fetching feedback:', error);
            setFeedbackPage(false);
        }
    };

    return (
        <div className="p-5 md:p-8">
            {feedbackPage ? (
                <>
                    <div className="mt-5 flex flex-col items-center lg:items-start gap-1 md:gap-2">
                        <h2 className="text-2xl font-bold text-blue-600 md:text-5xl">Your Feedback</h2>
                    </div>
                    {feedbackResponse.map((item, index) => (
                        <div key={index} className="mt-5 mb-2 bg-gray-200 rounded-lg p-4">
                            <div className="text-lg font-bold">Feedback {index + 1}</div>
                            <div className="mt-2">{item.feedback}</div>
                            <div className="mt-2 font-semibold">
                                Rating: <span className="text-blue-600">{item.rating} ⭐</span>
                            </div>
                        </div>
                    ))}
                    <div className="flex justify-center mt-5">
                        <Link href="/dashboard">
                            <button className="bg-blue-500 rounded-full hover:bg-blue-600 transition-colors px-4 py-2 text-white">
                                Back to Dashboard
                            </button>
                        </Link>
                    </div>
                </>
            ) : (
                <div className="h-[80vh] flex justify-center items-center">
                    <GraduationCap className="text-blue animate-bounce size-20 text-blue-600" />
                </div>
            )}
        </div>
    );
}

export default Feedback;
