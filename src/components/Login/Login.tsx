import React, { useState } from "react";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Input } from "antd";
import Button from "@mui/material/Button";
import "./Login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState<string | number>("");
  const [password, setPassword] = useState<any>("");
  const [submit, setSubmit] = useState<any>(false);

  const onChangeEmail = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEmail(e.target.value);
    console.log(e.target.value);
  };
  const navigate = useNavigate();
  const onChangePassword = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPassword(e.target.value);
    console.log(e.target.value);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    setSubmit(true);
    const maths = Math.floor(Math.random() * 100);
    localStorage.setItem("token", maths.toString());
    navigate("/homepage");
  };

  return (
    <div className="page">
      <form onSubmit={handleSubmit}>
        <div className="login_page">
          <h1 className="heading">Login page</h1>
          <Input
            className="textInput"
            placeholder="Enter email"
            value={email}
            type="email"
            allowClear
            onChange={onChangeEmail}
            required
          />
          <Input.Password
            className="textPassword"
            placeholder="Enter Password"
            onChange={onChangePassword}
            value={password}
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
            required
          />
          <Button variant="contained" className="submit_btn" type="submit">
            Login
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Login;
