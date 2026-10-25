import { useEffect, useState } from "react";

// One orchestrated moment: "Hello" -> "Ask anything about Aman Puskar" -> fades away.
export default function Intro({ onDone }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 1900),
      setTimeout(() => setPhase(2), 4700),
      setTimeout(onDone, 5500),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className={`intro ${phase === 2 ? "out" : ""}`}>
      {phase === 0 && <h1 className="intro-line">Hello</h1>}
      {phase >= 1 && <h1 className="intro-line">Ask anything about Aman Puskar</h1>}
    </div>
  );
}
