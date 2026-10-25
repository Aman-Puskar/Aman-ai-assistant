import { useEffect, useState } from "react";

// Reveals `text` gradually, like ChatGPT / Claude / Gemini streaming.
export default function useTypewriter(text, enabled, onTick, onDone) {
  const [count, setCount] = useState(enabled ? 0 : text.length);
  const step = Math.max(2, Math.ceil(text.length / 250)); // long answers speed up

  useEffect(() => {
    onTick?.();
    if (!enabled) return;
    if (count >= text.length) {
      onDone?.();
      return;
    }
    const id = setTimeout(() => setCount((c) => Math.min(c + step, text.length)), 16);
    return () => clearTimeout(id);
  }, [count, enabled, text]);

  return text.slice(0, count);
}
