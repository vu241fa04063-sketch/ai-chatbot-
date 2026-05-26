import { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [chatHistory, setChatHistory] = useState([])
  const [showSidebar, setShowSidebar] = useState(true);
  const messagesEndRef = useRef(null);

  // Use relative API URL for better deployment compatibility
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMsg = message.trim();
    setMessage("");
    setLoading(true);
    setError("");

    // Add user message to history immediately
    setChatHistory((prev) => [
      ...prev,
      { role: "user", content: userMsg, timestamp: new Date() },
    ]);

    try {
      const response = await fetch(`${API_URL}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMsg,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to get response");
      }

      const data = await response.json();
      setChatHistory((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.response,
          timestamp: new Date(),
        },
      ]);
    } catch (err) {
      console.error("API Error:", err);
      setError(err.message || "Connection error. Make sure backend is running.");
      // Remove the user message if there was an error
      setChatHistory((prev) => prev.slice(0, -1));
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

  const newChat = () => {
    clearHistory();
  };

  return (
    <div className="app-container">
      {/* Sidebar */}
      <aside className={`sidebar ${showSidebar ? "open" : "closed"}`}>
        <div className="sidebar-header">
          <button
            className="menu-toggle"
            onClick={() => setShowSidebar(!showSidebar)}
            title="Toggle Sidebar"
          >
            ☰
          </button>
          <h2>ChatGPT-Like</h2>
        </div>
        <button className="new-chat-btn" onClick={newChat}>
          <span>+ </span>New Chat
        </button>
        <div className="chat-list">
          {chatHistory.length > 0 && (
            <div className="chat-item-preview">
              <p>{chatHistory[0].content.substring(0, 50)}...</p>
              <small>{new Date(chatHistory[0].timestamp).toLocaleTimeString()}</small>
            </div>
          )}
        </div>
      </aside>

      {/* Main Chat Area */}
      <div className="main-content">
        <div className="chat-header">
          <h1>AI Chat Assistant</h1>
          <button className="menu-toggle mobile-toggle" onClick={() => setShowSidebar(!showSidebar)}>
            ☰
          </button>
        </div>

        <div className="chat-container">
          {chatHistory.length === 0 ? (
            <div className="welcome-section">
              <h2>Welcome to AI Chat</h2>
              <p>Start a conversation with the AI assistant</p>
              <div className="example-prompts">
                <button className="example-btn" onClick={() => setMessage("What is machine learning?")}>
                  What is machine learning?
                </button>
                <button className="example-btn" onClick={() => setMessage("Tell me a joke")}>
                  Tell me a joke
                </button>
                <button className="example-btn" onClick={() => setMessage("Explain React")}>
                  Explain React
                </button>
              </div>
            </div>
          ) : (
            <div className="messages">
              {chatHistory.map((msg, index) => (
                <div key={index} className={`message-group ${msg.role}`}>
                  <div className={`message ${msg.role}`}>
                    <div className="message-avatar">{msg.role === "user" ? "👤" : "🤖"}</div>
                    <div className="message-content">
                      <p>{msg.content}</p>
                    </div>
                  </div>
                </div>
              ))}
              {loading && (
                <div className="message-group assistant">
                  <div className="message assistant">
                    <div className="message-avatar">🤖</div>
                    <div className="message-content">
                      <div className="typing-indicator">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="input-area">
          <input
            type="text"
            placeholder="Type your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={loading}
            className="message-input"
          />
          <button
            onClick={sendMessage}
            disabled={loading || !message.trim()}
            className="send-btn"
          >
            {loading ? "⏳" : "➤"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;