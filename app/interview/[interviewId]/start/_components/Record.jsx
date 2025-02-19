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
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };
  const sendAnswerToBackend = async () => {
    setLoading(true);
    
    const feedbackPrompt = `Question: ${questionData[questionIndex].question}, User Answer: ${userAnswerResponse}. On the basis of the question and user answer, give us rating (out of 5) for the answer and the feedback, if there is any area of improvement needed include it in the feedback. Also compare with the Default Answer: ${questionData[questionIndex].answer} for ease of comparison. Keep the feedback of 3-5 lines and return the response in JSON format with rating field and feedback field.`;
    
    try {
      const aiResult = await chatSession.sendMessage(feedbackPrompt);
      console.log("AI Result:", aiResult);
      const feedbackResponse = (aiResult.response.text()).replace('```json', '').replace('```', '');
      const jsonFeedbackResponse = JSON.parse(feedbackResponse);
      console.log("Parsed Feedback Response:", jsonFeedbackResponse);
  
      const response = await axios.post('/api/store-answer', {
        interviewId: interviewData.interviewId,
        question: questionData[questionIndex].question,
        correctAnswer: questionData[questionIndex].answer,
        userAnswer: userAnswerResponse,
        feedback: jsonFeedbackResponse.feedback,
        rating: jsonFeedbackResponse.rating,
        transcript: userAnswerResponse, // Storing transcript
        createdAtTime: new Date().toISOString()
      });
      
      if (response.status === 200) {
        toast("Answer saved Successfully!");
      } else {
        toast("Unexpected error occurred!");
      }
    } catch (error) {
      console.error("Error storing answer:", error);
      toast("Failed to save answer!");
    }
  
    setUserAnswerResponse('');
    setResults([]);
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
        <div className="flex items-center gap-1">
          <button
            onClick={() => setWebCam(!webCam)}
            className="rounded-full w-7 h-7 bg-red-500 text-xs flex items-center justify-center text-white hover:bg-red-600 transition-colors"
          >
            <CameraIcon width={16} />
          </button>
        </div>

        <button
          onClick={toggleRecording}
          className="text-sm ring-2 ring-white bg-slate-600 hover:bg-slate-500 transition-colors p-2 rounded-md font-semibold"
        >
          {isRecording ? (
            <p className="text-red-200 animate-pulse">Stop 🎙️</p>
          ) : (
            <p className="text-emerald-300">Answer 🔊</p>
          )}
        </button>
      </div>

      <div className="bg-card p-6 rounded-lg shadow-sm min-h-[200px]">
        {error && (
          <div className="bg-destructive/10 text-destructive p-4 rounded-lg flex items-center gap-2">
            <p>{error}</p>
          </div>
        )}
        {transcript ? (
          <p className="whitespace-pre-wrap">{transcript}</p>
        ) : (
          <p className="text-muted-foreground text-center italic">
            Your transcription will appear here...
          </p>
        )}
      </div>

      <button
        onClick={sendAnswerToBackend}
        className="mt-3 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg shadow-md transition"
        disabled={loading}
      >
        Submit Answer
      </button>
    </div>
  );
}

export default Record;
