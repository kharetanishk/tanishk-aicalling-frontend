import "../css/index.css";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Lottie from "lottie-react";
import talkinginterface from "../assets/talkanimee.json";
import { HiSpeakerWave } from "react-icons/hi2";
import { MdCallEnd, MdErrorOutline } from "react-icons/md";
import { FaMicrophone } from "react-icons/fa6";
import { RiSpeakFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import Timer from "../components/Timer.jsx";
import FormatTime from "../components/Formattime.jsx";
import { useResetRecoilState } from "recoil";
import { elapsedTimeAtom } from "../states/atoms";

const MemoizedLottie = React.memo(({ animationData }) => (
  <Lottie
    className="w-3xs h-64 rounded-full border-none p-2"
    animationData={animationData}
  />
));

const CallingInterface = () => {
  const [isGreeting, setIsGreeting] = useState(true);
  const [isspeakerOn, setSpeaker] = useState(false);
  const [isListening, setListening] = useState(false);
  const [userTranscript, setTranscript] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [responseFromAI, setResponse] = useState("");
  const [apiError, setApiError] = useState(null);
  const [statusMessage, setStatusMessage] = useState("Initializing...");
  const navigate = useNavigate();
  const recognitionRef = useRef(null);
  const greetedRef = useRef(false);
  const hasRequestedMicRef = useRef(false);
  const resetElapsedTime = useResetRecoilState(elapsedTimeAtom);
  const API_URL = `${import.meta.env.VITE_API_URL}/chat`;
  useEffect(() => {
    speechSynthesis.cancel();

    recognitionRef.current?.abort?.();
    recognitionRef.current = null;
    greetedRef.current = false;

    const greetAndStart = () => {
      const greeting =
        "Hi, I am Tanishk's AI. You can ask me anything about his portfolio. Tap the mic button below when you're ready to speak.";
      const greetSpeech = new SpeechSynthesisUtterance(greeting);
      greetSpeech.lang = "en-US";
      greetSpeech.pitch = 1.2;
      greetSpeech.rate = 0.95;

      setIsGreeting(true);
      setStatusMessage("Speaking...");

      greetSpeech.onend = () => {
        setIsGreeting(false);
        setStatusMessage("🎤 Tap to talk");
      };

      speechSynthesis.speak(greetSpeech);
    };

    greetAndStart();

    return () => {
      speechSynthesis.cancel();
      stopListening();
      resetElapsedTime();
    };
  }, []);

  useEffect(() => {
    if (hasRequestedMicRef.current) return;
    hasRequestedMicRef.current = true;

    navigator.mediaDevices.getUserMedia({ audio: true }).catch((err) => {
      alert("🎙️ Please allow microphone access for the best experience.");
      navigate("/"); // redirect if mic access denied
    });
  }, []);

  useEffect(() => {
    greetedRef.current = false;

    const greetAndStart = () => {
      const greeting =
        "Hi, I am Tanishk's AI. You can ask me anything about his portfolio. Tap the mic button below when you're ready to speak.";
      const greetSpeech = new SpeechSynthesisUtterance(greeting);
      greetSpeech.lang = "en-US";
      greetSpeech.pitch = 1.2;
      greetSpeech.rate = 0.95;

      setIsGreeting(true);
      setStatusMessage("Speaking...");

      greetSpeech.onend = () => {
        setIsGreeting(false);
        setStatusMessage("🎤 Tap to talk");
      };

      speechSynthesis.cancel();
      speechSynthesis.speak(greetSpeech);
    };

    if (!greetedRef.current) {
      greetedRef.current = true;
      greetAndStart();
    }

    return () => {
      speechSynthesis.cancel();
      stopListening();
      resetElapsedTime();
    };
  }, []);

  const startListening = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert(
        "Your browser does not support speech recognition. Please use Chrome."
      );
      return;
    }

    navigator.permissions?.query({ name: "microphone" }).then((res) => {
      if (res.state === "denied") {
        alert("Microphone permission denied.");
        navigate("/");
        return;
      }
    });

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    let micTimeout;

    recognition.onstart = () => {
      setListening(true);
      setStatusMessage("🎧 Listening...");
      micTimeout = setTimeout(() => {
        recognition.stop();
        setListening(false);
        setStatusMessage("Mic timed out. Tap to talk again.");
      }, 7000);
    };

    recognition.onresult = async (event) => {
      clearTimeout(micTimeout);
      const userText = event.results[0][0].transcript;
      setTranscript(userText);
      recognition.stop();
      setListening(false);
      setLoading(true);
      setStatusMessage("Connecting to the backend...");

      try {
        const res = await axios.post(API_URL, { userMessage: userText });
        const data = res.data;
        setResponse(data.response);
        setApiError(null);
        speak(data.response);
      } catch (err) {
        setApiError(
          "Unable to connect to the backend. Please try again later."
        );
        setResponse("Something went wrong while fetching the response.");
        setStatusMessage("⚠️ Failed to fetch response");
      }

      setLoading(false);
    };

    recognition.onerror = (event) => {
      clearTimeout(micTimeout);
      setListening(false);
      if (event.error === "not-allowed") {
        alert("Microphone access was denied.");
        navigate("/");
      } else if (event.error === "no-speech") {
        setStatusMessage("I didn’t hear anything. Try again.");
      } else {
        setStatusMessage("Mic error. Try again.");
      }
    };

    recognition.onend = () => {
      clearTimeout(micTimeout);
      setListening(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  const stopListening = () => {
    recognitionRef.current?.stop?.();
    setListening(false);
  };

  const speak = (text) => {
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "en-US";

    setStatusMessage("🔊 Speaking...");
    setListening(true); // mic off during AI speech

    utter.onend = () => {
      setListening(false);
      setStatusMessage("🎤 Tap to talk");
    };

    speechSynthesis.cancel(); // prevent double speaking
    speechSynthesis.speak(utter);
  };

  const handleclick = () => {
    setSpeaker((prev) => !prev);
  };

  useEffect(() => {
    if (apiError !== null) {
      const timer = setTimeout(() => setApiError(""), 4000);
      return () => clearTimeout(timer);
    }
  }, [apiError]);

  useEffect(() => {
    if (isspeakerOn) {
      const timer = setTimeout(() => setSpeaker(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isspeakerOn]);

  return (
    <div className="border-app flex justify-between items-center flex-col relative h-screen overflow-hidden">
      <div className="flex flex-col items-center justify-center h-[90vh] p-[30px] background-app relative overflow-hidden">
        {isLoading ? (
          <div className="flex justify-center items-center w-2xs h-64 text-3xl text-[#c6cac9] font-bold p-[7px]">
            <p>🤖 Thinking...</p>
            <span className="spinner"></span>
          </div>
        ) : (
          <MemoizedLottie animationData={talkinginterface} />
        )}

        <Timer />
        <div className="flex items-center p-1.5 text-[20px] mb-8">
          <p className="font-medium p-1" id="timer">
            <FormatTime />
          </p>
        </div>

        <div className="text-center text-sm text-[#9ca3af] font-medium mb-4">
          {statusMessage}
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
              className="bg-[#0d131f] text-[#87cfd5] w-14 h-14 rounded-full flex items-center justify-center"
              onClick={handleclick}
            >
              <HiSpeakerWave className="text-2xl" />
            </button>

            <button
              className="w-14 h-14"
              onClick={() =>
                navigate("/thankyou", {
                  state: { time: document.querySelector("#timer").textContent },
                })
              }
            >
              <MdCallEnd className="bg-[#e31e13] mt-5 text-white text-6xl rounded-full p-2" />
            </button>

            <button
              disabled={isListening || isGreeting}
              onClick={() => {
                if (!isListening && !isGreeting) startListening();
              }}
              className={`w-14 h-14 rounded-full flex items-center justify-center ${
                isListening || isGreeting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isListening ? (
                <RiSpeakFill className="bg-[#0d131f] text-white text-2xl" />
              ) : (
                <FaMicrophone className="bg-[#0d131f] text-white text-2xl" />
              )}
            </button>
          </div>

          {isspeakerOn && <SpeakerError />}
        </div>
      </div>
    </div>
  );
};

const SpeakerError = () => (
  <div className="absolute -bottom-15 left-[3%] bg-[#1a1a1f] p-4 rounded-2xl text-[#c5c7c9] font-roboto flex items-center gap-2 z-10 text-[13px] w-fit">
    <MdErrorOutline />
    <p className="font-bold text-[#a6a8a9]">
      Speaker mode is always on by default!
    </p>
  </div>
);

export default CallingInterface;
