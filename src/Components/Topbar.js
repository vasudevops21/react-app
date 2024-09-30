

// import React, { useState, useEffect ,useCallback } from "react";
// import '../Styles/Topbar.css';
// import AGTlogoDay from '../img/AGTlogoday.png';
// import AGTlogoNight from '../img/AGTlogonight.png';
// import { Link, useNavigate } from "react-router-dom";
// import Grid from '@mui/material/Grid';
// import { IoMdSettings } from "react-icons/io";
// import { GoBell } from "react-icons/go";
// import { IoCloseCircleOutline } from "react-icons/io5";
// import { FiSun } from "react-icons/fi";
// import { BsFillMoonStarsFill } from "react-icons/bs";
// import UserAvatar from "../Displaypages/userProfile/UserAvatar";
// import axios from "axios";

 
// export default function Topbar() {
//     const [logo, setLogo] = useState(AGTlogoDay);
//     const [search, setSearch] = useState(false);
//     const [profilePopupVisible, setProfilePopupVisible] = useState(false);
//     // const [imageUrl, setImageUrl] = useState(null);
//     const [imageSrc, setImageSrc] = useState(null);
//     const [userId, setUserId] = useState("");
//     const [userProfile, setUserProfile] = useState({});
//     const toggleProfilePopup = () => {
//         setProfilePopupVisible(!profilePopupVisible);
//     };
 
 
//     // const fetchImage = async (userId) => {
//     //     try {
//     //         const response = await axios.get(
//     //             `http://localhost:8080/api/profile/image/${userId}`,
//     //             {
//     //                 responseType: "arraybuffer",
//     //             }
//     //         );
//     //         const blob = new Blob([response.data], {
//     //             type: response.headers["content-type"],
//     //         });
//     //         const imageUrl = URL.createObjectURL(blob);
//     //         setImageUrl(imageUrl);
//     //     } catch (error) {
//     //         console.error("Error fetching profile image:", error);
//     //     }
//     // };

  
 
//     // useEffect(() => {
//     //     // Fetch image when component mounts
//     //     if (userId || userProfile.employeesid) {
//     //       fetchImage(userId || userProfile.employeesid);
//     //     }
//     //   }, [userId, userProfile.employeesid, imageUrl]);
     
//     const [imageUrl, setImageUrl] = useState(null); // Initialize imageUrl state

//     const fetchImage = async (userId) => {
//         try {
//             const response = await axios.get(
//                 `http://localhost:8080/api/profile/image/${userId}`,
//                 {
//                     responseType: "arraybuffer",
//                 }
//             );
//             const blob = new Blob([response.data], {
//                 type: response.headers["content-type"],
//             });
//             const imageUrl = URL.createObjectURL(blob);
//             setImageUrl(imageUrl);
//         } catch (error) {
//             console.error("Error fetching profile image:", error);
//         }
//     };
    
//     useEffect(() => {
//         // Fetch image when component mounts if imageUrl is not present
//         if ((userId || userProfile.employeesid) && !imageUrl) {
//             fetchImage(userId || userProfile.employeesid);
//         }
//     }, [userId, userProfile.employeesid, imageUrl]); // Include imageUrl in the dependency array
    
 
//     useEffect(() => {
//         const savedTheme = localStorage.getItem('theme');
//         if (savedTheme) {
//             document.querySelector('body').setAttribute('data-theme', savedTheme);
//             // Set the logo based on the saved theme
//             setLogo(savedTheme === 'dark' ? AGTlogoNight : AGTlogoDay);
//         }
//     }, []);
 

    
//     useEffect(() => {
//         const retrieveUserProfile = localStorage.getItem("userInfo");
//         if (retrieveUserProfile) {
//           setUserProfile(JSON.parse(retrieveUserProfile));
//         }
//       }, []);

 
 
