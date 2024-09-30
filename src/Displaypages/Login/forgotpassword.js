

import { FaUser } from "react-icons/fa";
import { IoMdEye } from "react-icons/io";
import { useState } from "react";
import axios from 'axios';
import './forgotpassword.css';
import agtlogowhite from './agt-logo-white.png';
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

import loginBanner from './login-bg.png';
import React from 'react'

function Forgot() {
    const [password, setpassword] = useState();
    const [emailId, setEmailId] = useState(null);
    const navigate = useNavigate();

    async function send () {
        if(emailId == null || emailId ==""){
            toast.error('Please enter email id');
        } else{
        try{
            let appUrl = window.location.origin + "/resetpassword";
            await axios.post(process.env.REACT_APP_API_BASE_URL+"/api/v1/login/forgetPassword",null, {
                params:{
                emailId : emailId,
                appUrl : appUrl
                },
            });
            toast.success('Password reset link sent successfully!');
            setEmailId("");

        } catch(err){
            toast.error('Failed to send password reset link!');
        }
    }
    }


    return (
        <>

            <div className='login container-md '>
                <div className='row d-flex'>

                    <div className='con1 col-sm-5'>

                        <div className='forgot-header text-center '>
                           
                            <h4 className=''>Forgot Password </h4>
                            <p className="text-color" >We will send a reset password link to your email</p>
                        </div>
                        <form className=' form2 align-items-center justify-content-center'>

                            <div className='f-inputbox form-group d-flex input-icons '>
                                <div className='inputbox1' >
                                </div>
                                <div className='ia'>
                                    <FaUser className="input-icon " />
                                </div>
                                <input type="text" className="input4 input-field" name="email" id="username" value={emailId} onChange={(event) => {
                                    setEmailId(event.target.value);
                                }} placeholder=" Email-Id" />
                            </div>
                            <div className='input-icons'>
                                {/* <Link to={{ pathname: "/resetpassword", state: { email: username } }}> */}
                                    <button type="submit" className="forgot-button btn px-6" onClick={send}>Send</button>
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
                                        style={{zIndex:1000}}
                                    />
                                {/* </Link> */}
                            </div>

                        </form>
                    </div>


                    <div className='col-sm-4'>
                        <div>
                            <div className="forgot-image-container">
                                <div className="forgot-image-wrapper">
                                    <img className="forgot-con2" src={loginBanner} alt="TEST" height={660} width={550} />
                                    <img className="forgot-logo" src={agtlogowhite} alt="Logo" />
                                </div>
                                <h3 className='forgot-image-text'>Hello,</h3> <h3 className='forgot-image-text1'> Welcome !</h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='forgot-bg-firstbox'>
                </div>
                <div className='forgot-bg-secoundbox'>
                </div>
                <div className='forgot-bg-bottom-first'>
                </div>
                <div className='forgot-bg-bottom-seound'>
                </div>
            </div>
        </>
    )
}

export default Forgot
