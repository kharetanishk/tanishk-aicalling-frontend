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

export default CallingApp;
