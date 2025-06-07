import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { elapsedTimeAtom } from "../states/atoms";

const Timer = () => {
  const setElapsedTime = useSetRecoilState(elapsedTimeAtom);

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return null;
};

export default Timer;
