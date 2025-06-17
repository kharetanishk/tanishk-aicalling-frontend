import centrepic from "../assets/callpic.jpg";

import "../css/index.css";
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
      <div className="flex flex-col justify-center items-center h-screen p-2 background-app border-app overflow-hidden">
        <img
          src={centrepic}
          alt="callpic"
          className="border-none width-full max-w-[300px] overflow-hidden "
        />
        <button
          className="call-button font-roboto hover:call-button active:call-button"
          onClick={handleclick}
        >
          <IoCallSharp /> Start Call
        </button>
      </div>
    </>
  );
};

export default CallingApp;
