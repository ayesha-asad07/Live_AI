const API_URL = process.env.NEXT_PUBLIC_CHATBOT_API_URL || "http://localhost:5000";

export async function getChatbotResponse(userMessage) {
    const response = await fetch(`${API_URL}/chat`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ userMessage }),
    });

    if (!response.ok) {
        throw new Error("Failed to fetch chatbot response");
    }

    const data = await response.json();
    return data.reply;
}
