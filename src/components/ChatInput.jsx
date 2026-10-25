import { useRef, useState } from "react";

export default function ChatInput({ onSend, disabled }) {
  const [value, setValue] = useState("");
  const ref = useRef(null);

  function submit() {
    if (!value.trim() || disabled) return;
    onSend(value);
    setValue("");
    if (ref.current) ref.current.style.height = "auto";
  }

  function onChange(e) {
    setValue(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = Math.min(e.target.scrollHeight, 140) + "px";
  }

  return (
    <div className="composer">
      <textarea
        ref={ref}
        rows={1}
        value={value}
        onChange={onChange}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            submit();
          }
        }}
        placeholder="Ask about Aman's projects, skills, education..."
        maxLength={300}
        aria-label="Your question"
      />
      <button className="send" onClick={submit} disabled={disabled || !value.trim()} aria-label="Send">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
      </button>
    </div>
  );
}
