import { useState, useEffect, useRef } from "react";
import { getChatbotResponse } from "../utils/chatApi";

export default function Home() {
    const [input, setInput] = useState("");
    const [chat, setChat] = useState([]);
    const chatContainerRef = useRef(null);

    // Scroll to the bottom of the chat whenever a new message is added
    useEffect(() => {
        chatContainerRef.current?.scrollTo(0, chatContainerRef.current.scrollHeight);
    }, [chat]);

    const handleSendMessage = async () => {
        if (!input.trim()) return;

        const userMessage = { sender: "You", text: input };
        setChat([...chat, userMessage]);

        const botResponse = await getChatbotResponse(input);
        setChat([...chat, userMessage, { sender: "Bot", text: botResponse }]);

        setInput("");
    };

    return (
        <div className="flex flex-col items-center h-screen bg-gradient-to-br from-pink-100 to-rose-200 p-4">
            <h1 className="text-center text-rose-600 font-bold text-3xl mb-4">Hamal Chatbot</h1>

            <div className="flex flex-col flex-grow w-4/5 max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
                {/* Chat container */}
                <div
                    ref={chatContainerRef}
                    className="flex-grow p-6 overflow-y-auto border-b border-gray-200"
                >
                    {chat.map((msg, index) => (
                        <div
                            key={index}
                            className={`mb-4 ${
                                msg.sender === "You"
                                    ? "text-right"
                                    : "text-left"
                            }`}
                        >
                            <div
                                className={`inline-block px-4 py-2 rounded-lg ${
                                    msg.sender === "You"
                                        ? "bg-blue-500 text-white"
                                        : "bg-gray-100 text-gray-800"
                                }`}
                            >
                                <strong>{msg.sender}: </strong> {msg.text}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Input and send button */}
                <div className="flex items-center p-4">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask me anything..."
                        className="flex-grow p-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring focus:ring-rose-300"
                        onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                    />
                    <button
                        onClick={handleSendMessage}
                        className="p-3 bg-rose-500 text-white rounded-r-lg hover:bg-rose-600 focus:outline-none focus:ring focus:ring-rose-300"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
}
