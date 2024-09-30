import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import axios from "axios";
import { IconButton } from "@mui/material";
import GetAppIcon from "@mui/icons-material/GetApp";
import Sidebar from "../../Components/Sidebar";
import Topbar from "../../Components/Topbar";
import "./Reports.css";
import jsPDF from "jspdf";
import "jspdf-autotable";
import PrintIcon from "@mui/icons-material/Print";
import { BiFilterAlt } from "react-icons/bi";
import { Stack, Pagination, MenuItem, Menu, Dialog, Box } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FormattedMessage } from "react-intl";
import CircularProgress, {
  circularProgressClasses,
} from "@mui/material/CircularProgress";
import { PiUserThin } from "react-icons/pi";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { Link } from "react-router-dom";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import { MdOutlineSpeakerNotes } from "react-icons/md";
import { MultiSelect } from "react-multi-select-component";
import PaginationItem from '@mui/material/PaginationItem';
function FacebookCircularProgress(props) {
  return (
    <Box sx={{ position: "relative" }}>
      <CircularProgress
        variant="determinate"
        sx={{
          color: (theme) =>
            theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
        }}
        size={40}
        thickness={4}
        {...props}
        value={100}
      />
      <CircularProgress
        variant="indeterminate"
        disableShrink
        sx={{
          color: (theme) =>
            theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
          animationDuration: "550ms",
          position: "absolute",
          left: 0,
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: "round",
          },
        }}
        size={40}
        thickness={4}
        {...props}
      />
    </Box>
  );
}

