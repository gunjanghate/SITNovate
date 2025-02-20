'use client';

import { ArrowBigLeftIcon, ArrowBigRightIcon, CameraIcon } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import { toast } from 'sonner';
import axios from 'axios';

import { chatSession } from '../../../../../utils/gemini';
import { useSpeechRecognition } from "../../../../../hooks/useSpeechRecognition";

function Record({ questionData, questionIndex, interviewData }) {
  const [userAnswerResponse, setUserAnswerResponse] = useState('');
  const [webCam, setWebCam] = useState(true);
  const [loading, setLoading] = useState(false);

  const pathname = window.location.pathname;
  const interviewId = pathname.split('/')[2];
  
  const {
    isRecording,
    transcript,
    error,
    startRecording,
    stopRecording,
  } = useSpeechRecognition();

  useEffect(() => {
    if (!isRecording && transcript.length > 0) {
      setUserAnswerResponse(transcript);
    }
  }, [isRecording, transcript]);

  const toggleRecording = () => {
    isRecording ? stopRecording() : startRecording();
  };
    
  const sendAnswerToDatabase = async () => {
    setLoading(true);

    const feedbackPrompt = `Question: ${questionData[questionIndex].question}, User Answer: ${userAnswerResponse}. 
    On the basis of the question and user answer, give a rating (out of 5) for the answer and a feedback. 
    Also compare it with the Default Answer: ${questionData[questionIndex].answer} for better comparison. 
    Keep feedback within 3-5 lines and return response in JSON format with "rating" and "feedback" fields.`;

    try {
      const aiResult = await chatSession.sendMessage(feedbackPrompt);
      console.log("AI Result:", aiResult);
      
      // Extract the JSON content from the response
      let feedbackText = aiResult.response.text();
      
      // Remove any markdown code block indicators and clean the string
      feedbackText = feedbackText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      
      // Parse the cleaned JSON string
      let jsonFeedbackResponse;
      try {
        jsonFeedbackResponse = JSON.parse(feedbackText);
      } catch (parseError) {
        // If parsing fails, try to extract JSON using regex
        const jsonMatch = feedbackText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          jsonFeedbackResponse = JSON.parse(jsonMatch[0]);
        } else {
          throw new Error("Could not parse AI response as JSON");
        }
      }

      // Validate the response structure
      if (!jsonFeedbackResponse || typeof jsonFeedbackResponse.rating === 'undefined' || !jsonFeedbackResponse.feedback) {
        throw new Error("Invalid response structure from AI");
      }

      // Convert rating to number and validate
      const rating = Number(jsonFeedbackResponse.rating);
      if (isNaN(rating) || rating < 0 || rating > 5) {
        throw new Error("Invalid rating value");
      }

      console.log("Parsed Feedback Response:", jsonFeedbackResponse);

      const response = await axios.post('http://localhost:3000/feed/feedback', {
        interviewId: interviewId,
        feedback: jsonFeedbackResponse.feedback,
        rating: rating,
      });

      if (response.status === 200) {
        toast.success("Answer updated successfully!");
      } else {
        toast.error("Unexpected error occurred!");
      }
    } catch (error) {
      console.error("Error storing answer:", error);
      toast.error(error.message || "Failed to save answer!");
    } finally {
      setUserAnswerResponse('');
      setLoading(false);
    }
  };

  return (
    <div className={`flex flex-col justify-between p-4 gap-5 transition-opacity ${loading ? 'opacity-50' : 'opacity-100'}`}>
      <div className="relative flex justify-center">
        {webCam ? (
          <Webcam
            onUserMedia={() => setWebCam(true)}
            onUserMediaError={() => setWebCam(false)}
            className="rounded-xl shadow-lg border border-gray-300 transition-all duration-150"
          />
        ) : (
          <Image
            src="https://via.placeholder.com/500"
            alt="Bliss"
            height={500}
            width={500}
            className="object-contain rounded-xl shadow-lg border border-gray-300 transition-all duration-150 w-full"
          />
        )}
      </div>

      <div className="flex justify-between items-center">
        <button
          onClick={() => setWebCam(!webCam)}
          className="rounded-full w-7 h-7 bg-red-500 text-xs flex items-center justify-center text-white hover:bg-red-600 transition-colors"
        >
          <CameraIcon width={16} />
        </button>

        <button
          onClick={toggleRecording}
          className="text-sm bg-slate-700 hover:bg-slate-600 transition-all px-4 py-2 rounded-md font-semibold text-white shadow-md"
        >
          {isRecording ? (
            <span className="text-red-200 animate-pulse">Stop 🎙</span>
          ) : (
            <span className="text-emerald-300">Answer 🔊</span>
          )}
        </button>
      </div>

      <div className="bg-gray-900 text-white p-5 rounded-xl shadow-lg min-h-[200px] border border-gray-700">
        {error && (
          <div className="bg-red-500/10 text-red-400 p-4 rounded-lg flex items-center gap-2">
            <p>{error}</p>
          </div>
        )}
        {transcript ? (
          <p className="whitespace-pre-wrap">{transcript}</p>
        ) : (
          <p className="text-gray-400 text-center italic">Your transcription will appear here...</p>
        )}
      </div>

      <button
        onClick={sendAnswerToDatabase}
        className="mt-3 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md transition-all disabled:bg-gray-500 disabled:cursor-not-allowed"
        disabled={loading}
      >
        Submit Answer
      </button>
    </div>
  );
}

export default Record;