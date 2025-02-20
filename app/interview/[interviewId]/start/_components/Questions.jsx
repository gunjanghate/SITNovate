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
    <div className="flex flex-col justify-evenly border border-slate-300 shadow-md w-full md:w-2/3 rounded-3xl bg-black text-white">
      <div className="mt-3 p-3 py-1 flex flex-row flex-wrap gap-2">
        {questionData.map((question, index) => (
          <h2
            key={index}
            className={`font-semibold px-2 py-3 w-44 flex justify-center items-center border-2 border-white rounded-full text-[xl] md:text-[2xl] lg:text-2xl cursor-pointer transition-colors ${
              questionIndex === index
                ? "bg-blue-300 text-black"
                : "bg-blue-100/50 text-white"
            }`}
          >
            Question #{index + 1}
          </h2>
        ))}
      </div>
      <div className="flex flex-col gap-2 p-3 text-[16px] md:text-[20px]">
        <p>Q. {questionData[questionIndex].question}</p>
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
