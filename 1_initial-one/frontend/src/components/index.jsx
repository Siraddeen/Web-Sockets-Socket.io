import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

export const Index = () => {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessagesInput] = useState("");

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });
    return () => {
      socket.off("message");
    };
  }, [messages]);

  const sendMessage = () => {
    if (messageInput.trim() !== "") {
      socket.emit("message", messageInput);
      setMessagesInput("");
    }
  };

  return (
    <div className="px-4">
      <h1>A chat app created using SOCKET.IO</h1>
      <br />
      <input
        type="text"
        value={messageInput}
        placeholder="type your message"
        onChange={(e) => setMessagesInput(e.target.value)}
      />

      <button onClick={sendMessage} className=" italic">
        send Me
      </button>
      <br />
      <br />
      <section>
        {messages.map((message, index) => (
          <div key={index}>{message}</div>
        ))}
      </section>
    </div>
  );
};
