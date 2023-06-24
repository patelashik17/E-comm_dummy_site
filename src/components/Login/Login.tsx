import React, { useState } from "react";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Input } from "antd";
import Button from "@mui/material/Button";
import "./Login.scss";
import { useNavigate } from "react-router-dom";

const EmailRegex = new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i);

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submit, setSubmit] = useState(false);
  const [error, setError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const onChangeEmail = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEmail(e.target.value);
    setError(false);
  };

  const navigate = useNavigate();

  const onChangePassword = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPassword(e.target.value);
    setPasswordError(false);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    setSubmit(true);
    const maths = Math.floor(Math.random() * 100);
    localStorage.setItem("token", maths.toString());
    if (!email.match(EmailRegex)) {
      setError(true);
    } else {
      setError(false);
    }
    if (password.length < 8) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
    if (email.match(EmailRegex) && password.length >= 8) {
      navigate("/homepage");
    }
  };

  return (
    <div className="page">
      <form onSubmit={handleSubmit}>
        <div className="login_page">
          <h1 className="heading">Login page</h1>
          <Input
            className={`textInput ${error ? "error" : ""}`}
            placeholder="Enter email"
            value={email}
            type="email"
            allowClear
            onChange={onChangeEmail}
          />
          {error && (
            <p
              className="error_message"
              style={{ color: "red", marginLeft: "-157px", marginTop: "10px" }}
            >
              Invalid email address
            </p>
          )}
          <Input.Password
            className={`textPassword ${passwordError ? "error" : ""}`}
            placeholder="Enter Password"
            onChange={onChangePassword}
            value={password}
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
          {passwordError && (
            <p
              className="error_message"
              style={{ color: "red", marginLeft: "18px", marginTop: "10px" }}
            >
              Password must be at least 8 characters long
            </p>
          )}
          <Button variant="contained" className="submit_btn" type="submit">
            Login
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Login;
