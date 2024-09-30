import React, { useEffect, useState } from "react";
import { IntlProvider } from 'react-intl';
import Topbar from "./Components/Topbar";
import Sidebar from "./Components/Sidebar";
import messagesEn from './locales/en.json';
import messagesFr from './locales/fr.json';
import messagesEs from './locales/es.json';
import "./Styles/Topbar.css";
import "./Styles/Styles.css";


import { BrowserRouter as Router, Switch, Route, Redirect, Routes } from 'react-router-dom';

import Project from "./Displaypages/Project/Project";

import Home from "./Displaypages/Home/Home";
import Homeclient from "./Displaypages/Client/ClientHome.js";
import TimeSheetpage from "./Displaypages/Timesheet/Timesheetpage.js";
import MonthlyAddnewtimesheet from "./Displaypages/Timesheet/Monthly/MonthlyAddnewtimesheet.js";
import "./index.css";
import Department from "./Displaypages/Organization/Department.js";

import WeeklyAddnewtimesheet from "./Displaypages/Timesheet/Weekly/WeeklyAddnewtimesheet.js";
import DailyAddnewtimesheet from "./Displaypages/Timesheet/Daily/DailyAddnewtimesheet.js";

import ExpenseTracker from "./Displaypages/Expense/Expense.js";

import SemimonthlyAddnewtimesheet from "./Displaypages/Timesheet/Semimonthly/SemimonthlyAddnewtimesheet.js";
import ByweeklyAddnewtimesheet from "./Displaypages/Timesheet/BiWeekly/BiweeklyAddnewtimesheet.js";

import Organization from "./Displaypages/Organization/Organization.js";

import HomePage from "./Displaypages/Home/Home";
import Reports from "./Displaypages/Reports/Reports.js";

import Forgot from "./Displaypages/Login/forgotpassword.js";
import Resetpassword from "./Displaypages/Login/Resetpassword.js";
import LoginPage from "./Displaypages/Login/Loginpage.js";

import UserProfile from "./Displaypages/userProfile/UserProfile.js";

import SettingsPages from "./Displaypages/settings/settingspage.js";
import GeneralSettings from "./Displaypages/settings/GeneralSettings.js";
import Roles from "./Displaypages/settings/UserAccessControl/Roles.js";
import Permission from "./Displaypages/settings/UserAccessControl/Permission.js";
import IpGeoRestrict from "./Displaypages/settings/UserAccessControl/IpGeoRestrict.js";
import Module from "./Displaypages/settings/UserAccessControl/Module.js";
import MyTimesheet from "./Displaypages/Timesheet/MyTimesheet.js";
import Timesheetapprovals from "./Displaypages/Timesheet/Timesheetapprovals.js";

import PaymentRoute  from "./Displaypages/settings/Payment/payroute.js"

import Payment from "./payment/PaymentForm.js"

