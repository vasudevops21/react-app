import React, { useState } from 'react';
import './MyTimesheet.css';


import { Link } from 'react-router-dom';
import Topbar from "../../Components/Topbar";
import Grid from '@mui/material/Grid';


import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Sidebar from '../../Components/Sidebar';

import MUIDataTable from "mui-datatables";
import { IconButton } from "@mui/material";
import GetAppIcon from "@mui/icons-material/GetApp";
import PrintIcon from "@mui/icons-material/Print";
import EditIcon from "@mui/icons-material/Edit";

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { HiMail } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { BsFillArrowDownCircleFill } from "react-icons/bs";
import { AiFillCloseCircle } from "react-icons/ai";
import { TiExportOutline } from "react-icons/ti";


function MyTimesheet() {


  const [value, setValue] = React.useState('1');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };



  const columns = [
    {
      name: "id",
      label: "S.No",
      options: {
        filter: true,
        sort: false,
        setCellProps: () => ({
          align: "center",
          style: { color: 'rgba(0,0,0,0.50' , fontSize: '16px' , fontWeight: 400},
        }),
        setCellHeaderProps: (value) => ({
          align: "center",
          style: { height: '70px' , color: '#FFF' , fontSize: '16px', fontWeight: 700},
        }),
      }
    },
    {
      name: "empname",
      label: "Emp Name",
      options: {
        filter: true,
        sort: false,
        setCellProps: () => ({
          align: "center",
          style: { color: 'rgba(0,0,0,0.50' , fontSize: '16px' , fontWeight: 400},
        }),
        setCellHeaderProps: (value) => ({
          align: "center",
          style: { minWidth: '200px' , height: '70px' , color: '#FFF' , fontSize: '16px', fontWeight: 700},
        }),
      }
    },
    {
      name: "empid",
      label: "Emp ID",
      options: {
        filter: true,
        sort: false,
        setCellProps: () => ({
          align: "center",
          style: { color: 'rgba(0,0,0,0.50' , fontSize: '16px' , fontWeight: 400},
        }),
        setCellHeaderProps: (value) => ({
          align: "center",
          style: { minWidth: '200px' , height: '70px' , color: '#FFF' , fontSize: '16px', fontWeight: 700},
        }),
      }
    },
    {
      name: "timeperiod",
      label: "Time Period",
      options: {
        filter: true,
        sort: false,
        setCellProps: () => ({
          align: "center",
          style: { color: 'rgba(0,0,0,0.50' , fontSize: '16px' , fontWeight: 400},
        }),
        setCellHeaderProps: (value) => ({
          align: "center",
          style: { minWidth: '220px' , height: '70px' , color: '#FFF' , fontSize: '16px', fontWeight: 700},
        }),
      }
    },
    {
      name: "projectname",
      label: "Project Name",
      options: {
        filter: true,
        sort: false,
        setCellProps: () => ({
          align: "center",
          style: { color: 'rgba(0,0,0,0.50' , fontSize: '16px' , fontWeight: 400},
        }),
        setCellHeaderProps: (value) => ({
          align: "center",
          style: { minWidth: '200px' , height: '70px' , color: '#FFF' , fontSize: '16px', fontWeight: 700},
        }),
      }
    },
    {
      name: "projectid",
      label: "Project Id",
      options: {
        filter: true,
        sort: false,
        setCellProps: () => ({
          align: "center",
          style: { color: 'rgba(0,0,0,0.50' , fontSize: '16px' , fontWeight: 400},
        }),
        setCellHeaderProps: (value) => ({
          align: "center",
          style: { minWidth: '200px' , height: '70px' , color: '#FFF' , fontSize: '16px', fontWeight: 700},
        }),
      }
    },
    {
      name: "taskname",
      label: "Task Name",
      options: {
        filter: true,
        sort: false,
        setCellProps: () => ({
          align: "center",
          style: { color: 'rgba(0,0,0,0.50' , fontSize: '16px' , fontWeight: 400},
        }),
        setCellHeaderProps: (value) => ({
          align: "center",
          style: { minWidth: '200px' , height: '70px' , color: '#FFF' , fontSize: '16px', fontWeight: 700},
        }),
      }
    },
    {
      name: "revision",
      label: "Revision",
      options: {
        filter: true,
        sort: false,
        setCellProps: () => ({
          align: "center",
          style: { color: 'rgba(0,0,0,0.50' , fontSize: '16px' , fontWeight: 400},
        }),
        setCellHeaderProps: (value) => ({
          align: "center",
          style: { height: '70px' , color: '#FFF' , fontSize: '16px', fontWeight: 700},
        }),
      }
    },
    {
      name: "totalhours",
      label: "Total Hours",
      options: {
        filter: true,
        sort: false,
        setCellProps: () => ({
          align: "center",
          style: { color: 'rgba(0,0,0,0.50' , fontSize: '16px' , fontWeight: 400},
        }),
        setCellHeaderProps: (value) => ({
          align: "center",
          style: { minWidth: '200px' , height: '70px' , color: '#FFF' , fontSize: '16px', fontWeight: 700},
        }),
      }
    },
    {
      name: "status",
      label: "Status",
      options: {
        filter: true,
        sort: false,
        setCellProps: () => ({
          align: "center",
          style: { color: 'rgba(0,0,0,0.50' , fontSize: '16px' , fontWeight: 400},
        }),
        setCellHeaderProps: (value) => ({
          align: "center",
          style: { minWidth: '200px' , height: '70px' , color: '#FFF' , fontSize: '16px', fontWeight: 700},
        }),
      }
    },
    {
      name: "billtype",
      label: "Bill Type",
      options: {
        filter: true,
        sort: false,
        setCellProps: () => ({
          align: "center",
          style: { color: 'rgba(0,0,0,0.50' , fontSize: '16px' , fontWeight: 400},
        }),
        setCellHeaderProps: (value) => ({
          align: "center",
          style: { minWidth: '200px' , height: '70px' , color: '#FFF' , fontSize: '16px', fontWeight: 700 },
        }),
      }
    },
    {
      name: "options",
      label: "Options",
      options: {
        filter: true,
        sort: false,
        setCellProps: () => ({
          align: "center",
          style: { position: "sticky", right: -1, backgroundColor: '#EEECEC' , color: 'rgba(0,0,0,0.50' , fontSize: '16px' , fontWeight: 400 },
        }),
        setCellHeaderProps: (value) => ({
          className: "centeredHeaderCell",
          align: "center",
          style: { position: "sticky", right: -1, backgroundColor: '#EEECEC' },
        }),
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <div className='d-flex flex-row align-items-center my-timesheet-table-data-option-button-view-edit-delete'>
              <div className="button btn my-timesheet-table-data-option-button-view d-flex flex-row">
                <div className='pe-1 d-flex align-items-center'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
                    <path d="M6.00016 2.97332C6.64696 2.76828 7.32165 2.66482 8.00016 2.66665C10.7882 2.66665 12.6855 4.33332 13.8168 5.80265C14.3835 6.53998 14.6668 6.90732 14.6668 7.99998C14.6668 9.09332 14.3835 9.46065 13.8168 10.1973C12.6855 11.6666 10.7882 13.3333 8.00016 13.3333C5.21216 13.3333 3.31483 11.6666 2.1835 10.1973C1.61683 9.46132 1.3335 9.09265 1.3335 7.99998C1.3335 6.90665 1.61683 6.53932 2.1835 5.80265C2.52907 5.35112 2.9139 4.93104 3.3335 4.54732" stroke="white" strokeLinecap="round" />
                    <path d="M10 7.99997C10 8.5304 9.78929 9.03911 9.41421 9.41418C9.03914 9.78926 8.53043 9.99997 8 9.99997C7.46957 9.99997 6.96086 9.78926 6.58579 9.41418C6.21071 9.03911 6 8.5304 6 7.99997C6 7.46954 6.21071 6.96083 6.58579 6.58576C6.96086 6.21068 7.46957 5.99997 8 5.99997C8.53043 5.99997 9.03914 6.21068 9.41421 6.58576C9.78929 6.96083 10 7.46954 10 7.99997Z" stroke="white" />
                  </svg>
                </div>
                <div className='d-flex align-items-center'>View</div>
              </div>
              <div className="button btn my-timesheet-table-data-option-button-edit d-flex flex-row ">
                <div className='pe-1 d-flex align-items-center'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                    <path d="M2.84458 11.788C4.69943 13.6429 7.11029 14.1986 8.29543 14.3126C8.64372 14.3526 8.838 14.1383 8.86458 13.9174C8.89143 13.6832 8.744 13.4286 8.40943 13.3817C7.338 13.2343 5.12143 12.7523 3.51429 11.1252C0.889147 8.49344 0.393718 4.51572 2.53658 2.37287C4.27772 0.638582 7.17715 0.859439 9.31343 2.01115L10.0097 1.33487C7.41143 -0.225419 3.916 -0.352561 1.86686 1.70315C-0.570568 4.14744 -0.249139 8.6943 2.84458 11.788ZM12.6617 2.29915L13.1971 1.76344C13.4514 1.50915 13.4651 1.13401 13.204 0.892867L13.0297 0.732296C12.8023 0.51801 12.4471 0.524582 12.1994 0.758867L11.6706 1.30144L12.6617 2.29915ZM6.15943 8.78773L12.1726 2.78115L11.1749 1.7903L5.16829 7.7903L4.61258 9.06915C4.55886 9.20973 4.69943 9.35058 4.84686 9.30344L6.15943 8.78773ZM5.28229 9.78572C7.47172 11.9754 10.994 12.8394 12.9629 10.8772C14.57 9.26344 14.3623 6.39715 12.6414 3.93315L11.9586 4.61601C13.3243 6.6383 13.5923 8.90858 12.2931 10.2074C10.7131 11.788 8.10115 11.038 6.30657 9.34372L5.28229 9.78572Z" fill="white" />
                  </svg>
                </div>
                <div className='d-flex align-items-center'>Edit</div>
              </div>
              <div className="button btn my-timesheet-table-data-option-button-delete d-flex flex-row ">
                <div className='pe-1 d-flex align-items-center'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="13" height="15" viewBox="0 0 13 15" fill="none">
                    <path d="M1.71112 5.6904L2.59192 14.4168C2.64072 14.7856 4.42152 15.9984 6.99992 16C9.57992 15.9984 11.3607 14.7856 11.4087 14.4168L12.2903 5.6904C10.9431 6.444 8.92952 6.8 6.99992 6.8C5.07192 6.8 3.05752 6.444 1.71112 5.6904ZM9.53432 1.208L8.84712 0.4472C8.58152 0.0688 8.29352 0 7.73272 0H6.26792C5.70792 0 5.41912 0.0688 5.15432 0.4472L4.46712 1.208C2.41112 1.5672 0.919922 2.52 0.919922 3.2232V3.3592C0.919922 4.5968 3.64232 5.6 6.99992 5.6C10.3583 5.6 13.0807 4.5968 13.0807 3.3592V3.2232C13.0807 2.52 11.5903 1.5672 9.53432 1.208ZM8.65592 3.472L7.79992 2.4H6.19992L5.34552 3.472H3.98552C3.98552 3.472 5.47512 1.6952 5.67432 1.4544C5.82632 1.2704 5.98152 1.2 6.18312 1.2H7.81752C8.01992 1.2 8.17512 1.2704 8.32712 1.4544C8.52552 1.6952 10.0159 3.472 10.0159 3.472H8.65592Z" fill="white" />
                  </svg>
                </div>
                <div className='d-flex align-items-center'>Delete</div>
              </div>
            </div>

          );
        },
      }
    },
  ];

  const data = [
    {
      id: 1,
      empname: "Joe James",
      empid: "EMP001",
      timeperiod: "2024-03-05 - 2024-03-05",
      projectname: "Project ABC",
      projectid: "PRJ001",
      taskname: "Task XYZ",
      revision: 1,
      totalhours: 40,
      status: "Approved",
      billtype: "Hourly",
      options: "Edit/Delete",
    },
    {
      id: 2,
      empname: "Joe James",
      empid: "EMP002",
      timeperiod: "2024-03-05 - 2024-03-05",
      projectname: "Project ABC",
      projectid: "PRJ001",
      taskname: "Task XYZ",
      revision: 1,
      totalhours: 40,
      status: "Approved",
      billtype: "Hourly",
      options: "Edit/Delete",
    },
    {
      id: 3,
      empname: "Joe James",
      empid: "EMP003",
      timeperiod: "2024-03-05 - 2024-03-05",
      projectname: "Project ABC",
      projectid: "PRJ001",
      taskname: "Task XYZ",
      revision: 1,
      totalhours: 40,
      status: "Approved",
      billtype: "Hourly",
      options: "Edit/Delete",
    },
    {
      id: 4,
      empname: "Joe James",
      empid: "EMP004",
      timeperiod: "2024-03-05 - 2024-03-05",
      projectname: "Project ABC",
      projectid: "PRJ001",
      taskname: "Task XYZ",
      revision: 1,
      totalhours: 40,
      status: "Approved",
      billtype: "Hourly",
      options: "Edit/Delete",
    },
  ];

  const options = {
    pagination: false,
    selectableRows: false,
    tableBodyHeight: "370px",
    download: false,
    print: false,
    responsive: "standard",
    customToolbar: () => (
      <>
        <IconButton >
          <GetAppIcon data-bs-toggle="modal" data-bs-target="#exportpopupModal" />
        </IconButton>
        {/* { <IconButton>
          <PrintIcon />
        </IconButton> } */}
      </>
    ),
  };




  return (
    <div>
      <Topbar />
      <div className="d-flex">
        {/* <Sidebar/> */}
        <Sidebar />
        <div className='container' style={{ overflow: 'auto', maxHeight: 'calc(100vh - 50px)' }}>
          <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>

              <Box sx={{ paddingTop: '10px' }}>
                <TabList onChange={handleChange} TabIndicatorProps={{
                  style: {
                    backgroundColor: '#787DBD',
                  }
                }}
                >
                  <Tab component={Link} to="/timesheet" label="Add TimeSheet" value="2" sx={{
                    '&.Mui-selected': {
                      color: '#787DBD',
                    },
                    color: '#787DBD',
                    marginRight: '30px',
                    textTransform: 'none',
                    fontSize: '16px',
                    fontWeight: 'bold',
                  }} />
                  <Tab component={Link} to="/timesheet/mytimesheet" label="My Timesheet" value="1" sx={{
                    '&.Mui-selected': {
                      color: '#787DBD',
                    },
                    color: '#787DBD',
                    textTransform: 'none',
                    marginRight: '30px',
                    fontSize: '16px',
                    fontWeight: 'bold',
                  }} />
                  <Tab component={Link} to="/timesheet/timesheetapprovals" label="Approvals" value="3" sx={{
                    '&.Mui-selected': {
                      color: '#787DBD',
                    },
                    color: '#787DBD',
                    textTransform: 'none',
                    fontSize: '16px',
                    fontWeight: 'bold',
                  }} />
                </TabList>
              </Box>

              <TabPanel value="1" className="scrollable-tab-panel mx-2" >
                <div>
                  <div className='container' >
                    <div className='timesheet-week-mytimesheet-table-box'>
                      <div className='timesheet-week-mytimesheet-table-datas'>
                        <MUIDataTable className='timesheet-week-mytimesheet-table-datas-mui '
                          // title={"My Timesheet List"}
                          data={data}
                          columns={columns}
                          options={options}
                        />

                        {/* popup for export start */}
                        <div className="modal fade" id="exportpopupModal" tabindex="-1" aria-labelledby="exportpopupModalLabel" aria-hidden="true">
                          <div className="modal-dialog modal-dialog-centered export-my-timesheet">
                            <div className="modal-content timesheet-weekly-export-download-model">
                              {/* <div class="modal-header timesheet-weekly-export-download-modal-header">
                                
                              </div> */}
                              <div class="modal-body timesheet-weekly-export-download-modal-body">
                                <div>
                                  <div className='d-flex flex-row justify-content-between'>
                                    <div className='d-flex flex-column'>
                                      <h5 class="modal-title timesheet-weekly-export-download-model-title" id="exportpopupModalLabel">EXPORT</h5>
                                      <p class="timesheet-weekly-export-download-model-title-p">QUICKLY SAVE YOUR TIMESHEETS IN VARIOUS FORMATS</p>
                                    </div>
                                    <button type="button" className="timesheet-weekly-export-download-model-close-icon " data-bs-dismiss="modal" aria-label="Close"><IoClose style={{ fontSize: '20px', paddingBottom: '3px' }} /></button>
                                  </div>
                                  <div className="timesheet-weekly-export-download-empty-line "></div>
                                  <div className='d-flex flex-row justify-content-between timesheet-weekemail-passing-export-format-export'>
                                    <div className='email-passing-export-timesheet-week' >
                                      <label className='email-passing-export-timesheet-week-label'>Enter your email to export</label>
                                      <div className='d-flex flex-row email-passing-export-timesheet-week-input-and-icon'>
                                        {/* <HiMail className='email-passing-export-timesheet-week-icon' /> */}
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                                          <path d="M12 21C10.758 21 9.589 20.764 8.493 20.292C7.39767 19.8193 6.44467 19.178 5.634 18.368C4.82333 17.5587 4.18167 16.6067 3.709 15.512C3.23633 14.4173 3 13.2477 3 12.003C3 10.759 3.236 9.589 3.708 8.493C4.18067 7.39767 4.822 6.44467 5.632 5.634C6.44133 4.82333 7.39333 4.18167 8.488 3.709C9.58267 3.23633 10.7523 3 11.997 3C13.241 3 14.411 3.23633 15.507 3.709C16.603 4.18167 17.556 4.823 18.366 5.633C19.1767 6.443 19.8183 7.39533 20.291 8.49C20.7637 9.58533 21 10.7553 21 12V12.988C21 13.8307 20.7107 14.5433 20.132 15.126C19.5533 15.7087 18.8427 16 18 16C17.404 16 16.8607 15.8367 16.37 15.51C15.8787 15.1833 15.5153 14.748 15.28 14.204C14.9 14.7513 14.425 15.1877 13.855 15.513C13.285 15.8377 12.6667 16 12 16C10.886 16 9.94067 15.612 9.164 14.836C8.38733 14.06 7.99933 13.1147 8 12C8 10.886 8.388 9.94067 9.164 9.164C9.94 8.38733 10.8853 7.99933 12 8C13.114 8 14.0593 8.388 14.836 9.164C15.6127 9.94 16.0007 10.8853 16 12V12.988C16 13.5373 16.196 14.01 16.588 14.406C16.9807 14.802 17.4513 15 18 15C18.5487 15 19.0193 14.802 19.412 14.406C19.804 14.01 20 13.5373 20 12.988V12C20 9.76667 19.225 7.875 17.675 6.325C16.125 4.775 14.2333 4 12 4C9.76667 4 7.875 4.775 6.325 6.325C4.775 7.875 4 9.76667 4 12C4 14.2333 4.775 16.125 6.325 17.675C7.875 19.225 9.76667 20 12 20H17V21H12ZM12 15C12.8333 15 13.5417 14.7083 14.125 14.125C14.7083 13.5417 15 12.8333 15 12C15 11.1667 14.7083 10.4583 14.125 9.875C13.5417 9.29167 12.8333 9 12 9C11.1667 9 10.4583 9.29167 9.875 9.875C9.29167 10.4583 9 11.1667 9 12C9 12.8333 9.29167 13.5417 9.875 14.125C10.4583 14.7083 11.1667 15 12 15Z" fill="black" fill-opacity="0.5" />
                                        </svg>
                                        <input className='email-passing-export-timesheet-week-input' placeholder='Email ID'></input>
                                      </div>
                                    </div>
                                    <div className='d-flex flex-column format-export-timesheet-week'>
                                      <label className='format-export-timesheet-week-label'>Pick any one format</label>
                                      <select className='format-export-timesheet-week-select'>
                                        <option value="pdf">PDF</option>
                                        <option value="excel">Excel</option>
                                        <option value="doc">Doc</option>
                                        <option value="xml">XML</option>
                                        <option value="csv">CSV</option>
                                        <option value="iff">IFF</option>
                                        <option value="adp">ADP</option>
                                        <option value="dxf">DXF</option>
                                      </select>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div class="modal-footer d-flex justify-content-center timesheet-weekly-export-download-modal-footer">
                                <div className='d-flex flex-row'>
                                  <div className="button btn d-flex flex-row timesheet-weekly-export-download-modal-footer-btn-download">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                                      <g filter="url(#filter0_dd_2576_286)">
                                        <circle cx="15" cy="15" r="13" fill="#D9D9D9" />
                                      </g>
                                      <defs>
                                        <filter id="filter0_dd_2576_286" x="0" y="0" width="30" height="30" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                          <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                          <feOffset dx="1" dy="1" />
                                          <feGaussianBlur stdDeviation="0.5" />
                                          <feComposite in2="hardAlpha" operator="out" />
                                          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                                          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2576_286" />
                                          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                          <feOffset dx="-1" dy="-1" />
                                          <feGaussianBlur stdDeviation="0.5" />
                                          <feComposite in2="hardAlpha" operator="out" />
                                          <feColorMatrix type="matrix" values="0 0 0 0 0.0560025 0 0 0 0 0.600501 0 0 0 0 0.772448 0 0 0 0.15 0" />
                                          <feBlend mode="normal" in2="effect1_dropShadow_2576_286" result="effect2_dropShadow_2576_286" />
                                          <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_2576_286" result="shape" />
                                        </filter>
                                      </defs>
                                      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="-4 0 24 20" fill="none">
                                        <path d="M12 15.577L8.462 12.038L9.169 11.319L11.5 13.65V5H12.5V13.65L14.83 11.32L15.538 12.038L12 15.577ZM5 19V14.962H6V18H18V14.962H19V19H5Z" fill="black" fill-opacity="0.5" />
                                      </svg>
                                    </svg>

                                    {/* <BsFillArrowDownCircleFill className="timesheet-weekly-export-download-modal-footer-btn-download-icon" /> */}
                                    <div className="timesheet-weekly-export-download-modal-footer-btn-download-div">Download</div>
                                  </div>
                                  <div className="button btn d-flex flex-row timesheet-weekly-export-download-modal-footer-btn-export">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                                      <g filter="url(#filter0_dd_2576_297)">
                                        <circle cx="15" cy="15" r="13" fill="#D9D9D9" />
                                      </g>
                                      <defs>
                                        <filter id="filter0_dd_2576_297" x="0" y="0" width="30" height="30" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                          <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                          <feOffset dx="1" dy="1" />
                                          <feGaussianBlur stdDeviation="0.5" />
                                          <feComposite in2="hardAlpha" operator="out" />
                                          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                                          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2576_297" />
                                          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                          <feOffset dx="-1" dy="-1" />
                                          <feGaussianBlur stdDeviation="0.5" />
                                          <feComposite in2="hardAlpha" operator="out" />
                                          <feColorMatrix type="matrix" values="0 0 0 0 0.0560025 0 0 0 0 0.600501 0 0 0 0 0.772448 0 0 0 0.15 0" />
                                          <feBlend mode="normal" in2="effect1_dropShadow_2576_297" result="effect2_dropShadow_2576_297" />
                                          <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_2576_297" result="shape" />
                                        </filter>
                                      </defs>

                                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 -3 13 20" fill="none">
                                        <path d="M16.7188 8.75V16.25C16.7188 16.5401 16.6035 16.8183 16.3984 17.0234C16.1933 17.2285 15.9151 17.3438 15.625 17.3438H4.375C4.08492 17.3438 3.80672 17.2285 3.6016 17.0234C3.39648 16.8183 3.28125 16.5401 3.28125 16.25V8.75C3.28125 8.45992 3.39648 8.18172 3.6016 7.9766C3.80672 7.77148 4.08492 7.65625 4.375 7.65625H6.25C6.37432 7.65625 6.49355 7.70564 6.58146 7.79354C6.66936 7.88145 6.71875 8.00068 6.71875 8.125C6.71875 8.24932 6.66936 8.36855 6.58146 8.45646C6.49355 8.54436 6.37432 8.59375 6.25 8.59375H4.375C4.33356 8.59375 4.29382 8.61021 4.26451 8.63951C4.23521 8.66882 4.21875 8.70856 4.21875 8.75V16.25C4.21875 16.2914 4.23521 16.3312 4.26451 16.3605C4.29382 16.3898 4.33356 16.4062 4.375 16.4062H15.625C15.6664 16.4062 15.7062 16.3898 15.7355 16.3605C15.7648 16.3312 15.7812 16.2914 15.7812 16.25V8.75C15.7812 8.70856 15.7648 8.66882 15.7355 8.63951C15.7062 8.61021 15.6664 8.59375 15.625 8.59375H13.75C13.6257 8.59375 13.5065 8.54436 13.4185 8.45646C13.3306 8.36855 13.2812 8.24932 13.2812 8.125C13.2812 8.00068 13.3306 7.88145 13.4185 7.79354C13.5065 7.70564 13.6257 7.65625 13.75 7.65625H15.625C15.9151 7.65625 16.1933 7.77148 16.3984 7.9766C16.6035 8.18172 16.7188 8.45992 16.7188 8.75ZM7.20625 5.33125L9.53125 3.00703V10.625C9.53125 10.7493 9.58064 10.8685 9.66854 10.9565C9.75645 11.0444 9.87568 11.0938 10 11.0938C10.1243 11.0938 10.2435 11.0444 10.3315 10.9565C10.4194 10.8685 10.4688 10.7493 10.4688 10.625V3.00703L12.7937 5.33125C12.8367 5.3773 12.8884 5.41424 12.9459 5.43986C13.0034 5.46548 13.0655 5.47926 13.1284 5.48037C13.1914 5.48148 13.2539 5.4699 13.3122 5.44633C13.3706 5.42275 13.4236 5.38766 13.4681 5.34315C13.5127 5.29864 13.5478 5.24562 13.5713 5.18725C13.5949 5.12888 13.6065 5.06636 13.6054 5.00342C13.6043 4.94048 13.5905 4.87841 13.5649 4.82091C13.5392 4.76341 13.5023 4.71166 13.4563 4.66875L10.3313 1.54375C10.2434 1.45597 10.1242 1.40666 10 1.40666C9.87578 1.40666 9.75664 1.45597 9.66875 1.54375L6.54375 4.66875C6.4977 4.71166 6.46076 4.76341 6.43514 4.82091C6.40952 4.87841 6.39574 4.94048 6.39463 5.00342C6.39352 5.06636 6.4051 5.12888 6.42867 5.18725C6.45225 5.24562 6.48734 5.29864 6.53185 5.34315C6.57636 5.38766 6.62938 5.42275 6.68775 5.44633C6.74612 5.4699 6.80864 5.48148 6.87158 5.48037C6.93452 5.47926 6.99659 5.46548 7.05409 5.43986C7.11159 5.41424 7.16334 5.3773 7.20625 5.33125Z" fill="black" fill-opacity="0.5" />
                                      </svg>

                                    </svg>

                                    {/* <div className="timesheet-weekly-export-download-modal-footer-btn-export-icon-container">
                                      <TiExportOutline className="timesheet-weekly-export-download-modal-footer-btn-export-icon" />
                                    </div> */}
                                    <div className="timesheet-weekly-export-download-modal-footer-btn-export-div">Export</div>
                                  </div>
                                  <div className="button btn d-flex flex-row timesheet-weekly-export-download-modal-footer-btn-close">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                                      <g filter="url(#filter0_dd_2576_303)">
                                        <circle cx="15" cy="15" r="13" fill="#D9D9D9" />
                                      </g>
                                      <defs>
                                        <filter id="filter0_dd_2576_303" x="0" y="0" width="30" height="30" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                          <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                          <feOffset dx="1" dy="1" />
                                          <feGaussianBlur stdDeviation="0.5" />
                                          <feComposite in2="hardAlpha" operator="out" />
                                          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                                          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2576_303" />
                                          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                          <feOffset dx="-1" dy="-1" />
                                          <feGaussianBlur stdDeviation="0.5" />
                                          <feComposite in2="hardAlpha" operator="out" />
                                          <feColorMatrix type="matrix" values="0 0 0 0 0.0560025 0 0 0 0 0.600501 0 0 0 0 0.772448 0 0 0 0.15 0" />
                                          <feBlend mode="normal" in2="effect1_dropShadow_2576_303" result="effect2_dropShadow_2576_303" />
                                          <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_2576_303" result="shape" />
                                        </filter>
                                      </defs>
                                      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 20 20" fill="none">
                                        <path d="M7.33316 18.2567L6.74316 17.6667L11.4098 13L6.74316 8.33333L7.33316 7.74333L11.9998 12.41L16.6665 7.74333L17.2565 8.33333L12.5898 13L17.2565 17.6667L16.6665 18.2567L11.9998 13.59L7.33316 18.2567Z" fill="black" fill-opacity="0.5" />
                                      </svg>
                                    </svg>

                                    {/* <AiFillCloseCircle className="timesheet-weekly-export-download-modal-footer-btn-close-icon" /> */}
                                    <div className="timesheet-weekly-export-download-modal-footer-btn-close-div">Close</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* popup for export end */}
                      </div>

                    </div>
                  </div>
                </div>
              </TabPanel>
            </TabContext>
          </Box>
        </div>
      </div>
    </div>
  )
}

export default MyTimesheet