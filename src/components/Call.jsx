import { useEffect, useRef } from "react";
import centrepic from "../assets/callpic.jpg";
import "../css/index.css";
import { IoCallSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { micPermissionAtom } from "../states/atoms";

const CallingApp = () => {
  return <CallerTab />;
};

export const CallerTab = () => {
  const hasRequestedMicRef = useRef(false);
  const setMicStatus = useSetRecoilState(micPermissionAtom);
  const micStatus = useRecoilValue(micPermissionAtom); //so default micStatus is false
  const navigate = useNavigate();

  useEffect(() => {
    if (hasRequestedMicRef.current) return;
    hasRequestedMicRef.current = true;

    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(() => {
        setMicStatus(true);
        localStorage.setItem("mic-access", "true");
      })
      .catch((err) => {
        setMicStatus(false);
        localStorage.setItem("mic-access", "false");
        if (
          err.name === "NotAllowedError" ||
          err.name === "PermissionDeniedError"
        ) {
          alert("🎙️ Please allow microphone access for the best experience.");
        }
      });
  }, []);

  const handleclick = () => {
    if (!micStatus) return;
    navigate("/calling");
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen p-2 background-app border-app overflow-hidden">
      <img
        src={centrepic}
        alt="callpic"
        className="border-none width-full max-w-[300px] overflow-hidden mr-6 relative -top-[2.5rem]"
      />

      <button
        className="call-button font-roboto hover:call-button active:call-button relative mr-3 -top-10"
        onClick={handleclick}
        disabled={!micStatus}
      >
        <IoCallSharp /> Start Call
      </button>

      {/* ✅ Permission Message */}
      <p className="text-sm mt-3 font-semibold text-center">
        {micStatus
          ? "✅ Microphone permission granted. You can proceed with the call."
          : "❌ Microphone permission not granted. Please allow access to proceed."}
      </p>
    </div>
  );
};

export default CallingApp;
