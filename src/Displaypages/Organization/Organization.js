import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import axios from "axios";
import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Menu,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Stack,
  Pagination,
} from "@mui/material";
import GetAppIcon from "@mui/icons-material/GetApp";
import Sidebar from "../../Components/Sidebar";
import Topbar from "../../Components/Topbar";
import "./Organization.css";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import PrintIcon from "@mui/icons-material/Print";
import ClearIcon from "@mui/icons-material/Clear";
import { Link } from "react-router-dom";

import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Organization() {
  const [employee, setEmployee] = useState([]);
  const [editedData, setEditedData] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const [openAddEmployeePopup, setOpenAddEmployeePopup] = useState(false);
  const [openEditEmployeePopup, setOpenEditEmployeePopup] = useState(false);
  const [selectedTimezone, setSelectedTimezone] = useState("");
  const [EmployeeID, setEmployeeID] = useState("");
  const [EmployeesID, setEmployeesID] = useState("");
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [EmailID, setEmailID] = useState("");
  const [ContactNumber, setContactNumber] = useState();
  const [Roles, setRoles] = useState("");
  const [email, setEmail] = useState("");
  const [Employementtype, setEmployementtype] = useState("");
  const [employeer, setEmployeer] = useState([]);
  const [selectedFormat, setSelectedFormat] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [Department, setDepartment] = useState({});
  const [department, setdepartment] = useState([]);
  const [value, setValue] = React.useState("1");
  const [currentTime, setCurrentTime] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [errors, setErrors] = useState({
    FirstName: "",
    EmailID: "",
  });

  const validateForm = () => {
    let valid = true;
    //const { name, email, password } = formData;
    const errorsCopy = { ...errors };

    if (!FirstName.trim()) {
      errorsCopy.FirstName = "First Name is required";
      valid = false;
    } else {
      errorsCopy.FirstName = "";
    }

    if (!EmailID.trim()) {
      errorsCopy.EmailID = "Email ID is required";
      valid = false;
    } else {
      errorsCopy.EmailID = "";
    }

    setErrors(errorsCopy);
    return valid;
  };
  const handleClientNameChange = (e) => {
    setFirstName(e.target.value);
    if (errors.FirstName) {
      setErrors((prevErrors) => ({ ...prevErrors, FirstName: "" }));
    }
  };

  const handleEmailidChange = (e) => {
    setEmailID(e.target.value);
    if (errors.EmailID) {
      setErrors((prevErrors) => ({ ...prevErrors, EmailID: "" }));
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (selectedTimezone) {
        const time = new Date().toLocaleString("en-US", {
          timeZone: selectedTimezone,
        });
        setCurrentTime(time);
      }
    }, 1000); // Update time every second

    return () => clearInterval(intervalId);
  }, [selectedTimezone]);

  const handleChanges = (e) => {
    const timezone = e.target.value;
    setSelectedTimezone(timezone);
  };

  const UsaTimezones = [
    { value: "America/New_York", label: "Eastern Time (ET)" },
    { value: "America/Chicago", label: "Central Time (CT)" },
    { value: "America/Denver", label: "Mountain Time (MT)" },
    { value: "America/Los_Angeles", label: "Pacific Time (PT)" },
    // Add more USA timezones as needed
  ];

  const endpoint =
    "http://localhost:8080/api/v1/Organization/getAllOrganization";
  const updateEndpoint = "http://localhost:8080/api/v1/Organization/update";

  async function save(event) {
    event.preventDefault();

    const isValid = validateForm();

    if (!isValid) {
      return; // Do not proceed with saving if form is invalid
    }

    try {
      await axios.post("http://localhost:8080/api/v1/Organization/save", {
        id: EmployeeID,
        employeesid: EmployeesID,
        firstname: FirstName,
        lastname: LastName,
        emailid: EmailID,
        contactnumber: ContactNumber,
        type: Employementtype,
        department: Department ? Department : {},
        role: Roles,
      });

      toast("Employee Registation Successfully");
      setEmployeeID("");
      setEmployeesID("");
      setFirstName("");
      setLastName("");
      setEmailID("");
      setContactNumber("");
      setEmployementtype("");
      setDepartment({});
      setRoles("");
      getData("");
    } catch (err) {
      toast("Employee Registation Failed");
    }
  }

  const getData = async () => {
     
    try {
      const response = await axios.get(endpoint);
      const employeeData = response.data;
    
      // Check if employeeData is valid and an array
      if (employeeData && Array.isArray(employeeData)) {
        // Map over the data to extract specific fields
        const mappedData = employeeData.map((employee) => ({
          id: employee.id,
          employeename: `${employee.firstname} ${employee.lastname}`,
          firstname: employee.firstname, // Default to empty string if field is missing
          lastname: employee.lastname, // Default to empty string if field is missing
          employeesid: employee.employeesid, // Default to empty string if field is missing
          emailid: employee.emailid,
          contactnumber: employee.contactnumber,
          type: employee.type,
          department: employee.department,
          role: employee.role,
        }));

        // Set the modified data in the employee state
        setEmployee(mappedData);
      } else {
        console.error("Invalid employee data:", employeeData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchDepartment = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/Department/getAllDepartment"
      );
      setdepartment(response.data);
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };
  const fetchEmployee = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/Organization/getAllOrganization"
      );
      if (response) {
        const employeeFirstNames = response.data.map(
          (employee) => employee.firstname
        );
        setEmployeer(employeeFirstNames);
      } else {
        throw new Error("Failed to fetch employees");
      }
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  useEffect(() => {
    fetchEmployee();
  }, []);

  useEffect(() => {
    fetchDepartment();
  }, []);

  useEffect(() => {
    getData();
  }, []);

  const handleDownloadClick = () => {
    setDialogType("download");
    setDialogOpen(true);
  };

  const handleExportClick = () => {
    setDialogType("export");
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const downloadAction = () => {
    switch (selectedFormat) {
      case "csv":
        downloadCSV();
        break;
      case "pdf":
        downloadPDF();
        break;
      case "adp":
        downloadADP();
        break;
      case "dxf":
        downloadDXF();
        break;
      case "doc":
        downloadDOC();
        break;
      case "iff":
        downloadIFF();
        break;

      default:
        break;
    }
  };

  const downloadCSV = () => {
    // Define column names
    const columnNames = [
      "employeesid",
      "First Name",
      "Last Name",
      "Email",
      "Contact Number",
      "Employment Type",
      "Role",
    ];

    // Generate CSV data
    const csvData = [columnNames];
    employee.forEach((emp) => {
      const rowData = [
        emp.employeesid,
        emp.firstname,
        emp.lastname,
        emp.emailid,
        emp.contactnumber,
        emp.type,
        emp.role,
      ];
      csvData.push(rowData);
    });

    const csvTitle = "employee_data.csv";
    const csvReport = csvData.map((row) => row.join(",")).join("\n");
    // Create CSV file and trigger download
    const csvBlob = new Blob([csvReport], { type: "text/csv" });
    const csvUrl = window.URL.createObjectURL(csvBlob);
    const link = document.createElement("a");
    link.href = csvUrl;
    link.setAttribute("download", csvTitle);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportAction = () => {
    // Perform export action based on selectedFormat and email
    console.log(`Exporting ${selectedFormat} to ${email}`);
  };

  const handleOpenAddEmployeePopup = () => {
    setOpenAddEmployeePopup(true);
  };

  const handleCloseAddEmployeePopup = () => {
    setOpenAddEmployeePopup(false);
  };

  const handleCloseEditEmployeePopup = () => {
    setOpenEditEmployeePopup(false);
  };

  const handleEditInputChange = (event, field) => {
    let selectedDepartment = {};
    if (
      department &&
      field === "department" &&
      !isNullOrUndefined(event.target.value)
    ) {
      selectedDepartment = department.find(
        (department) => department.departmentid == event.target.value
      );
    }
    setEditedData((prevState) => ({
      ...prevState,
      [field]:
        Object.keys(selectedDepartment).length !== 0
          ? selectedDepartment
          : event.target.value || {},
    }));
  };

  const isNullOrUndefined = (value) => {
    return value === undefined || value === null || value === "";
  };

  const handleEditSubmit = async (editedData) => {
    try {
      await axios.post(updateEndpoint, editedData);
      toast("Employee Updated Successfully");
      getData();
      handleCloseEditEmployeePopup();
    } catch (err) {
      toast("Employee Update Failed");
    }
  };

  const handleRowSelectionChange = (currentRowsSelected) => {
    setSelectedRows(currentRowsSelected);
  };

  const options = {
    tableBodyHeight: "430px",
    jumpToPage: true,
    responsive: "scroll",
    selectableRows: "multiple",
    onRowsDelete: async (rowsDeleted) => {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete the selected employee(s)?"
      );
      getData();
      if (!confirmDelete) return; // If user cancels, exit function

      const idsToDelete = rowsDeleted.data.map(
        (row) => employee[row.dataIndex].id
      );
      try {
        await Promise.all(
          idsToDelete.map((id) =>
            axios.delete(
              `http://localhost:8080/api/v1/Organization/delete/${id}`
            )
          )
        );
        getData(); // Reload data after deletion
        toast("Employee(s) deleted successfully");
      } catch (error) {
        console.error("Error deleting data:", error);
      }
    },

    customHeadCellStyle: {
      fontSize: "16px", // Adjust the font size for table headers
    },
    customBodyCellStyle: {
      fontSize: "14px", // Adjust the font size for table body cells
    },

    download: false,
    pagination: false, // Disable default download button
    print: false,
    responsive: "standard", // Make the table responsive
    resizableColumns: false,
    fixedHeader: true, // Fix the header
    fixedSelectColumn: false, // Disable default print button
    customToolbar: () => (
      <>
        <IconButton onClick={handleDownloadClick}>
          <GetAppIcon />
        </IconButton>
        <IconButton onClick={handlePrintClick}>
          <PrintIcon />
        </IconButton>
      </>
    ),
  };

  const handlePrintClick = () => {
    const printableContent = generatePrintableContent();
    const printWindow = window.open("", "_blank");
    printWindow.document.write(printableContent);
    printWindow.document.close();
    printWindow.print();
  };

  const generatePrintableContent = () => {
    const tableColumn = [
      "Employees Id",
      "First Name",
      "Last Name",
      "Email",
      "Contact Number",
      "Employement Type",
    ];
    let tableRows = "";

    employee.forEach((employee) => {
      const employeeData = [
        employee.employeesid,
        employee.firstname,
        employee.lastname,
        employee.emailid,
        employee.contactnumber,
        employee.type,
      ];
      tableRows += "<tr>";
      employeeData.forEach((data) => {
        tableRows += `<td style="padding: 8px; text-align: left;">${data}</td>`;
      });
      tableRows += "</tr>";
    });

    const printableContent = `
      <html>
        <head>
          <title>Employee Information</title>
          <style>
            table {
              border-collapse: collapse;
              width: 100%;
            }
            th, td {
              border: 1px solid black;
              padding: 8px;
              text-align: left;
            }
            th {
              background-color: #f2f2f2;
            }
          </style>
        </head>
        <body>
          <h2>Employee Information</h2>
          <table>
            <thead>
              <tr>
                ${tableColumn.map((column) => `<th>${column}</th>`).join("")}
              </tr>
            </thead>
            <tbody>
              ${tableRows}
            </tbody>
          </table>
        </body>
      </html>
    `;
    return printableContent;
  };

  const downloadPDF = () => {
    const doc = new jsPDF("p", "pt", "letter");

    const tableColumn = [
      "ID",
      "First Name",
      "Last Name",
      "Email",
      "Contact Number",
      "Employementtype",
    ];
    const tableRows = [];

    employee.forEach((employee) => {
      const employeeData = [
        employee.employeesid,
        employee.firstname,
        employee.lastname,
        employee.emailid,
        employee.contactnumber,
        employee.type,
        employee.department,

        // Add more fields as needed
      ];
      tableRows.push(employeeData);
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      styles: {
        cellPadding: 8,
        valign: "middle",
        halign: "left",
      },
    });

    const date = new Date().toLocaleDateString();
    // doc.text(`Employees Information ()`, 50, 40);
    doc.save("employees_information.pdf");
  };

  const handleMenuItemClick = (format) => {
    setSelectedFormat(format);
    if (dialogType === "download") {
      downloadAction();
    } else if (dialogType === "export") {
      exportAction();
    }
    setDialogOpen(false);
  };

  const handleOpenEditEmployeePopup = (rowData) => {
    setEditedData({ ...rowData });
    setOpenEditEmployeePopup(true);
  };

  const downloadADP = () => {
    // Generate ADP-formatted data
    const adpData = generateADPData();

    // Create ADP file and trigger download
    const adpTitle = "employee_data.adp";
    const adpBlob = new Blob([adpData], { type: "text/plain" });
    const adpUrl = window.URL.createObjectURL(adpBlob);
    const link = document.createElement("a");
    link.href = adpUrl;
    link.setAttribute("download", adpTitle);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const generateADPData = () => {
    let adpData = "";

    // Header
    adpData += "ADP Employee Data\n";

    // Employee information
    employee.forEach((emp) => {
      adpData += `ID: ${emp.employeesid}, `;
      adpData += `Name: ${emp.firstname} ${emp.lastname}, `;
      adpData += `Email: ${emp.emailid}, `;
      adpData += `Contact Number: ${emp.contactnumber}\n`;
    });

    return adpData;
  };

  const downloadDXF = () => {};

  const downloadDOC = async () => {};

  // Call downloadDOC() when you want to trigger the download

  const downloadIFF = () => {};

  const columns = [
    {
      name: "employeesid",
      label: "Employees Id",
      options: {
        setCellProps: () => ({
          align: "center",
        }),
        setCellHeaderProps: (value) => ({
          className: "centeredHeaderCell",
          style: { whiteSpace: "nowrap" },
        }),
      },
    },

    {
      name: "employeename",
      label: "Employee Name",
      options: {
        setCellProps: () => ({
          align: "center",
        }),
        setCellHeaderProps: (value) => ({
          className: "centeredHeaderCell",
          style: { whiteSpace: "nowrap" },
        }),
      },
    },
    {
      name: "emailid",
      label: "Email Id",
      options: {
        setCellProps: () => ({
          align: "center",
        }),
        setCellHeaderProps: (value) => ({
          className: "centeredHeaderCell",
          style: { whiteSpace: "nowrap" },
        }),
      },
    },
    {
      name: "contactnumber",
      label: "Contact Number",
      options: {
        setCellProps: () => ({
          align: "center",
        }),
        setCellHeaderProps: (value) => ({
          className: "centeredHeaderCell",
          style: { whiteSpace: "nowrap" },
        }),
      },
    },
    {
      name: "department",
      label: "Department",
      options: {
        setCellProps: () => ({
          align: "center",
        }),
        setCellHeaderProps: (value) => ({
          className: "centeredHeaderCell",
          style: { whiteSpace: "nowrap" },
        }),
        customBodyRender: (value, tableMeta, updateValue) => {
          return renderNestedProperty(value);
        },
      },
    },
    {
      name: "type",
      label: "Employement Type",
      options: {
        setCellProps: () => ({
          align: "center",
        }),
        setCellHeaderProps: (value) => ({
          className: "centeredHeaderCell",
          style: { whiteSpace: "nowrap" },
        }),
      },
    },
    {
      name: "role",
      label: "Roles",
      options: {
        setCellProps: () => ({
          align: "center",
        }),
        setCellHeaderProps: (value) => ({
          className: "centeredHeaderCell",
          style: { whiteSpace: "nowrap" },
        }),
  
      },
    },

    {
      name: "status",
      label: "Status",
      options: {
        setCellProps: () => ({
          align: "center",
        }),
        setCellHeaderProps: (value) => ({
          className: "centeredHeaderCell",
          style: { whiteSpace: "nowrap" },
        }),
      },
    },

    {
      name: "action",
      label: "Action",
      options: {
        setCellProps: () => ({
          align: "center",
          style: { position: "sticky", right: 0 },
        }),
        setCellHeaderProps: (value) => ({
          className: "centeredHeaderCell",
          style: { position: "sticky", right: 0, letterSpacing: "2.8px" },
        }),
        customBodyRender: (value, tableMeta, updateValue) => {
          const originalIndex = calculateOriginalIndex(
            currentPage,
            tableMeta.rowIndex
          );
          return (
            <>
              <div className="d-flex gap-2">
                <button
                  type="button"
                  className="btn btn-sm edit_employee_btn "
                  onClick={() =>
                    handleOpenEditEmployeePopup(employee[originalIndex])
                  }
                >
                  <svg
                    className="me-1"
                    xmlns="http://www.w3.org/2000/svg"
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                  >
                    <path
                      d="M2.84482 11.788C4.69968 13.6429 7.11053 14.1986 8.29568 14.3126C8.64396 14.3526 8.83825 14.1383 8.86482 13.9174C8.89168 13.6832 8.74425 13.4286 8.40968 13.3817C7.33825 13.2343 5.12168 12.7523 3.51453 11.1252C0.889391 8.49344 0.393962 4.51572 2.53682 2.37287C4.27796 0.638582 7.17739 0.859439 9.31368 2.01115L10.01 1.33487C7.41168 -0.225419 3.91625 -0.352561 1.8671 1.70315C-0.570324 4.14744 -0.248895 8.6943 2.84482 11.788ZM12.662 2.29915L13.1974 1.76344C13.4517 1.50915 13.4654 1.13401 13.2042 0.892867L13.03 0.732296C12.8025 0.51801 12.4474 0.524582 12.1997 0.758867L11.6708 1.30144L12.662 2.29915ZM6.15968 8.78773L12.1728 2.78115L11.1751 1.7903L5.16853 7.7903L4.61282 9.06915C4.55911 9.20973 4.69968 9.35058 4.84711 9.30344L6.15968 8.78773ZM5.28253 9.78572C7.47196 11.9754 10.9942 12.8394 12.9631 10.8772C14.5702 9.26344 14.3625 6.39715 12.6417 3.93315L11.9588 4.61601C13.3245 6.6383 13.5925 8.90858 12.2934 10.2074C10.7134 11.788 8.10139 11.038 6.30682 9.34372L5.28253 9.78572Z"
                      fill="white"
                    />
                  </svg>
                  Edit
                </button>
                <button type="button" className="invite_btn btn btn-sm">
                  <svg
                    className="me-1"
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M4.16675 13.1225V15C4.16675 15.221 4.25455 15.4329 4.41083 15.5892C4.56711 15.7455 4.77907 15.8333 5.00008 15.8333H15.0001C15.2211 15.8333 15.4331 15.7455 15.5893 15.5892C15.7456 15.4329 15.8334 15.221 15.8334 15V13.1225M10.1684 4.93079V12.0141M12.9551 6.88913L10.1684 4.16663L7.38175 6.88913"
                      stroke="white"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  Send Invite
                </button>
              </div>
            </>
          );
        },
      },
    },
  ];

  const renderNestedProperty = (value) => {
    if (value && typeof value === "object") {
      // Access nested property
      return value.departmentname;
    }
    return value;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await save(event); // Call your save function
      setOpenAddEmployeePopup(false); // Close the dialog
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleSubmits = async (event) => {
    event.preventDefault();
    try {
      console.log(editedData);
      await handleEditSubmit(editedData); // Call your save function with editedData
      getData();
      setOpenEditEmployeePopup(false); // Close the dialog
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleOptionChange = (event) => {
    setEmployementtype(event.target.value);
  };

  const handleEmployeeTypeChange = (event) => {
    const selectedEmployeeType = event.target.value;
    setEmployementtype(selectedEmployeeType);
  };

  const totalCount = employee.length;

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(event.target.value);
    setCurrentPage(1); // Reset current page to 1 when changing items per page
  };

  const calculateOriginalIndex = (currentPage, rowIndex) => {
    return (currentPage - 1) * itemsPerPage + rowIndex;
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const totalPages = Math.ceil(employee.length / itemsPerPage);

  const currentItems = employee.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
        <Topbar />

        <div className="d-flex">
          <Sidebar />
          <div className="employee-margin">
            <div className="d-flex justify-content-between ms-5">
              {/* <Link>Employee</Link>
            <Link>Department</Link> */}
              <div>
                <Box
                  sx={{ width: "100%", typography: "body1" }}
                  className="mt-3"
                >
                  <TabContext value={value}>
                    <Box>
                      <TabList
                        onChange={handleChange}
                        aria-label="lab API tabs example"
                      >
                        <Tab
                          label="Employee"
                          value="1"
                          component={Link}
                          to="/Organization"
                        />
                        <Tab
                          label="Department"
                          value="2"
                          component={Link}
                          to="/department"
                        />
                      </TabList>
                    </Box>
                  </TabContext>
                </Box>
              </div>
              <div className="mt-4">
                <button
                  onClick={handleOpenAddEmployeePopup}
                  className="department-button btn btn-primary px-4 me-5"
                >
                  Add Employee
                  <i className="icon_employee fas fa-plus ms-2 p-1"></i>
                </button>
              </div>
            </div>

            <Dialog
              open={openAddEmployeePopup}
              onClose={handleCloseAddEmployeePopup}
            >
              <div className=" mt-3 popup rounded-5">
                <div className="ms-3 d-flex justify-content-between">
                  <p className="popup_header font-weight-bold">
                    ADD AN EMPLOYEE
                  </p>

                  <IconButton
                    className="text-primary"
                    onClick={handleCloseAddEmployeePopup}
                  >
                    <ClearIcon />
                  </IconButton>
                </div>
                <div className="ms-4">
                  <p className="popup_sub mt-3">PLEASE FILL OUT OUR DETAILS</p>
                </div>

                <hr className="hr mt-4 ms-4"></hr>

                <DialogContent className="edit">
                  <div className="popup1 ">
                    <form className="" onSubmit={save}>
                      <div className=" d-flex gap-2">
                        <div className="form-group col-md-4">
                          <label
                            className="custom_badge-organization form-label"
                            for="FirstName"
                          >
                            First Name:
                          </label>
                          <input
                            className={`form-control custom_input-Organization ${
                              errors.FirstName ? "is-invalid" : ""
                            }`}
                            autoComplete="off"
                            fullWidth
                            id="FirstName"
                            value={FirstName}
                            onChange={handleClientNameChange}
                          />
                          {errors.FirstName && (
                            <div className="invalid-feedback">
                              {errors.FirstName}
                            </div>
                          )}
                        </div>

                        <div className="form-group col-md-4">
                          <label className="custom_badge-organization" htmlFor="Last Name">
                            Last Name:
                          </label>
                          <input
                            className="form-control custom_input-Organization"
                            autoComplete="off"
                            fullWidth
                            id="LastName"
                            value={LastName}
                            onChange={(event) => {
                              setLastName(event.target.value);
                            }}
                          />
                        </div>

                        <div className="form-group col-md-4">
                          <label className="custom_badge-organization" htmlFor="user-id">
                            Email ID:
                          </label>
                          <input
                          type="email"
                            autoComplete="off"
                            className={`form-control custom_input-Organization ${
                              errors.EmailID ? "is-invalid" : ""
                            }`}
                            fullWidth
                            id="EmailID"
                            value={EmailID}
                            onChange={handleEmailidChange}
                          />
                          {errors.EmailID && (
                            <div className="invalid-feedback">
                              {errors.EmailID}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className=" d-flex gap-2 my-2">
                        <div className="form-group col-md-4">
                          <label className="custom_badge-organization" htmlFor="password">
                            Contact Number:
                          </label>
                          <input
                            className="form-control custom_input-Organization"
                            autoComplete="off"
                            fullWidth
                            id="ContactNumber"
                            value={ContactNumber}
                            onChange={(event) => {
                              setContactNumber(event.target.value);
                            }}
                          />
                        </div>

                        <div className="form-group col-md-4">
                          <label className="custom_badge-organization" htmlFor="Department">
                            Department
                          </label>
                          <select
                            className="form-select input1"
                            id="Department"
                            value={Department.departmentid || ""}
                            onChange={(e) => {
                              console.log(e.target.value);
                              let selectedDepartment = {};
                              if (department) {
                                selectedDepartment = department.find(
                                  (department) =>
                                    department.departmentid == e.target.value
                                );
                              }
                              setDepartment(selectedDepartment);
                            }}
                          >
                            <option value=""></option>
                            {department.map((department, index) => (
                              <option
                                key={department.departmentid}
                                value={department.departmentid}
                              >
                                {department.departmentname}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="form-group col-md-4">
                          <label className="custom_badge-organization" htmlFor="Last Name">
                            Roles:
                          </label>
                          <select
                            className="form-select input1"
                            autoComplete="off"
                            fullWidth
                            id="Roles"
                            value={Roles}
                            onChange={(event) => {
                              setRoles(event.target.value);
                            }}
                          >
                              <option value=""></option>
                              <option     value={Roles}>Admin</option>
                              <option     value={Roles}>User</option>
                              
                                
                            
                            </select>
                        </div>
                      </div>

                      <div className=" d-flex gap-2 my-2">
                        <div className="form-group col-md-4">
                          <label className="custom_badge-organization" htmlFor="user-id">
                            Time Zone :
                          </label>
                          <select
                            id="timezone"
                            className="form-select input1"
                            onChange={handleChanges}
                            value={selectedTimezone}
                          >
                            <option value="">Select Timezone</option>
                            {UsaTimezones.map((timezone) => (
                              <option
                                key={timezone.value}
                                value={timezone.value}
                              >
                                {timezone.label}
                              </option>
                            ))}
                          </select>
                          {selectedTimezone && (
                            <div>
                              <p>
                                Current time in {selectedTimezone}:{" "}
                                {currentTime}
                              </p>
                            </div>
                          )}
                        </div>

                        <div className="form-group mt-2 ms-4">
                          <label className="radio" htmlFor="Employementtype">
                            Employee Type:
                          </label>
                        </div>
                        <div className="mt-2">
                          <input
                            type="radio"
                            name="options"
                            value="Employee"
                            checked={Employementtype === "Employee"}
                            onChange={handleOptionChange}
                          />
                        </div>
                        <div className="ms-1 mt-2">
                          <label> Employee</label>
                        </div>

                        <div className="d-flex ms-3">
                          <div className="mt-2">
                            <input
                              type="radio"
                              name="options"
                              value="Sub-Contract"
                              checked={Employementtype === "Sub-Contract"}
                              onChange={handleOptionChange}
                            />
                          </div>
                          <div className="ms-2 mt-2">
                            <label>Sub-Contract</label>
                          </div>
                        </div>

                        <div className=" d-flex gap-2 my-2"></div>
                      </div>

                      <div className="text-end d-flex gap-2 ms-5 me-5">
                        <div className="form-group col-md-6">
                          <button
                            type="submit"
                            className="employee_add_button btn px-4 "
                            // onClick={handleSubmit}
                          >
                            <i className="icon_employee_add fas fa-plus border-1 rounded-circle border-white"></i>
                            Add
                          </button>
                        </div>
                        <div className="form-group col-md-6 text-start">
                          <button
                            type="button"
                            className="employee_cancel_button btn px-4"
                            onClick={handleCloseAddEmployeePopup}
                          >
                            <i className="icon_employee_cancel fas fa-times border-1 rounded-circle border-white"></i>
                            Cancel
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </DialogContent>
              </div>
            </Dialog>

            <Dialog
              open={openEditEmployeePopup}
              onClose={handleCloseEditEmployeePopup}
            >
              <div className="mt-3 popup rounded-5">
                <div className="ms-3 d-flex justify-content-between">
                  <p className="popup_header font-weight-bold">Edit Employee</p>
                  <IconButton
                    className="text-primary "
                    onClick={handleCloseEditEmployeePopup}
                  >
                    <ClearIcon />
                  </IconButton>
                </div>
                <p className="popup_sub mt-4 ms-4">
                  Please update Employee details
                </p>
                <hr className="hr mt-4 ms-4"></hr>
                <DialogContent className="edit">
                  <div className="popup1 ">
                    <div className=" d-flex gap-2">
                      <div className="form-group col-md-4">
                        <p className="custom_badge-organization" htmlFor="first-name">
                          First Name:
                        </p>
                        <input
                          className="form-control custom_input-Organization"
                          autoComplete="off"
                          fullWidth
                          id="FirstName"
                          value={editedData.firstname || ""}
                          onChange={(event) =>
                            handleEditInputChange(event, "firstname")
                          }
                        />
                      </div>
                      <div className="form-group col-md-4">
                        <p className="custom_badge-organization" htmlFor="last-name">
                          Last Name:
                        </p>
                        <input
                          className="form-control custom_input-Organization"
                          autoComplete="off"
                          required
                          fullWidth
                          id="LastName"
                          value={editedData.lastname || ""}
                          onChange={(event) =>
                            handleEditInputChange(event, "lastname")
                          }
                        />
                      </div>

                      <div className="form-group col-md-4">
                        <p className="custom_badge-organization" htmlFor="email-id">
                          Email ID:
                        </p>
                        <input
                        type="email"
                          className="form-control custom_input-Organization"
                          autoComplete="off"
                          fullWidth
                          id="EmailID"
                          value={editedData.emailid || ""}
                          onChange={(event) =>
                            handleEditInputChange(event, "emailid")
                          }
                        />
                      </div>
                    </div>

                    <div className=" d-flex gap-2 my-2">
                      <div className="form-group col-md-4">
                        <p className="custom_badge-organization" htmlFor="contact-number">
                          Contact Number:
                        </p>
                        <input
                          className="form-control custom_input-Organization"
                          autoComplete="off"
                          fullWidth
                          id="ContactNumber"
                          value={editedData.contactnumber || ""}
                          onChange={(event) =>
                            handleEditInputChange(event, "contactnumber")
                          }
                        />
                      </div>

                      <div className="form-group col-md-4">
                        <label className="custom_badge-organization" htmlFor="Last Name">
                          Roles:
                        </label>
                        <select
                          className="form-select input1"
                          autoComplete="off"
                          required
                          fullWidth
                          id="Roles"
                          value={editedData.role || ""}
                          onChange={(event) =>
                            handleEditInputChange(event, "role")
                          }
                          >
                              <option value=""></option>
                              <option     value={Roles}>Admin</option>
                              <option     value={Roles}>User</option>
                              
                                
                            
                            </select>
                      </div>

                      <div className="form-group col-md-4">
                        <p className="custom_badge-organization" htmlFor="Department">
                          Department:
                        </p>
                        <select
                          className="form-select input1"
                          id="Department"
                          value={editedData.department?.departmentid ?? {}}
                          onChange={(e) =>
                            handleEditInputChange(e, "department")
                          }
                        >
                          <option value=""></option>
                          {department.map((department, index) => (
                            <option key={index} value={department.departmentid}>
                              {department.departmentname}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className=" d-flex gap-2 my-2">
                    <div className="form-group col-md-4">
                      {" "}
                      <label className="fs-5 custom_badge-organization" htmlFor="user-id">
                        {" "}
                        Time Zone :{" "}
                      </label>
                      <select id="timezone" className="form-select input1">
                        {UsaTimezones.map((timezone) => (
                          <option key={timezone.value} value={timezone.value}>
                            {timezone.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group mt-2 ms-4">
                      <label className="radio" htmlFor="Employementtype">
                        Employee Type:
                      </label>
                    </div>
                    <div className="mt-2">
                      <input
                        type="radio"
                        name="options"
                        value="Employee"
                        checked={editedData.type === "Employee"}
                        onChange={(event) =>
                          handleEditInputChange(event, "type")
                        }
                      />
                    </div>
                    <div className="ms-1 mt-2">
                      <label>Employee</label>
                    </div>

                    <div className="d-flex ms-3">
                      <div className="mt-2">
                        <input
                          type="radio"
                          name="options"
                          value="Sub-Contract"
                          checked={editedData.type === "Sub-Contract"}
                          onChange={(event) =>
                            handleEditInputChange(event, "type")
                          }
                        />
                      </div>
                      <div className="ms-2 mt-2">
                        <label>Sub-Contract</label>
                      </div>
                    </div>
                  </div>

                  <div className="text-end d-flex gap-2 ms-5 me-5">
                    <div className="form-group col-md-6">
                      <button
                        type="submit"
                        className="employee_add_button btn px-4"
                        onClick={handleSubmits}
                      >
                        <i className="icon_employee_add fas fa-plus border-1 rounded-circle border-white"></i>
                        Save Changes
                      </button>
                    </div>
                    <div className="form-group col-md-6 text-start">
                      <button
                        type="button"
                        className="employee_cancel_button btn px-4"
                        onClick={handleCloseEditEmployeePopup}
                      >
                        <i className="icon_employee_cancel fas fa-times border-1 rounded-circle border-white"></i>
                        Cancel
                      </button>
                    </div>
                  </div>
                </DialogContent>
              </div>
            </Dialog>

            <Dialog open={dialogOpen} onClose={handleDialogClose} className="">
              <div className="export ">
                <div className="d-flex justify-content-between ms-5 mt-5">
                  <p className="font-weight-bold export_head ">EXPORT</p>

                  <svg
                    onClick={handleDialogClose}
                    className="export_close_icon me-4"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M6 18L18 6M18 18L6 6"
                      stroke="#F8F8F8"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>

                <p className="export_p ms-5">
                  QUICKLY SAVE YOUR DETAILS IN VARIOUS FORMATS
                </p>
                <hr className="hr ms-5"></hr>

                <div className="d-flex my-5 mx-5 mb-5 justify-content-between">
                  <div>
                    <p className="">Enter your Email to Export</p>

                    <div className="d-flex export_email">
                      <svg
                        className="mt-2"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M12 21C10.758 21 9.589 20.764 8.493 20.292C7.39767 19.8193 6.44467 19.178 5.634 18.368C4.82333 17.5587 4.18167 16.6067 3.709 15.512C3.23633 14.4173 3 13.2477 3 12.003C3 10.759 3.236 9.589 3.708 8.493C4.18067 7.39767 4.822 6.44467 5.632 5.634C6.44133 4.82333 7.39333 4.18167 8.488 3.709C9.58267 3.23633 10.7523 3 11.997 3C13.241 3 14.411 3.23633 15.507 3.709C16.603 4.18167 17.556 4.823 18.366 5.633C19.1767 6.443 19.8183 7.39533 20.291 8.49C20.7637 9.58533 21 10.7553 21 12V12.988C21 13.8307 20.7107 14.5433 20.132 15.126C19.5533 15.7087 18.8427 16 18 16C17.404 16 16.8607 15.8367 16.37 15.51C15.8787 15.1833 15.5153 14.748 15.28 14.204C14.9 14.7513 14.425 15.1877 13.855 15.513C13.285 15.8377 12.6667 16 12 16C10.886 16 9.94067 15.612 9.164 14.836C8.38733 14.06 7.99933 13.1147 8 12C8 10.886 8.388 9.94067 9.164 9.164C9.94 8.38733 10.8853 7.99933 12 8C13.114 8 14.0593 8.388 14.836 9.164C15.6127 9.94 16.0007 10.8853 16 12V12.988C16 13.5373 16.196 14.01 16.588 14.406C16.9807 14.802 17.4513 15 18 15C18.5487 15 19.0193 14.802 19.412 14.406C19.804 14.01 20 13.5373 20 12.988V12C20 9.76667 19.225 7.875 17.675 6.325C16.125 4.775 14.2333 4 12 4C9.76667 4 7.875 4.775 6.325 6.325C4.775 7.875 4 9.76667 4 12C4 14.2333 4.775 16.125 6.325 17.675C7.875 19.225 9.76667 20 12 20H17V21H12ZM12 15C12.8333 15 13.5417 14.7083 14.125 14.125C14.7083 13.5417 15 12.8333 15 12C15 11.1667 14.7083 10.4583 14.125 9.875C13.5417 9.29167 12.8333 9 12 9C11.1667 9 10.4583 9.29167 9.875 9.875C9.29167 10.4583 9 11.1667 9 12C9 12.8333 9.29167 13.5417 9.875 14.125C10.4583 14.7083 11.1667 15 12 15Z"
                          fill="black"
                          fill-opacity="0.5"
                        />
                      </svg>

                      <input
                        className="bg-white p-2 export_input"
                        type="email"
                        placeholder="Email ID"
                        // label="Email"
                        // variant="outlined"
                        // fullWidth
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="download2 me-5">
                    <p className="">Pick any one format</p>

                    {/* <InputLabel id="format-select-label">Format</InputLabel> */}
                    <select
                      className="bg-white p-2 export_format"
                      // labelId="format-select-label"
                      id="format-select"
                      value={selectedFormat}
                      onChange={(e) => setSelectedFormat(e.target.value)}
                      label="Format"
                    >
                      <option selected></option>
                      <option value="csv">CSV</option>
                      <option value="pdf">PDF</option>
                    </select>
                  </div>
                </div>

                <div className="export_button d-flex gap-3 py-3">
                  <button
                    type="button"
                    className="btn export_btn "
                    onClick={downloadAction}
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
                        d="M12 15.577L8.462 12.038L9.169 11.319L11.5 13.65V5H12.5V13.65L14.83 11.32L15.538 12.038L12 15.577ZM5 19V14.962H6V18H18V14.962H19V19H5Z"
                        fill="black"
                        fill-opacity="0.5"
                      />
                    </svg>
                    Download
                  </button>
                  <button
                    type="button"
                    className="btn export_btn "
                    onClick={exportAction}
                  >
                    <svg
                      className="me-2"
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        d="M16.7188 8.75V16.25C16.7188 16.5401 16.6035 16.8183 16.3984 17.0234C16.1933 17.2285 15.9151 17.3438 15.625 17.3438H4.375C4.08492 17.3438 3.80672 17.2285 3.6016 17.0234C3.39648 16.8183 3.28125 16.5401 3.28125 16.25V8.75C3.28125 8.45992 3.39648 8.18172 3.6016 7.9766C3.80672 7.77148 4.08492 7.65625 4.375 7.65625H6.25C6.37432 7.65625 6.49355 7.70564 6.58146 7.79354C6.66936 7.88145 6.71875 8.00068 6.71875 8.125C6.71875 8.24932 6.66936 8.36855 6.58146 8.45646C6.49355 8.54436 6.37432 8.59375 6.25 8.59375H4.375C4.33356 8.59375 4.29382 8.61021 4.26451 8.63951C4.23521 8.66882 4.21875 8.70856 4.21875 8.75V16.25C4.21875 16.2914 4.23521 16.3312 4.26451 16.3605C4.29382 16.3898 4.33356 16.4062 4.375 16.4062H15.625C15.6664 16.4062 15.7062 16.3898 15.7355 16.3605C15.7648 16.3312 15.7812 16.2914 15.7812 16.25V8.75C15.7812 8.70856 15.7648 8.66882 15.7355 8.63951C15.7062 8.61021 15.6664 8.59375 15.625 8.59375H13.75C13.6257 8.59375 13.5065 8.54436 13.4185 8.45646C13.3306 8.36855 13.2812 8.24932 13.2812 8.125C13.2812 8.00068 13.3306 7.88145 13.4185 7.79354C13.5065 7.70564 13.6257 7.65625 13.75 7.65625H15.625C15.9151 7.65625 16.1933 7.77148 16.3984 7.9766C16.6035 8.18172 16.7188 8.45992 16.7188 8.75ZM7.20625 5.33125L9.53125 3.00703V10.625C9.53125 10.7493 9.58064 10.8685 9.66854 10.9565C9.75645 11.0444 9.87568 11.0938 10 11.0938C10.1243 11.0938 10.2435 11.0444 10.3315 10.9565C10.4194 10.8685 10.4688 10.7493 10.4688 10.625V3.00703L12.7937 5.33125C12.8367 5.3773 12.8884 5.41424 12.9459 5.43986C13.0034 5.46548 13.0655 5.47926 13.1284 5.48037C13.1914 5.48148 13.2539 5.4699 13.3122 5.44633C13.3706 5.42275 13.4236 5.38766 13.4681 5.34315C13.5127 5.29864 13.5478 5.24562 13.5713 5.18725C13.5949 5.12888 13.6065 5.06636 13.6054 5.00342C13.6043 4.94048 13.5905 4.87841 13.5649 4.82091C13.5392 4.76341 13.5023 4.71166 13.4563 4.66875L10.3313 1.54375C10.2434 1.45597 10.1242 1.40666 10 1.40666C9.87578 1.40666 9.75664 1.45597 9.66875 1.54375L6.54375 4.66875C6.4977 4.71166 6.46076 4.76341 6.43514 4.82091C6.40952 4.87841 6.39574 4.94048 6.39463 5.00342C6.39352 5.06636 6.4051 5.12888 6.42867 5.18725C6.45225 5.24562 6.48734 5.29864 6.53185 5.34315C6.57636 5.38766 6.62938 5.42275 6.68775 5.44633C6.74612 5.4699 6.80864 5.48148 6.87158 5.48037C6.93452 5.47926 6.99659 5.46548 7.05409 5.43986C7.11159 5.41424 7.16334 5.3773 7.20625 5.33125Z"
                        fill="black"
                        fill-opacity="0.5"
                      />
                    </svg>
                    Export
                  </button>

                  <button
                    className="btn export_btn pt-1 "
                    type="button"
                    // color="secondary"
                    onClick={handleDialogClose}
                  >
                    <svg
                      className="export_cancel me-2"
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        d="M7.33316 18.2567L6.74316 17.6667L11.4098 13L6.74316 8.33333L7.33316 7.74333L11.9998 12.41L16.6665 7.74333L17.2565 8.33333L12.5898 13L17.2565 17.6667L16.6665 18.2567L11.9998 13.59L7.33316 18.2567Z"
                        fill="black"
                        fill-opacity="0.5"
                      />
                    </svg>
                    Cancel
                  </button>
                </div>
              </div>
            </Dialog>

            <div className="employee_table mt-4 mx-5">
              <MUIDataTable
                className="mui_org"
                data={currentItems}
                columns={columns}
                options={options}
              />

              <div className="d-flex justify-content-between mt-3">
                <div className="ms-4 mt-2">
                  <p>Total Record Count: {totalCount}</p>{" "}
                  {/* Display the total count of rows */}
                </div>
                <div className="d-flex">
                  <div className="me-5  ">
                    <select
                      className="p-2 count "
                      value={itemsPerPage}
                      onChange={handleItemsPerPageChange}
                    >
                      <option value={10}>10</option>
                      <option value={15}>15</option>
                      <option value={20}>20</option>
                    </select>
                  </div>

                  <Stack spacing={1}>
                    <Pagination
                      className="me-5 text-end"
                      count={totalPages} // Total pages for pagination
                      page={currentPage} // Current page
                      onChange={handlePageChange} // Handle page change
                      variant="outlined"
                      shape="rounded"
                    />
                  </Stack>
                </div>
              </div>
            </div>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={() => setAnchorEl(null)}
            >
              <MenuItem onClick={() => handleMenuItemClick("csv")}>
                CSV
              </MenuItem>
              <MenuItem onClick={() => handleMenuItemClick("pdf")}>
                PDF
              </MenuItem>
            </Menu>
          </div>
        </div>
      </div>
    </>
  );
}

export default Organization;
