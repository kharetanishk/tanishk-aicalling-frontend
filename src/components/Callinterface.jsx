import "../css/index.css";
import React from "react";
import axios from "axios";
import Lottie from "lottie-react";
import talkinginterface from "../assets/talkanimee.json";
import { HiSpeakerWave } from "react-icons/hi2";
import { MdCallEnd } from "react-icons/md";
import { FaMicrophone } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
import { MdErrorOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { RiSpeakFill } from "react-icons/ri";
import Timer from "../components/Timer.jsx";
import FormatTime from "../components/Formattime.jsx";

// Recoil imports
import { useResetRecoilState } from "recoil";
import { elapsedTimeAtom } from "../states/atoms";

const CallingInterface = () => {
  const [isGreeting, setIsGreeting] = useState(true);
  const [isspeakerOn, setSpeaker] = useState(false);
  const [isListening, setListening] = useState(false);
  const [userTranscript, setTranscript] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [responseFromAI, setResponse] = useState("");
  const [apiError, setApiError] = useState(null);
  const recognitionRef = useRef(null);
  const greetedRef = useRef(false);
  const navigate = useNavigate();
  const resetElapsedTime = useResetRecoilState(elapsedTimeAtom);
  const MemoizedLottie = React.memo(({ animationData }) => (
    <Lottie
      className="w-3xs h-64 rounded-full border-none p-2"
      animationData={animationData}
    />
  ));

  const hasRequestedMicRef = useRef(false);

  useEffect(() => {
    if (hasRequestedMicRef.current) return;
    hasRequestedMicRef.current = true;

    navigator.mediaDevices.getUserMedia({ audio: true }).catch((err) => {
      if (
        err.name === "NotAllowedError" ||
        err.name === "PermissionDeniedError"
      ) {
        alert("🎙️ Please allow microphone access for the best experience.");
      }
    });
  }, []);

  useEffect(() => {
    greetedRef.current = false;
    const greetAndStart = () => {
      const greeting =
        "Hi, I am Tanishk's AI. Ask me anything about his portfolio.";
      const greetSpeech = new SpeechSynthesisUtterance(greeting);
      greetSpeech.lang = "en-US";
      greetSpeech.pitch = 1.2;
      greetSpeech.rate = 0.95;

      setIsGreeting(true);

      greetSpeech.onend = () => {
        console.log("Greeting done, starting mic...");
        setIsGreeting(false);
        startListening();
      };

      speechSynthesis.speak(greetSpeech);
    };

    if (!greetedRef.current) {
      greetedRef.current = true;
      greetAndStart();
    }

    return () => {
      console.log(
        "Leaving /callinginterface — stopping speech and resetting timer"
      );
      speechSynthesis.cancel();
      stopListening();
      resetElapsedTime();
    };
  }, []);

  const startListening = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    let micTimeout;

    recognition.onstart = () => {
      setListening(true);
      console.log("Mic listening...");
      micTimeout = setTimeout(() => {
        recognition.stop();
        setListening(false);
        setResponse("Mic timed out. Tap again to talk.");
      }, 7000);
    };

    recognition.onresult = async (event) => {
      clearTimeout(micTimeout);
      const userText = event.results[0][0].transcript;
      console.log(" user said:", userText);
      setTranscript(userText);
      recognition.stop();
      setListening(false);
      setLoading(true);
      try {
        const res = await axios.post("http://localhost:1601/chat", {
          userMessage: userText,
        });
        const data = res.data;
        setResponse(data.response);
        setApiError(null);
        speak(data.response);
      } catch (err) {
        console.error(" API Error:", err);
        setApiError(
          "Unable to connect to the backend. Please try again later."
        );
        setResponse("Something went wrong while fetching the response.");
      }
      setLoading(false);
    };

    recognition.onerror = (event) => {
      clearTimeout(micTimeout);
      console.error(" Mic Error:", event.error);
      setListening(false);

      if (event.error === "not-allowed") {
        setResponse(" Please allow microphone access.");
      } else if (event.error === "no-speech") {
        setResponse("I didn’t hear anything. Try again.");
      } else {
        setResponse("Something went wrong with the mic.");
      }
    };

    recognition.onend = () => {
      clearTimeout(micTimeout);
      setListening(false);
      console.log(" Mic stopped.");
    };

    recognitionRef.current = recognition;
    recognition.start();
  };
  const stopListening = () => {
    recognitionRef.current?.stop?.();
    setListening(false);
  };

  // Speak Function
  const speak = (text) => {
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "en-US";
    speechSynthesis.speak(utter);
  };

  useEffect(() => {
    if (isspeakerOn) {
      const timer = setTimeout(() => {
        setSpeaker(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isspeakerOn]);
  const handleclick = () => {
    setSpeaker((prev) => !prev);
  };
  useEffect(() => {
    if (apiError !== null) {
      const timer = setTimeout(() => {
        setApiError("");
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [apiError]);

  return (
    <>
      <div className="border-app flex justify-between items-center flex-col relative h-screen overflow-hidden">
        <div className="flex box-border flex-col items-center justify-center h-[90vh] p-[30px] background-app relative overflow-hidden">
          {/* {console.log("app is rendering")} */}
          {isLoading ? (
            <div className="flex justify-center items-center w-2xs h-64 text-3xl text-[#c6cac9] font-bold p-[7px] ">
              <p>🤖 Thinking....</p>
              <span className="spinner"></span>
            </div>
          ) : (
            <MemoizedLottie animationData={talkinginterface} />
          )}
          <Timer />
          <div className="flex items-center p-1.5 text-[20px] mb-8">
            <p className="flex items-center font-medium p-1 " id="timer">
              <FormatTime />
            </p>
          </div>
          <div className="relative w-fit mt-2">
            {apiError && (
              <div className="flex items-center justify-center mt-2 p-2 bg-[#1a1a1f] text-[#f9264d] rounded-b-lg gap-[5px] text-[12px]">
                <MdErrorOutline className="text-2xl" />
                <p>{apiError}</p>
              </div>
            )}
            <div className="flex justify-around items-center gap-[50px] p-3">
              <button
                className="bg-[#0d131f] text-[#87cfd5] w-14 h-14 border-none rounded-full flex items-center justify-center cursor-pointer transition transform duration-200 ease"
                onClick={handleclick}
              >
                <HiSpeakerWave className="text-2xl" />
              </button>
              <button
                className=" w-14 h-14 border-none rounded-full flex items-center justify-center cursor-pointer transition transform duration-200 ease"
                onClick={() => {
                  navigate("/thankyou", {
                    state: {
                      time: document.querySelector("#timer").textContent,
                    },
                  });
                }}
              >
                <MdCallEnd className="bg-[#e31e13] mt-5 text-white text-6xl rounded-full p-2" />
              </button>
              <button
                className="  w-14 h-14 border-none rounded-full flex items-center justify-center cursor-pointer transition transform duration-200 ease"
                onClick={() => {
                  if (!isListening && !isGreeting) startListening();
                }}
              >
                {isListening ? (
                  <span className=" w-14 h-14 border-none rounded-full flex items-center justify-center cursor-pointer transition transform duration-200 ease">
                    <RiSpeakFill className="bg-[#0d131f] text-white text-2xl" />
                  </span>
                ) : (
                  <FaMicrophone className="bg-[#0d131f] text-white text-2xl" />
                )}
              </button>
            </div>
            {isspeakerOn && <Speakererror />}
          </div>
        </div>
      </div>
    </>
  );
};
const Speakererror = () => {
  return (
    <>
      <div className="absolute -bottom-15 left-[3%] bg-[#1a1a1f] p-4 rounded-2xl text-[#c5c7c9]  font-roboto flex items-center gap-2 z-10 text-[13px] w-fit">
        <MdErrorOutline />
        <p className="font-bold text-[#a6a8a9;]">
          Speaker mode is always on by default!
        </p>
      </div>
    </>
  );
};

export default CallingInterface;
