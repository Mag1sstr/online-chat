import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useLocation, useNavigate } from "react-router-dom";
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
  const [users, setUsers] = useState(0);

  const navigate = useNavigate();

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

  useEffect(() => {
    socket.on("joinRoom", ({ data }) => {
      setUsers(data.users.length);
    });
  }, []);

  const onEmojiClick = ({ emoji }) => setMessage(`${message} ${emoji}`);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!message) return;

    socket.emit("sendMessage", { message, params });

    setMessage("");
  };
  // console.log(message);

  return (
    <div className="chat">
      <div className="chat__header">
        <p className="chat__header-title">{params?.room}</p>
        <p className="chat__header-users">{users} пользователей в комнате</p>
        <button
          onClick={() => {
            socket.emit("leftRoom", { params });
            navigate("/");
          }}
          className="chat__header-btn"
        >
          Выйти из комнаты
        </button>
      </div>
      <div className="chat__main">
        <Messages messages={state} name={params?.name} />
      </div>
      <div className="chat__footer">
        <form onSubmit={handleSubmit} className="chat__form">
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
          <button
            type="submit"
            onSubmit={handleSubmit}
            className="chat__form-btn"
          >
            Отправить
          </button>
        </form>
      </div>
    </div>
  );
}
