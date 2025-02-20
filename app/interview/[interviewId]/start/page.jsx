'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Questions from './_components/Questions';
import { ArrowLeftCircle, ArrowRightCircle, Loader2Icon } from 'lucide-react';
import Record from './_components/Record';
import Link from 'next/link';

function Start({ params }) {
  const [interviewId, setInterviewId] = useState(null);
  const [interviewData, setInterviewData] = useState(null);
  const [questionData, setQuestionData] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);

  // ✅ Unwrapping params correctly
  useEffect(() => {
    async function unwrapParams() {
      const resolvedParams = await params;
      if (resolvedParams?.interviewId) {
        setInterviewId(resolvedParams.interviewId);
      }
    }
    unwrapParams();
  }, [params]);

  // ✅ Fetching interview details only when interviewId is set
  useEffect(() => {
    if (interviewId) {
      const getInterviewDetails = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/api/questions/${interviewId}`);
          if (response.data) {
            console.log("Fetched interview details successfully:", response.data);

            setInterviewData(...response.data, interviewId);
            setQuestionData(response.data || []);
          } else {
            console.log("No interview data found.");
          }
        } catch (error) {
          console.error("Error fetching interview details:", error);
        }
      };

      getInterviewDetails();
    }
  }, [interviewId]);

  // ✅ Logging updated questionData correctly
  useEffect(() => {
    if (questionData.length > 0) {
      console.log("Updated questionData:", questionData);
    }
  }, [questionData]);
  console.log(questionData.length);

  return (
    <div className="p-5 bg-black">
      {questionData.length > 0 ? (
        <>
          <div className="flex flex-col md:flex-row gap-10">
            <Questions questionData={questionData} questionIndex={questionIndex} />
            <div className="rounded-xl w-full md:w-1/3 ">
              <Record questionData={questionData} questionIndex={questionIndex} interviewData={interviewData} />
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <div className="flex gap-2 font-semibold">
              {questionIndex > 0 && (
                <button
                  onClick={() => setQuestionIndex(questionIndex - 1)}
                  className="flex gap-1 items-center rounded-lg bg-red-400 p-3 hover:bg-red-500 shadow-md transition-colors"
                >
                  <ArrowLeftCircle />
                  <h3>Prev</h3>
                </button>
              )}
              {questionIndex < questionData.length - 1 && (
                <button
                  onClick={() => setQuestionIndex(questionIndex + 1)}
                  className="flex gap-1 rounded-lg items-center bg-emerald-400 p-3 hover:bg-emerald-500 shadow-md transition-colors"
                >
                  <h3>Next</h3>
                  <ArrowRightCircle />
                </button>
              )}
            </div>
            {questionIndex === questionData.length - 1 && interviewData && (
              <Link href={`/feed/feedback/${interviewId}`}>
                <button className="flex gap-1 rounded-lg items-center bg-blue-700 text-white p-3 hover:bg-blue-800 transition-colors">
                  End Interview
                </button>
              </Link>
            )}
          </div>
        </>
      ) : (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-white/70 z-50">
          <Loader2Icon className="animate-spin size-16 text-blue-500" />
        </div>
        
      )}
    </div>
  );
}

export default Start;