//     const savedTheme = localStorage.getItem('theme');
//     if (savedTheme) {
//         document.querySelector('body').setAttribute('data-theme', savedTheme);
//     }
 
 
//     return (
//         <>
//             <div className="Top-bar d-flex align-items-center justify-content-center">
//                 <Grid container className="container">
//                     <Grid item xs={3}>
//                         <img src={logo} alt="AGTlogo" className="AGTlogo" />
//                     </Grid>
//                     <Grid item xs={6} className="searchBar d-flex align-items-center justify-content-center">
//                         <div className={search ? "search-width expand" : "search-width"}>
//                             <input id="searchbox" type="text" placeholder="Search Employee ... " onClick={() => setSearch(!search)} />
//                             <div className="search-icon d-flex align-items-center justify-content-center" onClick={() => setSearch(!search)}>
//                                 <i className="fa fa-search "></i>
//                             </div>
//                         </div>
//                     </Grid>
//                     <Grid item xs={3} className="d-flex align-items-center justify-content-end">
//                         <ul className="d-flex align-items-center justify-content-end setting-notification-profile-icon">
//                             <li><IoMdSettings className="settings-icon" alt="setting icon" /></li>
//                             <li className="relative" > <GoBell className="notification-icon" />
//                                 <div className="notification">
//                                     <p className="mb-0">01</p>
//                                 </div>
//                             </li>
//                             <li onClick={toggleProfilePopup}>
//                                 {/* <FaCircleUser className="profile-icon" alt="profile icon" /> */}
//                                 <UserAvatar
//                       className="profile_avatar shadow"
//                       size={48}
//                     //   name={props.userName + ' ' + props.userName1}
//                       avatarUrl={imageUrl}
//                       // onImageRemove={handleImageRemove}
//                     />
//                             </li>
//                         </ul>
//                     </Grid>
//                 </Grid>
//             </div>
//             {profilePopupVisible && <ProfilePopup setProfilePopupVisible={setProfilePopupVisible} setLogo={setLogo} />}
 
 
//         </>
//     )
// }
 
 
// const ProfilePopup = ({ setProfilePopupVisible, setLogo }) => {
//     const [imageUploaded, setImageUploaded] = useState(false);
//     const [userProfile, setUserProfile] = useState({});
//     const navigate = useNavigate();
//     const [isDarkMode, setIsDarkMode] = useState(
//         localStorage.getItem('theme') === 'dark'
//     );
   
 
   
//     useEffect(() => {
//         const retrieveUserProfile = localStorage.getItem('userInfo');
//         if (retrieveUserProfile) {
//             setUserProfile(JSON.parse(retrieveUserProfile));
//         }
//       }, []);
 
 
//     useEffect(() => {
//         const savedTheme = localStorage.getItem('theme');
//         if (savedTheme) {
//             document.querySelector('body').setAttribute('data-theme', savedTheme);
//             // Update the logo based on the saved theme
//             setLogo(savedTheme === 'dark' ? AGTlogoNight : AGTlogoDay);
//         }
//     }, []);
 
//     const toggleTheme = () => {
//         const newTheme = isDarkMode ? 'light' : 'dark';
//         setIsDarkMode(!isDarkMode);
//         document.querySelector('body').setAttribute('data-theme', newTheme);
//         setLogo(isDarkMode ? AGTlogoDay : AGTlogoNight);
//         localStorage.setItem('theme', newTheme);
//     };
 
//     const closeProfilePopup = () => {
//         setProfilePopupVisible(false);
//     };
 
//     const handleImageClick = () => {
//         if (!imageUploaded) {
//             document.getElementById('fileInput').click();
//         }
//     };
 
//     const handleFileChange = (event) => {
//         const file = event.target.files[0];
//         console.log('Uploaded file:', file);
//         setImageUploaded(true);
//     };
 
//     const signOut = () => {
//         localStorage.clear();
//         navigate("/");        
//     }
 
//     return (
//         <div className="profile-popup">
//             <div className="flex flex-col dropDownProfile">
//                 <label className="close-icon" onClick={closeProfilePopup}>
//                     <IoCloseCircleOutline />
//                 </label>
//                 <ul className="flex flex-col list i">
                   
//                     <li className="align-item-center">
//                         <Link to="/userprofile" className="profile-content">Profile Settings</Link>
//                     </li>
//                     <li className="align-item-center">
//                         <Link className="profile-content"><i className="d-block" aria-hidden="true"></i>{userProfile.firstname} {userProfile.lastname}</Link>
//                     </li>
//                     <li className="align-item-center">
//                         <Link className="profile-content"><i className="d-block" aria-hidden="true"></i>{userProfile.employeesid}</Link>
//                     </li>
//                     <li className="align-item-center">
//                         <Link className="profile-content"><i className="d-block" aria-hidden="true"></i>{userProfile.emailid}</Link>
//                     </li>
//                     <li className="align-item-center">
//                         <button className="profile-button" onClick={signOut}>Sign Out</button>
//                     </li>
 
