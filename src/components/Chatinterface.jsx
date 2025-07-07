import axios from "axios";
import { useEffect, useState } from "react";

const Chatinterface = () => {
  const [messageList, setmessageList] = useState([]); //{usermessage:"somthing",airesponse :"soemethibg"}
  const [userMessage, setUserMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const API_URL = `${import.meta.env.VITE_API_URL}/chat`;

  //removes error after 2 seconds
  useEffect(() => {
    if (error !== null) {
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

    setError("");
    setLoading(true);

    //user ka msg messagelist mein daalo
    setmessageList((prev) => [...prev, { role: "user", content: userMessage }]);
    // console.log(`user : ${messageList}`);

    try {
      const res = await axios.post(API_URL, {
        userMessage: userMessage,
      });
      // console.log(res.data.response);

      setmessageList((prev) => [
        ...prev,
        { role: "system", content: res.data.response },
      ]);
    } catch (error) {
      console.error("Error:", error.message);

      setmessageList((prev) => [
        ...prev,
        {
          role: "system",
          content: "Something went wrong , Please try again later",
        },
      ]);
    } finally {
      setUserMessage("");
      setLoading(false);
    }
  };
  return (
    <>
      <div className=" flex flex-col h-[82vh] overflow-y-auto app-container">
        {messageList.map((msg, index) => (
          <>
            <div
              key={index}
              className={`border-app m-3 max-w-[70%] px-4 py-2 rounded-2xl ${
                msg.role === "user"
                  ? "border-app font-medium text-base self-end ml-4"
                  : "border-app font-semibold chat-ai self-start mr-4"
              }`}
            >
              {msg.content}
            </div>
          </>
        ))}
        {loading && (
          <div className=" mr-4 text-white self-start px-4 py-2 rounded-2xl">
            Thinking...
          </div>
        )}
        <div className="flex justify-center items-center">
          {error && (
            <p className="text-red-500 text-sm px-4 pb-1 fixed bottom-16 ">
              {error}
            </p>
          )}
        </div>
      </div>

      <div className="w-full  fixed mb-1.5 bottom-0  px-4 py-4  flex items-center gap-2">
        <input
          type="text"
          className="flex w-[380px] justify-center items-center border rounded-xl px-3 py-2"
          placeholder="Ask something..."
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
        />
        <button
          className="bg-blue-500 text-black font-bold px-4 py-2 rounded-xl hover:cursor-pointer"
          onClick={handleSend}
        >
          Send
        </button>
      </div>
    </>
  );
};

export default Chatinterface;
