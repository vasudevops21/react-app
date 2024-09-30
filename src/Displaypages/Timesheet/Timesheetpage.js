// import React from "react";
import './Timesheetpage.css'
import './../../Styles/Topbar.css'
import LeftSidebar from "../../Components/Sidebar";
import { Link } from 'react-router-dom';
import Topbar from "../../Components/Topbar";
import Grid from '@mui/material/Grid';

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Sidebar from '../../Components/Sidebar';
import Timesheetweekdatadraft from './Timesheetsavedata';


// function TimeSheetpage() {
//     return (
//         <div>
//             <Topbar />
//             <div className="d-flex">
//                 <LeftSidebar />
//                 <div className="timesheet-margin">
//                     <div className="top-timesheet-approval-navbar">
//                         <ul>
//                             <li><Link to='/timesheet/timesheetentry'>Timesheet Entry</Link></li>
//                             <li><a href="#">My Approvals</a></li>
//                             <li><a href="#">My TimeSheet</a></li>
//                         </ul>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// import * as React from 'react';




export default function TimeSheetpage() {

    const [value, setValue] = React.useState('1');


    const handleChange = (event, newValue) => {
        setValue(newValue);
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
                                    <Tab component={Link} to="/timesheet" label="Add TimeSheet" value="1" sx={{
                                        '&.Mui-selected': {
                                            color: '#787DBD',
                                        },
                                        color: '#787DBD',
                                        marginRight: '30px',
                                        textTransform: 'none',
                                        fontSize: '16px',
                                        fontWeight: 'bold',
                                    }} />
                                    <Tab component={Link} to="/timesheet/mytimesheet" label="My Timesheet" value="2" sx={{
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

                            <TabPanel value="1" className="scrollable-tab-panel"  >
                                <div>
                                    <div className='container-fluid' >
                                        <div className="timesheet-top-button row ">
                                            <Link to='/timesheet/add-week-timesheet' className='d-flex justify-content-end'>
                                                <div className="button btn timesheet-create-top-button-btn d-flex">
                                                    <div className="timesheet-create-top-button-btn-div">Create TimeSheet</div>
                                                    <div className='ms-2'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                        <g clip-path="url(#clip0_3328_4684)">
                                                            <path d="M10 0C4.47656 0 0 4.47656 0 10C0 15.5234 4.47656 20 10 20C15.5234 20 20 15.5234 20 10C20 4.47656 15.5234 0 10 0ZM10 18.332C5.39844 18.332 1.66797 14.6016 1.66797 10C1.66797 5.39844 5.39844 1.66797 10 1.66797C14.6016 1.66797 18.332 5.39844 18.332 10C18.332 14.6016 14.6016 18.332 10 18.332ZM10.832 3.33203H9.16406V10.832H15V9.16406H10.832V3.33203Z" fill="white" />
                                                        </g>
                                                        <defs>
                                                            <clipPath id="clip0_3328_4684">
                                                                <rect width="20" height="20" fill="white" />
                                                            </clipPath>
                                                        </defs>
                                                    </svg>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                        <div>
                                            <Timesheetweekdatadraft />
                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                        </TabContext>
                    </Box>
                </div>
            </div>
        </div>

    );
}

// export default TimeSheetpage