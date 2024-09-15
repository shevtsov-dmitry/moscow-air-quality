import { useState } from "react";
import { useRef } from "react";

export default function Authorization() {
  const server_url = "http://localhost:8081";

  const formRef = useRef(null);
  const loginHeaderRef = useRef(null);
  const attemptsCounterRef = useRef(null);

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  let amountsCount = 0;

  function displayErrorBlock(message) {
    attemptsCounterRef.current.style.display = "block";
    attemptsCounterRef.current.textContent = message;
    attemptsCounterRef.current.style.color = "#9D0000";
  }

  async function verifyAdmin(event) {
    event.preventDefault(); // prevent default form submission behavior

    if (amountsCount === 5) {
      displayErrorBlock("Ошибка авторизации.");
      return;
    }

    if (login.length === 0 || password.length === 0) {
      displayErrorBlock("Заполните поля логина и пароля.");
      return;
    }

    const formData = {
      login: login,
      password: password,
    };

    const url = `${server_url}/admins/verify`;
    let res;
    try {
      res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
    } catch (err) {
      displayErrorBlock("Сервер недоступен.");
      return;
    }

    if (res.status === 200) {
      loginHeaderRef.current.style.color = "green";
      loginHeaderRef.current.textContent = `Авторизация ✓`;
      setTimeout(() => {
        // window.location.href = "/html/admin_page.html";
      }, 200);
    } else {
      amountsCount++;
      displayErrorBlock(`Попытки: ${amountsCount}/5`);
    }
  }

  return (
    <div className="login-form-holder">
      <h2 className="login-header" ref={loginHeaderRef}>
        Авторизация
      </h2>
      <form id="form-with-data" ref={formRef} onSubmit={verifyAdmin}>
        <label htmlFor="username">Имя пользователя</label>
        <input
          type="text"
          id="username"
          name="username"
          onChange={(e) => setLogin(e.target.value)}
          placeholder="Введите имя пользователя"
        />
        <label htmlFor="password">Пароль</label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Введите пароль"
        />
        <div className="attempts-block"></div>
        <div className="submit-button-holder">
          <button type="submit">Войти</button>
        </div>
        <div className="attempts-counter-holder">
          <p className="attempts-counter" ref={attemptsCounterRef}></p>
        </div>
      </form>
    </div>
  );
}
