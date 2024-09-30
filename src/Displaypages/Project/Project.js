
import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import axios from "axios";
import { IconButton } from "@mui/material";
import GetAppIcon from "@mui/icons-material/GetApp";
import Sidebar from "../../Components/Sidebar";
import Topbar from "../../Components/Topbar";
import "./Project.css";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import PrintIcon from "@mui/icons-material/Print";
import Multiselect from "multiselect-react-dropdown";

import {
  Stack,
  Pagination,
  Button,
  MenuItem,
  FormControl,
  Menu,
  InputLabel,
  TextField,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Select from "react-select";
import ClearIcon from "@mui/icons-material/Clear";
import { MultiSelect } from "primereact/multiselect";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Organization() {
  const [editedData, setEditedData] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const [openAddEmployeePopup, setOpenAddEmployeePopup] = useState(false);

  const [selectedValue, setSelectedValue] = useState([]);
  const [projectid, setprojectid] = useState("");
  const [projectname, setprojectname] = useState("");
  const [clientname, setclientname] = useState("");
  const [projectManager, setprojectManager] = useState("");
  const [assigneeemployees, setassigneeemployees] = useState([]);
  const [startdate_p, setstartdate_p] = useState("");
  const [end_date_p, setend_date_p] = useState("");
  const [description_p, setdescription_p] = useState("");
  const [email, setEmail] = useState("");
  const [Projects, setProjects] = useState([]);
  const [selectedFormat, setSelectedFormat] = useState("");
  const [Clients, setClients] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [option, setOption] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [Status, setStatus] = useState("");
  const [billableStatus, setBillableStatus] = useState("");
  const [editingClient, setEditingClient] = useState(null);
  const endpoint = "http://localhost:8080/api/v1/project/getAllProject";

  const totalCount = Projects.length;

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(event.target.value);
    setCurrentPage(1); // Reset current page to 1 when changing items per page
  };

  const [errors, setErrors] = useState({
    projectname: "",
    clientname: "",
    projectManager: "",
  });

  const validateForm = () => {
    let valid = true;
    //const { name, email, password } = formData;
    const errorsCopy = { ...errors };

    if (!projectname.trim()) {
      errorsCopy.projectname = "Project Name is required";
      valid = false;
    } else {
      errorsCopy.projectname = "";
    }

    if (!clientname.trim()) {
      errorsCopy.clientname = "Client Name is required";
      valid = false;
    } else {
      errorsCopy.clientname = "";
    }

    if (!projectManager.trim()) {
      errorsCopy.projectManager = "Project Manager is required";
      valid = false;
    } else {
      errorsCopy.projectManager = "";
    }

    setErrors(errorsCopy);
    return valid;
  };

  async function save(event) {
    event.preventDefault();

    const isValid = validateForm();

    if (!isValid) {
      return; // Do not proceed with saving if form is invalid
    }
    try {
      await axios.post("http://localhost:8080/api/v1/project/save", {
        projectid: projectid,
        projectname: projectname,
        clientname: clientname,
        projectManager: projectManager,
        assigneeemployees: assigneeemployees,
        startdate_p: startdate_p,
        end_date_p: end_date_p,
        description_p: description_p,
        status: Status,
        billablestatus: billableStatus,
      });
      toast("project Registation Successfully");
      setprojectid("");
      setprojectname("");
      setclientname("");
      setprojectManager("");
      setassigneeemployees([]);
      setstartdate_p("");
      setend_date_p("");
      setdescription_p("");
      setStatus("");
      setBillableStatus("");
      getData("");
    } catch (err) {
      toast("project Registation Failed");
    }
  }

  async function editClient(event) {
    event.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/v1/project/update", {
        projectid: editingClient.projectid,
        projectname: projectname,
        clientname: clientname,
        projectManager: projectManager,
        assigneeemployees: assigneeemployees,
        startdate_p: startdate_p,
        end_date_p: end_date_p,
        description_p: description_p,
        status: Status,
        billablestatus: billableStatus,
      });
      toast("Project Updated Successfully");
      handleCloseEditModal();
      getData();
    } catch (err) {
      toast("Project Update Failed");
    }
  }

  const openEditModal = (Projects) => {
    setEditingClient(Projects);
    setprojectname(Projects.projectname);
    setclientname(Projects.clientname);
    setprojectManager(Projects.projectManager);
    setassigneeemployees(
      Projects.assigneeemployees.map((item) => ({
        value: item.id,
        label: item.firstname,
        id: item.id,
      }))
    );
    setstartdate_p(Projects.startdate_p);
    setend_date_p(Projects.end_date_p);
    setdescription_p(Projects.description_p);
    setStatus(Projects.status);
    setBillableStatus(Projects.billablestatus);
    const modal = document.getElementById("editModal");
    modal.classList.add("show");
    modal.style.display = "block";
  };

  const handleCloseEditModal = () => {
    setEditingClient(null);
    setprojectid("");
    setprojectname("");
    setclientname("");
    setprojectManager("");
    setassigneeemployees([]);
    setstartdate_p("");
    setend_date_p("");
    setdescription_p("");
    setStatus("");
    setBillableStatus("");
    const modal = document.getElementById("editModal");
    modal.classList.remove("show");
    modal.style.display = "none";
  };

  async function Load() {
    try {
      const result = await axios.get(
        "http://localhost:8080/api/v1/Organization/getAllOrganization"
      );
      setOption(result.data);
      console.log(result.data);
    } catch (error) {
      console.error("Error fetching organization data:", error);
      // Handle the error (e.g., show a message to the user)
    }
  }

  async function Loadclient() {
    try {
      const result = await axios.get(
        "http://localhost:8080/api/v1/client/getAllClient"
      );
      setClients(result.data);
      console.log(result.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  }

  async function Loademployees() {
    try {
      const result = await axios.get(
        "http://localhost:8080/api/v1/Organization/getAllOrganization"
      );
      setEmployees(result.data);
      console.log(result.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  }

  useEffect(() => {
    (async () => {
      await Loadclient();
      await Loademployees();
    })();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await Load();
      await getData();
    };
    fetchData();
  }, []);

  const getData = async () => {
    try {
      const response = await axios.get(endpoint);
      setProjects(response.data); // Add 'roles' property with default value
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    Loads();
  }, []);

  async function Loads() {
    try {
      const result = await axios.get(
        "http://localhost:8080/api/v1/client/getAllClient"
      );
      setClients(result.data);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  }

  const onSelect = (selectedList, selectedItem) => {
    setEditedData((prevState) => ({
      ...prevState,
      assigneeemployees: selectedList,
    }));
  };

  const onRemove = (selectedList, removedItem) => {
    setEditedData((prevState) => ({
      ...prevState,
      assigneeemployees: selectedList,
    }));
  };

  const options = {
    tableBodyHeight: "430px",
    pagination: false,
    responsive: "scroll",

    onRowsDelete: async (rowsDeleted) => {
      const idsToDelete = rowsDeleted.data.map(
        (row) => Projects[row.dataIndex].projectid
      );
      try {
        await Promise.all(
          idsToDelete.map((projectid) =>
            axios.delete(
              `http://localhost:8080/api/v1/project/delete/${projectid}`
            )
          )
        );
        toast("project is deleted Successfully");
        getData(); // Reload data after deletion
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

    download: false, // Disable default download button
    print: false,
    responsive: "standard", // Make the table responsive
    resizableColumns: false, // Disable default print button
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
      default:
        break;
    }
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

  const exportAction = () => {
    // Perform export action based on selectedFormat and email
    console.log(`Exporting ${selectedFormat} to ${email}`);
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
      "Project ID",
      "Project Name",
      "Client Name",
      "project Manager",
      "Start Date",
      "End Date",
      "Billable Status",
      "Status",
    ];
    let tableRows = "";

    Projects.forEach((Project) => {
      const employeeData = [
        Project.projectidnumber,
        Project.projectname,
        Project.clientname,
        Project.projectManager,
        Project.startdate_p,
        Project.end_date_p,
        Project.billablestatus,
        Project.status,
      ];
      tableRows += "<tr>";
      employeeData.forEach((data) => {
        tableRows += `<td>${data}</td>`;
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

  const downloadCSV = () => {
    // Define column names
    const columnNames = [
      "Project ID",
      "Project Name",
      "Client Name",
      "project Manager",
      "Start Date",
      "End Date",
      "Billable Status",
      "Status",
    ];

    // Generate CSV data
    const csvData = [columnNames];
    Projects.forEach((Project) => {
      const rowData = [
        Project.projectidnumber,
        Project.projectname,
        Project.clientname,
        Project.projectManager,
        Project.startdate_p,
        Project.end_date_p,
        Project.billablestatus,
        Project.status,
      ];
      csvData.push(rowData);
    });

    const csvTitle = "Project_data.csv";
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

  const downloadPDF = () => {
    const doc = new jsPDF("p", "pt", "letter");

    const tableColumn = [
      "Project ID",
      "Project Name",
      "Client Name",
      "project Manager",
      "Start Date",
      "End Date",
      "Billable Status",
      "Status",
    ];
    const tableRows = [];

    Projects.forEach((pro) => {
      const employeeData = [
        pro.projectidnumber,
        pro.projectname,
        pro.clientname,
        pro.projectManager,
        pro.startdate_p,
        pro.end_date_p,
        pro.billablestatus,
        pro.status,
      ];
      tableRows.push(employeeData);
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
    });

    const date = new Date().toLocaleDateString();
    doc.save("Project.pdf");
  };

  const columns = [
    {
      name: "projectidnumber",
      label: "Project Id",
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
      name: "projectname",
      label: "Project Name",
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
      name: "clientname",
      label: "Client Name",
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
      name: "projectManager",
      label: "Project Manager",
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
      name: "assigneeemployees",
      label: "Assign Employees",
      options: {
        setCellProps: () => ({
          align: "center",
        }),
        setCellHeaderProps: (value) => ({
          className: "centeredHeaderCell",
          style: { whiteSpace: "nowrap" },
        }),

        customBodyRender: (value, tableMeta, updateValue) => {
          // 'value' here is the 'assigneeemployees' array
          if (value && value.length > 0) {
            // If there are assigned employees, map through them and display their first names
            return value.map((employee) => employee.firstname).join(", ");
          } else {
            return "None"; // Display "None" if no employees are assigned
          }
        },
      },
    },
    {
      name: "startdate_p",
      label: "Start Date",
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
      name: "end_date_p",
      label: "End Date",
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
      name: "billablestatus",
      label: "Billable Status",
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
            <IconButton data-bs-toggle="modal"
            data-bs-target="#editModal" onClick={() => openEditModal(Projects[originalIndex])}>
              <EditIcon />
            </IconButton>
          );
        },
      },
    },
  ];
  const calculateOriginalIndex = (currentPage, rowIndex) => {
    return (currentPage - 1) * itemsPerPage + rowIndex;
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const totalPages = Math.ceil(Projects.length / itemsPerPage);

  const currentItems = Projects.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await save(event); // Call your save function
      setOpenAddEmployeePopup(false); // Close the dialog
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleOptionChange = (event) => {
    setBillableStatus(event.target.value);
  };

  const handleProjectTypeChange = (event) => {
    const selectedEmployeeType = event.target.value;
    setBillableStatus(selectedEmployeeType);
  };

  const handleProjectNameChange = (e) => {
    setprojectname(e.target.value);
    if (errors.projectname) {
      setErrors((prevErrors) => ({ ...prevErrors, projectname: "" }));
    }
  };

  const handleClientNameChange = (e) => {
    setclientname(e.target.value);
    if (errors.clientname) {
      setErrors((prevErrors) => ({ ...prevErrors, clientname: "" }));
    }
  };

  const handleProjectManagerChange = (e) => {
    setprojectManager(e.target.value);
    if (errors.projectManager) {
      setErrors((prevErrors) => ({ ...prevErrors, projectManager: "" }));
    }
  };

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
        <Topbar  />
        <div className="d-flex">
          <Sidebar />
          <div className="project-margin ">
            <div className="d-flex justify-content-between mt-4">
              <div>
                <p className="project_head">PROJECT INFORMATION</p>
              </div>
              <div className="me-5">
                <button
                  type="button"
                  className="project-button btn btn-primary px-4"
                  data-toggle="modal"
                  data-target="#exampleModalCenter"
                >
                  Add Project
                  <i className="icon_project fas fa-plus ms-2 p-1"></i>
                </button>
              </div>
            </div>

            <div
              className="modal fade"
              id="exampleModalCenter"
              tabIndex="-1"
              role="dialog"
              aria-labelledby="exampleModalCenterTitle"
              aria-hidden="true"
            >
              <div
                className="modal-dialog modal-dialog-centered modal-xl"
                role="document"
              >
                <div className="modal-content rounded-5 shadow-lg">
                  <div className="d-flex justify-content-between ms-5 me-5 mt-4 ">
                    <p
                      className="popup_header modal-title font-weight-bold"
                      id="exampleModalLongTitle"
                    >
                      Add Project
                    </p>
                    <button
                      type="button"
                      className="close "
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      {/* <span className="project_close_btn" aria-hidden="true">&times;</span> */}
                      <svg
                        className="close project_close_btn"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
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
                    </button>
        
                  </div>
                  <p className="popup_sub mt-2 ms-5">
                    PLEASE FILL OUT PROJECTS DETAILS
                  </p>
                  <hr className="hr ms-5"></hr>
                  <div className="modal-body">
                    <div className=" ms-4 me-4 mt-2">
                      <form onSubmit={save} className="needs-validation">
                        <div className=" d-flex ">
                          <div className="form-group col-md-4">
                            <label
                              htmlFor="projectname"
                              className="fs-5 custom_badge"
                            >
                              Project Name:
                              <span className="text-danger">*</span>
                            </label>
                            <input
                              autoComplete="off"
                              className={`form-control custom_input-project ${
                                errors.projectname ? "is-invalid" : ""
                              }`}
                              type="text"
                              id="projectname"
                              value={projectname}
                              onChange={handleProjectNameChange}
                            />
                            {errors.projectname && (
                              <div className="invalid-feedback">
                                {errors.projectname}
                              </div>
                            )}
                          </div>
                          <div className="form-group col-md-4">
                            <label
                              htmlFor="clientname"
                              className="fs-5 custom_badge"
                            >
                              Client Name:<span className="text-danger">*</span>
                            </label>
                            <select
                              className={`form-select input1 ${
                                errors.clientname ? "is-invalid" : ""
                              }`}
                              value={clientname}
                              onChange={handleClientNameChange}
                            >
                              <option value="" selected></option>
                              {Clients.map((client) => (
                                <option
                                  key={client.clientid}
                                  value={client.clientsname}
                                >
                                  {client.clientsname}
                                </option>
                              ))}
                            </select>
                            {errors.clientname && (
                              <div className="invalid-feedback">
                                {errors.clientname}
                              </div>
                            )}
                          </div>

                          <div className="form-group col-md-4">
                            <label
                              htmlFor="projectManager"
                              className="fs-5 custom_badge"
                            >
                              Project Manager:
                              <span className="text-danger">*</span>
                            </label>
                            <select
                              className={`form-select input1 ${
                                errors.projectManager ? "is-invalid" : ""
                              }`}
                              type="text"
                              id="projectManager"
                              value={projectManager}
                              onChange={handleProjectManagerChange}
                            >
                              <option value="" selected></option>
                              {employees.map((employee) => (
                                <option
                                  key={employee.EmployeeID}
                                  value={employee.firstname}
                                >
                                  {employee.firstname}
                                </option>
                              ))}
                            </select>
                            {errors.projectManager && (
                              <div className="invalid-feedback">
                                {errors.projectManager}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="d-flex mt-3">
                          <div className="form-group col-md-4">
                            <label
                              htmlFor="startdate_p"
                              className="fs-5 custom_badge"
                            >
                              Start Date:
                            </label>
                            <input
                              className="form-control custom_input-project"
                              type="Date"
                              id="startdate_p"
                              value={startdate_p}
                              onChange={(event) => {
                                setstartdate_p(event.target.value);
                              }}
                            />
                          </div>

                          <div className="form-group col-md-4">
                            <label
                              htmlFor="end_date_p"
                              className="fs-5 custom_badge"
                            >
                              End Date:
                            </label>
                            <input
                              className="form-control custom_input-project"
                              type="Date"
                              id="end_date_p"
                              value={end_date_p}
                              onChange={(event) => {
                                setend_date_p(event.target.value);
                              }}
                            />
                          </div>

                          <div className="form-group col-md-4">
                            <label
                              htmlFor="assigneeemployees"
                              className="fs-5 custom_badge2"
                            >
                              Assign Employees:
                            </label>

                            <Select
                              closeMenuOnSelect={false}
                              options={employees.map((employee) => ({
                                value: employee.id,
                                label: employee.firstname,
                              }))}
                              isMulti
                              value={assigneeemployees}
                              onChange={setassigneeemployees}
                            />
                          </div>
                        </div>

                        <div className="d-flex mt-3">
                          <div className="form-group col-md-4">
                            <label
                              htmlFor="Status"
                              className="fs-5 custom_badge"
                            >
                              Status:
                            </label>
                            <select
                              className="form-select input1"
                              value={Status}
                              onChange={(event) => {
                                setStatus(event.target.value);
                              }}
                            >
                              <option value="" selected></option>
                              <option value="Assigned">Assigned</option>
                              <option value="UnAssigned">UnAssigned</option>
                            </select>
                          </div>

                          <div className="form-group mt-2 ms-4">
                            <label className="radio" htmlFor="billableStatus">
                              Billable Status:
                            </label>
                          </div>
                          <div className="mt-2">
                            <input
                              type="radio"
                              name="options"
                              value="Billable"
                              checked={billableStatus === "Billable"}
                              onChange={handleOptionChange}
                            />
                          </div>
                          <div className="ms-1 mt-2">
                            <label> Billable</label>
                          </div>

                          <div className="d-flex ms-3">
                            <div className="mt-2">
                              <input
                                type="radio"
                                name="options"
                                value="Non-Billable"
                                checked={billableStatus === "Non-Billable"}
                                onChange={handleOptionChange}
                              />
                            </div>
                            <div className="ms-2 mt-2">
                              <label>Non-billable</label>
                            </div>
                          </div>
                        </div>

                        <div className="d-flex mt-3">
                          <div className="form-group col-md-8">
                            <label
                              htmlFor="description_p"
                              className="fs-5 custom_badge"
                            >
                              Description:
                            </label>
                            <textarea
                              className="form-control custom_input-project"
                              type="textarea"
                              id="description_p"
                              value={description_p}
                              onChange={(event) => {
                                setdescription_p(event.target.value);
                              }}
                            />
                          </div>
                        </div>
                        <div className="d-flex gap-3 mb-4">
                          <div className="col-md-6 text-end">
                            <button
                              type="submit"
                              className="project_add_button btn px-4"
                              // data-dismiss="modal"
                              // onClick={save}
                            >
                              <i className="icon_project_add fas fa-plus border-1 rounded-circle border-white"></i>
                              Add
                            </button>
                          </div>
                          <div className="col-md-6 text-start">
                            <button
                              type="button"
                              className="project_cancel_button btn px-4 "
                              data-dismiss="modal"
                            >
                              <i className="icon_project_cancel fas fa-times border-1 rounded-circle border-white"></i>
                              Cancel
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="project_table mx-5">
              <MUIDataTable
                className="mui_project mt-3"
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
            {/* Pagination component */}
          </div>
        </div>
      </div>

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
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={() => handleMenuItemClick("csv")}>CSV</MenuItem>
        <MenuItem onClick={() => handleMenuItemClick("pdf")}>PDF</MenuItem>
      </Menu>

      <div
        className="modal fade"
        id="editModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-dialog-centered modal-xl"
          role="document"
        >
          <div className="modal-content rounded-5 shadow-lg">
            <div className="d-flex justify-content-between ms-5 me-5 mt-4 ">
              <p
                className="popup_header modal-title font-weight-bold"
                id="exampleModalLongTitle"
              >
                EDIT PROJECT
              </p>
              {/* <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleCloseEditModal}
              ></button> */}

              <svg
                className="project_close_btn"
                data-bs-dismiss="modal"
                aria-label="Close"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                onClick={handleCloseEditModal}
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
            <p className="popup_sub mt-4 ms-5">
              PLEASE FILL OUT PROJECTS DETAILS :
            </p>
            <hr className="hr ms-5"></hr>
            <div className="modal-body">
              <div className=" ms-4 me-4 mt-3">
                <form onSubmit={editClient} className="needs-validation">
                  <div className=" d-flex ">
                    <div className="form-group col-md-4">
                      <label
                        htmlFor="projectname"
                        className="fs-5 custom_badge"
                      >
                        Project Name <span className="text-danger">*</span>
                      </label>
                      <input
                        autoComplete="off"
                        required
                        className="form-control custom_input-project"
                        type="text"
                        id="projectname"
                        value={projectname}
                        onChange={(event) => {
                          setprojectname(event.target.value);
                        }}
                      />
                    </div>
                    <div className="form-group col-md-4">
                      <label htmlFor="clientname" className="fs-5 custom_badge">
                        Client Name: <span className="text-danger">*</span>
                      </label>
                      <select
                        required
                        className="form-select input1"
                        value={clientname}
                        onChange={(event) => {
                          setclientname(event.target.value);
                        }}
                      >
                        <option value="" selected></option>
                        {Clients.map((client) => (
                          <option
                            key={client.clientid}
                            value={client.clientsname}
                          >
                            {client.clientsname}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group col-md-4">
                      <label
                        htmlFor="projectManager"
                        className="fs-5 custom_badge"
                      >
                        Project Manager: <span className="text-danger">*</span>
                      </label>
                      <select
                        required
                        className="form-select input1"
                        type="text"
                        id="projectManager"
                        value={projectManager}
                        onChange={(event) => {
                          setprojectManager(event.target.value);
                        }}
                      >
                        <option value="" selected></option>
                        {employees.map((employee) => (
                          <option
                            key={employee.EmployeeID}
                            value={employee.firstname}
                          >
                            {employee.firstname}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="d-flex mt-3">
                    <div className="form-group col-md-4">
                      <label
                        htmlFor="startdate_p"
                        className="fs-5 custom_badge"
                      >
                        Start Date:
                      </label>
                      <input
                        className="form-control custom_input-project"
                        type="Date"
                        id="startdate_p"
                        value={startdate_p}
                        onChange={(event) => {
                          setstartdate_p(event.target.value);
                        }}
                      />
                    </div>

                    <div className="form-group col-md-4">
                      <label htmlFor="end_date_p" className="fs-5 custom_badge">
                        End Date:
                      </label>
                      <input
                        className="form-control custom_input-project"
                        type="Date"
                        id="end_date_p"
                        value={end_date_p}
                        onChange={(event) => {
                          setend_date_p(event.target.value);
                        }}
                      />
                    </div>

                    <div className="form-group col-md-4">
                      <label
                        htmlFor="assigneeemployees"
                        className="fs-5 custom_badge2"
                      >
                        Assign Employees:
                      </label>

                      <Select
                        closeMenuOnSelect={false}
                        className="custom_input1"
                        options={employees.map((employee) => ({
                          value: employee.id,
                          label: employee.firstname,
                        }))}
                        isMulti
                        value={assigneeemployees}
                        onChange={setassigneeemployees}
                      />
                    </div>
                  </div>

                  <div className="d-flex mt-3">
                    <div className="form-group col-md-4">
                      <label htmlFor="Status" className="fs-5 custom_badge">
                        Status:
                      </label>
                      <select
                        className="form-select input1"
                        value={Status}
                        onChange={(event) => {
                          setStatus(event.target.value);
                        }}
                      >
                        <option value="" selected></option>
                        <option value="Assigned">Assigned</option>
                        <option value="UnAssigned">UnAssigned</option>
                      </select>
                    </div>

                    <div className="form-group mt-2 ms-4">
                      <label className="radio" htmlFor="billableStatus">
                        Billable Status:
                      </label>
                    </div>
                    <div className="mt-2">
                      <input
                        type="radio"
                        name="options"
                        value="Billable"
                        checked={billableStatus === "Billable"}
                        onChange={handleOptionChange}
                      />
                    </div>
                    <div className="ms-1 mt-2">
                      <label> Billable</label>
                    </div>

                    <div className="d-flex ms-3">
                      <div className="mt-2">
                        <input
                          type="radio"
                          name="options"
                          value="Non-Billable"
                          checked={billableStatus === "Non-Billable"}
                          onChange={handleOptionChange}
                        />
                      </div>
                      <div className="ms-2 mt-2">
                        <label>Non-billable</label>
                      </div>
                    </div>
                  </div>

                  <div className="d-flex mt-3">
                    <div className="form-group col-md-8">
                      <label
                        htmlFor="description_p"
                        className="fs-5 custom_badge"
                      >
                        Description:
                      </label>
                      <textarea
                        className="form-control custom_input-project"
                        type="textarea"
                        id="description_p"
                        value={description_p}
                        onChange={(event) => {
                          setdescription_p(event.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="d-flex gap-3 mb-4 mt-4">
                    <div className="col-md-6 text-end">
                      <button
                        type="submit"
                        className="project_add_button btn px-5"
                        data-bs-dismiss="modal"
                      >
                        <i className="icon_project_add fas fa-plus border-1 rounded-circle border-white"></i>
                        Save Changes
                      </button>
                    </div>
                    <div className="col-md-6 text-start">
                      <button
                        type="button"
                        className="project_cancel_button btn px-5"
                        data-bs-dismiss="modal"
                        onClick={handleCloseEditModal}
                      >
                        <i className="icon_project_cancel fas fa-times border-1 rounded-circle border-white"></i>
                        Cancel
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Organization;
