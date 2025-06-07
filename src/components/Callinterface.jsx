import Lottie from "lottie-react";
import talkinginterface from "../assets/talkanimee.json";
import "../css/Callinterface.css";
import { HiSpeakerWave } from "react-icons/hi2";
import { MdCallEnd } from "react-icons/md";
import { FaMicrophone } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
import { MdErrorOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { IoChatbubblesSharp } from "react-icons/io5";

const CallingInterface = () => {
  const [isspeakerOn, setSpeaker] = useState(false);
  const [isListening, setListening] = useState(false);
  const [userTranscript, setTranscript] = useState("");
  const [responseFromAI, setResponse] = useState("");
  const micRecognitionRef = useRef(null);
  const greetedRef = useRef(false);
  const navigate = useNavigate();

  // Greet on mount and reset on re-entry
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
        // startListening();
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
      // stopListening();
    };
  }, []);

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
        <Lottie className="call-bot" animationData={talkinginterface} />
        <div className="timer-container">
          <p className="timer"> 00:00:00</p>
        </div>
        <div className="control-buttons">
          <button className="call-speaker" onClick={handleclick}>
            <HiSpeakerWave />
          </button>
          <button className="endcall-button">
            <MdCallEnd />
          </button>
          <button className="mic-button">
            <FaMicrophone />
          </button>
        </div>
        {isspeakerOn && <Speakererror />}
        <div className="chat-container" onClick={navigatetochat}>
          <p>Chat with the Ai</p>
          <button className="chat-button">
            <IoChatbubblesSharp />
          </button>
        </div>
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
