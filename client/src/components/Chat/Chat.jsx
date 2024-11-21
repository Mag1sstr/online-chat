import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useLocation } from "react-router-dom";
import smileImage from "../../images/happy-face.png";
import EmojiPicker from "emoji-picker-react";
import "./Chat.css";
import Messages from "../Messages/Messages";

const socket = io.connect("http://localhost:5000");
export default function Chat() {
  const [state, setState] = useState([]);
  const [params, setParams] = useState(null);
  const [message, setMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { search } = useLocation();
  useEffect(() => {
    const searchParams = Object.fromEntries(new URLSearchParams(search));
    setParams(searchParams);
    socket.emit("join", searchParams);
  }, [search]);

  useEffect(() => {
    socket.on("message", ({ data }) => {
      setState((_state) => [..._state, data]);
      // console.log(data);
    });
  }, []);

  const onEmojiClick = ({ emoji }) => setMessage(`${message} ${emoji}`);

  console.log(message);

  return (
    <div className="chat">
      <div className="chat__header">
        <p className="chat__header-title">{params?.room}</p>
        <p className="chat__header-users">0 пользователей в комнате</p>
        <button className="chat__header-btn">Выйти из комнаты</button>
      </div>
      <div className="chat__main">
        <Messages messages={state} name={params?.name} />
      </div>
      <div className="chat__footer">
        <form className="chat__form">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="chat__form-input"
            type="text"
            placeholder="Введите сообщение"
          />
          <div className="chat__emoji">
            <img
              onClick={() => setIsOpen(!isOpen)}
              className="chat__form-img"
              src={smileImage}
              alt=""
            />
            {isOpen && (
              <div className="chat__emojies">
                <EmojiPicker onEmojiClick={onEmojiClick} />
              </div>
            )}
          </div>
          <button className="chat__form-btn">Отправить</button>
        </form>
      </div>
    </div>
  );
}
