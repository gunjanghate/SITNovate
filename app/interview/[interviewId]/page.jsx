'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { WebcamIcon } from 'lucide-react';
import Link from 'next/link';
import Webcam from 'react-webcam';

function Interview() {
  const params = useParams();  
  const [interviewData, setInterviewData] = useState(null);
  const [webCam, setWebCam] = useState(false);

  useEffect(() => {
    if (params?.interviewId) {
      console.log('Fetching interview details for:', params.interviewId);
      getInterviewDetails(params.interviewId);
    } else {
      console.warn('No interviewId found in params');
    }
  }, [params.interviewId]);  

  const getInterviewDetails = async (interviewId) => {
    try {
      console.log('API Request:', `http://localhost:3000/api/job/${interviewId}`);
      const response = await axios.get(`http://localhost:3000/api/job/${interviewId}`);

      if (response.data?.job && response.data.job.length > 0) {
        console.log('API Response:', response.data);
        setInterviewData(response.data.job[0]);  // Extract first job object
      } else {
        console.warn('No job data found in API response it is');
      }
    } catch (error) {
      console.error('Error fetching interview details:', error);
    }
  };

  useEffect(() => {
    console.log('Updated interviewData:', interviewData);
  }, [interviewData]);

  return (
    <div className="p-5 min-h-[80vh] ">
      <div className="mt-3 flex flex-col items-center justify-center">
        <h2 className="text-blue-600 text-3xl font-bold text-center underline underline-offset-4">
          Let's Get Started!
        </h2>
      </div>
      <div className="mt-10 flex flex-col-reverse justify-center items-center gap-5 lg:flex-row lg:gap-64">
        <div className="flex flex-col gap-2">
          <div>
            <h2 className="text-blue-500 font-bold text-lg md:text-xl">Job Role/Job Position:</h2>
            <h3 className="bg-slate-300 rounded-lg p-2 text-sm md:text-md">
              {interviewData ? interviewData.jobRole : 'Loading...'}
            </h3>
          </div>
          <div>
            <h2 className="text-blue-500 font-bold text-lg md:text-xl">Job Description:</h2>
            <h3 className="bg-slate-300 rounded-lg p-2 text-sm md:text-md">
              {interviewData ? interviewData.jobDescription : 'Loading...'}
            </h3>
          </div>
          <div>
            <h2 className="text-blue-500 font-bold text-lg md:text-xl">Years of Experience:</h2>
            <h3 className="bg-slate-300 rounded-lg p-2 text-sm md:text-md">
              {interviewData ? interviewData.yearsOfExperience : 'Loading...'}
            </h3>
          </div>
        </div>
        <div id="webcam-container-div">
          {webCam ? (
            <div className="flex flex-col gap-3">
              <Webcam
                onUserMedia={() => console.log('Webcam started')}
                onUserMediaError={() => console.warn('Webcam access denied')}
                className="rounded-lg transition-all duration-150"
                width={320}
              />
              <button
                className="flex justify-center items-center bg-slate-300 hover:bg-gray-300 rounded-2xl transition-colors"
                onClick={() => {
                  setWebCam(false);
                  console.log('Webcam disabled');
                }}
              >
                <span className="py-1 text-center text-sm">Disable Camera</span>
              </button>
            </div>
          ) : (
            <div className="rounded-lg bg-sky-200 flex flex-col justify-center items-center gap-2 w-80 h-48 md:w-96 md:h-56 transition-all duration-150">
              <WebcamIcon className="w-20 h-20" />
              <button
                className="flex items-center bg-blue-300 rounded-2xl hover:bg-blue-400 transition-colors"
                onClick={() => {
                  setWebCam(true);
                  console.log('Webcam enabled');
                }}
              >
                <span className="px-3 py-1 text-center text-sm">Enable Camera</span>
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="mt-8 mb-4 flex justify-center items-center text-sm md:text-lg">
        <Link
          href={`/interview/${params.interviewId}/start`}
          className="p-2 rounded-2xl bg-blue-600 text-white hover:bg-blue-500 transition-colors"
        >
          <span className="px-3">Start Interview</span>
        </Link>
      </div>
    </div>
  );
}

export default Interview;
