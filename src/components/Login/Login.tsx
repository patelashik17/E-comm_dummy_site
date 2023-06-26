import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from "@mui/material/Button";
import "./Login.scss";
import { useNavigate } from "react-router-dom";

interface LoginForm {
  email: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();
  const schema = yup.object().shape({
    email: yup.string().email().required("Email is required"),
    password: yup.string().min(8).max(12).required("Enter password"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: LoginForm) => {
    console.log(data);
    const maths = Math.floor(Math.random() * 100);
    localStorage.setItem("token", maths.toString());
    navigate("/homepage");
  };

  return (
    <div className="page">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="login_page">
          <h1 className="heading">Login page</h1>
  
          <input
            type="text"
            className={`textInput `}
            placeholder="Email..."
            {...register("email")}
           
          />
          <p style={{ color: "red", marginLeft: "-12rem", marginTop: "10px" }}>
            {errors.email?.message}
          </p>
          
          <input
            type="text"
            className={`textPassword `}
            placeholder="password..."
            {...register("password")}
          />
          <p
            className="error_message"
            style={{ color: "red", marginLeft: "-1rem", marginTop: "10px" }}
          >
            {errors.password?.message}
          </p>
          <Button variant="contained" className="submit_btn" type="submit">
            Login
          </Button>
          
        </div>
      </form>
      
    </div>
    
  );
};

export default Login;
