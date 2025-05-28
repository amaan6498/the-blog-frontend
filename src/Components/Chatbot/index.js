import React, { useState } from "react";
import { FaComments } from "react-icons/fa";

import "./index.css";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "Hello! I can transform your raw text into a polished, well-crafted version that reads more smoothly and effectively.",
    },
    {
      from: "bot",
      text: "How can I help you Today?",
    },
  ]);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false); // To track if the bot is responding

  // Toggle the chat window open/close
  const toggleChat = () => setIsOpen(!isOpen);

  // Handle message send
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (userInput.trim() === "") return;

    // Add user message to chat
    setMessages([...messages, { from: "user", text: userInput }]);
    setUserInput("");
    setIsLoading(true); // Start loading

    try {
      // Send user input to the backend API (your provided endpoint)
      const response = await fetch(
        "https://blog-api-qyqz.onrender.com/chatwithgemini",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: userInput }), // Sending `text` instead of `message`
        }
      );

      // Check if response is successful
      if (!response.ok) {
        throw new Error("Failed to fetch the response from the server");
      }

      const data = await response.json();

      // Assuming response.data.enhancedText contains the enhanced text
      setMessages((prevMessages) => [
        ...prevMessages,
        { from: "bot", text: data.enhancedText },
      ]);
    } catch (error) {
      console.error("Error sending message to API:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { from: "bot", text: "Sorry, there was an error. Please try again." },
      ]);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div>
      {/* Chat Button */}
      <div className="chat-button" onClick={toggleChat}>
        <FaComments size={30} />
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <h3>AI ChatBot</h3>
            <button className="close-btn" onClick={toggleChat}>
              X
            </button>
          </div>
          <div className="chat-body">
            {messages.map((msg, index) => (
              <div key={index} className={msg.from}>
                <p>{msg.text}</p>
              </div>
            ))}
            {isLoading && <p className="loading">Bot is typing...</p>}
          </div>
          <form onSubmit={handleSendMessage} className="chat-input-form">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Type a message..."
            />
            <button type="submit" disabled={isLoading}>
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