function App() {

  const messages = {
    'en-US': messagesEn,
    'fr': messagesFr,
    'es': messagesEs
  };
  const [locale, setLocale] = React.useState('');

  useEffect(() => {
    if (!locale) {
      const systemLanguage = navigator.language || navigator.userLanguage;
      setLocale(systemLanguage);
    }
  }, [locale]);


  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      <Router>
        <Routes>



          <Route path="/" element={<Layout><Home locale={locale} setLocale={setLocale} /></Layout>} />
          <Route path="/home" element={<Layout><Home locale={locale} setLocale={setLocale} /></Layout>} />
          <Route path="/timesheet" element={<Layout><TimeSheetpage locale={locale} setLocale={setLocale} /></Layout>} />
          <Route path="/timesheet/mytimesheet" element={<MyTimesheet />} />
          <Route path="/timesheet/add-month-timesheet" element={<Layout><MonthlyAddnewtimesheet /></Layout>} />
          <Route path="/timesheet/add-week-timesheet" element={<WeeklyAddnewtimesheet />} />
          <Route path="/timesheet/add-day-timesheet" element={<Layout><DailyAddnewtimesheet /></Layout>} />
          <Route path="/timesheet/add-biweek-timesheet" element={<Layout><ByweeklyAddnewtimesheet /></Layout>} />
          <Route path="/timesheet/add-semimonth-timesheet" element={<SemimonthlyAddnewtimesheet />} />
          <Route path="/project" element={<Layout><Project locale={locale} setLocale={setLocale} /></Layout>} />
          <Route path="/timesheet/timesheetapprovals" element={<Timesheetapprovals />} />
          <Route path="/clients" element={<Layout><Homeclient locale={locale} setLocale={setLocale} /></Layout>} />
          <Route path="/Organization" element={<Layout><Organization locale={locale} setLocale={setLocale} /></Layout>} />
          <Route path="/expenses" element={<Layout><ExpenseTracker /></Layout>} />
          <Route path="/department" element={<Layout><Department locale={locale} setLocale={setLocale} /></Layout>} />
          <Route path="/reports" element={<Layout><Reports /></Layout>} />
          <Route path="/forgot" element={<Layout><Forgot /></Layout>} />
          <Route path="/resetpassword" element={<Layout><Resetpassword /></Layout>} />
          <Route path="/userprofile" element={<Layout><UserProfile /></Layout>} />
          <Route path="/settings/general" element={<AdminElement><GeneralSettings /></AdminElement>} />
          <Route path="/settings/UserAcceesControl/Roles" element={<Roles />} />
          <Route path="/settings/UserAcceesControl/Permission" element={<Permission />} />
          <Route path="/settings/UserAcceesControl/IpGeoRestrict" element={<IpGeoRestrict />} />
          <Route path="/settings/UserAcceesControl/Module" element={<Module />} />
          <Route path="/payment" element={<Payment />} />
          <Route element={<PaymentRoute/>} />



        </Routes>
      </Router>
    </IntlProvider>
  );
}

function Layout({ children }) {
  return (
    <>
      {children}
    </>
  );
}

export default App;





function AdminElement({ children }) {
  if (currentuser === roletype.ADMIN) {
    return (children);
  }
  else {
    return (
    <div>
      You do not have permission to access this page
    </div>);
  }
}


const roletype = {
  ADMIN: 'admin',
  USER: 'user',
}

const currentuser = roletype.ADMIN;


// import React, { useEffect , useState } from "react";
// import { IntlProvider } from 'react-intl';
// import Topbar from "./Components/Topbar";
// import Sidebar from "./Components/Sidebar";
// import messagesEn from './locales/en.json';
// import messagesFr from './locales/fr.json';
// import messagesEs from './locales/es.json';
// import "./Styles/Topbar.css";
// import "./Styles/Styles.css";

// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// import Project from "./Displaypages/Project/Project";

// import Home from "./Displaypages/Home/Home";
// import Homeclient from "./Displaypages/Client/ClientHome.js";
// import TimeSheetpage from "./Displaypages/Timesheet/Timesheetpage.js";
// import MonthlyAddnewtimesheet from "./Displaypages/Timesheet/Monthly/MonthlyAddnewtimesheet.js";
// import "./index.css";
// import Department from "./Displaypages/Organization/Department.js";
// // import Mytimesheet from "./Displaypages/Timesheet/Timesheetentry.js";



// // import Mytimesheet from "./Displaypages/Timesheet/Timesheetentry.js";

// import WeeklyAddnewtimesheet from "./Displaypages/Timesheet/Weekly/WeeklyAddnewtimesheet.js";
// import DailyAddnewtimesheet from "./Displaypages/Timesheet/Daily/DailyAddnewtimesheet.js";


// // Expence import
// import ExpenseTracker from "./Displaypages/Expense/Expense.js";
// // import ExpenseCreatePage from "./Displaypages/Expense/Add-Expense.js";




