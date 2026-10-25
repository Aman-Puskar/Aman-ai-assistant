const ITEMS = [
  "Who is Aman Puskar?",
  "Tell me about his projects",
  "What did he do at R Systems?",
  "What are his technical skills?",
  "What are his academic records?",
];

export default function Suggestions({ onPick, disabled }) {
  return (
    <div className="suggestions">
      {ITEMS.map((s) => (
        <button key={s} className="chip" onClick={() => onPick(s)} disabled={disabled}>
          {s}
        </button>
      ))}
    </div>
  );
}
