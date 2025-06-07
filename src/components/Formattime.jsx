import { useRecoilValue } from "recoil";
import { elapsedTimeAtom } from "../states/atoms";

const FormattedTimer = () => {
  const elapsedTime = useRecoilValue(elapsedTimeAtom);

  const formatTime = (seconds) => {
    const hrs = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${hrs}:${mins}:${secs}`;
  };

  return <span>{formatTime(elapsedTime)}</span>;
};

export default FormattedTimer;
