import "./Messages.css";
export default function Messages({ messages, name }) {
  return (
    <div className="chat__messages">
      {messages.map(({ user, message }, i) => {
        const itsMe =
          user.name.trim().toLowerCase() === name.trim().toLowerCase();
        const className = itsMe ? "chat__messages-me" : "chat__messages-user";
        return (
          <div key={i} className={`chat__messages-block ${className}`}>
            <p>{user.name}</p>
            <span className="chat__messages-item">{message}</span>
          </div>
        );
      })}
    </div>
  );
}
