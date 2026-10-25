import { useEffect, useState } from "react";

export default function TypingIndicator() {
  const [slow, setSlow] = useState(false);

  // Free hosting sleeps when idle, so the first reply can be slow.
  useEffect(() => {
    const t = setTimeout(() => setSlow(true), 6000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="row bot">
      <div className="avatar">AP</div>
      <div className="content">
        <span className="dots"><i /><i /><i /></span>
        {slow && <p className="hint">The server is waking up. The first reply can take up to a minute.</p>}
      </div>
    </div>
  );
}