//                     <li className="align-item-center">
//                         <div className="dark_mode">
//                             <input
//                                 className="dark_mode_input"
//                                 type="checkbox"
//                                 id="darkmode-toggle"
//                                 onChange={toggleTheme}
//                                 checked={isDarkMode}
//                             />
//                             <label className="dark_mode_label" htmlFor="darkmode-toggle">
//                                 <div className="toggle"></div>
//                                 <div className="icon-container">
//                                     <FiSun className="icon-size sun-icon" />
//                                     <BsFillMoonStarsFill className="icon-size moon-icon" />
//                                 </div>
//                                 <span className="text-size">{isDarkMode ? 'DARK' : 'LIGHT'}</span>
//                             </label>
//                         </div>
//                     </li>
//                 </ul>
//             </div>
//         </div>
//     );
// };



import React, { useState, useEffect } from "react";
import '../Styles/Topbar.css';
import AGTlogoDay from '../img/AGTlogoday.png';
import AGTlogoNight from '../img/AGTlogonight.png';
import { Link, useNavigate } from "react-router-dom";
import Grid from '@mui/material/Grid';
import { IoMdSettings } from "react-icons/io";
import { GoBell } from "react-icons/go";
import { IoCloseCircleOutline } from "react-icons/io5";
import { FiSun } from "react-icons/fi";
import { BsFillMoonStarsFill } from "react-icons/bs";
import UserAvatar from "../Displaypages/userProfile/UserAvatar";
import axios from "axios";

// Import statements...

export default function Topbar() {
    const [logo, setLogo] = useState(AGTlogoDay);
    const [search, setSearch] = useState(false);
    const [profilePopupVisible, setProfilePopupVisible] = useState(false);
    const [userId, setUserId] = useState("");
    const [userProfile, setUserProfile] = useState({});
    const [imageUrl, setImageUrl] = useState(null); 
    const navigate = useNavigate();

    const toggleProfilePopup = () => {
        setProfilePopupVisible(!profilePopupVisible);
    };

    const fetchImage = async (userId) => {
        try {
            const timestamp = new Date().getTime(); // Current timestamp
            const response = await axios.get(
                `http://localhost:8080/api/profile/image/${userId}?timestamp=${timestamp}`, // Append timestamp query parameter
                {
                    responseType: "arraybuffer",
                }
            );
            const blob = new Blob([response.data], {
                type: response.headers["content-type"],
            });
            const imageUrl = URL.createObjectURL(blob);
            setImageUrl(imageUrl);
            localStorage.setItem('profileImageUrl', imageUrl);
        } catch (error) {
            console.error("Error fetching profile image:", error);
        }
    };
    
    useEffect(() => {
            if ((userId || userProfile.employeesid) && !imageUrl) {
                fetchImage(userId || userProfile.employeesid);
            }
        }, [userId, userProfile.employeesid, imageUrl]);
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            document.querySelector('body').setAttribute('data-theme', savedTheme);
            setLogo(savedTheme === 'dark' ? AGTlogoNight : AGTlogoDay);
        }
    }, []);

    useEffect(() => {
        const retrieveUserProfile = localStorage.getItem("userInfo");
        if (retrieveUserProfile) {
          setUserProfile(JSON.parse(retrieveUserProfile));
        }
    }, []);



    return (
        <>

            <div className="Top-bar d-flex align-items-center justify-content-center">
                <Grid container className="container-topbar">
                    <Grid item xs={3}>
                        <img src={logo} alt="AGTlogo" className="AGTlogo" />
                    </Grid>
                    <Grid item xs={6} className="searchBar d-flex align-items-center justify-content-center">
                        <div className={search ? "search-width expand" : "search-width"}>
                            <input id="searchbox" type="text" placeholder="Search Employee ... " onClick={() => setSearch(!search)} />
                            <div className="search-icon d-flex align-items-center justify-content-center" onClick={() => setSearch(!search)}>
                                <i className="fa fa-search "></i>
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={3} className="d-flex align-items-center justify-content-end">
                        <ul className="d-flex align-items-center justify-content-end setting-notification-profile-icon">
                        <Link to="/settings/general" >
                            <li  ><IoMdSettings  className="settings-icon" alt="setting icon" /></li>
                            </Link>
                            <li className="relative" > <GoBell className="notification-icon" />
                                <div className="notification">
                                    <p className="mb-0">01</p>
                                </div>
                            </li>
                            <li onClick={toggleProfilePopup}>
                                <UserAvatar
                                    className="profile_avatar shadow"
                                    size={48}
                                    name={
                                        userProfile.firstname + " " + userProfile.lastname
                                      }
                                    avatarUrl={imageUrl}
                                />
                            </li>
                        </ul>
                    </Grid>
                </Grid>
            </div>
            {profilePopupVisible && <ProfilePopup setProfilePopupVisible={setProfilePopupVisible} setLogo={setLogo} />}
        </>
    );
}

