import React, { useReducer } from "react";
import { Link } from "react-router-dom";
import { GoogleLogin } from "react-google-login";

import "./Header.css";

let Header = (props) => {
  const [form, setForm] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      name: localStorage.getItem("name"),
      login: localStorage.getItem("accessToken") ? true : false,
    }
  );

  const responseGoogle = (response) => {
    localStorage.setItem("accessToken", response.accessToken);
    localStorage.setItem("name", response.profileObj.name);

    setForm({
      name: response.profileObj.name,
      login: true,
    });

    props.onUserInfo(response.profileObj.name);
  };

  const responseFail = (response) => {
    console.log("login Fail", response);
  };

  return (
    <div id="Header">
      <Link to="/">
        <div className="title">
          <div>게시판</div>
          <div>(Notice Board)</div>
        </div>
      </Link>

      {form.login ? (
        <Link to={`/write/${form.name}`}>
          <div className="write">작성하기</div>
        </Link>
      ) : (
        <GoogleLogin
          clientId="328635778060-mc2u9h5hmg56b3kjb9djcum1pj0q2kum.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseFail}
          cookiePolicy={"single_host_origin"}
        />
      )}
    </div>
  );
};

export default Header;
