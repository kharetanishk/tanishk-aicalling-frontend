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
  return (
    <>
      <h1
        style={{
          color: "white",
        }}
      >
        hello world
      </h1>
    </>
  );
};
export default CallingApp;