function Projects() {
  const [editedData, setEditedData] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const [openAddEmployeePopup, setOpenAddEmployeePopup] = useState(false);

  const [selectedValue, setSelectedValue] = useState([]);
  const [projectid, setprojectid] = useState("");
  const [projectname, setprojectname] = useState("");
  const [clientname, setclientname] = useState([]);
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
  const [projectcost, setprojectcost] = useState("");
  const [cummulativeHours, setcummulativeHours] = useState("");
  const [billableStatus, setBillableStatus] = useState("");
  const [value, setValue] = React.useState("1");
  const [editingClient, setEditingClient] = useState(null);
  const endpoint =
    process.env.REACT_APP_API_BASE_URL + "/api/v1/project/getAllProject";
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOptions, setSelectedOptions] = useState({
    projectidnumber: "All",
    projectname: "All",
    Clients: "All",
    projectManager: "All",
    startdate_p: "All",
    end_date_p: "All",
    billablestatus: "All",
    projectcost: "All",
    cummulativeHours: "All",
  });

  const resetForm = () => {
    setprojectid("");
    setprojectname("");
    setclientname([]);
    setprojectManager("");
    setassigneeemployees([]);
    setstartdate_p("");
    setend_date_p("");
    setdescription_p("");
    setStatus("");
    setBillableStatus("");
    setprojectcost("");
    setcummulativeHours("");
    setErrors({
      projectname: "",
      clientname: "",
      projectManager: "",
    });
  };

  const totalCount = Projects.length;

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(event.target.value);
    setCurrentPage(1);
  };

  const [errors, setErrors] = useState({
    projectname: "",
    clientname: "",
    projectManager: "",
  });

  const validateForm = () => {
    let valid = true;
    const errorsCopy = { ...errors };

    if (!projectname.trim()) {
      errorsCopy.projectname = <FormattedMessage id="projectNameRequired" />;
      valid = false;
    } else {
      errorsCopy.projectname = "";
    }

    if (!projectManager.trim()) {
      errorsCopy.projectManager = (
        <FormattedMessage id="projectManagerRequired" />
      );
      valid = false;
    } else {
      errorsCopy.projectManager = "";
    }

    setErrors(errorsCopy);
    return valid;
  };

  async function save(event) {
    event.preventDefault();

    let selectedClientNames = [];
    if (Array.isArray(clientname)) {
      selectedClientNames = clientname.map((option) => ({
        value: option.value,
        label: option.label,
        id: option.id,
      }));
    } else {
      // If only one client is selected, convert it into an array
      selectedClientNames.push({
        value: clientname.value,
        label: clientname.label,
        id: clientname.id,
      });
    }

    const isValid = validateForm();

    if (!isValid) {
      return;
    }
    try {
      await axios.post(
        process.env.REACT_APP_API_BASE_URL + "/api/v1/project/save",
        {
          projectid: projectid,
          projectname: projectname,
          clientname: selectedClientNames,
          projectManager: projectManager,
          assigneeemployees: assigneeemployees,
          startdate_p: startdate_p,
          end_date_p: end_date_p,
          description_p: description_p,
          status: Status,
          billablestatus: billableStatus,
          projectcost: projectcost,
          cummulativeHours: cummulativeHours,
        }
      );
      toast(
        <FormattedMessage id="projectRegistrationSuccess"></FormattedMessage>
      );
      setprojectid("");
      setprojectname("");
      setclientname([]);
      setprojectManager("");
      setassigneeemployees([]);
      setstartdate_p("");
      setend_date_p("");
      setdescription_p("");
      setStatus("");
      setBillableStatus("");
      setprojectcost("");
      setcummulativeHours("");
      getData("");
    } catch (err) {
      toast(<FormattedMessage id="projectRegistrationFailed" />);
    }
  }

  async function editClient(event) {
    event.preventDefault();
    try {
      let formattedClientNames = [];
      if (Array.isArray(clientname)) {
        formattedClientNames = clientname.map((option) => ({
          value: option.value,
          label: option.label,
          id: option.id,
        }));
      } else {

        formattedClientNames.push({
          value: clientname.value,
          label: clientname.label,
          id: clientname.id,
        });
      }

      await axios.post(
        process.env.REACT_APP_API_BASE_URL + "/api/v1/project/update",
        {
          projectid: editingClient.projectid,
          projectname: projectname,
          clientname: formattedClientNames,
          projectManager: projectManager,
          assigneeemployees: assigneeemployees,
          startdate_p: startdate_p,
          end_date_p: end_date_p,
          description_p: description_p,
          status: Status,
          billablestatus: billableStatus,
          projectcost: projectcost,
          cummulativeHours: cummulativeHours,
        }
      );

      toast.success(
        <FormattedMessage id="projectUpdatedSuccess"></FormattedMessage>
      );
      handleCloseEditModal();
      getData();
    } catch (err) {
      toast.error(<FormattedMessage id="projectUpdateFailed" />);
    }
  }

  const openEditModal = (Projects) => {
    setEditingClient(Projects);
    setprojectname(Projects.projectname);
    setclientname(
      Projects.clientname.map((item) => ({
        value: item.clientid,
        label: item.clientsname,
        id: item.clientid,
      }))
    );
    setprojectManager(Projects.projectManager);
    setassigneeemployees(
      Projects.assigneeemployees.map((item) => ({
        value: item.employeeId,
        label: item.firstname,
        id: item.employeeId,
      }))
    );
    setstartdate_p(Projects.startdate_p);
    setend_date_p(Projects.end_date_p);
    setdescription_p(Projects.description_p);
    setStatus(Projects.status);
    setBillableStatus(Projects.billablestatus);
    setprojectcost(Projects.projectcost);
    setcummulativeHours(Projects.cummulativeHours);
    const modal = document.getElementById("editModal");
    modal.classList.add("show");
    modal.style.display = "block";
  };

  const handleCloseEditModal = () => {
    setEditingClient(null);
    setprojectid("");
    setprojectname("");
    setclientname([]);
    setprojectManager("");
    setassigneeemployees([]);
    setstartdate_p("");
    setend_date_p("");
    setdescription_p("");
    setStatus("");
    setBillableStatus("");
    setprojectcost("");
    setcummulativeHours("");
    const modal = document.getElementById("editModal");
    modal.classList.remove("show");
    modal.style.display = "none";
  };

  async function Load() {
    try {
      const result = await axios.get(
        process.env.REACT_APP_API_BASE_URL +
          "/api/v1/Organization/getAllOrganization"
      );
      setOption(result.data);
      console.log(result.data);
    } catch (error) {
      console.error("Error fetching organization data:", error);
      // Handle the error (e.g., show a message to the user)
    }
  }

  const Loadclient = async () => {
    try {
      const result = await axios.get(
        process.env.REACT_APP_API_BASE_URL + "/api/v1/client/getAllClient"
      );
      setClients(result.data);
      console.log(result.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  async function Loademployees() {
    try {
      const result = await axios.get(
        process.env.REACT_APP_API_BASE_URL +
          "/api/v1/Organization/getAllOrganization"
      );
      setEmployees(result.data);
      console.log(result.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  }

  const fetchData = async () => {
    try {
      // Perform your database fetch here, for example:
      const response = await fetch(endpoint);
      const fetchedData = await response.json();

      // Update the data with remaining time (if cummulativeHours is available)
      const updatedData = fetchedData.map((item) => ({
        ...item,
        TheRemainingtime: item.cummulativeHours
          ? calculateRemainingTime(item.cummulativeHours)
          : "",
      }));

      return updatedData; // Return the updated data
    } catch (error) {
      console.error("Error fetching data:", error);
      return []; // Return an empty array in case of error
    }
  };

  useEffect(() => {
    // Fetch data and update projects when component mounts or cummulativeHours of any project changes
    fetchData().then((updatedData) => {
      setProjects(updatedData);
    });
  }, [Projects.map((item) => item.cummulativeHours).join(",")]); // Run whenever cummulativeHours of any project changes

  useEffect(() => {
    Loadclient();
  }, []);

  useEffect(() => {
    (async () => {
      // await Loadclient();
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

  useEffect(() => {
    filterData();
  }, [selectedOptions]);

  useEffect(() => {
    const totalItems = Projects.length;
    const lastItemIndex = currentPage * itemsPerPage;
    const firstItemIndex = lastItemIndex - itemsPerPage;
    const newFilteredProjects = Projects.slice(firstItemIndex, lastItemIndex);

    setFilteredProjects(newFilteredProjects);
  }, [Projects, currentPage, itemsPerPage]);

  // Function to calculate remaining time
  const calculateRemainingTime = (cummulativeHours) => {
    const totalWorkingHours = 40; // Assuming 40 is the total working hours
    return cummulativeHours - totalWorkingHours;
  };

  const filterData = () => {
    let filteredData = Projects.filter((item) => {
      return (
        (selectedOptions.projectidnumber === "All" ||
          item.projectidnumber === selectedOptions.projectidnumber) &&
        (selectedOptions.projectname === "All" ||
          item.projectname === selectedOptions.projectname) &&
          (selectedOptions.Clients === "All" ||
          item.clientname.some(client => client.clientidnumber === selectedOptions.Clients)) &&
        (selectedOptions.projectManager === "All" ||
          item.projectManager === selectedOptions.projectManager) &&
        (selectedOptions.startdate_p === "All" ||
          item.startdate_p === selectedOptions.startdate_p) &&
        (selectedOptions.end_date_p === "All" ||
          item.end_date_p === selectedOptions.end_date_p) &&
        (selectedOptions.billablestatus === "All" ||
          item.billablestatus === selectedOptions.billablestatus)
      );
    });

    setFilteredProjects(filteredData); // Update filteredProjects state
  };

  const handleFilterChange = (columnName, selectedValue) => {
    const value = selectedValue ? selectedValue.value : "All"; // Set to "All" if selectedValue is null
    setSelectedOptions({
      ...selectedOptions,
      [columnName]: value,
    });
  };

  const handleReset = () => {
    setSelectedOptions({
      projectidnumber: "All",
      projectname: "All",
      Clients: "All",
      projectManager: "All",
      startdate_p: "All",
      end_date_p: "All",
      billablestatus: "All",
      projectcost: "All",
      cummulativeHours: "All",
    });
  };


  const projectidOptions = [
    { value: "All", label: "All" },
    ...Array.from(new Set(Projects.map((item) => item.projectidnumber))).map(
      (projectidnumber) => ({
        value: projectidnumber,
        label: projectidnumber,
      })
    ),
  ];

  const projectOptions = [
    { value: "All", label: "All" },
    ...Array.from(new Set(Projects.map((item) => item.projectname))).map(
      (projectname) => ({
        value: projectname,
        label: projectname,
      })
    ),
  ];

  const clientOptions = [
    { value: "All", label: "All" },
    ...Clients.map((client) => ({
      value: client.clientidnumber,
      label: client.clientsname,
    })),
  ];

  const projectManagerOptions = [
    { value: "All", label: "All" },
    ...Array.from(new Set(Projects.map((item) => item.projectManager))).map(
      (projectManager) => ({
        value: projectManager,
        label: projectManager,
      })
    ),
  ];

  const startdateOptions = [
    { value: "All", label: "All" },
    ...Array.from(new Set(Projects.map((item) => item.startdate_p))).map(
      (startdate_p) => ({
        value: startdate_p,
        label: startdate_p,
      })
    ),
  ];

  const enddateOptions = [
    { value: "All", label: "All" },
    ...Array.from(new Set(Projects.map((item) => item.end_date_p))).map(
      (end_date_p) => ({
        value: end_date_p,
        label: end_date_p,
      })
    ),
  ];

  const billablestatusOptions = [
    { value: "All", label: "All" },
    ...Array.from(new Set(Projects.map((item) => item.billablestatus))).map(
      (billablestatus) => ({
        value: billablestatus,
        label: billablestatus,
      })
    ),
  ];

  const getData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(endpoint);
      setProjects(response.data); // Add 'roles' property with default value
      setFilteredProjects(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); // Set loading to false when data fetching is complete
    }
  };



  const options = {
    textLabels: {
      body: {
        noMatch: "",
        toolTip: "Sort",
        columnHeaderTooltip: (column) => `Sort for ${column.label}`,
      },
    },
    tableBodyHeight: "430px",
    pagination: false,
    filter: false,
    responsive: "scroll",

    onRowsDelete: async (rowsDeleted) => {
      const idsToDelete = rowsDeleted.data.map(
        (row) =>
          Projects[(currentPage - 1) * itemsPerPage + row.dataIndex].projectid
      );
      try {
        await Promise.all(
          idsToDelete.map((projectid) =>
            axios.delete(
              process.env.REACT_APP_API_BASE_URL +
                `/api/v1/project/delete/${projectid}`
            )
          )
        );
        toast(<FormattedMessage id="projectDeletedSuccess" />);
        getData(); // Reload data after deletion
        const totalPages = Math.ceil(
          (Projects.length - idsToDelete.length) / itemsPerPage
        );
        if (currentPage > totalPages) {
          setCurrentPage(totalPages);
        }
      } catch (error) {
        console.error("Error deleting data:", error);
      }
    },

    onRowsDelete: async (rowsDeleted) => {
      const idsToDelete = rowsDeleted.data.map(
        (row) =>
          Projects[(currentPage - 1) * itemsPerPage + row.dataIndex].projectid
      );

      try {
        let hasAssociatedEmployees = false;
        await Promise.all(
          idsToDelete.map(async (projectid) => {
            const project = Projects.find((p) => p.projectid === projectid);
            if (project.assigneeemployees.length > 0) {
              // Project has associated employees
              hasAssociatedEmployees = true;
            } else {
              // Project has no associated employees, proceed with deletion
              await axios.delete(
                process.env.REACT_APP_API_BASE_URL +
                  `/api/v1/project/delete/${projectid}`
              );
            }
          })
        );

        if (hasAssociatedEmployees) {
          toast(
            <FormattedMessage
              id="project Has Associated Employees Cannot Delete"
              values={{ count: 1 }}
            />
          );
        } else {
          toast(
            <FormattedMessage
              id="projectDeletedSuccess"
              values={{ count: idsToDelete.length }}
            />
          );
        }

        const totalPages = Math.ceil(
          (Projects.length -
            idsToDelete.length +
            (hasAssociatedEmployees ? 1 : 0)) /
            itemsPerPage
        );
        if (currentPage > totalPages) {
          setCurrentPage(totalPages);
        }

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
        <button
          type="button"
          className="filter_btn border-none bg-white px-2 "
          data-toggle="modal"
          data-target="#filter"
        >
          <BiFilterAlt className="fs-4" />
        </button>
        <IconButton >
          <GetAppIcon />
        </IconButton>
      </>
    ),
  };


  const columns = [
    {
      name: "ID",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "Name",
      options: {
        filter: true,
        sort: true,
      }
    }
  ];

  const data = [
    ["1", "John Doe"],
    ["2", "Jane Smith"],
    ["3", "Alice Johnson"],
    ["4", "Bob Brown"],
    ["5", "Charlie Davis"],
    ["6", "Diana Evans"],
    ["7", "Ethan Harris"],
    ["8", "Fiona Green"],
    ["9", "George Adams"],
    ["10", "Hannah Clark"],
  ];


  return (
    <>
       <div>
        <Topbar />
        <div className="d-flex">
          <Sidebar  />
          <div className="project-margin ">
      <div className="mui-datatable-container">
         <MUIDataTable
                    className="mui_project mt-4"
                    data={data}
                    columns={columns}
                    options={options}
                  />
                  </div>
                  </div>
                  </div>
                  </div>
    </>
  );
}

export default Projects;
