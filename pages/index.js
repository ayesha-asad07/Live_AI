import { useState } from "react";
import { getChatbotResponse } from "../utils/chatApi";

export default function Home() {
    const [input, setInput] = useState("");
    const [chat, setChat] = useState([]);

    const handleSendMessage = async () => {
        if (!input.trim()) return;

        const userMessage = { sender: "You", text: input };
        setChat([...chat, userMessage]);

        const botResponse = await getChatbotResponse(input);
        setChat([...chat, userMessage, { sender: "Bot", text: botResponse }]);

        setInput("");
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-rose-100 p-4">
          <h1 className="text-center text-pink-600 font-bold text-3xl rounded-lg">
           Pregnancy Chatbot</h1>
            <div className="w-full max-w-md bg-white p-4 rounded shadow">
                <div className="h-80 overflow-y-auto border-b p-2">
                    {chat.map((msg, index) => (
                        <p key={index} className={msg.sender === "You" ? "text-blue-500" : "text-green-500"}>
                            <strong>{msg.sender}:</strong> {msg.text}
                        </p>
                    ))}
                </div>
                <div className="mt-4 flex">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask me anything..."
                        className="flex-grow p-2 border rounded"
                    />
                    <button onClick={handleSendMessage} className="ml-2 px-4 py-2 bg-pink-500 text-white rounded">
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
}
