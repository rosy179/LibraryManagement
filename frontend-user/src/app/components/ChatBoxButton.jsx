// components/ChatBotButton.jsx
"use client";

import React, { useState } from "react";
import axios from "axios";

const ChatIcon = () => {
  return (
    <svg
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-9 h-9"
    >
      <mask
        id="mask0_342_2441"
        style={{ maskType: "luminance" }}
        maskUnits="userSpaceOnUse"
        x="1"
        y="1"
        width="33"
        height="33"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1.5 1.50049H33.7395V33.7412H1.5V1.50049Z"
          fill="white"
        />
      </mask>
      <g mask="url(#mask0_342_2441)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9.16266 29.513C10.0327 29.513 10.8532 29.843 11.7217 30.1925C17.0422 32.6525 23.3347 31.5335 27.4342 27.4355C32.8432 22.0235 32.8432 13.22 27.4342 7.81099C24.8152 5.19199 21.3322 3.75049 17.6242 3.75049C13.9147 3.75049 10.4302 5.19349 7.81266 7.81249C3.71166 11.9105 2.59566 18.203 5.03316 23.4725C5.38416 24.341 5.72316 25.187 5.72316 26.066C5.72316 26.9435 5.42166 27.827 5.15616 28.607C4.93716 29.249 4.60566 30.218 4.81866 30.431C5.02716 30.647 6.00216 30.3065 6.64566 30.086C7.41816 29.822 8.29416 29.519 9.16266 29.513V29.513ZM17.5867 33.7415C15.2947 33.7415 12.9877 33.257 10.8292 32.258C10.1932 32.003 9.59766 31.763 9.17016 31.763C8.67816 31.766 8.01666 31.994 7.37766 32.2145C6.06666 32.6645 4.43466 33.2255 3.22716 32.0225C2.02416 30.818 2.57916 29.1905 3.02616 27.881C3.24666 27.236 3.47316 26.57 3.47316 26.066C3.47316 25.652 3.27366 25.124 2.96766 24.3635C0.158156 18.296 1.45716 10.9835 6.22266 6.22099C9.26466 3.17749 13.3132 1.50049 17.6227 1.50049C21.9322 1.50049 25.9822 3.17599 29.0242 6.21949C35.3122 12.5075 35.3122 22.7375 29.0242 29.0255C25.9417 32.1095 21.7912 33.7415 17.5867 33.7415V33.7415Z"
          fill="white"
        />
      </g>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M23.5443 19.7446C22.7163 19.7446 22.0383 19.0741 22.0383 18.2446C22.0383 17.4151 22.7028 16.7446 23.5308 16.7446H23.5443C24.3723 16.7446 25.0443 17.4151 25.0443 18.2446C25.0443 19.0741 24.3723 19.7446 23.5443 19.7446"
        fill="white"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.5311 19.7446C16.7031 19.7446 16.0251 19.0741 16.0251 18.2446C16.0251 17.4151 16.6881 16.7446 17.5176 16.7446H17.5311C18.3591 16.7446 19.0311 17.4151 19.0311 18.2446C19.0311 19.0741 18.3591 19.7446 17.5311 19.7446"
        fill="white"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.5175 19.7446C10.6895 19.7446 10.0115 19.0741 10.0115 18.2446C10.0115 17.4151 10.676 16.7446 11.504 16.7446H11.5175C12.3455 16.7446 13.0175 17.4151 13.0175 18.2446C13.0175 19.0741 12.3455 19.7446 11.5175 19.7446"
        fill="white"
      />
    </svg>
  );
};

const NotificationBadge = ({ count }) => {
  return (
    <div
      className="absolute top-0 right-0 w-6 h-6 text-sm font-bold text-white bg-red-500 rounded-full flex items-center justify-center"
      role="status"
      aria-label={`${count} unread messages`}
    >
      {count}
    </div>
  );
};

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/chat`,
        { message: input },
        {
          headers: { "Content-Type": "application/json" },
          timeout: 10000,
        }
      );

      const reply = {
        role: "assistant",
        content: res.data.reply || "No response from server",
      };
      setMessages((prev) => [...prev, reply]);
    } catch (err) {
      console.error("Error sending message:", err);
      let errorMessage = "Lỗi kết nối với server";
      if (err.response) {
        if (err.response.status === 429) {
          errorMessage = "Quá nhiều yêu cầu. Vui lòng thử lại sau vài giây!";
        } else {
          errorMessage =
            err.response.data?.reply || `Server error: ${err.response.status}`;
        }
      } else if (err.request) {
        errorMessage =
          "Không thể kết nối đến server. Vui lòng kiểm tra server!";
      } else {
        errorMessage = err.message;
      }
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: errorMessage },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 w-[300px] h-[400px] flex flex-col">
      <div className="flex-1 overflow-y-auto mb-2">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`mb-2 flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <span
              className={`inline-block p-2 rounded-lg max-w-[80%] ${
                msg.role === "user" ? "bg-blue-100" : "bg-gray-100"
              }`}
            >
              {msg.content}
            </span>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start mb-2">
            <span className="inline-block p-2 rounded-lg bg-gray-100">
              Đang xử lý...
            </span>
          </div>
        )}
      </div>
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Nhập câu hỏi..."
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              sendMessage();
            }
          }}
          disabled={isLoading}
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 disabled:bg-blue-400"
          disabled={isLoading}
        >
          Gửi
        </button>
      </div>
    </div>
  );
};

const ChatBotButton = () => {
  const [showChat, setShowChat] = useState(false);
  const [notificationVisible, setNotificationVisible] = useState(true);

  const toggleChat = () => {
    setShowChat((prev) => !prev);
    setNotificationVisible(false);
  };

  return (
    <div className="fixed bottom-6 right-8 z-50">
      <button
        onClick={toggleChat}
        className="relative flex items-center justify-center w-16 h-16 bg-blue-800 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
        aria-label="Open chat"
      >
        <ChatIcon />
        {notificationVisible && <NotificationBadge count={1} />}
      </button>
      {showChat && (
        <div className="absolute bottom-20 right-0 w-[300px]">
          <Chat />
        </div>
      )}
    </div>
  );
};

export default ChatBotButton;
