import { useState } from "react";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  // API URL - using network IP for better compatibility
  const API_URL = "http://10.46.95.174:8000";

  const sendMessage = async () => {
    if (!message.trim()) return;

    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_URL}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: message.trim(),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to get response");
      }

      const data = await response.json();
      setChatHistory([
        ...chatHistory,
        { user: message, ai: data.response },
      ]);
      setMessage("");
    } catch (err) {
      console.error("API Error:", err);
      setError(err.message || "Connection error");
    } finally {
      setLoading(false);
    }
  };

  const clearHistory = () => {
    setChatHistory([]);
    setError("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !loading && message.trim()) {
      sendMessage();
    }
  };

  return (
    <div className="container">
      <h1>🤖 AI Chatbot</h1>

      <div className="chat-history">
        {chatHistory.length === 0 ? (
          <p className="empty-state">Start a conversation...</p>
        ) : (
          chatHistory.map((chat, index) => (
            <div key={index} className="chat-item">
              <div className="user-message">You: {chat.user}</div>
              <div className="ai-message">AI: {chat.ai}</div>
            </div>
          ))
        )}
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="input-area">
        <input
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={loading}
        />
        <button onClick={sendMessage} disabled={loading || !message.trim()}>
          {loading ? "Sending..." : "Send"}
        </button>
        {chatHistory.length > 0 && (
          <button onClick={clearHistory} className="clear-btn">
            Clear
          </button>
        )}
      </div>
    </div>
  );
}

export default App;