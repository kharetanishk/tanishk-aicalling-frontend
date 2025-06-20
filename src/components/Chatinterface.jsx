import { useState, useEffect } from "react";
import axios from "axios";

const Chatinterface = () => {
  const [userMessage, setUserMessage] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const API_URL = `${import.meta.env.VITE_API_URL}/chat`;

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError("");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleSend = async () => {
    if (!userMessage.trim()) {
      setError("Input box cannot be blank");
      return;
    }

    setError(""); // clear any old errors
    setLoading(true);
    setResponse("");

    try {
      const res = await axios.post(API_URL, {
        userMessage,
      });
      setResponse(res.data.response);
    } catch (error) {
      console.error("Error:", error.message);
      setResponse("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border-[0.1px] h-full overflow-y-hidden border-solid border-[#b6b3b3] relative ">
      <div className="mt-4 text-xl text-[#fdfdfd] whitespace-pre-wrap bg-[#4a76ce]">
        <strong>AI:</strong> {loading ? <span>🤖 Thinking...</span> : response}
      </div>
      <div className="flex flex-col  font-roboto bg-[#0d131f] rounded-3 p-4 mt-2 gap-3">
        <div className="flex flex-col absolute bottom-10">
          <h2 className="flex justify-center text-3xl relative bottom-30 ">
            Talk to Tanishk’s AI
          </h2>
          <div className="flex  p-3 relative rounded-b-xl left-72 bottom-20 mt-10 justify-center items-center ">
            <input
              className="text-base border border-solid  w-full rounded-xl outline-none p-3 transition-colors duration-200 h-14 pl-3 m-2.5"
              type="text"
              placeholder="Ask something..."
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
            />
            <button
              className="bg-[#3b3b3c] text-white  rounded-xl cursor-pointer justify-center items-center text-base border-none w-fit h-fit p-1  transition-colors duration-200 hover:bg-[#3a7bd5]  "
              onClick={handleSend}
            >
              Send
            </button>
          </div>
        </div>

        {error && (
          <p className="text-red-500 mt-2 text-xl transition-opacity duration-300  w-fit ml-auto mr-auto">
            {error}
          </p>
        )}
      </div>
    </div>
  );
};

export default Chatinterface;
