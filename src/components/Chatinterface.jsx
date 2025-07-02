import axios from "axios";
import { useEffect, useState } from "react";

const Chatinterface = () => {
  const [userMessage, setUserMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [airesponse, setAiresponse] = useState("");
  const API_URL = `${import.meta.env.VITE_API_URL}/chat`;

  useEffect(() => {
    if (error !== null) {
      const timer = setTimeout(() => {
        setError("");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleSend = async () => {
    if (!userMessage) {
      setError("Input box cannot be blank");
    }

    setError("");
    setLoading(true);
    setAiresponse("");

    try {
      const res = await axios.post(API_URL, {
        userMessage: userMessage,
      });
      setAiresponse(res.data.response);
    } catch (error) {
      console.error("Error:", error.message);
      setAiresponse("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div>{loading ? "thinking" : <>{airesponse}</>}</div>
      <div className="flex relative justify-center border-app h-svh w-full">
        <div className="flex fixed p-3 items-center mb-2 bottom-0 overflow-y-auto">
          <div className="flex w-full h-11 border-app gap-2 items-center">
            <input
              className="w-[260px] h-full pl-3 border-app text-base placeholder:text-amber-50 rounded-2xl ml-2"
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              type="text"
              placeholder="Ask about Tanishk's portfolio"
            />

            <button
              className="cursor-pointer mr-3 p-2 rounded-xl border-app"
              onClick={handleSend}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chatinterface;