const ProfilePopup = ({ setProfilePopupVisible, setLogo }) => {
    const [imageUploaded, setImageUploaded] = useState(false);
    const [userProfile, setUserProfile] = useState({});
    const navigate = useNavigate();
    const [isDarkMode, setIsDarkMode] = useState(
        localStorage.getItem('theme') === 'dark'
    );
    const [imageUrl, setImageUrl] = useState(localStorage.getItem('profileImageUrl'));

    useEffect(() => {
        const retrieveUserProfile = localStorage.getItem('userInfo');
        if (retrieveUserProfile) {
            setUserProfile(JSON.parse(retrieveUserProfile));
        }
    }, []);


    useEffect(() => {
        const retrieveUserProfile = localStorage.getItem('userInfo');
        if (retrieveUserProfile) {
            setUserProfile(JSON.parse(retrieveUserProfile));
        }
      }, []);


    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            document.querySelector('body').setAttribute('data-theme', savedTheme);
            setLogo(savedTheme === 'dark' ? AGTlogoNight : AGTlogoDay);
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = isDarkMode ? 'light' : 'dark';
        setIsDarkMode(!isDarkMode);
        document.querySelector('body').setAttribute('data-theme', newTheme);
        setLogo(isDarkMode ? AGTlogoDay : AGTlogoNight);
        localStorage.setItem('theme', newTheme);
    };

    const closeProfilePopup = () => {
        setProfilePopupVisible(false);
    };

    const handleImageClick = () => {
        if (!imageUploaded) {
            document.getElementById('fileInput').click();
        }
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        console.log('Uploaded file:', file);
        setImageUploaded(true);
        localStorage.setItem('profileImageUploaded', true);
    };

    const signOut = () => {
        localStorage.clear();
        navigate("/");        
    };

    return (
        <div className="profile-popup">
            <div className="flex flex-col dropDownProfile">
                <label className="close-icon" onClick={closeProfilePopup}>
                    <IoCloseCircleOutline />
                </label>
                <ul className="flex flex-col list i">
                    <li className="align-item-center">
                        <Link to="/userprofile" className="profile-content">Profile Settings</Link>
                    </li>
                    <li className="align-item-center">
                        <Link className="profile-content"><i className="d-block" aria-hidden="true"></i>{userProfile.firstname} {userProfile.lastname}</Link>
                    </li>
                    <li className="align-item-center">
                        <Link className="profile-content"><i className="d-block" aria-hidden="true"></i>{userProfile.employeesid}</Link>
                    </li>
                    <li className="align-item-center">
                        <Link className="profile-content"><i className="d-block" aria-hidden="true"></i>{userProfile.emailid}</Link>
                    </li>
                    <li className="align-item-center">
                        <button className="profile-button" onClick={signOut}>Sign Out</button>
                    </li>
                    <li className="align-item-center">
                        <div className="dark_mode">
                            <input
                                className="dark_mode_input"
                                type="checkbox"
                                id="darkmode-toggle"
                                onChange={toggleTheme}
                                checked={isDarkMode}
                            />
                            <label className="dark_mode_label" htmlFor="darkmode-toggle">
                                <div className="toggle"></div>
                                <div className="icon-container">
                                    <FiSun className="icon-size sun-icon" />
                                    <BsFillMoonStarsFill className="icon-size moon-icon" />
                                </div>
                                <span className="text-size">{isDarkMode ? 'DARK' : 'LIGHT'}</span>
                            </label>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
};



