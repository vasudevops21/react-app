import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import axios from "axios";
import Sidebar from "../../Components/Sidebar";
import Topbar from "../../Components/Topbar";
import "./Department.css";
import "jspdf-autotable";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import "./multiSelectStyles.css";
import { Stack, Pagination } from "@mui/material";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Department() {
  const [department, setDepartment] = useState([]);
  const [Departmentid, setDepartmentid] = useState("");
  const [Departmentname, setDepartmentname] = useState("");
  const [Departmentlead, setDepartmentlead] = useState("");
  const [value, setValue] = React.useState("1");
  const [editingClient, setEditingClient] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [employee, setEmployee] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [access, setAccess] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedItems, setSelectedItems] = useState([]);

  const totalCount = department.length;

  const [errors, setErrors] = useState({
    Departmentname: "",
  });

  const validateForm = () => {
    let valid = true;
    //const { name, email, password } = formData;
    const errorsCopy = { ...errors };

    if (!Departmentname.trim()) {
      errorsCopy.Departmentname = "Department Name is required";
      valid = false;
    } else {
      errorsCopy.Departmentname = "";
    }

    setErrors(errorsCopy);
    return valid;
  };

  const handleChanges = (selectedItems) => {
    setAccess(selectedItems);
  };
  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(event.target.value);
    setCurrentPage(1); // Reset current page to 1 when changing items per page
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    fetchEmployees(0);
  }, []);

  useEffect(() => {
    fetchEmployee();
  }, []);

  useEffect(() => {
    getData();
  }, []);

  const endpoint = "http://localhost:8080/api/v1/Department/getAllDepartment";

  async function save(event) {
    event.preventDefault();

    const isValid = validateForm();

    if (!isValid) {
      return; // Do not proceed with saving if form is invalid
    }
    console.log("Access State:", access); // Add this line to check access state

    // Create accessPayload from the access state
    const accessPayload = access.map(employee => ({
      value: employee.value,
      label: employee.label,
      id: employee.id
    }));
    
    console.log(accessPayload);
    try {
      await axios.post("http://localhost:8080/api/v1/Department/save", {
        departmentid: Departmentid,
        departmentname: Departmentname,
        departmentlead: Departmentlead,
        access: accessPayload
      });
      console.log(access);
      toast("Department Registation Successfully");
      setDepartmentid("");
      setDepartmentname("");
      setDepartmentlead("");
      setAccess([]);
      getData("");
    } catch (err) {
      toast("Department Registation Failed");
    }
  }

  const getData = async () => {
    try {
      const response = await axios.get(endpoint);
      setDepartment(response.data); // Add 'roles' property with default value
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchEmployees = async (departmentid) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/Organization/findByDepartmentIdOrNull/${departmentid}`
      );
      // Assuming the response.data is an array of objects, each containing a 'firstname' property
      const employeeOptions = response.data.map((employee) => ({
        value: employee.firstname,
        label: employee.firstname,
        id: employee.id,
      }));
      setEmployees(employeeOptions);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const fetchEmployee = async () => {
    try {
      console.log(process.env.REACT_APP_API_BASE_URL);
      const response = await axios.get(
        "http://localhost:8080/api/v1/Organization/getAllOrganization"
      );
      if (response) {
        // Assuming the response data is an array of objects with 'firstName' property
        const employeeFirstNames = response.data.map(
          (employee) => employee.firstname
        );
        setEmployee(employeeFirstNames);
      } else {
        throw new Error("Failed to fetch employees");
      }
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const openEditModal = (department) => {
    setEditingClient(department);
    setDepartmentname(department.departmentname);
    setDepartmentlead(department.departmentlead);
    setAccess(department.access);
    // Show Bootstrap modal
    const modal = document.getElementById("editModal");
    modal.classList.add("show");
    modal.style.display = "block";
    console.log(department);
    fetchEmployees(department.departmentid);
  };

  const handleCloseEditModal = () => {
    setEditingClient(null);
    setDepartmentid("");
    setDepartmentname("");
    setDepartmentlead("");
    setAccess([]);
    // Hide Bootstrap modal
    const modal = document.getElementById("editModal");
    modal.classList.remove("show");
    modal.style.display = "none";
  };

  async function editClient(event) {
    event.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/v1/Department/update", {
        departmentid: editingClient.departmentid,
        departmentname: Departmentname,
        departmentlead: Departmentlead,
        access: access,
      });
      toast("Department Updated Successfully");
      handleCloseEditModal();
      getData();
    } catch (err) {
      toast("Department Update Failed");
    }
  }

  const options = {
    tableBodyHeight: "430px",
    jumpToPage: true,
    responsive: "scroll",
    selectableRows: "multiple",
    setTableProps: () => ({
      style: {
        width: "100%", // Adjust width of the table
      },
    }),

    onRowsDelete: async (rowsDeleted) => {
      const idsToDelete = rowsDeleted.data.map(
        (row) => department[row.dataIndex].departmentid
      );
      try {
        // Check if any of the deleted departments have assigned employees
        const departmentsWithEmployees = department.filter(
          (dept) =>
            dept.access.length > 0 && idsToDelete.includes(dept.departmentid)
        );
        if (departmentsWithEmployees.length > 0) {
          toast(
            "Please Remove Employees From Department After Delete Department.."
          );
          getData();
        } else {
          await Promise.all(
            idsToDelete.map((departmentid) =>
              axios.delete(
                `http://localhost:8080/api/v1/Department/delete/${departmentid}`
              )
            )
          );
          // Reload data after deletion
          toast("Department(s) deleted successfully");
          getData();
        }
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
    pagination: false,
    responsive: "standard", // Make the table responsive
    resizableColumns: false,
    fixedHeader: true, // Fix the header
    fixedSelectColumn: false, // Disable default print button
    customToolbar: () => (
      <>
        {/* <IconButton onClick={handleDownloadClick}>
          <GetAppIcon />
        </IconButton>
        <IconButton onClick={handlePrintClick}>
          <PrintIcon />
        </IconButton> */}
      </>
    ),
  };

  const columns = [
    {
      name: "departmentname",
      label: "Department Name",
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
      name: "departmentlead",
      label: "department Lead",
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
      name: "access",
      label: "Access",
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
      name: "action",
      label: "Action",
      options: {
        setCellProps: () => ({
          align: "center",
          style: { position: "sticky", right: 0 },
        }),
        setCellHeaderProps: (value) => ({
          className: "centeredHeaderCell",
          style: { position: "sticky", right: 0 },
        }),
        customBodyRender: (value, tableMeta, updateValue) => {
          const originalIndex = calculateOriginalIndex(
            currentPage,
            tableMeta.rowIndex
          );
          return (
            <button
              className="btn department_edit_btn"
              data-bs-toggle="modal"
              data-bs-target="#editModal"
              onClick={() => openEditModal(department[originalIndex])}
           
            >
              <svg
                className="me-1"
                viewBox="0 0 24 24"
                fill="currentColor"
                height="1em"
                width="1em"
              >
                <path d="M6 18.7V21a1 1 0 01-2 0v-5a1 1 0 011-1h5a1 1 0 110 2H7.1A7 7 0 0019 12a1 1 0 112 0 9 9 0 01-15 6.7zM18 5.3V3a1 1 0 012 0v5a1 1 0 01-1 1h-5a1 1 0 010-2h2.9A7 7 0 005 12a1 1 0 11-2 0 9 9 0 0115-6.7z" />
              </svg>
              update
            </button>
          );
        },
      },
    },
  ];

  const calculateOriginalIndex = (currentPage, rowIndex) => {
    return (currentPage - 1) * itemsPerPage + rowIndex;
  };

  const totalPages = Math.ceil(department.length / itemsPerPage);

  // Slice data to display only current page's data
  const currentItems = department.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle page change
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const renderNestedProperty = (value) => {
    console.log(value);
    let returnObject = "";
    if (value && Array.isArray(value)) {
      // Check if value is an array
      returnObject = value.map((item) => item.label).join(", ");
    }
    return returnObject;
  };

  const handleEmployeeChange = (e) => {
    const selectedOptions = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setSelectedEmployees(selectedOptions);
  };

  const handleDepartmentnameChange = (e) => {
    setDepartmentname(e.target.value);
    if (errors.Departmentname) {
      setErrors((prevErrors) => ({ ...prevErrors, Departmentname: "" }));
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
        <Topbar />
        <div className="d-flex">
          <Sidebar />
          <div className="deparment-margin">
            <div className="d-flex justify-content-between ms-5">
              <Box sx={{ width: "100%", typography: "body1" }} className="mt-3">
                <TabContext value={value}>
                  <Box>
                    <TabList
                      onChange={handleChange}
                      aria-label="lab API tabs example"
                    >
                      <Tab
                        label="Employee"
                        value="2"
                        component={Link}
                        to="/Organization"
                      />
                      <Tab
                        label="Department"
                        value="1"
                        component={Link}
                        to="/department"
                      />
                    </TabList>
                  </Box>
                </TabContext>
              </Box>

              <div className="mt-4">
                <button
                  type="button"
                  className="department-button btn btn-primary px-4 me-5"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModalCenter"
                >
                  <i className="icon_department fas fa-plus ms-2 p-1"></i>
                  Add Department
                </button>
              </div>
            </div>

            <div
              className="modal fade"
              id="exampleModalCenter"
              tabIndex="-1"
              aria-labelledby="exampleModalCenterTitle"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content rounded-5 shadow-lg">
                  <div className="d-flex justify-content-between ms-5 me-5 mt-4 ">
                    <p
                      className="popup_header modal-title font-weight-bold"
                      id="exampleModalLongTitle"
                    >
                      ADD DEPARTMENT
                    </p>
                    {/* <button
                      type="button"
                      className="btn-close bg-danger"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button> */}
                    <svg
                      className="department_close_btn"
                      data-bs-dismiss="modal"
                      aria-label="Close"
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
                  </div>
                  <p className="popup_sub mt-3 ms-5">
                    PLEASE FILL OUT DEPARTMENT DETAILS
                  </p>
                  <hr className="hr ms-5 mt-3"></hr>
                  <div className="modal-body">
                    <div className=" ms-4 me-4 mt-3">
                      <form onSubmit={save} className="needs-validation">
                        <div className=" d-flex ">
                          <div className="form-group col-md-6">
                            <div>
                              <label
                                htmlFor="Departmentname"
                                className="custom_badge-department"
                              >
                                Department Name:
                                <span className="text-danger">*</span>
                              </label>
                            </div>
                            <input
                              className={`form-control custom_input-department ${
                                errors.Departmentname ? "is-invalid" : ""
                              }`}
                              autoComplete="off"
                              type="text"
                              id="Departmentname"
                              value={Departmentname}
                              onChange={handleDepartmentnameChange}
                            />
                            {errors.Departmentname && (
                              <div className="invalid-feedback">
                                {errors.Departmentname}
                              </div>
                            )}
                          </div>

                          <div className="form-group col-md-6">
                            <label
                              htmlFor="Departmentlead"
                              className="custom_badge-department"
                            >
                              Department Lead:
                            </label>
                            <select
                              className="form-control input1"
                              id="Departmentlead"
                              value={Departmentlead}
                              onChange={(e) =>
                                setDepartmentlead(e.target.value)
                              }
                            >
                              <option value="">Select Department Lead</option>
                              {employee.map((employee, index) => (
                                <option key={index} value={employee}>
                                  {employee}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div className="form-group col-md-6">
                          <label htmlFor="Access" className="custom_badge1">
                            Access :
                          </label>
                          <Select
                            className="custom_input-department"
                            // styles={styles}
                            closeMenuOnSelect={false}
                            isMulti
                            options={employees}
                            defaultValue={employees[0]}
                            value={access}
                            onChange={handleChanges}
                          />
                        </div>

                        <div className="d-flex gap-3 mb-4 mt-4">
                          <div className="col-md-6 text-end">
                            <button
                              type="submit"
                              className="department_add_button btn px-4"
                              data-bs-dismiss="modal"
                            >
                              <i className="department_add_button icon_department_add fas fa-plus border-1 rounded-circle border-white"></i>
                              Add
                            </button>
                          </div>
                          <div className="col-md-6 text-start">
                            <button
                              type="button"
                              className="department_cancel_button btn px-4"
                              data-bs-dismiss="modal"
                            >
                              <i className="icon_department_cancel fas fa-times border-1 rounded-circle border-white"></i>
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

            <div className="deparment_table mt-4 mx-5">
              <MUIDataTable
                className="mui_dep"
                data={currentItems} // Pass sliced data to the table
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
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="editModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content rounded-5 shadow-lg">
            <div className="d-flex justify-content-between ms-5 me-5 mt-4 ">
              <p className="popup_header modal-title font-weight-bold">
                EDIT DEPARTMENT
              </p>
              <svg
                onClick={handleCloseEditModal}
                className="department_close_btn"
                data-bs-dismiss="modal"
                aria-label="Close"
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
            </div>
            <p className="popup_sub mt-2 ms-5">UPDATE DEPARTMENT DETAILS</p>
            <hr className="hr ms-5"></hr>
            <div className="modal-body">
              <div className="ms-4 me-4 mt-3">
                <form onSubmit={editClient}>
                  <div className=" d-flex ">
                    <div className="form-group col-md-6">
                      <label htmlFor="Departmentname" className="custom_badge-department">
                        Department Name
                      </label>
                      <input
                        className="form-control custom_input-department"
                        autoComplete="off"
                        type="text"
                        id="Departmentname"
                        value={Departmentname}
                        onChange={(event) => {
                          setDepartmentname(event.target.value);
                        }}
                      />
                    </div>

                    <div className="form-group col-md-6">
                      <label htmlFor="Departmentlead" className="custom_badge-department">
                        Department Lead :
                      </label>
                      <select
                        className="form-select custom_input-department"
                        type="text"
                        id="Departmentlead"
                        value={Departmentlead}
                        onChange={(event) => {
                          setDepartmentlead(event.target.value);
                        }}
                      >
                        <option value="">Select Department Lead</option>
                        {employee.map((employee, index) => (
                          <option key={index} value={employee}>
                            {employee}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="d-flex mt-4">
                    <div className="form-group col-md-6">
                      <label htmlFor="Access" className="custom_badge1">
                        Access :
                      </label>
                      {/* <MultiSelect
                        options={employees}
                        value={access}
                        onChange={handleChanges}
                        labelledBy={"Select"}
                        overrideStrings={{
                          selectSomeItems: "Select...",
                          allItemsAreSelected: "All Employees are selected.",
                          selectAll: "Select All",
                          search: "Search",
                        }}
                      /> */}

                      <Select
                        className=" custom_input-department"
                        // styles={styles}
                        closeMenuOnSelect={false}
                        isMulti
                        options={employees}
                        defaultValue={employees[0]}
                        value={access}
                        onChange={handleChanges}
                      />
                    </div>
                  </div>
                  <div className="d-flex gap-3 mb-4 mt-4">
                    <div className="col-md-6 text-end">
                      <button
                        type="submit"
                        className="department_add_button btn px-4"
                      >
                        <i className="icon_department_add fas fa-plus border-1 rounded-circle border-white"></i>
                        Save Changes
                      </button>
                    </div>
                    <div className="col-md-6 text-start">
                      <button
                        type="button"
                        className="department_cancel_button btn px-4"
                        data-bs-dismiss="modal"
                        onClick={handleCloseEditModal}
                      >
                        <i className="icon_department_cancel fas fa-times border-1 rounded-circle border-white"></i>
                        Close
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

export default Department;
