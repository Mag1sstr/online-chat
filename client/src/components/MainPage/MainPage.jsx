import { Link } from "react-router-dom";
import "./MainPage.css";
import { useState } from "react";

export default function MainPage() {
  const [values, setValues] = useState({
    name: "",
    room: "",
  });
  const [valuesError, setValuesError] = useState(false);
  return (
    <div className="mainpage">
      <form className="mainpage__form">
        <p className="mainpage__title">Войти в комнату</p>
        {valuesError ? (
          <div style={{ fontSize: "14px", color: "red" }}>
            Заполните все поля*
          </div>
        ) : null}
        <div className="mainpage__column">
          <input
            value={values.name}
            onChange={(e) => setValues({ ...values, name: e.target.value })}
            name="name"
            className="mainpage__input"
            type="text"
            placeholder="Ваше имя"
          />
          <input
            value={values.room}
            onChange={(e) => setValues({ ...values, room: e.target.value })}
            name="room"
            className="mainpage__input"
            type="text"
            placeholder="Комната"
          />
        </div>
        <Link to={`/chat?name=${values.name}&room=${values.room}`}>
          <button
            onClick={(e) => {
              if (values.name.length == 0 || values.room.length == 0) {
                e.preventDefault();
                setValuesError(true);
              }
            }}
            type="submit"
            className="mainpage__button"
          >
            Войти
          </button>
        </Link>
      </form>
    </div>
  );
}
