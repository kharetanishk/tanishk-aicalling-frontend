import Lottie from "lottie-react";
import React from "react";
import talkinginterface from "../assets/talkanimee.json";
import "../css/Callinterface.css";
import { HiSpeakerWave } from "react-icons/hi2";
import { MdCallEnd } from "react-icons/md";
import { FaMicrophone } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
import { MdErrorOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import { RiSpeakFill } from "react-icons/ri";
import axios from "axios";
import Timer from "../components/Timer.jsx";
import FormatTime from "../components/Formattime.jsx";

const CallingInterface = () => {
  const [isspeakerOn, setSpeaker] = useState(false);
  const [isListening, setListening] = useState(false);
  const [userTranscript, setTranscript] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [responseFromAI, setResponse] = useState("");
  const recognitionRef = useRef(null);
  const greetedRef = useRef(false);
  const navigate = useNavigate();
  const MemoizedLottie = React.memo(({ animationData }) => (
    <Lottie className="call-bot" animationData={animationData} />
  ));

  const formatTime = (seconds) => {
    const hrs = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${hrs}:${mins}:${secs}`;
  };
  useEffect(() => {
    greetedRef.current = false;

    const greetAndStart = () => {
      const greeting =
        "Hi, I am Tanishk's AI. Ask me anything about his portfolio.";
      const greetSpeech = new SpeechSynthesisUtterance(greeting);
      greetSpeech.lang = "en-US";
      greetSpeech.pitch = 1.2;
      greetSpeech.rate = 0.95;

      greetSpeech.onend = () => {
        console.log("Greeting done, starting mic...");
        setResponse("🎤 Tap the mic to ask your question.");
      };

      speechSynthesis.speak(greetSpeech);
    };

    if (!greetedRef.current) {
      greetedRef.current = true;
      greetAndStart();
    }

    return () => {
      console.log("Leaving /callinginterface — stopping speech");
      speechSynthesis.cancel();
      stopListening();
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
      console.log("🎙️ Mic listening...");
      micTimeout = setTimeout(() => {
        recognition.stop();
        setListening(false);
        setResponse("⏱️ Mic timed out. Tap again to talk.");
      }, 7000);
    };

    recognition.onresult = async (event) => {
      clearTimeout(micTimeout);
      const userText = event.results[0][0].transcript;
      console.log("🗣️ You said:", userText);
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
        speak(data.response);
      } catch (err) {
        console.error("❌ API Error:", err);
        setResponse("Something went wrong while fetching the response.");
      }
      setLoading(false);
    };

    recognition.onerror = (event) => {
      clearTimeout(micTimeout);
      console.error("🎙️ Mic Error:", event.error);
      setListening(false);

      if (event.error === "not-allowed") {
        setResponse("🎙️ Please allow microphone access.");
      } else if (event.error === "no-speech") {
        setResponse("I didn’t hear anything. Try again.");
      } else {
        setResponse("Something went wrong with the mic.");
      }
    };

    recognition.onend = () => {
      clearTimeout(micTimeout);
      setListening(false);
      console.log("🎤 Mic stopped.");
    };

    recognitionRef.current = recognition;
    recognition.start();
  };
  const stopListening = () => {
    recognitionRef.current?.stop?.();
    setListening(false);
  };

  // 🗣️ Speak Function
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
  const navigatetochat = () => {
    navigate("/chat");
  };

  return (
    <>
      <div className="call-container">
        {/* {console.log("app is rendering")} */}
        {isLoading ? (
          <div className="ai-loader">
            <p>🤖 Thinking...</p>
            <div className="spinner"></div>
          </div>
        ) : (
          <MemoizedLottie animationData={talkinginterface} />
        )}
        <Timer />
        <div className="timer-container">
          <p className="timer">
            <FormatTime />
          </p>
        </div>
        <div className="control-buttons">
          <button className="call-speaker" onClick={handleclick}>
            <HiSpeakerWave />
          </button>
          <button
            className="endcall-button"
            onClick={() => {
              navigate("/thankyou", {
                state: { time: document.querySelector(".timer").textContent },
              });
            }}
          >
            <MdCallEnd />
          </button>
          <button
            className="mic-button"
            onClick={() => {
              if (!isListening) startListening();
            }}
          >
            {isListening ? (
              <span className="mic-listening">
                <RiSpeakFill />
              </span>
            ) : (
              <FaMicrophone />
            )}
          </button>
        </div>
        {isspeakerOn && <Speakererror />}
      </div>
    </>
  );
};
const Speakererror = () => {
  return (
    <>
      <div className="Speaker-error-message-container">
        <MdErrorOutline />
        <p className="error-message">Speaker mode is always on by default!</p>
      </div>
    </>
  );
};

export default CallingInterface;
