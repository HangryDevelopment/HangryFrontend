import React from "react";
import "./LoginPage.scss";
import { USER_API_BASE_URL_LOCAL, USER_API_BASE_URL_GLITCH } from "../../public_constants";

const LoginPage = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    let username = document.querySelector(".username-input").value;
    let email = document.querySelector(".email-input").value;
    let region = document.querySelector(".region-input").value;

    console.log(username, email, region);

    let newUser = {
      userName: username,
      email: email,
      region: region,
      blocked: false,
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
  };
  return (
    <div className="card container login-page-cont">
      <div className="login-test-cont card">
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username:</label>
          <input
            className="username-input"
            type="text"
            name="username"
            placeholder="Username"
          />
          <label htmlFor="email">Email:</label>
          <input
            className="email-input"
            type="text"
            name="email"
            placeholder="Email"
          />
          <label htmlFor="region">Region:</label>
          <input
            className="region-input"
            type="text"
            name="region"
            placeholder="Region"
          />
          <button className="user-submit-btn" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
