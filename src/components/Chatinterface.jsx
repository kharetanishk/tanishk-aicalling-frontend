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
    <div className="chat-wrapper">
      <div className="chat-container">
        <h2>Talk to Tanishk’s AI</h2>
        <input
          className="input-box"
          type="text"
          placeholder="Ask something..."
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
        />
        {error && <p className="error-text">{error}</p>}
        <button className="chat-button" onClick={handleSend}>
          Send
        </button>

        <div className="response-box">
          <strong>AI:</strong>{" "}
          {loading ? <span>🤖 Thinking...</span> : response}
        </div>
      </div>
    </div>
  );
};

export default Chatinterface;
