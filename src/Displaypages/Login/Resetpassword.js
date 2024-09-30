import './Resetpassword.css';
import { FaUser } from "react-icons/fa";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useEffect, useState } from "react";
import axios from 'axios';
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import loginBanner from './login-bg.png';
import React from 'react';
import setAuthHeader from './SetAuthHeader';
import agtlogowhite from './agt-logo-white.png';
import { ToastContainer, toast } from 'react-toastify';

function Resetpassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [passwordsMatch, setPasswordsMatch] = useState(false);
  const [showRedirect, setShowRedirect] = useState(false);
  const navigate = useNavigate(); 



  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  useEffect(() => {
  }, [searchParams]);


  const handleNewPasswordChange = (event) => {
    const newPasswordValue = event.target.value;
    setNewPassword(newPasswordValue);
    checkPasswordMatch(newPasswordValue, confirmPassword);
  };
  
  const handleConfirmPasswordChange = (event) => {
    const confirmPasswordValue = event.target.value;
    setConfirmPassword(confirmPasswordValue);
    checkPasswordMatch(newPassword, confirmPasswordValue);
  };
  
  const checkPasswordMatch = (newPassword, confirmPassword) => {
    if(newPassword !== null && newPassword !=="" && newPassword !== undefined && confirmPassword !== null &&
    confirmPassword !== undefined && newPassword === confirmPassword){
      setPasswordsMatch(true);
    } else {
      setPasswordsMatch(false);
    }
  };


   const handleSubmit = async (event) => {
    event.preventDefault();
      try {
        await axios.post(process.env.REACT_APP_API_BASE_URL+"/api/v1/login/resetPassword", null, {
          params:{
            token : searchParams.get("token"),
            password : newPassword
            }
        });
        toast("Password updated Successfully");
        setShowRedirect(true);
      } catch (err) {
        toast("Password Update Failed");
      }
  };


  return (
    <div className='login container-md '>
      <div className='row d-flex'>
        <div className='con1 col-sm-5'>
          <div className='header text-center '>
            <h4 className=''>Reset your password</h4>
            <ToastContainer />
          </div>
          <form className='form4 align-items-center justify-content-center' onSubmit={handleSubmit}>
            <div className='form-group d-flex input-icons '>
              <div className='reset-inputbox'></div>
              <div className='ia'>
                <FaUser className="input-icon1" />
              </div>
              <p className="reset-input input-field">{searchParams.get('email')}</p>
            </div>
            <div className='reset-inputboxs form-group d-flex input-icons pt-3 '>
              <div className='inputbox1'></div>
              <div className='ia'>
                {showNewPassword ? (
                  <IoMdEye
                    className="input-icon2"
                    onClick={toggleNewPasswordVisibility}
                  />
                ) : (
                  <IoMdEyeOff
                    className="input-icon2"
                    onClick={toggleNewPasswordVisibility}
                  />
                )}
                <div className='inputbox2'></div>
              </div>
              <input
                className="input2 input-field"
                type={showNewPassword ? "text" : "password"}
                name="newPassword"
                placeholder="New password"
                id="newPassword"
                value={newPassword}
                onChange={handleNewPasswordChange}
              />
            </div>
            <div className='form-group d-flex input-icons pt-3 '>
              <div className='inputbox1'></div>
              <div className='ia'>
                {showConfirmPassword ? (
                  <IoMdEye
                    className="input-icon2"
                    onClick={toggleConfirmPasswordVisibility}
                  />
                ) : (
                  <IoMdEyeOff
                    className="input-icon2"
                    onClick={toggleConfirmPasswordVisibility}
                  />
                )}
                <div className='inputbox2'></div>
              </div>
              <br />
              <input
                className="input2 input-field"
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(event) => {
                  setConfirmPassword(event.target.value);
                }}
              />
            </div>
            <div className='input-icons'>
              <button type="submit" className="button btn px-5">Change Password</button>
                onChange={handleConfirmPasswordChange}
              />
            </div>
            <div className='input-icons'>
              <button type="submit" className="button btn px-5" style={{ display: !showRedirect ? 'block' : 'none' }} disabled={!passwordsMatch}>Change Password</button>
              <Link to='/' className=" button-top" style={{ display: showRedirect ? 'block' : 'none', marginLeft:'220px'}}>Please Login Again</Link>
            </div>
          </form>
        </div>
        <div className='col-sm-4'>
          <div>
            <div className="reset-image-container">
              <div className="reset-image-wrapper">
                <img className="reset-con2" src={loginBanner} alt="TEST" height={660} width={550} />
                <img className="reset-logo" src={agtlogowhite} alt="Logo" />
              </div>
              <p className='reset-image-text'><strong>Hello,</strong></p> <p className='reset-image-text1'> Welcome !</p>
            </div>
          </div>
        </div>
      </div>
      <div className='bg-firstbox'></div>
      <div className='bg-secoundbox'></div>
      <div className='bg-bottom-first'></div>
      <div className='bg-bottom-seound'></div>
    </div>
  );
}

export default Resetpassword;


