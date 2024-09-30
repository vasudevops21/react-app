import "./Loginpage.css";
import { FaUser } from "react-icons/fa";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import loginBanner from "./login-bg.png";
import React from "react";
import setAuthHeader from "./SetAuthHeader";
import agtlogowhite from "./agt-logo-white.png";
import { ToastContainer, toast } from "react-toastify";

function LoginPage() {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();

  async function login(event) {
    event.preventDefault();
    const formValid = validateInputs();
    if (formValid) {
      setValidated(true);
      try {
        const result = await axios.post(
          process.env.REACT_APP_API_BASE_URL +
            "/api/v1/login/loginAuthenticate",
          {
            userName: username,
            password: password,
          }
        );
        if (result && result.data) {
          localStorage.setItem(
            "userInfo",
            JSON.stringify(result.data.employeeDTO)
          );
          setAuthHeader(result.data.accessToken);
          toast.success("login Successfully");
          setTimeout(() => {
            navigate("/home");
          }, 1000);
          setusername("");
          setpassword("");
        }
      } catch (err) {
        toast.error("Login Failed");
      }
    }
  }

  const validateInputs = () => {
    if (!username || !password) {
      toast.error("Please enter both username and password");
      return false;
    }
    return true;
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="login container-md ">
      <div className="row d-flex">
        <div className="con1 col-sm-5">
          <div className="header text-center ">
            <h4 className="">Login to Your Account </h4>
          </div>
          <form className={`form3 align-items-center justify-content-center`}>
            <div className="form-group d-flex input-icons ">
              <div className="inputbox1"></div>
              <div className="ia">
                <FaUser className="input-icon1" />
              </div>
              <input
                type="text"
                className={`input3 input-field form-control ${
                  username.length > 0 ? "is-valid" : "is-invalid"
                }`}
                name="email"
                id="username"
                value={username}
                onChange={(event) => {
                  setusername(event.target.value);
                }}
                placeholder=" Email-Id"
                required
              />
            </div>
            {/* <div className="invalid-feedback mt-2">Please enter a valid username.</div> */}
            <div className="form-group d-flex input-icons pt-3 ">
              <div className="inputbox1"></div>
              <div className="ia">
                {showPassword ? (
                  <IoMdEye
                    className="input-icon2"
                    onClick={togglePasswordVisibility}
                  />
                ) : (
                  <IoMdEyeOff
                    className="input-icon2"
                    onClick={togglePasswordVisibility}
                  />
                )}
                <div className="inputbox2"></div>
              </div>
              <input
                className={`input3 input-field form-control ${
                  password.length > 0 ? "is-valid" : "is-invalid"
                }`}
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="password"
                id="password"
                value={password}
                onChange={(event) => {
                  setpassword(event.target.value);
                }}
                required
              />
            </div>
            <div className="input-icons">
              <button
                type="submit"
                className="loginButton btn px-5"
                value="Login"
                onClick={login}
              >
                LOGIN
              </button>
            </div>
            <div className='forget'>
              <Link to="/forgot" style={{ textDecoration: 'none' }}>Forgot Password?</Link>
            </div>
          </form>
          <ToastContainer
            position="top-center"
            autoClose={10000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            style={{ zIndex: 1000, width: "auto" }}
          />
        </div>
        <div className="col-sm-4">
          <div>
            <div className="image-container">
              <div className="image-wrapper">
                <img
                  className="con2"
                  src={loginBanner}
                  alt="TEST"
                  height={660}
                  width={550}
                />
                <img className="logo" src={agtlogowhite} alt="Logo" />
              </div>
              <p className="image-text">
                <strong>Hello,</strong>
              </p>{" "}
              <p className="image-text1"> Welcome !</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-firstbox"></div>
      <div className="bg-secoundbox"></div>
      <div className="bg-bottom-first"></div>
      <div className="bg-bottom-seound"></div>
    </div>
  );
}

export default LoginPage;
