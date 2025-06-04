import { useEffect, useState } from "react";
import centrepic from "../assets/callpic.jpg";
import "../css/Call.css";
import { IoCallSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

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
    const timer = setTimeout(() => {
      navigate("/callinginterface");
    }, 4000);

    return () => clearTimeout(timer);
  }, [navigate]);
  return (
    <>
      <h1>Calling Tanishk's Ai.......</h1>
    </>
  );
};
export const CallingInterface = () => {
  return (
    <>
      <h1>This component will contain the calling interface</h1>
    </>
  );
};
export default CallingApp;
