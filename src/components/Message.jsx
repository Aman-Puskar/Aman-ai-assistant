import ReactMarkdown from "react-markdown";
import useTypewriter from "../hooks/useTypewriter";

const mdComponents = {
  a: (props) => <a {...props} target="_blank" rel="noreferrer" />,
};

export default function Message({ role, text, animate, onTick, onDone }) {
  const isBot = role === "assistant";
  const shown = useTypewriter(text, isBot && animate, onTick, onDone);
  const typing = isBot && animate && shown.length < text.length;

  if (!isBot) {
    return (
      <div className="row user">
        <div className="bubble">{text}</div>
      </div>
    );
  }

  return (
    <div className="row bot">
      <div className="avatar">AP</div>
      <div className="content">
        <ReactMarkdown components={mdComponents}>{shown}</ReactMarkdown>
        {typing && <span className="caret" />}
      </div>
    </div>
  );
}
