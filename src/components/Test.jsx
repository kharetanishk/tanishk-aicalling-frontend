import { useState } from "react";
import axios from "axios";

const TextChat = () => {
  const [userMessage, setUserMessage] = useState("");
  const [response, setResponse] = useState("");

  const handleSend = async () => {
    try {
      const res = await axios.post("http://localhost:1601/chat", {
        userMessage,
      });
      setResponse(res.data.response);
    } catch (error) {
      console.error("Error:", error.message);
      setResponse("Something went wrong.+ in the response");
    }
  };

  return (
    <div style={{ padding: "1rem", maxWidth: 500, margin: "auto" }}>
      <h2>Talk to Tanishk’s AI</h2>
      <input
        type="text"
        placeholder="Ask something..."
        value={userMessage}
        onChange={(e) => setUserMessage(e.target.value)}
        style={{ width: "100%", padding: "0.5rem", marginBottom: "0.5rem" }}
      />
      <button onClick={handleSend} style={{ padding: "0.5rem 1rem" }}>
        Send
      </button>
      <div style={{ marginTop: "1rem", whiteSpace: "pre-wrap" }}>
        <strong>AI:</strong> {response}
      </div>
    </div>
  );
};

export default TextChat;
