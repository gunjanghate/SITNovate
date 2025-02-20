"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { HeroHighlight, Highlight } from "../components/ui/hero-highlight"
import { PointerWrapper } from "../components/magicui/pointer";
import { GlareCard } from "../components/ui/glare-card";


function Main() {
  const router = useRouter();

  const handleStartNowClick = () => {
    router.push("/resume");
  };

  const handleInterviewPrepClick = () => {
    // window.location.href = "https://prep-ai-hazel.vercel.app/";
    router.push("/interviewprep");
  };

  return (
    // <PointerWrapper>

    <div className="min-h-screen bg-gradient-to-b from-black to-neutral-950">

      <HeroHighlight>

        <div className="flex flex-col items-center justify-center gap-8 min-h-[50vh] w-full mx-auto text-black">

          <motion.h1
            className="text-center text-xl lg:px-48 px-12 font-bold tracking-tighter lg:text-4xl md:text-5xl text-blue-300 flex flex-col justify-center items-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Revolutionizing Skilling & Career Acceleration with
            <span className="text-blue-500 font-extrabold text-5xl tracking-tighter" >SupaPrep!</span>
          </motion.h1>
          <motion.div
            className="text-center text-md px-44 text-gray-300 w-3/4 md:text-xl mt-4 font-medium flex flex-col justify-center items-center "
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            SupaPrep streamlines recruitment with AI-powered tools, saving you
            time and helping you find the perfect candidates while preparing for
            interviews.

            <div className="button mt-12 border-2 px-3 text-2xl hover:text-blue-300 drop-shadow-xl hover:scale-110 hover:border-b-4 font-bold transition-all duration-500 rounded-sm py-1 border-white w-fit h-fit">
              Get started
            </div>
          </motion.div>
        </div>
      </HeroHighlight>

      <div id="#features" className="flex flex-col gap-5 items-center justify-center lg:space-x-8 mt-10 lg:mt-16">
        <h1 className="text-white text-5xl tracking-tighter font-extrabold">Features</h1>
        {/* Card 1 */}
      <div className="flex lg:flex-row lg:flex-wrap mx-auto flex-col gap-5 items-center justify-center lg:space-x-8 mt-10 lg:mt-16">

     
        <motion.div
          className="flex flex-col items-center justify-center w-[250px] h-[300px] md:w-[400px] md:h-[600px] lg:w-[290px] lg:h-[350px] rounded-xl shadow-lg hover:shadow-2xl transform transition-transform duration-300 hover:scale-105 z-100 border-2 border-white hover:border-b-8"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* <Image
            src="/assets/Group 39.png"
            width={200}
            height={300}
            alt="Resume Shortlisting"
          /> */}
          <p className="text-center text-3xl font-bold text-blue-500">
            Resume Shortlisting
          </p>
          <div className="text-center text-gray-600 w-3/4 md:text-lg mt-1">
            Curating resumes efficiently to match top talent with organizational
            roles.
          </div>
          <motion.button
            className="bg-[#3B82F6] text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mt-5 cursor-none"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleStartNowClick}
          >
            Click Here
          </motion.button>
        </motion.div>


        {/* Card 2 */}

        <motion.div
          className="flex flex-col items-center justify-center w-[250px] h-[300px] md:w-[400px] md:h-[600px] lg:w-[290px] lg:h-[350px] rounded-xl shadow-lg hover:shadow-2xl transform transition-transform duration-300 hover:scale-105 z-100 border-2 border-white hover:border-b-8"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {/* <Image
            src="/assets/Group 40.png"
            width={230}
            height={400}
            alt="Interview Prep"
          /> */}
          <p className="text-center text-3xl font-bold text-blue-500 mt-5 ">
            Interview Prep
          </p>
          <div className="text-center text-gray-600 w-3/4 md:text-lg mt-1">
            AI-driven interview prep: feedback, skill analysis, progress
            tracking, alignment.
          </div>
          <motion.button
            className="bg-[#3B82F6] text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mt-5 cursor-none"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleInterviewPrepClick}
          >
            Click Here
          </motion.button>
        </motion.div>

        {/* Card 3 */}
          <motion.div
          className="flex flex-col items-center justify-center w-[250px] h-[300px] md:w-[400px] md:h-[600px] lg:w-[290px] lg:h-[350px] rounded-xl shadow-lg hover:shadow-2xl transform transition-transform duration-300 hover:scale-105 z-100 border-2 border-white hover:border-b-8"
          initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* <Image
            src="/assets/Group 39.png"
            width={200}
            height={300}
            alt="Resume Shortlisting"
          /> */}
            <p className="text-center text-3xl font-bold text-blue-500">
              Resume Shortlisting
            </p>
            <div className="text-center text-gray-600 w-3/4 md:text-lg mt-1">
              Curating resumes efficiently to match top talent with organizational
              roles.
            </div>
            <motion.button
              className="bg-[#3B82F6] text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mt-5 cursor-none"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleStartNowClick}
            >
              Click Here
            </motion.button>
          </motion.div>
      
        {/* Card 4 */}
       
          <motion.div
          className="flex flex-col items-center justify-center w-[250px] h-[300px] md:w-[400px] md:h-[600px] lg:w-[290px] lg:h-[350px] rounded-xl shadow-lg hover:shadow-2xl transform transition-transform duration-300 hover:scale-105 z-100 border-2 border-white hover:border-b-8"
          initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* <Image
            src="/assets/Group 39.png"
            width={200}
            height={300}
            alt="Resume Shortlisting"
          /> */}
            <p className="text-center text-3xl font-bold text-blue-500">
              Resume Shortlisting
            </p>
            <div className="text-center text-gray-600 w-3/4 md:text-lg mt-1">
              Curating resumes efficiently to match top talent with organizational
              roles.
            </div>
            <motion.button
              className="bg-[#3B82F6] text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mt-5 cursor-none"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleStartNowClick}
            >
              Click Here
            </motion.button>
          </motion.div>
  
        {/* Card 5 */}
      
          <motion.div
          className="flex flex-col items-center justify-center w-[250px] h-[300px] md:w-[400px] md:h-[600px] lg:w-[290px] lg:h-[350px] rounded-xl shadow-lg hover:shadow-2xl transform transition-transform duration-300 hover:scale-105 z-100 border-2 border-white hover:border-b-8"
          initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* <Image
            src="/assets/Group 39.png"
            width={200}
            height={300}
            alt="Resume Shortlisting"
          /> */}
            <p className="text-center text-3xl font-bold text-blue-500">
              Resume Shortlisting
            </p>
            <div className="text-center text-gray-600 w-3/4 md:text-lg mt-1">
              Curating resumes efficiently to match top talent with organizational
              roles.
            </div>
            <motion.button
              className="bg-[#3B82F6] text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mt-5 cursor-none"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleStartNowClick}
            >
              Click Here
            </motion.button>
          </motion.div>
        {/* Card 6 */}
      
          <motion.div
          className="flex flex-col items-center justify-center w-[250px] h-[300px] md:w-[400px] md:h-[600px] lg:w-[290px] lg:h-[350px] rounded-xl shadow-lg hover:shadow-2xl transform transition-transform duration-300 hover:scale-105 z-100 border-2 border-white hover:border-b-8"
          initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* <Image
            src="/assets/Group 39.png"
            width={200}
            height={300}
            alt="Resume Shortlisting"
          /> */}
            <p className="text-center text-3xl font-bold text-blue-500">
              Resume Shortlisting
            </p>
            <div className="text-center text-gray-600 w-3/4 md:text-lg mt-1">
              Curating resumes efficiently to match top talent with organizational
              roles.
            </div>
            <motion.button
              className="bg-[#3B82F6] text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mt-5 cursor-none"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleStartNowClick}
            >
              Click Here
            </motion.button>
          </motion.div>
          </div>
      </div>

    </div>
    // {/* </PointerWrapper> */}
  );
}

export default Main;
