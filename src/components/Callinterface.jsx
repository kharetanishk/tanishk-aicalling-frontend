import Lottie from "lottie-react";
import talkinginterface from "../assets/talkanimee.json";
import "../css/Callinterface.css";
import { HiSpeakerWave } from "react-icons/hi2";
import { MdCallEnd } from "react-icons/md";
import { FaMicrophone } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { MdErrorOutline } from "react-icons/md";

const CallingInterface = () => {
  const [isspeakerOn, setSpeaker] = useState(false);
  useEffect(() => {
    if (isspeakerOn) {
      const timer = setTimeout(() => {
        setSpeaker(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  });
  const handleclick = () => {
    setSpeaker((prev) => !prev);
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
