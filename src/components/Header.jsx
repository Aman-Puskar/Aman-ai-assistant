export default function Header({ onNewChat, canReset }) {
  return (
    <header className="header">
      <div className="brand">
        <div className="monogram">AP</div>
        <div>
          <div className="brand-name">Aman Puskar</div>
          <div className="brand-sub">AI and Automation Engineering | GenAI | RAG | NLP</div>
        </div>
      </div>
      <nav className="header-links">
        <a href="https://github.com/Aman-Puskar" target="_blank" rel="noreferrer">GitHub</a>
        <a href="https://leetcode.com/aman_puskar12" target="_blank" rel="noreferrer">LeetCode</a>
        <button className="ghost" onClick={onNewChat} disabled={!canReset}>New chat</button>
      </nav>
    </header>
  );
}
