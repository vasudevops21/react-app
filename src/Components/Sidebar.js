

import React, { useState, useCallback } from "react";

import '../Styles/Sidebar.css'
import Topbar from "./Topbar";
import { Link } from "react-router-dom";
import { LuCalendarClock, LuFileText } from "react-icons/lu";
import { MdGroups2 } from "react-icons/md";

import { FaMoneyCheckAlt } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";
import { IoIosArrowForward } from "react-icons/io";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserTie } from '@fortawesome/free-solid-svg-icons'
import { BsFillFileEarmarkBarGraphFill } from "react-icons/bs";

const Sidebar = () => {


  const [activeLinks, setActiveLinks] = useState({
    Home: false,
    TimeSheet: false,
    Projects: false,
    MyInfo: false,
    Organization: false,
    Expenses: false,
    Reports: false,
  });

  const handleLinkClick = useCallback((linkName) => {
    setActiveLinks((prevActiveLinks) => ({
      ...Object.keys(prevActiveLinks).reduce((acc, key) => {
        acc[key] = key === linkName;
        return acc;
      }, {}),
    }));
  }, []);


  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen)
  return (
    <div className="side-and-top-bar ">
      <div className="topbar-component ">
        {/* <Topbar /> */}
      </div>
      <div className="sidebar-component d-flex flex-row ">
        <div className={isOpen ? "left-sidebar-expand d-flex flex-row" : "left-sidebar d-flex flex-row"}>
          <div className="left-sidebar-toggle">
            <ul>
              <li className={`d-flex flex-row ${activeLinks["Home"] ? "active" : ""}`} onClick={() => handleLinkClick("Home")}>
                <Link to="/home" className={`sidebar-link ${activeLinks["Home"] ? "clicked" : ""}`} alt="home icon">
                  <AiFillHome className={`sidebar-icon ${activeLinks["Home"] ? "clicked" : ""}`} />
                  <span className="sidebar-text" style={{ display: isOpen ? 'block' : 'none' }}>Home</span>
                </Link>
              </li>

              <li className={`d-flex flex-row ${activeLinks["TimeSheet"] ? "active" : ""}`} onClick={() => handleLinkClick("TimeSheet")}>
                <Link to="/timesheet" className={`sidebar-link ${activeLinks["TimeSheet"] ? "clicked" : ""}`} alt="timesheet icon">
                  <LuCalendarClock className={`sidebar-icon ${activeLinks["TimeSheet"] ? "clicked" : ""}`} />
                  <span className="sidebar-text" style={{ display: isOpen ? 'block' : 'none' }}>TimeSheet</span>
                </Link>
              </li>

              <li className={`d-flex flex-row ${activeLinks["MyInfo"] ? "active" : ""}`} onClick={() => handleLinkClick("MyInfo")}>
                <Link to="/Organization" className={`sidebar-link ${activeLinks["MyInfo"] ? "clicked" : ""}`} alt="MyInfo icon">
                  <FontAwesomeIcon icon={faUserTie} className={`sidebar-icon ${activeLinks["MyInfo"] ? "clicked" : ""}`} />
                  <span className="sidebar-text" style={{ display: isOpen ? 'block' : 'none' }}>Employee</span>
                </Link>
              </li>

              <li className={`d-flex flex-row ${activeLinks["Projects"] ? "active" : ""}`} onClick={() => handleLinkClick("Projects")}>
                <Link to="/project" className={`sidebar-link ${activeLinks["Projects"] ? "clicked" : ""}`} alt="Projects icon">
                  <LuFileText className={`sidebar-icon ${activeLinks["Projects"] ? "clicked" : ""}`} />
                  <span className="sidebar-text" style={{ display: isOpen ? 'block' : 'none' }}>Projects</span>
                </Link>
              </li>

              <li className={`d-flex flex-row ${activeLinks["Organization"] ? "active" : ""}`} onClick={() => handleLinkClick("Organization")}>
                <Link to="/clients" className={`sidebar-link ${activeLinks["Organization"] ? "clicked" : ""}`} alt="Organization icon">
                  <MdGroups2 className={`sidebar-icon ${activeLinks["Organization"] ? "clicked" : ""}`} />
                  <span className="sidebar-text" style={{ display: isOpen ? 'block' : 'none' }}>Customers</span>
                </Link>
              </li>

              <li className={`d-flex flex-row ${activeLinks["Reports"] ? "active" : ""}`} onClick={() => handleLinkClick("Reports")}>
                <Link to="/reports" className={`sidebar-link ${activeLinks["Reports"] ? "clicked" : ""}`} alt="Reports icon">
                  <BsFillFileEarmarkBarGraphFill className={`sidebar-icon ${activeLinks["Reports"] ? "clicked" : ""}`} />
                  <span className="sidebar-text" style={{ display: isOpen ? 'block' : 'none' }}>Reports</span>
                </Link>
              </li>


              <li className={`d-flex flex-row ${activeLinks["Expenses"] ? "active" : ""}`} onClick={() => handleLinkClick("Expenses")}>
                <Link to="/expenses" className={`sidebar-link ${activeLinks["Expenses"] ? "clicked" : ""}`} alt="Expenses icon">
                  <FaMoneyCheckAlt className={`sidebar-icon ${activeLinks["Expenses"] ? "clicked" : ""}`} />
                  <span className="sidebar-text" style={{ display: isOpen ? 'block' : 'none' }}>Expenses</span>
                </Link>
              </li>



            </ul>
          </div>
          <div className="top_section d-flex align-items-center justify-content-center">
            <div className="sidebar-right-arrow-left d-flex align-items-center justify-content-center" onClick={toggle}>
              <IoIosArrowForward className="bars" />
            </div>

          </div>
        </div>

      </div>

    </div>

  )
}


export default Sidebar;

