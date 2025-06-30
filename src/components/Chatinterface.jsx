import axios from "axios";
import { useState } from "react";

const Chatinterface = () => {
  const [userMessage, setUserMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [airesponse, setairesponse] = useState("");
  const API_URL = `${import.meta.env.VITE_API_URL}/chat`;

  const handleSend = async () => {
    if (!userMessage) {
      console.log("input field cannot be empty");
    }

    try {
      const res = await axios.post(API_URL, {
        userMessage: userMessage,
      });
      console.log(res.data.response);
      setairesponse(res.data.response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div>
        <div>
          <p>{airesponse}</p>
        </div>
        <div className="flex gap-5  w-full p-3 absolute bottom-5  right-0 justify-center items-center">
          <div className="w-full h-11 flex justify-center items-center">
            <input
              className="w-full h-full pl-3 border-app text-base placeholder:text-amber-50 rounded-2xl ml-2"
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              type="text"
              placeholder="Ask about Tanishk's portfolio"
            />
          </div>
          <div>
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
