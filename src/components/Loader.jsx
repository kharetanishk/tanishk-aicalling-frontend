import callertune from "../assets/callertune.mp3";
import { useNavigate } from "react-router-dom";
import "../css/Call.css";

export const Loader = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const audio = new Audio(callertune);
    audio.loop = true;
    const timer = setInterval(() => {
      audio.play();
    }, 500);

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