// import SemimonthlyAddnewtimesheet from "./Displaypages/Timesheet/Semimonthly/SemimonthlyAddnewtimesheet.js";
// import ByweeklyAddnewtimesheet from "./Displaypages/Timesheet/BiWeekly/BiweeklyAddnewtimesheet.js";

// import Organization from "./Displaypages/Organization/Organization.js";

// import HomePage from "./Displaypages/Home/Home";
// import Reports from "./Displaypages/Reports/Reports.js";

// import Forgot from "./Displaypages/Login/forgotpassword.js";
// import Resetpassword from "./Displaypages/Login/Resetpassword.js";
// import LoginPage from "./Displaypages/Login/Loginpage.js";

// import UserProfile from "./Displaypages/userProfile/UserProfile.js";


// import SettingsPages from "./Displaypages/settings/settingspage.js";
// import GeneralSettings from "./Displaypages/settings/GeneralSettings.js";
// import Roles from "./Displaypages/settings/UserAccessControl/Roles.js";
// import Permission from "./Displaypages/settings/UserAccessControl/Permission.js";
// import IpGeoRestrict from "./Displaypages/settings/UserAccessControl/IpGeoRestrict.js";
// import Module from "./Displaypages/settings/UserAccessControl/Module.js";
// import MyTimesheet from "./Displaypages/Timesheet/MyTimesheet.js";
// import Timesheetapprovals from "./Displaypages/Timesheet/Timesheetapprovals.js";



// function App() {

//   const messages = {
//     'en-US': messagesEn,
//     'fr': messagesFr,
//     'es': messagesEs
//   };
//   const [isAuthenticated, setIsAuthenticated] = React.useState('');
//   const [locale, setLocale] = React.useState('');


//   useEffect(() => {
//     setIsAuthenticated(localStorage.getItem('userInfo') != null);
//     console.log(isAuthenticated);
//     if (!locale){
//     const systemLanguage = navigator.language || navigator.userLanguage;
//     setLocale(systemLanguage);
//   }
//   },[locale]);

//   return (
//     <IntlProvider locale={locale} messages={messages[locale]}>

//       <Router>
//       <Routes>
//         <Route path="/" element={<LoginPage />}></Route>
//         <Route
//   path="/home"
//   element={isAuthenticated ? <Layout><HomePage  /></Layout> : <Navigate to="/" />}
// />

//         {/* // <Route path="/home" element={<Home locale={locale} setLocale={setLocale} />} /> */}

//         <Route path="/timesheet" element={isAuthenticated ? <Layout><TimeSheetpage locale={locale} setLocale={setLocale} /></Layout> : <Navigate to="/"/>} />
//         <Route path="/timesheet/mytimesheet" element={isAuthenticated ? <MyTimesheet/> : <Navigate to="/"></Navigate>} />
//         {/* <Route path="/timesheet/timesheetentry" element={isAuthenticated ? <Layout><Mytimesheet locale={locale} setLocale={setLocale} ></Mytimesheet></Layout> :<Navigate to="/"/>} /> */}
//         <Route
//           path="/timesheet/add-month-timesheet"
//           element={isAuthenticated ? <Layout><MonthlyAddnewtimesheet /></Layout> :<Navigate to="/"></Navigate>}
//         />
//         <Route
//           path="/timesheet/add-week-timesheet"
//           element={isAuthenticated ? <WeeklyAddnewtimesheet /> :<Navigate to="/"></Navigate>}
//         />
//         <Route
//           path="/timesheet/add-day-timesheet"
//           element={isAuthenticated ? <Layout><DailyAddnewtimesheet /></Layout> : <Navigate to="/"></Navigate>}
//         />
//         {/* <Route
//           path="/timesheet/add-semimonth-timesheet"
//           element={<SemimonthlyAddnewtimesheet />}
//         /> */}
//         <Route
//           path="/timesheet/add-biweek-timesheet"
//           element={isAuthenticated ? <Layout><ByweeklyAddnewtimesheet /></Layout> : <Navigate to="/" ></Navigate>}
//         />
//         <Route path="/timesheet/add-semimonth-timesheet" element={isAuthenticated ? <SemimonthlyAddnewtimesheet/> : <Navigate to="/"></Navigate>}/>
//         {/* <Route path="/timesheet/add-week-timesheet" element={<WeeklyAddnewtimesheet/>}/> */}
//         {/* <Route path="/timesheet/add-semimonth-timesheet" element={<SemimonthlyAddnewtimesheet/>}/> */}
//         {/* <Route path="/timesheet/add-biweek-timesheet" element={<ByweeklyAddnewtimesheet/>}/> */}

