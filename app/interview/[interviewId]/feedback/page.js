'use client';

import React, { useEffect, useState, use } from 'react';
import axios from 'axios';
import { GraduationCap } from 'lucide-react';
import Link from 'next/link';

function Feedback({ params: paramsPromise }) {
    const params = use(paramsPromise);
    
    const [feedbackResponse, setFeedBackResponse] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!params?.interviewId) {
            setError("Invalid interview ID");
            setLoading(false);
            return;
        }
        fetchFeedback();
    }, [params]);

    const fetchFeedback = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`http://localhost:3000/feed/feedback/${params.interviewId}`);
            
            // Check if response.data has the feedbacks array
            if (response.data && response.data.feedbacks) {
                setFeedBackResponse(response.data.feedbacks.slice(0, 5));
            } else {
                setFeedBackResponse([]);
                setError("No feedback available");
            }
        } catch (error) {
            console.error("Error fetching feedback:", error);
            setError("Failed to fetch feedback. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const renderRatingStars = (rating) => {
        return "⭐".repeat(rating) || "No rating";
    };

    if (loading) {
        return (
            <div className="h-[80vh] flex flex-col justify-center items-center bg-black text-white">
                <GraduationCap className="animate-bounce size-20 text-blue-600" />
                <p className="mt-4 text-gray-600">Loading feedback...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="h-[80vh] flex flex-col justify-center items-center bg-black text-red-600">
                <p className="text-lg font-semibold">{error}</p>
                <Link href="/dashboard">
                    <button className="mt-4 bg-blue-500 rounded-full hover:bg-blue-600 transition-colors px-4 py-2 text-white">
                        Back to Dashboard
                    </button>
                </Link>
            </div>
        );
    }

    return (
        <div className="p-5 md:p-8 bg-black text-white">
            <div className="mt-5 flex flex-col items-center lg:items-start gap-1 md:gap-2">
                <h2 className="text-xl italic font-bold text-blue-400 tracking-tighter md:text-5xl">Success is not final, failure is not fatal: it is the courage to continue that counts.</h2>
                <p className="text-gray-300 ">
                    Total Responses: {feedbackResponse.length}
                </p>
            </div>
            
            {feedbackResponse.length > 0 ? (
                feedbackResponse.map((item, index) => (
                    <div key={item._id} className="mt-5 mb-2  shadow-lg rounded-lg p-6 border-2 hover:border-b-4  border-gray-200 hover:scale-105 transition-all duration-500" >
                        <div className="flex justify-between items-start">
                            <div className="text-xl font-bold text-blue-600">
                                Feedback {index + 1}
                            </div>
                            <div className="text-sm text-gray-300 italic">
                                {formatDate(item.createdAt)}
                            </div>
                        </div>
                        
                        <div className="mt-4 text-gray-300 font-semibold whitespace-pre-wrap">
                            {item.feedback}
                        </div>
                        
                        <div className="mt-4 flex items-center gap-2">
                            <span className="font-semibold">Rating:</span>
                            <span className="text-yellow-400">
                                {renderRatingStars(item.rating)}
                            </span>
                            <span className="text-gray-600">
                                ({item.rating}/5)
                            </span>
                        </div>
                    </div>
                ))
            ) : (
                <div className="mt-8 text-center text-gray-600">
                    No feedback available yet.
                </div>
            )}
            
            <div className="flex justify-center mt-8">
                <Link href="/interviewprep">
                    <button className=" rounded-sm border-2 border-white hover:border-b-4 hover:scale-105 duration-500 cursor-none hover:text-blue-300 transition-all px-6 py-3 text-white font-semibold shadow-md">
                        Start a new Interview Prep!
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default Feedback;