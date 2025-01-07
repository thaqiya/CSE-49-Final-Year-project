import { useState } from "react";
import "./ChatBot.css";
// import "./ChatBotBg.css";
import Navbar from "../../components/navbar/Navbar";
import chatbot from "../../assets/images/chatbot-2.png";

const API_KEY =
  "sk-MsCfKx2W8TJUPpiIKPfacVHc6iecD4Og0mL9ckDO5zT3BlbkFJRC9A3ZzM1tGi7IJD2AB4OoXTMWJJFo892kEpxMQrMA";

const systemMessage = {
  role: "system",
  content:
    "You are a helpful disaster relief assistant in India for an NGO called Goonj. Explain things like you're talking to a child.",
};

function Chatbot() {
  const [messages, setMessages] = useState([
    {
      message: "Hello, I'm GoonjBot! Ask me anything!",
      sender: "GoonjBot",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [inputMessage, setInputMessage] = useState("");

  const handleSend = async () => {
    if (!inputMessage.trim()) return;

    const newMessage = {
      message: inputMessage,
      sender: "user",
    };

    const newMessages = [...messages, newMessage];

    setMessages(newMessages);
    setInputMessage("");
    setIsTyping(true);

    await processMessageToChatGPT(newMessages);
  };

  async function processMessageToChatGPT(chatMessages) {
    let apiMessages = chatMessages.map((msg) => {
      let role = msg.sender === "GoonjBot" ? "assistant" : "user";
      return { role, content: msg.message };
    });

    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [systemMessage, ...apiMessages],
    };

    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRequestBody),
    })
      .then((res) => res.json())
      .then((data) => {
        setMessages([
          ...chatMessages,
          {
            message: data.choices[0].message.content,
            sender: "GoonjBot",
          },
        ]);
        setIsTyping(false);
      });
  }

  return (
    <div className="chatbot-page">
      {/* <div className="light x1"></div>
      <div className="light x2"></div>
      <div className="light x3"></div>
      <div className="light x4"></div>
      <div className="light x5"></div>
      <div className="light x6"></div>
      <div className="light x7"></div>
      <div className="light x8"></div>
      <div className="light x9"></div> */}
      <div className="chatbot-header">
        <div className="chatbot-container">
          <div className="chatbot-navbar">
            <Navbar />
          </div>

          <div className="chat-display">
            <div className="chat-container">
              <div className="message-list">
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`message ${
                      msg.sender === "GoonjBot" ? "bot" : "user"
                    }`}
                  >
                    {msg.message}
                  </div>
                ))}
                {isTyping && (
                  <div className="typing-indicator">GoonjBot is typing...</div>
                )}
              </div>
              <div className="messageBox">
                <div className="fileUploadWrapper">
                  <input type="file" id="file" name="file" />
                </div>
                <input
                  className="input-container"
                  required
                  placeholder="Message..."
                  type="text"
                  id="messageInput"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                />
                <button id="chatbot-sendButton" onClick={handleSend}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 664 663"
                  >
                    <path
                      fill="none"
                      d="M646.293 331.888L17.7538 17.6187L155.245 331.888M646.293 331.888L17.753 646.157L155.245 331.888M646.293 331.888L318.735 330.228L155.245 331.888"
                    ></path>
                    <path
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="33.67"
                      stroke="#6c6c6c"
                      d="M646.293 331.888L17.7538 17.6187L155.245 331.888M646.293 331.888L17.753 646.157L155.245 331.888M646.293 331.888L318.735 330.228L155.245 331.888"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* </div> */}
        </div>
      </div>
    </div>
  );
}

export default Chatbot;
