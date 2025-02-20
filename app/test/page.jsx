"use client";

import { useState, useEffect } from "react";
import axios from "axios";

const Quiz = ({ interviewId, initialQuestions = [] }) => {
    const [questions, setQuestions] = useState(initialQuestions);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState([]); // Store all answers
    const [userAnswer, setUserAnswer] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!initialQuestions.length) {
            axios.get(`http://localhost:3000/api/questions/${interviewId}`)
                .then((response) => {
                    setQuestions(response.data);
                    console.log(response.data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error("Error fetching questions:", error);
                    setError("Failed to load questions");
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, [interviewId, initialQuestions]);

    if (loading) return <h3>Loading questions...</h3>;
    if (error) return <h3 style={{ color: "red" }}>{error}</h3>;
    if (!questions || questions.length === 0) return <h3>No questions available.</h3>;

    const currentQuestion = questions[currentQuestionIndex];

    const handleNext = () => {
        const newResponse = {
            question: currentQuestion.question,
            userAnswer,
            expectedAnswer: currentQuestion.expectedAnswer,
            rating: userAnswer === currentQuestion.expectedAnswer ? 5 : 3 // Simple rating logic
        };

        setUserAnswers([...userAnswers, newResponse]);
        setUserAnswer("");

        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            alert("You have reached the last question. Click 'Finish' to submit.");
        }
    };

    const handleSubmit = async () => {
        try {
            await axios.patch("http://localhost:3000/interview/saveResponse", {
                interviewId,
                interviewDate: new Date(),
                interviewTime: new Date().toLocaleTimeString(),
                responses: userAnswers
            });

            alert("Interview responses submitted successfully!");
        } catch (error) {
            console.error("Error submitting interview:", error);
        }
    };

    return (
        <div>
            <h3>{currentQuestion?.question}</h3>
            <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Your answer"
            />
            {currentQuestionIndex < questions.length - 1 ? (
                <button onClick={handleNext}>Next</button>
            ) : (
                <button onClick={handleSubmit}>Finish</button>
            )}
        </div>
    );
};

export default Quiz;
