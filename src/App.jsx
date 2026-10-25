import { useRef, useState } from "react";
import Header from "./components/Header";
import Intro from "./components/Intro";
import Suggestions from "./components/Suggestions";
import Message from "./components/Message";
import TypingIndicator from "./components/TypingIndicator";
import ChatInput from "./components/ChatInput";

const API_URL =
  import.meta.env.VITE_API_URL?.replace(/\/+$/, "") ||
  "https://aman-ai-assistant-backed-1.onrender.com";
  
function getAnswer(payload) {
  if (typeof payload === "string") return payload.trim();
  if (!payload || typeof payload !== "object") return "";

  for (const key of ["answer", "response", "result", "output", "text", "message"]) {
    const value = payload[key];
    if (typeof value === "string" && value.trim()) return value.trim();
    if (value && typeof value === "object") {
      const nestedAnswer = getAnswer(value);
      if (nestedAnswer) return nestedAnswer;
    }
  }

  return "";
}

export default function App() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [typing, setTyping] = useState(false);
  const [introDone, setIntroDone] = useState(false);
  const scrollRef = useRef(null);

  const busy = loading || typing;
  const scrollDown = () => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  };

  async function send(question) {
    const q = question.trim();
    if (!q || busy) return;
    setMessages((m) => [...m, { id: Date.now(), role: "user", text: q }]);
    setLoading(true);
    setTimeout(scrollDown, 0);

    let reply;
    try {
      const res = await fetch(`${API_URL}/response?query=${encodeURIComponent(q)}`);
      const body = await res.text();
      let data = body;
      try {
        data = JSON.parse(body);
      } catch {
        // The API may return a plain-text answer.
      }

      if (!res.ok) {
        const detail = data && typeof data === "object" ? data.detail || data.message : "";
        throw new Error(detail || `The server returned an error (${res.status}).`);
      }
      reply = getAnswer(data);
      if (!reply) {
        const keys = data && typeof data === "object" ? Object.keys(data).join(", ") : "none";
        throw new Error(`The API response did not contain a recognized answer field. Response keys: ${keys || "none"}.`);
      }
    } catch (error) {
      console.error("Chat request failed:", error);
      reply = error instanceof TypeError
        ? "Could not connect to the API."
        : error.message || "Something went wrong. Please try again.";
    }
    setLoading(false);
    setTyping(true);
    setMessages((m) => [...m, { id: Date.now() + 1, role: "assistant", text: reply, animate: true }]);
  }

  function reset() {
    if (busy) return;
    setMessages([]);
  }

  const empty = messages.length === 0;

  return (
    <div className="app">
      <Header onNewChat={reset} canReset={!empty && !busy} />

      <main className="stage" ref={scrollRef}>
        <div className="column">
          {empty && !introDone && <Intro onDone={() => setIntroDone(true)} />}
          {empty && introDone && (
            <div className="welcome">
              <h2>Ask anything about Aman Puskar</h2>
              <p>His projects, internship, skills, and academic record. Answers come from his resume and project notes.</p>
              <Suggestions onPick={send} disabled={busy} />
            </div>
          )}

          {messages.map((m) => (
            <Message
              key={m.id}
              role={m.role}
              text={m.text}
              animate={m.animate}
              onTick={scrollDown}
              onDone={() => setTyping(false)}
            />
          ))}
          {loading && <TypingIndicator />}
        </div>
      </main>

      <footer className="dock">
        <div className="column">
          <ChatInput onSend={send} disabled={busy} />
          <p className="fine">Built with a RAG pipeline: Pinecone for retrieval, an LLM for answers. It can make mistakes.</p>
        </div>
      </footer>
    </div>
  );
}
