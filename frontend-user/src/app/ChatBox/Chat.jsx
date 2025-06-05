import React, { useState } from "react";

const Chat = () => {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [input, setInput] = useState("");

  const user = JSON.parse(localStorage.getItem("persist:root"));

  const sendMessage = async () => {
    if (!message.trim()) {
      alert("Vui lòng nhập câu hỏi.");
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });
      const data = await res.json();
      setReply(data.reply);
    } catch (err) {
      console.error("Lỗi khi gửi tin nhắn:", err);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 space-y-3">
      <h2 className="font-bold text-lg">AI Chatbot</h2>
      <div className="text-gray-800 bg-gray-100 p-3 rounded">{reply}</div>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Nhập câu hỏi..."
        className="w-full border p-2 rounded"
      />
      <button
        onClick={sendMessage}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Gửi
      </button>
    </div>
  );
};

export default Chat;
