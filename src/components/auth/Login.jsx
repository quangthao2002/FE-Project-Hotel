import React, { useContext } from "react";
import { useState } from "react";
import { loginUser } from "../utils/ApiFunction";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthContext } from "./AuthProvider";

const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const location = useLocation();
  const redirectUrl = location.state?.path || "/"; // luu url truoc do de redirect sau khi login thanh cong

  const { handleLogin } = useContext(AuthContext);

  const handleInputChange = (e) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const success = await loginUser(login);
      if (success) {
        const token = success.jwt;
        handleLogin(token);
        navigate(redirectUrl, { replace: true }); // redirect ve trang truoc do , replace: true de xoa bo trang hien tai khoi stack
      } else {
        setErrorMessage("Invalid email or password");
        toast.error(errorMessage);
      }
      setTimeout(() => {
        setErrorMessage("");
      }, 4000);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };
  return (
    <section className="container col-6  mt-5 mb-5">
      {errorMessage && <p className="alert alert-danger">{errorMessage}</p>}
      <h2 className="text-center">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <label htmlFor="email" className="col-sm-2 col-form-label">
            Email
          </label>
          <div>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={login.email}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="password" className="col-sm-2 col-form-label">
            Password
          </label>
          <div>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={login.password}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="mb-3">
          <button type="submit" className="btn btn-primary ">
            Login
          </button>
          <span style={{ marginLeft: "10px" }}>
            Don&apos;t have an account?{" "}
            <Link to={"/register"} className="text-decoration-none">
              Register
            </Link>
          </span>
        </div>
      </form>
    </section>
  );
};

export default Login;