//         <Route path="/project" element={isAuthenticated ? <Layout><Project locale={locale} setLocale={setLocale}/></Layout> : <Navigate to="/"></Navigate>} />
//         <Route path="/timesheet/timesheetapprovals" element={ isAuthenticated ? <Timesheetapprovals/> : <Navigate to = "/"></Navigate>} />
//         <Route path="/clients" element={isAuthenticated ? <Layout><Homeclient locale={locale} setLocale={setLocale}/></Layout> : <Navigate to="/"></Navigate>} />
// {/*
//         <Route path="/jobs" element={isAuthenticated ? <Job />:<Navigate to="/"></Navigate>} />
//         <Route path="/jobs/createjob" element={isAuthenticated ? <AddJob /> :<Navigate to="/"></Navigate>} />
//         <Route path="/updatejob" element={isAuthenticated ? <Updatejob /> : <Navigate to="/"></Navigate>} /> */}
//         <Route path="/Organization" element={isAuthenticated ? <Layout><Organization locale={locale} setLocale={setLocale}/></Layout> :<Navigate to="/"></Navigate>} />
//         <Route path="/expenses" element={isAuthenticated ? <Layout><ExpenseTracker /></Layout> :<Navigate to="/"></Navigate>} />
//         {/* <Route path="/expense/createexpense" element={isAuthenticated ? <Layout><ExpenseCreatePage /></Layout> : <Navigate to ="/"></Navigate>} /> */}
//         {/* <Route path="/expense/bulkexpense" element={isAuthenticated ? <ExpenseReportPage /> : <Navigate to="/"></Navigate>} /> */}
//         <Route path="/department" element={isAuthenticated ? <Layout><Department locale={locale} setLocale={setLocale}/></Layout> : <Navigate to="/"></Navigate>} />
//         <Route path="/reports" element={isAuthenticated ? <Layout><Reports /></Layout> : <Navigate to="/"></Navigate>} />
//         <Route path="/forgot" element={isAuthenticated ? <Layout><Forgot /></Layout> : <Navigate to="/"></Navigate>} />
//         <Route path="/resetpassword" element={isAuthenticated ? <Layout><Resetpassword /></Layout>:<Navigate to="/"></Navigate>} />
//         <Route path="/userprofile" element={isAuthenticated ? <Layout><UserProfile /></Layout>:<Navigate to="/"></Navigate>} />
//         <Route path="/settings/general" element={isAuthenticated ? <GeneralSettings/>: <Navigate to="/"></Navigate>} />
//         <Route path="/settings/UserAcceesControl/Roles" element={isAuthenticated ? <Roles/>: <Navigate to="/"></Navigate>} />
//         <Route path="/settings/UserAcceesControl/Permission" element={isAuthenticated ?<Permission/> : <Navigate to="/"></Navigate>} />
//         <Route path="/settings/UserAcceesControl/IpGeoRestrict" element={isAuthenticated ? <IpGeoRestrict/> : <Navigate to="/"></Navigate>} />
//         <Route path="/settings/UserAcceesControl/Module" element={isAuthenticated ? <Module/>:<Navigate to="/"></Navigate>} />
//       </Routes>
//       </Router>
//     </IntlProvider>
//   );
// }

// function Layout({ children }) {
//   return (
//     <>
//       {/* <Topbar /> */}
//       {children}
//     </>
//   );
// }

// export default App;