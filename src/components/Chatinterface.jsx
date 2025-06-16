import { useState, useEffect } from "react";
import axios from "axios";
import "../css/chat.css";

const Chatinterface = () => {
  const [userMessage, setUserMessage] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
      const res = await axios.post("http://localhost:1601/chat", {
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
    <div className="border-[0.1px] h-screen overflow-y-auto border-solid  border-[#b6b3b3] ">
      <div className="flex flex-col  font-roboto bg-[#0d131f] rounded-3 p-4 mt-2 gap-3">
        <h2 className="flex justify-center text-3xl ">Talk to Tanishk’s AI</h2>
        <input
          className="text-2xl  border border-solid rounded-2 outline-none p-3 transition-colors duration-200 h-14 pl-3 m-2.5"
          type="text"
          placeholder="Ask something..."
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
        />
        {error && (
          <p className="text-red-500 mt-2 text-xl transition-opacity duration-300  w-fit ml-auto mr-auto">
            {error}
          </p>
        )}
        <button
          className="bg-[#3b3b3c] text-white  rounded-1.2 cursor-pointer text-xl border-none block w-fit p-2 ml-2.5 transition-colors duration-200 hover:bg-[#3a7bd5]  "
          onClick={handleSend}
        >
          Send
        </button>

        <div className="mt-4 text-xl text-[#fdfdfd] whitespace-pre-wrap active:bg-[background-color: #4a76ce]">
          <strong>AI:</strong>{" "}
          {loading ? <span>🤖 Thinking...</span> : response}
        </div>
      </div>
    </div>
  );
};

export default Chatinterface;
