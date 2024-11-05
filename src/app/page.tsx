"use client";

import { useMutation, useQuery } from "convex/react";
import { useState } from "react";
import { api } from "../../convex/_generated/api";

export default function Home() {
  const messages = useQuery(api.functions.message.list);
  const createMessage = useMutation(api.functions.message.create);
  // const [messages, setMessages] = useState<Message[]>([
  //   {
  //     sender: "Alice",
  //     content: "Hello!!",
  //   },
  //   {
  //     sender: "Bob",
  //     content: "Hello Alice!!",
  //   },
  // ]);

  const [input, setInput] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createMessage({ sender: "Alice", content: input });
    setInput("");
  };
  return (
    <div>
      {messages?.map((msg, index) => (
        <div key={index}>
          <strong>{msg.sender}</strong>: {msg.content}
        </div>
      ))}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="message"
          id="message"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
