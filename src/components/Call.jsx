import { useEffect } from "react";
import centrepic from "../assets/callpic.jpg";
import "../css/Call.css";
import { IoCallSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import callertune from "../assets/callertune.mp3";

const CallingApp = () => {
  return (
    <>
      <CallerTab />
    </>
  );
};

export const CallerTab = () => {
  const navigate = useNavigate();
  const handleclick = () => {
    navigate("/calling");
  };
  return (
    <>
      <div className="caller-tab-container">
        <img src={centrepic} alt="callpic" className="caller-image" />
        <button className="call-button" onClick={handleclick}>
          <IoCallSharp /> Start Call
        </button>
      </div>
    </>
  );
};
export const Loader = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const audio = new Audio(callertune);
    audio.loop = true;
    const timer = setInterval(() => {
      audio.play();
    }, 600);

    return () => {
      clearInterval(timer);
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/callinginterface");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);
  return (
    <>
      <div className="loader-container">
        <div className="spinner" />
        <p>Connecting to Tanishk’s AI...</p>
      </div>
    </>
  );
};

export default CallingApp;
