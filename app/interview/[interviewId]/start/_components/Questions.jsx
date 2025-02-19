import { LucideLightbulb, Volume2 } from "lucide-react";

function Questions({ questionData, questionIndex }) {
  const textToSpeech = (text) => {
    if ("speechSynthesis" in window) {
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
    } else {
      alert("Browser doesn't support Text To Speech Functionality!");
    }
  };

  return (
    <div className="flex flex-col justify-evenly border border-slate-300 shadow-md w-full md:w-2/3 rounded-3xl">
      <div className="mt-3 p-3 grid grid-cols-3 md:grid-cols-3 gap-2">
        {questionData.map((question, index) => (
          <h2
            key={index}
            className={`font-semibold p-2 text-center bg-blue-300 rounded-full text-[10px] md:text-[14px] cursor-pointer ${
              questionIndex === index && "bg-blue-600 text-white"
            } transition-colors`}
          >
            Question #{index + 1}
          </h2>
        ))}
      </div>
      <div className="flex flex-col gap-2 p-3 text-[16px] md:text-[20px]">
        <p>{questionData[questionIndex].question}</p>
        <div className="flex items-center gap-2 text-blue-400">
          <Volume2
            width={20}
            className="cursor-pointer"
            onClick={() => textToSpeech(questionData[questionIndex].question)}
          />
        </div>
      </div>
    </div>
  );
}

export default Questions;
