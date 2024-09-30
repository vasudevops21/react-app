import React, { useState, useEffect } from "react";
import axios from "axios";
import Topbar from "../../Components/Topbar";
import Sidebar from "../../Components/Sidebar";
import UserAvatar from "./UserAvatar";
import "./UserProfile.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const UserProfile = () => {
  const [userName, setUserName] = useState("");
  const [userName1, setUserName1] = useState("");
  const [empid, setEmpid] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [file, setFile] = useState(null);
  const [userId, setUserId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [imageSrc, setImageSrc] = useState(null);
 
  const [userProfile, setUserProfile] = useState({});
 
  const handleNameChange = (event) => {
    setUserName(event.target.value);
  };
 
  const handleNameChange1 = (event) => {
    setEmpid(event.target.value);
  };
 
  const handleEmpidChange = (event) => {
    setUserName1(event.target.value);
  };
 
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
 
    if (!file) {
      setErrorMessage("Please select a file");
      return;
    }
 
    const formData = new FormData();
    formData.append("file", file);
    formData.append("userId", userId || userProfile.employeesid); // Default userId to userProfile.employeesid if not entered
 
    try {
      await axios.post("http://localhost:8080/api/profile/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Profile image uploaded successfully");
      fetchImage(userId || userProfile.employeesid); // Fetch the uploaded image after successful upload
    } catch (error) {
      console.error("Error uploading profile image:", error);
      alert("Failed to upload profile image");
    }
  };
 
  const fetchImage = async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/profile/image/${userId}`,
        {
          responseType: "arraybuffer",
        }
      );
      const blob = new Blob([response.data], {
        type: response.headers["content-type"],
      });
      const imageUrl = URL.createObjectURL(blob);
      setImageSrc(imageUrl);
    } catch (error) {
      console.error("Error fetching profile image:", error);
    }
  };
 
  const handleRemoveImage = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/profile/delete/${userId || userProfile.employeesid}`);
      toast("Profile image deleted successfully");
      setImageSrc(null); // Set image source to null to remove the image
    } catch (error) {
      console.error("Error deleting profile image:", error);
      toast("Failed to delete profile image");
    }
  };
  
 
  useEffect(() => {
    // Fetch image when component mounts
    if (userId || userProfile.employeesid) {
      fetchImage(userId || userProfile.employeesid);
    }
  }, [userId, userProfile.employeesid]);
 
  useEffect(() => {
    const retrieveUserProfile = localStorage.getItem("userInfo");
    if (retrieveUserProfile) {
      setUserProfile(JSON.parse(retrieveUserProfile));
    }
  }, []);
 
  return (
    <>
     <ToastContainer
        position="top-center"
        autoClose={5000} // 5 seconds
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div>
        <Topbar
        />
        <div className="d-flex">
          <Sidebar />
          <div className="profile mt-3 mx-5">
            <h3>WELCOME</h3>
 
            <div className="profile_setting pt-4 mt-3">
              <p className="profile_edit ">Edit Profile</p>
 
              <form onSubmit={handleSubmit}>
                <div className="d-flex">
                  <div className="profile_form pt-4">
                    <div className=" d-flex ">
                      <div className="form-group col-md-4">
                        <label htmlFor="" className="custom_badge_profile">
                          First Name:
                        </label>
                        <input
                          className="form-control custom_input_profile"
                          type="text"
                          id=""
                          value={userProfile.firstname}
                          onChange={handleNameChange}
                        />
                      </div>
 
                      <div className="form-group col-md-4">
                        <label htmlFor="" className="custom_badge_profile">
                          Last Name:
                        </label>
                        <input
                          className="form-control custom_input_profile"
                          type="text"
                          id=""
                          value={userProfile.lastname}
                          onChange={handleEmpidChange}
                        />
                      </div>
                    </div>
 
                    <div className="d-flex mt-4 ">
                      <div className="form-group col-md-4">
                        <label htmlFor="" className="custom_badge_profile">
                          Emp ID:
                        </label>
                        <input
                          className="form-control custom_input_profile"
                          type="text"
                          id=""
                          value={userProfile.employeesid}
                          onChange={handleNameChange1}
                        />
                      </div>
                      <div className="form-group col-md-4">
                        <label htmlFor="" className="custom_badge_profile">
                          Email ID:
                        </label>
                        <input
                          className="form-control custom_input_profile"
                          type="email"
                          id=""
                          value={userProfile.emailid}
                        />
                      </div>
                    </div>
 
                    <div className="mt-5 ">
                      <div className="form-group col-md-8">
                        <label htmlFor="" className="custom_badge_profile">
                          Contact Address:
                        </label>
                        <input
                          className="form-control custom_input_profile"
                          type="text"
                          id=""
                        />
                      </div>
                    </div>
 
                    <div className="mt-5 ">
                      <div className="form-group col-md-8">
                        <label htmlFor="" className="custom_badge_profile">
                          Mobile Number:
                        </label>
                        <svg
                          className="profile_flag"
                          xmlns="http://www.w3.org/2000/svg"
                          width="32"
                          height="32"
                          viewBox="0 0 32 32"
                        >
                          <rect
                            x="1"
                            y="4"
                            width="30"
                            height="24"
                            rx="4"
                            ry="4"
                            fill="#fff"
                          ></rect>
                          <path
                            d="M1.638,5.846H30.362c-.711-1.108-1.947-1.846-3.362-1.846H5c-1.414,0-2.65,.738-3.362,1.846Z"
                            fill="#a62842"
                          ></path>
                          <path
                            d="M2.03,7.692c-.008,.103-.03,.202-.03,.308v1.539H31v-1.539c0-.105-.022-.204-.03-.308H2.03Z"
                            fill="#a62842"
                          ></path>
                          <path
                            fill="#a62842"
                            d="M2 11.385H31V13.231H2z"
                          ></path>
                          <path
                            fill="#a62842"
                            d="M2 15.077H31V16.923000000000002H2z"
                          ></path>
                          <path
                            fill="#a62842"
                            d="M1 18.769H31V20.615H1z"
                          ></path>
                          <path
                            d="M1,24c0,.105,.023,.204,.031,.308H30.969c.008-.103,.031-.202,.031-.308v-1.539H1v1.539Z"
                            fill="#a62842"
                          ></path>
                          <path
                            d="M30.362,26.154H1.638c.711,1.108,1.947,1.846,3.362,1.846H27c1.414,0,2.65-.738,3.362-1.846Z"
                            fill="#a62842"
                          ></path>
                          <path
                            d="M5,4h11v12.923H1V8c0-2.208,1.792-4,4-4Z"
                            fill="#102d5e"
                          ></path>
                          <path
                            d="M27,4H5c-2.209,0-4,1.791-4,4V24c0,2.209,1.791,4,4,4H27c2.209,0,4-1.791,4-4V8c0-2.209-1.791-4-4-4Zm3,20c0,1.654-1.346,3-3,3H5c-1.654,0-3-1.346-3-3V8c0-1.654,1.346-3,3-3H27c1.654,0,3,1.346,3,3V24Z"
                            opacity=".15"
                          ></path>
                          <path
                            d="M27,5H5c-1.657,0-3,1.343-3,3v1c0-1.657,1.343-3,3-3H27c1.657,0,3,1.343,3,3v-1c0-1.657-1.343-3-3-3Z"
                            fill="#fff"
                            opacity=".2"
                          ></path>
                          <path
                            fill="#fff"
                            d="M4.601 7.463L5.193 7.033 4.462 7.033 4.236 6.338 4.01 7.033 3.279 7.033 3.87 7.463 3.644 8.158 4.236 7.729 4.827 8.158 4.601 7.463z"
                          ></path>
                          <path
                            fill="#fff"
                            d="M7.58 7.463L8.172 7.033 7.441 7.033 7.215 6.338 6.989 7.033 6.258 7.033 6.849 7.463 6.623 8.158 7.215 7.729 7.806 8.158 7.58 7.463z"
                          ></path>
                          <path
                            fill="#fff"
                            d="M10.56 7.463L11.151 7.033 10.42 7.033 10.194 6.338 9.968 7.033 9.237 7.033 9.828 7.463 9.603 8.158 10.194 7.729 10.785 8.158 10.56 7.463z"
                          ></path>
                          <path
                            fill="#fff"
                            d="M6.066 9.283L6.658 8.854 5.927 8.854 5.701 8.158 5.475 8.854 4.744 8.854 5.335 9.283 5.109 9.979 5.701 9.549 6.292 9.979 6.066 9.283z"
                          ></path>
                          <path
                            fill="#fff"
                            d="M9.046 9.283L9.637 8.854 8.906 8.854 8.68 8.158 8.454 8.854 7.723 8.854 8.314 9.283 8.089 9.979 8.68 9.549 9.271 9.979 9.046 9.283z"
                          ></path>
                          <path
                            fill="#fff"
                            d="M12.025 9.283L12.616 8.854 11.885 8.854 11.659 8.158 11.433 8.854 10.702 8.854 11.294 9.283 11.068 9.979 11.659 9.549 12.251 9.979 12.025 9.283z"
                          ></path>
                          <path
                            fill="#fff"
                            d="M6.066 12.924L6.658 12.494 5.927 12.494 5.701 11.799 5.475 12.494 4.744 12.494 5.335 12.924 5.109 13.619 5.701 13.19 6.292 13.619 6.066 12.924z"
                          ></path>
                          <path
                            fill="#fff"
                            d="M9.046 12.924L9.637 12.494 8.906 12.494 8.68 11.799 8.454 12.494 7.723 12.494 8.314 12.924 8.089 13.619 8.68 13.19 9.271 13.619 9.046 12.924z"
                          ></path>
                          <path
                            fill="#fff"
                            d="M12.025 12.924L12.616 12.494 11.885 12.494 11.659 11.799 11.433 12.494 10.702 12.494 11.294 12.924 11.068 13.619 11.659 13.19 12.251 13.619 12.025 12.924z"
                          ></path>
                          <path
                            fill="#fff"
                            d="M13.539 7.463L14.13 7.033 13.399 7.033 13.173 6.338 12.947 7.033 12.216 7.033 12.808 7.463 12.582 8.158 13.173 7.729 13.765 8.158 13.539 7.463z"
                          ></path>
                          <path
                            fill="#fff"
                            d="M4.601 11.104L5.193 10.674 4.462 10.674 4.236 9.979 4.01 10.674 3.279 10.674 3.87 11.104 3.644 11.799 4.236 11.369 4.827 11.799 4.601 11.104z"
                          ></path>
                          <path
                            fill="#fff"
                            d="M7.58 11.104L8.172 10.674 7.441 10.674 7.215 9.979 6.989 10.674 6.258 10.674 6.849 11.104 6.623 11.799 7.215 11.369 7.806 11.799 7.58 11.104z"
                          ></path>
                          <path
                            fill="#fff"
                            d="M10.56 11.104L11.151 10.674 10.42 10.674 10.194 9.979 9.968 10.674 9.237 10.674 9.828 11.104 9.603 11.799 10.194 11.369 10.785 11.799 10.56 11.104z"
                          ></path>
                          <path
                            fill="#fff"
                            d="M13.539 11.104L14.13 10.674 13.399 10.674 13.173 9.979 12.947 10.674 12.216 10.674 12.808 11.104 12.582 11.799 13.173 11.369 13.765 11.799 13.539 11.104z"
                          ></path>
                          <path
                            fill="#fff"
                            d="M4.601 14.744L5.193 14.315 4.462 14.315 4.236 13.619 4.01 14.315 3.279 14.315 3.87 14.744 3.644 15.44 4.236 15.01 4.827 15.44 4.601 14.744z"
                          ></path>
                          <path
                            fill="#fff"
                            d="M7.58 14.744L8.172 14.315 7.441 14.315 7.215 13.619 6.989 14.315 6.258 14.315 6.849 14.744 6.623 15.44 7.215 15.01 7.806 15.44 7.58 14.744z"
                          ></path>
                          <path
                            fill="#fff"
                            d="M10.56 14.744L11.151 14.315 10.42 14.315 10.194 13.619 9.968 14.315 9.237 14.315 9.828 14.744 9.603 15.44 10.194 15.01 10.785 15.44 10.56 14.744z"
                          ></path>
                          <path
                            fill="#fff"
                            d="M13.539 14.744L14.13 14.315 13.399 14.315 13.173 13.619 12.947 14.315 12.216 14.315 12.808 14.744 12.582 15.44 13.173 15.01 13.765 15.44 13.539 14.744z"
                          ></path>
                        </svg>
                        <input
                          className="form-control custom_input_profile ps-5"
                          type="text"
                          id=""
                        />
                      </div>
                    </div>
 
                    <div className=" d-flex mt-5">
                      <div className="form-group col-md-4">
                        <label htmlFor="" className="custom_badge_profile">
                          Location:
                        </label>
                        <input
                          className="form-control custom_input_profile"
                          type="text"
                          id=""
                        />
                      </div>
 
                      <div className="form-group col-md-4">
                        <label htmlFor="" className="custom_badge_profile">
                          Postal Code:
                        </label>
                        <input
                          className="form-control custom_input_profile"
                          type="text"
                          id=""
                        />
                      </div>
                    </div>
                  </div>
 
                  <div className="col-md-">
                    <div className="profile_avatar ">
                      <UserAvatar
                        className=" shadow"
                        size={100}
                        name={
                          userProfile.firstname + " " + userProfile.lastname
                        }
                        avatarUrl={imageSrc}
                        // onImageRemove={handleImageRemove}
                      />
                      <div className=" ">
                        <svg
                          className="profile_remove_icon rounded-5 p-1"
                          onClick={handleRemoveImage}
                          xmlns="http://www.w3.org/2000/svg"
                          width="25"
                          height="25"
                          viewBox="0 0 14 14"
                          fill="none"
                        >
                          <path
                            d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z"
                            fill="#FF7F7F"
                          />
                        </svg>
                      </div>
                    </div>
 
                    <div>
                      {errorMessage && (
                        <p style={{ color: "red" }}>{errorMessage}</p>
                      )}
 
                      <div className="mt-4 ms-2">
                        <label
                          className="profile_upload_image text-white px-3 py-2"
                          htmlFor="file"
                        >
                          <svg
                            className="me-2"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              d="M12 15V2M12 2L15 5.5M12 2L9 5.5"
                              stroke="white"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M8 22H16C18.828 22 20.243 22 21.121 21.122C22 20.242 22 18.829 22 16V15C22 12.172 22 10.758 21.121 9.87895C20.353 9.11095 19.175 9.01395 17 9.00195M7 9.00195C4.825 9.01395 3.647 9.11095 2.879 9.87895C2 10.758 2 12.172 2 15V16C2 18.829 2 20.243 2.879 21.122C3.179 21.422 3.541 21.619 4 21.749"
                              stroke="white"
                              stroke-linecap="round"
                            />
                          </svg>{" "}
                          Upload New Photo Here
                        </label>
                        <input
                          className="d-none"
                          type="file"
                          id="file"
                          onChange={handleFileChange}
                        />
                        {/* <button
                          className="btn bg-primary"
                          onClick={handleRemoveImage}
                        >
                          Remove Image
                        </button> */}
                      </div>
 
                      <div className="profile_dashed mt-3 text-center">
                        <p>
                          Upload a new picture.A Larger image will be restricted
                          automatically.
                        </p>
 
                        <p className="">Maximum Upload Size : 1 MB</p>
                      </div>
 
                      <div className="d-flex gap-4 profile_settings_btn">
                        <button
                          className="btn border border-primary border-2 text-primary px-4 py-2"
                          type="submit"
                        >
                          <svg
                            className="me-2"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              d="M7 21H17C18.0609 21 19.0783 20.5786 19.8284 19.8284C20.5786 19.0783 21 18.0609 21 17V7.414C20.9999 7.14881 20.8946 6.89449 20.707 6.707L17.293 3.293C17.1055 3.10545 16.8512 3.00006 16.586 3H7C5.93913 3 4.92172 3.42143 4.17157 4.17157C3.42143 4.92172 3 5.93913 3 7V17C3 18.0609 3.42143 19.0783 4.17157 19.8284C4.92172 20.5786 5.93913 21 7 21Z"
                              stroke="#787DBD"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M17 21V14C17 13.7348 16.8946 13.4804 16.7071 13.2929C16.5196 13.1054 16.2652 13 16 13H8C7.73478 13 7.48043 13.1054 7.29289 13.2929C7.10536 13.4804 7 13.7348 7 14V21M9 3H15V6C15 6.26522 14.8946 6.51957 14.7071 6.70711C14.5196 6.89464 14.2652 7 14 7H10C9.73478 7 9.48043 6.89464 9.29289 6.70711C9.10536 6.51957 9 6.26522 9 6V3Z"
                              stroke="#787DBD"
                              stroke-width="2"
                            />
                            <path
                              d="M11 17H13"
                              stroke="#787DBD"
                              stroke-width="2"
                              stroke-linecap="round"
                            />
                          </svg>
                          Save
                        </button>
 
                        <button
                          className="btn border border-danger border-2 text-danger px-4 py-2"
                          type="button"
                        >
                          <svg
                            className="me-2"
                            xmlns="http://www.w3.org/2000/svg"
                            width="21"
                            height="21"
                            viewBox="0 0 21 21"
                            fill="none"
                          >
                            <path
                              d="M7.5 5.5L4.5 2.5H10.5C12.0976 2.49986 13.6587 2.97788 14.9823 3.87253C16.306 4.76718 17.3315 6.03751 17.927 7.52C18.297 8.441 18.5 9.447 18.5 10.5C18.5 12.6217 17.6571 14.6566 16.1569 16.1569C14.6566 17.6571 12.6217 18.5 10.5 18.5C8.37827 18.5 6.34344 17.6571 4.84315 16.1569C3.34285 14.6566 2.5 12.6217 2.5 10.5C2.5 9.01 2.87 7.028 4.038 5.409M7.5 7.5L13.5 13.5M7.5 13.5L13.5 7.5"
                              stroke="#FF7F7F"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
 
export default UserProfile;

