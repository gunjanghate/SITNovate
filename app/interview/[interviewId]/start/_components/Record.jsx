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

  const sendAnswerToBackend = async () => {
    setLoading(true);
  
    const feedbackPrompt = `Question: ${questionData[questionIndex].question}, User Answer: ${userAnswerResponse}. On the basis of the question and user answer, give us rating (out of 5) for the answer and the feedback, if there is any area of improvement needed include it in the feedback. Also compare with the Default Answer: ${questionData[questionIndex].answer} for ease of comparison. Keep the feedback of 3-5 lines and return the response in JSON format with rating field (as a number) and feedback field.`;
  
    try {
      const aiResult = await chatSession.sendMessage(feedbackPrompt);
      console.log("AI Result:", aiResult);
      const feedbackResponse = aiResult.response.text().replace('```json', '').replace('```', '');
      const jsonFeedbackResponse = JSON.parse(feedbackResponse);
  
      const rating = Number(jsonFeedbackResponse.rating);
      if (isNaN(rating)) {
        throw new Error("Invalid rating received from AI response");
      }
  
      console.log("Parsed Feedback Response:", jsonFeedbackResponse);
  
      const response = await axios.post('http://localhost:3000/feed/feedback', {
        interviewId: interviewData.interviewId,
        feedback: jsonFeedbackResponse.feedback,
        rating: rating,
      });
  
      if (response.status === 200) {
        toast("Answer updated Successfully!");
      } else {
        toast("Unexpected error occurred!");
      }
    } catch (error) {
      console.error("Error storing answer:", error);
      toast("Failed to save answer!");
    }
  
    setUserAnswerResponse('');
    setLoading(false);
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
          className="rounded-full w-9 h-9 bg-red-500 text-xs flex items-center justify-center text-white hover:bg-red-600 transition-all shadow-md"
        >
          <CameraIcon width={18} />
        </button>

        <button
          onClick={toggleRecording}
          className="text-sm bg-slate-700 hover:bg-slate-600 transition-all px-4 py-2 rounded-md font-semibold text-white shadow-md"
        >
          {isRecording ? (
            <span className="text-red-200 animate-pulse">Stop 🎙️</span>
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
        onClick={sendAnswerToBackend}
        className="mt-3 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md transition-all disabled:bg-gray-500 disabled:cursor-not-allowed"
        disabled={loading}
      >
        Submit Answer
      </button>
    </div>
  );
}

export default Record;
