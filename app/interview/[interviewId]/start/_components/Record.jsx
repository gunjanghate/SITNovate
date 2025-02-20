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
    const feedbackPrompt = `Question: ${questionData[questionIndex].question}, User Answer: ${userAnswerResponse}. 
    On the basis of the question and user answer, give a rating (out of 5) for the answer and a feedback. 
    Also compare it with the Default Answer: ${questionData[questionIndex].answer} for better comparison. 
    Keep feedback within 3-5 lines and return response in JSON format with "rating" and "feedback" fields.`;

    try {
        const aiResult = await chatSession.sendMessage(feedbackPrompt);
        console.log("AI Result:", aiResult);

        // Parse JSON response
        const feedbackResponse = (aiResult.response.text()).replace('```json', '').replace('```', '');
        const jsonFeedbackResponse = JSON.parse(feedbackResponse);
        console.log("Parsed Feedback Response:", jsonFeedbackResponse);

        console.log("Interview Data:", interviewData);
        // ✅ Save Feedback to DB
        const res = await axios.post(`http://localhost:3000/feed/feedback`, {
          interviewId: interviewId,
            feedback: jsonFeedbackResponse.feedback,
            rating: jsonFeedbackResponse.rating
        });

        if (res.status === 200) {
            toast("Answer & Feedback saved Successfully!");
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
    <div className={`flex flex-col justify-between p-3 gap-3 md:gap-5 ${loading ? 'opacity-15' : 'opacity-100'}`}>
      {webCam ? (
        <Webcam
          onUserMedia={() => setWebCam(true)}
          onUserMediaError={() => setWebCam(false)}
          className="rounded-lg transition-all duration-150"
        />
      ) : (
        <Image
          src={"https://via.placeholder.com/500"} 
          alt="Bliss"
          height={500} 
          width={500}
          className="object-contain rounded-lg transition-all duration-150 w-full"
        />
      )}

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
