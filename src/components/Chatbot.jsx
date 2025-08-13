import React, { useState } from "react";
import { MessageCircle, Send, X, Minimize2 } from "lucide-react";


const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: "1",
      text: "Hello! I'm here to help with your construction needs. What would you like to know?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const botResponses = {
    default:
      "Thanks for your message! We offer construction, renovation, repairs, and project management. Would you like details or a free quote?",
    services:
      "We provide residential and commercial construction, renovations, interior design, project management, and maintenance services.",
    quote:
      "We'd be happy to provide a free quote! Please tell us your project type, location, and timeline so we can prepare an estimate.",
    contact:
      "You can call us at (555) 123-4567 or email info@buildwell.com. We're available Mon–Fri, 8AM–6PM.",
    residential:
      "Residential services include new home builds, extensions, remodeling, and repairs. All come with our quality guarantee.",
    commercial:
      "Our commercial services include office construction, retail fit-outs, warehouses, and industrial projects.",
    materials:
      "We use high-quality, eco-friendly materials whenever possible. Our sourcing ensures durability and sustainability.",
    warranty:
      "We provide a 5-year structural warranty on new builds and a 1-year warranty on renovations.",
    timeline:
      "Project timelines vary, but most residential builds take 3–6 months, while renovations range from 2–8 weeks.",
    payment:
      "We accept bank transfers, checks, and major credit cards. Payment plans are available for large projects.",
    permits:
      "Yes, we handle all required permits and inspections for your project.",
    location:
      "We serve Nairobi and surrounding areas. For projects outside this range, please contact us for confirmation.",
  };

  const generateBotResponse = (userMessage) => {
    const message = userMessage.toLowerCase();

    if (message.includes("service") || message.includes("what do you do") || message.includes("offer"))
      return botResponses.services;
    if (message.includes("quote") || message.includes("price") || message.includes("cost") || message.includes("estimate"))
      return botResponses.quote;
    if (message.includes("contact") || message.includes("phone") || message.includes("email") || message.includes("reach"))
      return botResponses.contact;
    if (message.includes("residential") || message.includes("home") || message.includes("house"))
      return botResponses.residential;
    if (message.includes("commercial") || message.includes("business") || message.includes("office"))
      return botResponses.commercial;
    if (message.includes("material") || message.includes("quality") || message.includes("eco"))
      return botResponses.materials;
    if (message.includes("warranty") || message.includes("guarantee"))
      return botResponses.warranty;
    if (message.includes("time") || message.includes("how long") || message.includes("duration"))
      return botResponses.timeline;
    if (message.includes("payment") || message.includes("pay") || message.includes("installment"))
      return botResponses.payment;
    if (message.includes("permit") || message.includes("license") || message.includes("approval"))
      return botResponses.permits;
    if (message.includes("location") || message.includes("where") || message.includes("area"))
      return botResponses.location;

    return botResponses.default;
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");

    setTimeout(() => {
      const botMessage = {
        id: (Date.now() + 1).toString(),
        text: generateBotResponse(inputMessage),
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 800);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <>
      {!isOpen ? (
        <button className="chatbot-toggle" onClick={() => setIsOpen(true)}>
          <MessageCircle size={24} />
        </button>
      ) : (
        <div className={`chatbot-container ${isMinimized ? "minimized" : ""}`}>
          <div className="chatbot-header">
            <span>BuildWell Assistant</span>
            <div>
              <button
                className="icon-btn"
                onClick={() => setIsMinimized(!isMinimized)}
              >
                <Minimize2 size={16} />
              </button>
              <button className="icon-btn" onClick={() => setIsOpen(false)}>
                <X size={16} />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              <div className="chatbot-messages">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`message ${msg.sender === "user" ? "user" : "bot"}`}
                  >
                    {msg.text}
                  </div>
                ))}
              </div>

              <div className="chatbot-input-area">
                <input
                  type="text"
                  placeholder="Type your message..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <button onClick={handleSendMessage}>
                  <Send size={16} />
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Chatbot;

