import React, { useEffect, useState } from "react";
import "./LoginPage.scss";
import {
  USER_API_BASE_URL_LOCAL,
  USER_API_BASE_URL_GLITCH,
} from "../../public_constants";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [user, setUser] = useState({
    id: null,
    userName: null,
    password: null,
  });
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState({
    id: null,
    userName: null,
    isAuthorized: false,
  });

  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = (event) => {
    event.preventDefault();
    if (username.length < 0 || password.length < 0) {
      alert("Username and password cannot be blank!");
    }
    fetchUser();
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

  let getUserData;

  useEffect(() => {
    setUsername(username);
    setPassword(password);
  }, [username, password]);

  useEffect(() => {
    let navBarBrand = document.querySelector(".navbar-text");
    navBarBrand.innerText = user.userName;
  }, [user.userName]);

  // set user in local storage after authorization
  useEffect(() => {
    console.log("Updating local storage");
    localStorage.setItem("user", JSON.stringify(isAuthorized));
  }, [isAuthorized]);

  // useEffect(() => {
  //   useNavigate("/hangry");
  // }, [loggedIn]);

  async function fetchUser() {
    const requestOptions = {
      method: "GET",
    };
    getUserData = await fetch(
      USER_API_BASE_URL_LOCAL + "username/" + username,
      requestOptions
    ).then(async function (response) {
      if (!response.ok) {
        console.log("fetch user error: " + response.status);
      } else {
        console.log("fetch user ok");
        return await response.json();
      }
    });
    if (getUserData) {
      console.log("Authenticating");
      authenticateUser();
    } else {
      setIsAuthorized({
        id: null,
        userName: null,
        isAuthorized: false,
      });
      console.log("User does not exist");
      console.log("Unauthorized");
    }
  }

  const authenticateUser = () => {
    // console.log("User inputs: " + username, password);
    // console.log("DB: " + getUserData.userName, getUserData.password);
    // console.log(getUserData);
    if (
      getUserData.userName === username &&
      getUserData.password === password
    ) {
      console.log("Authenticated!");
      setIsAuthorized({
        id: getUserData.id,
        userName: getUserData.userName,
        isAuthorized: true,
      });
      setUser({
        id: getUserData.id,
        userName: getUserData.userName,
        password: getUserData.password,
        role: getUserData.role,
      });
      setTimeout(() => {
        navigate("/hangry");
      }, 500);
    } else {
      console.log("Password does not match stored password");
      console.log("Unauthorized");
      setIsAuthorized({
        id: null,
        userName: null,
        isAuthorized: false,
      });
      localStorage.setItem("user", JSON.stringify(isAuthorized));
      console.log(user);
      return;
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
            value={username}
            onChange={handleUsernameChange}
          />
          <label htmlFor="password">Password:</label>
          <input
            className="password-input"
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
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
