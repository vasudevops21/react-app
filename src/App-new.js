
import React, { useEffect , useState } from "react";
import { IntlProvider } from 'react-intl';
import Topbar from "./Components/Topbar";
import Sidebar from "./Components/Sidebar";
import messagesEn from './locales/en.json';
import messagesFr from './locales/fr.json';
import messagesEs from './locales/es.json';
import "./Styles/Topbar.css";
import "./Styles/Styles.css";

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Project from "./Displaypages/Project/Project";

import Home from "./Displaypages/Home/Home";
import Homeclient from "./Displaypages/Client/ClientHome.js";
import TimeSheetpage from "./Displaypages/Timesheet/Timesheetpage.js";
import MonthlyAddnewtimesheet from "./Displaypages/Timesheet/Monthly/MonthlyAddnewtimesheet.js";
import "./index.css";
import Department from "./Displaypages/Organization/Department.js";
// import Mytimesheet from "./Displaypages/Timesheet/Timesheetentry.js";



// import Mytimesheet from "./Displaypages/Timesheet/Timesheetentry.js";

import WeeklyAddnewtimesheet from "./Displaypages/Timesheet/Weekly/WeeklyAddnewtimesheet.js";
import DailyAddnewtimesheet from "./Displaypages/Timesheet/Daily/DailyAddnewtimesheet.js";


// Expence import
import ExpenseTracker from "./Displaypages/Expense/Expense.js";
// import ExpenseCreatePage from "./Displaypages/Expense/Add-Expense.js";




import SemimonthlyAddnewtimesheet from "./Displaypages/Timesheet/Semimonthly/SemimonthlyAddnewtimesheet.js";
import ByweeklyAddnewtimesheet from "./Displaypages/Timesheet/BiWeekly/BiweeklyAddnewtimesheet.js";

import Organization from "./Displaypages/Organization/Organization.js";

import HomePage from "./Displaypages/Home/Home";
import Reports from "./Displaypages/Reports/Reports.js";

import Forgot from "./Displaypages/Login/forgotpassword.js";
import Resetpassword from "./Displaypages/Login/Resetpassword.js";
import LoginPage from "./Displaypages/Login/Loginpage.js";

import UserProfile from "./Displaypages/userProfile/UserProfile.js";

import Task from "./Displaypages/Project/Task.js";

import SettingsPages from "./Displaypages/settings/settingspage.js";
import GeneralSettings from "./Displaypages/settings/GeneralSettings.js";
import Roles from "./Displaypages/settings/UserAccessControl/Roles.js";
import Permission from "./Displaypages/settings/UserAccessControl/Permission.js";
import IpGeoRestrict from "./Displaypages/settings/UserAccessControl/IpGeoRestrict.js";
import Module from "./Displaypages/settings/UserAccessControl/Module.js";
import MyTimesheet from "./Displaypages/Timesheet/MyTimesheet.js";
import Timesheetapprovals from "./Displaypages/Timesheet/Timesheetapprovals.js";
import { hasPermission } from './utils/permissions';


const messages = {
  'us': messagesEn,
  'fr': messagesFr,
  'es': messagesEs
};

function App() {
  const [locale, setLocale] = useState(() => {
    const storedLocale = localStorage.getItem('locale');
    return storedLocale || 'us';
  });

  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route
            path="/home"
            element={<PrivateRoute component={<Home />} requiredPermission="home" locale={locale} setLocale={setLocale} />}
          />
          <Route
            path="/timesheet"
            element={<PrivateRoute component={<TimeSheetpage />} requiredPermission="timesheet" locale={locale} setLocale={setLocale} />}
          />
          <Route
            path="/project"
            element={<PrivateRoute component={<Project />} requiredPermission="project" locale={locale} setLocale={setLocale} />}
          />
          <Route
            path="/clients"
            element={<PrivateRoute component={<Homeclient />} requiredPermission="clients" locale={locale} setLocale={setLocale} />}
          />
          <Route
            path="/organization"
            element={<PrivateRoute component={<Organization />} requiredPermission="organization" locale={locale} setLocale={setLocale} />}
          />
          <Route
            path="/expenses"
            element={<PrivateRoute component={<ExpenseTracker />} requiredPermission="expenses" locale={locale} setLocale={setLocale} />}
          />
          <Route
            path="/department"
            element={<PrivateRoute component={<Department />} requiredPermission="department" locale={locale} setLocale={setLocale} />}
          />
          <Route
            path="/reports"
            element={<PrivateRoute component={<Reports />} requiredPermission="reports" locale={locale} setLocale={setLocale} />}
          />
          <Route
            path="/settings"
            element={<PrivateRoute component={<SettingsPages />} requiredPermission="settings" locale={locale} setLocale={setLocale} />}
          />
          <Route path="/forgot" element={<Forgot />} />
          <Route path="/resetpassword" element={<Resetpassword />} />
          <Route
            path="/userprofile"
            element={<PrivateRoute component={<UserProfile />} requiredPermission="userprofile" locale={locale} setLocale={setLocale} />}
          />
        </Routes>
      </Router>
    </IntlProvider>
  );
}

function PrivateRoute({ component, requiredPermission, locale, setLocale }) {
  const isAuthenticated = localStorage.getItem('userInfo');

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  const hasAccess = hasPermission(requiredPermission);

  if (!hasAccess) {
    // Render a component for unauthorized access
    return <UnauthorizedPage />;
  }

  return React.cloneElement(component, { locale, setLocale });
}

function UnauthorizedPage() {
  return <div>Unauthorized access</div>;
}

export default App;
