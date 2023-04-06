import React from "react";
import "./LoginPage.scss";
import {
  USER_API_BASE_URL_LOCAL,
  USER_API_BASE_URL_GLITCH,
} from "../../public_constants";

const LoginPage = () => {
  const handleLogin = (event) => {
    event.preventDefault();
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    let username = document.querySelector(".username-input").value;
    let password = document.querySelector(".password-input").value;
    if (username.length === 0 || password.length === 0) {
      alert("Username and password cannot be blank!");
      return;
    } else {
      console.log(username, password);

      let newUser = {
        userName: username,
        password: password,
      };
      let request = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      };
      fetch(USER_API_BASE_URL_GLITCH + "create", request).then((response) => {
        if (response.status !== 200) {
          alert("Registration failed try again: " + response.status);
          console.log(response.statusText);
        } else {
          console.log(response.status);
          alert("Success!");
        }
      });
    }
  };
  return (
    <div className="card container login-page-cont">
      <div className="login-test-cont card">
        <form>
          <label htmlFor="username">Username:</label>
          <input
            className="username-input"
            type="text"
            name="username"
            placeholder="Username"
          />
          <label htmlFor="password">Password:</label>
          <input
            className="password-input"
            type="password"
            name="password"
            placeholder="Password"
          />
          <button
            className="user-submit-btn"
            type="submit"
            onClick={handleSubmit}
          >
            Register
          </button>
          <button
            className="user-submit-btn"
            type="submit"
            onClick={handleLogin}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
