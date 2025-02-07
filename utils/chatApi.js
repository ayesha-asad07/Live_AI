export async function getChatbotResponse(userMessage) {
    const response = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ userMessage }),
    });

    const data = await response.json();
    return data.reply;
}
