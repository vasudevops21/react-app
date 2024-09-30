
import Sidebar from "../../../Components/Sidebar";
import Topbar from "../../../Components/Topbar";
import React, { useState, useEffect } from "react";
import './WeeklyAddnewtimesheet.css'
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { startOfWeek, addDays, format } from 'date-fns';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { faPlus, faTrash, faEdit, faTimes } from '@fortawesome/free-solid-svg-icons';
import { IoMdAddCircleOutline, IoIosSave } from "react-icons/io";
import axios from "axios";
import ReactSelect from 'react-select';
import { FaRegCommentDots } from "react-icons/fa";
import { Button, Modal } from 'react-bootstrap';
import { MdAdd } from "react-icons/md";
import { Diversity1 } from "@mui/icons-material";
import { useParams, useLocation } from 'react-router-dom';


const getWeekDates = (firstDayOfWeek) => {
    return Array.from({ length: 7 }, (_, index) => {
        const currentDate = addDays(firstDayOfWeek, index);
        return {
            date: format(currentDate, 'yyyy-MM-dd'),
            day: format(currentDate, 'EEEE'),
        };
    });
};
// const CalendarIcon = ({ onClick }) => (
//     <div onClick={onClick} style={{ cursor: 'pointer' }}>
//         <FontAwesomeIcon icon={faCalendarAlt} />
//     </div>
// );

const WeeklyAddnewtimesheet = () => {

    const firstDayOfCurrentWeek = startOfWeek(new Date());
    const currentDate = new Date();
    // const currentDate = new Date('2024-03-28T19:16:00');
    const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true };
    let formattedDate = currentDate.toLocaleString('en-US', options);
    formattedDate = formattedDate.replace(',', ' ');
    // formattedDate = formattedDate.replace(',', '');
    console.log(formattedDate); // Output: 28/03/2024, 07:16 PM
    const [selectedWeek, setSelectedWeek] = useState(getWeekDates(firstDayOfCurrentWeek));
    const [Project, setProject] = useState([]);
    const [showcommentBoxicon, setShowcommentBoxicon] = useState(false);
    const [clickedInputIndex, setClickedInputIndex] = useState(null);
    const [clickedRowIndex, setClickedRowIndex] = useState(null);
    const [contentRows, setContentRows] = useState([
        {
            dayHours: [0, 0, 0, 0, 0, 0, 0],
            commenttext: [[], [], [], [], [], [], []],
            selectedWeek: getWeekDates(firstDayOfCurrentWeek),
            selectProject: "Select Project",
            selectedPayType: "regularhour",
        },
    ]);
    // const [iconType, setIconType] = useState('addnew');
    // const [selectedPayType, setSelectedPayType] = useState('regularhour');
    const { id } = useParams();
    const location = useLocation();
    const [isEditMode, setIsEditMode] = useState(false);
    const [timesheetData, setTimesheetData] = useState(null);
    const [projectValue, setProjectValue] = useState(null);
    const [selectedPayType, setSelectedPayType] = useState('regularhour');

    const saveTimesheet = async (buttonClicked, event) => {
        const calculateTotalHoursForDay = (dayIndex) => {
          return contentRows.reduce((total, row) => total + row.dayHours[dayIndex], 0);
        };
      
        const dayComments = contentRows.map((row) =>
          row.commenttext.map((commentArray) =>
            Array.isArray(commentArray) ? commentArray.join(", ") : ""
          )
        );
      
        const timesheet = {
          employeeId: "AGT09887",
          employeeName: "John Claddies",
          status: buttonClicked,
          submittedDate: currentDate,
          startDate: selectedWeek ? selectedWeek[0].date : null,
          endDate: selectedWeek ? selectedWeek[6].date : null,
          projectName: projectValue ? projectValue.label : "Select project",
          projectId: projectValue ? projectValue.value : "id-3030303",
          payType: contentRows[0].selectedPayType,
          totalBillableHours: calculateOverallTotalHours(),
          sunday: calculateTotalHoursForDay(0), // Calculate total hours for Sunday
          monday: calculateTotalHoursForDay(1),
          tuesday: calculateTotalHoursForDay(2),
          wednesday: calculateTotalHoursForDay(3),
          thursday: calculateTotalHoursForDay(4),
          friday: calculateTotalHoursForDay(5),
          saturday: calculateTotalHoursForDay(6),
          totalDayHours: calculateOverallTotalHours(),
          totalRegularHours: calculateTotalRegularHours(),
          totalOvertimeHours: calculateTotalOvertimeHours(),
          comments: dayComments.flat(),
        };
      
        try {
            console.log(isEditMode);
            console.log(timesheetData);
          if (isEditMode) {
            if (timesheetData) {
              timesheet.timesheetId = timesheetData.timesheetId;
              const response = await axios.post(`http://localhost:8080/api/v1/timesheet/weekly/update/${timesheet.timesheetId}`, timesheet);
              if (response.status === 200) {
                alert("Timesheet updated successfully");
              } else {
                console.log("errorrr");
                throw new Error(`Error updating timesheet: ${response.data}`);
              }
            } else {
              throw new Error('Timesheet data is not available for editing');
            }
          } else {
            await axios.post("http://localhost:8080/api/v1/timesheet/weekly/save", timesheet);
            setSelectedPayType();
            setProject("");
            setContentRows([{ dayHours: [0, 0, 0, 0, 0, 0, 0], commenttext: ["", "", "", "", "", "", ""], selectProject: "Select Project" }]);
            if (buttonClicked === 'submitted') {
              // Display a success message for the submit button
              alert('Timesheet submitted successfully');
            } else if (buttonClicked === 'draft') {
              // Display a success message for the save button
              alert('Timesheet saved successfully');
            }
          }
        } catch (err) {
          console.error(err);
          if (buttonClicked === 'submitted') {
            // Display an error message for the submit button
            alert('Timesheet submission failed: ' + err.message);
          } else if (buttonClicked === 'draft') {
            // Display an error message for the save button
            alert('Timesheet save failed: ' + err.message);
          }
        }
      };

    const handleInputClick = (rowIndex, columnIndex) => { // Update handleInputClick to accept row index and column index
        setClickedRowIndex(rowIndex); // Set the clicked row index
        setClickedInputIndex(columnIndex); // Set the clicked input index
    };

    useEffect(() => {
        (async () => {
            await Loadproject();
            if (location.state && location.state.timesheet) {
                const timesheetData = location.state.timesheet;
                setTimesheetData(timesheetData);
                setIsEditMode(true);
                setProjectValue({ value: timesheetData.projectId, label: timesheetData.projectName });
                setSelectedWeek(getWeekDates(new Date(timesheetData.startDate)));
                setContentRows([
                    {
                        dayHours: [
                            timesheetData.sunday,
                            timesheetData.monday,
                            timesheetData.tuesday,
                            timesheetData.wednesday,
                            timesheetData.thursday,
                            timesheetData.friday,
                            timesheetData.saturday,
                        ],
                        commenttext: timesheetData.comments ? timesheetData.comments.map(comment => [comment]) : [[], [], [], [], [], [], []],
                        selectProject: timesheetData.projectName,
                        selectedPayType: timesheetData.payType,
                    },
                ]);
            }
        })();
    }, [id, location.state]);

    async function Loadproject() {
        try {
            const result = await axios.get("http://localhost:8080/api/v1/project/getAllProject");
            setProject(result.data?.length > 0 ? result.data : []);
        } catch (error) {
            console.error("Error fetching projects:", error);
            setProject([]);
        }
    }

    const handleWeekChange = (date) => {
        const firstDayOfWeek = startOfWeek(date);
        updateSelectedWeek(firstDayOfWeek);
    };

    const updateSelectedWeek = (firstDayOfWeek) => {
        const weekDates = getWeekDates(firstDayOfWeek);
        setSelectedWeek(weekDates);
        console.log('Selected Week:', weekDates);
    };

    const handleCancel = () => {
        const resetRows = contentRows.map((row) => ({
            dayHours: [0, 0, 0, 0, 0, 0, 0],
            commenttext: ["", "", "", "", "", "", ""],
            selectProject: "Select Project"
        }));
        setContentRows(resetRows);
    };

    // const handleAddNewRow = (iconType) => {
    //     if (iconType === 'circle') {
    //         setIconType('circle');
    //         const createNewDefaultRow = () => ({
    //             dayHours: [0, 0, 0, 0, 0, 0, 0],
    //             commenttext: ["", "", "", "", "", "", ""],
    //             selectProject: "Select Project"
    //         });
    //         const newRow = createNewDefaultRow();
    //         setContentRows((prevRows) => [...prevRows, newRow]);

    //     } else if (iconType === 'add') {
    //         setIconType('add');
    //         const createNewDefaultRow = () => ({
    //             dayHours: [0, 0, 0, 0, 0, 0, 0],
    //             commenttext: ["", "", "", "", "", "", ""],
    //             selectProject: "Select Project"
    //         });
    //         const newRow = createNewDefaultRow();
    //         setContentRows((prevRows) => [...prevRows, newRow]);

    //     }
    // };

    // For the icon representing 'circle'
    const handleCircleIconClick = () => {
        handleAddNewRow('addnew');
    };

    // For the icon representing 'add'
    const handleAddIconClick = () => {
        handleAddNewRow('paytypeadd');
    };

    // Function to add a new row with the specified iconType
    const handleAddNewRow = (iconType) => {
        // Add the new row to the contentRows array with the specified iconType
        setContentRows(prevRows => [
            ...prevRows,
            {
                iconType: iconType, // Set the iconType for the new row
                dayHours: [0, 0, 0, 0, 0, 0, 0],
                commenttext: ["", "", "", "", "", "", ""],
                selectProject: "Select Project",
                projectId: "",
                selectedPayType: "regularhour"
            }
        ]);
        console.log(iconType)
    };
    

    const handleDeleteRow = (index) => {
        const updatedRows = [...contentRows];
        updatedRows.splice(index, 1);
        setContentRows(updatedRows);
    };

    const handleDayHoursChange = (event, rowIndex, dayIndex) => {
        const updatedRows = [...contentRows];
        updatedRows[rowIndex].dayHours[dayIndex] = parseFloat(event.target.value) || 0;
        setContentRows(updatedRows);
    };

    const handleCommentChange = (event, rowIndex, dayIndex) => {
        const updatedRows = [...contentRows];
        updatedRows[rowIndex].commenttext[dayIndex] = event.target.value || "";
        setContentRows(updatedRows);

    };

    const handleProjectChange = (selectedOption, rowIndex) => {
        if (selectedOption) {
            const updatedRows = [...contentRows];
            updatedRows[rowIndex].selectProject = selectedOption.value || "Select Project";
            setContentRows(updatedRows);
        } else {
        }
    };

    const handlePayTypeChange = (selectedOption, rowIndex) => {
        if (selectedOption) {
            const updatedRows = [...contentRows];
            updatedRows[rowIndex].selectedPayType = selectedOption || "regularhour"; // Set selected pay type
            setContentRows(updatedRows);
            // setSelectedPayType(selectedOption);
        } else {
            // Handle case when no option is selected
        }
    };

    const calculateTotalHours = (dayHours) => {
        return dayHours.reduce((total, hours) => total + hours, 0);
    };

    const calculateOverallTotalHours = () => {
        return contentRows.reduce((total, row) => total + calculateTotalHours(row.dayHours), 0);
    };

    const calculatedayHourstotal = (dayIndex) => {
        let totaldayHours = 0;
        contentRows.forEach(row => {
            totaldayHours += row.dayHours[dayIndex];
        });
        return totaldayHours;
    };

    // const calculateRegularHours = (dayIndex) => {
    //     const totalDayHours = calculatedayHourstotal(dayIndex);
    //     return totalDayHours;
    // };

    const calculateRegularHours = (dayIndex) => {
        let totalRegularHours = 0;
        contentRows.forEach(row => {
            // Check if the selected pay type is 'regularhour'
            if (row.selectedPayType === 'regularhour') {
                totalRegularHours += row.dayHours[dayIndex];
            }
        });
        return totalRegularHours;
    };

    const calculateOvertimeHours = (dayIndex) => {
        let totalOvertimeHours = 0;
        contentRows.forEach(row => {
            // Check if the selected pay type is 'overtimehour'
            if (row.selectedPayType === 'overtimehour') {
                totalOvertimeHours += row.dayHours[dayIndex];
            }
        });
        return totalOvertimeHours;
    };


    const calculateTotalRegularHours = () => {
        let totalRegularHours = 0;
        selectedWeek.forEach((day, dayIndex) => {
            totalRegularHours += calculateRegularHours(dayIndex);
        });
        return totalRegularHours;
    };
    const calculateTotalOvertimeHours = () => {
        let totalRegularHours = 0;
        selectedWeek.forEach((day, dayIndex) => {
            totalRegularHours += calculateOvertimeHours(dayIndex);
        });
        return totalRegularHours;
    };


    const CustomDatePickerInput = ({ value, onClick }) => {
        return (
            <div className="custom-date-picker-input ps-2 d-flex" onClick={onClick} >
                {value}
                {/* <FontAwesomeIcon icon={faCalendarAlt} className="ps-2 opacity-50" /> */}
                <div className="ps-2 custom-date-picker-input-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M14 22H10C6.229 22 4.343 22 3.172 20.828C2 19.657 2 17.771 2 14V12C2 8.229 2 6.343 3.172 5.172C4.343 4 6.229 4 10 4H14C17.771 4 19.657 4 20.828 5.172C22 6.343 22 8.229 22 12V14C22 17.771 22 19.657 20.828 20.828C20.175 21.482 19.3 21.771 18 21.898M7 4V2.5M17 4V2.5M21.5 9H10.75M2 9H5.875" stroke="black" stroke-opacity="0.5" stroke-width="1.5" stroke-linecap="round" />
                        <path d="M18 17C18 17.2652 17.8946 17.5196 17.7071 17.7071C17.5196 17.8946 17.2652 18 17 18C16.7348 18 16.4804 17.8946 16.2929 17.7071C16.1054 17.5196 16 17.2652 16 17C16 16.7348 16.1054 16.4804 16.2929 16.2929C16.4804 16.1054 16.7348 16 17 16C17.2652 16 17.5196 16.1054 17.7071 16.2929C17.8946 16.4804 18 16.7348 18 17ZM18 13C18 13.2652 17.8946 13.5196 17.7071 13.7071C17.5196 13.8946 17.2652 14 17 14C16.7348 14 16.4804 13.8946 16.2929 13.7071C16.1054 13.5196 16 13.2652 16 13C16 12.7348 16.1054 12.4804 16.2929 12.2929C16.4804 12.1054 16.7348 12 17 12C17.2652 12 17.5196 12.1054 17.7071 12.2929C17.8946 12.4804 18 12.7348 18 13ZM13 17C13 17.2652 12.8946 17.5196 12.7071 17.7071C12.5196 17.8946 12.2652 18 12 18C11.7348 18 11.4804 17.8946 11.2929 17.7071C11.1054 17.5196 11 17.2652 11 17C11 16.7348 11.1054 16.4804 11.2929 16.2929C11.4804 16.1054 11.7348 16 12 16C12.2652 16 12.5196 16.1054 12.7071 16.2929C12.8946 16.4804 13 16.7348 13 17ZM13 13C13 13.2652 12.8946 13.5196 12.7071 13.7071C12.5196 13.8946 12.2652 14 12 14C11.7348 14 11.4804 13.8946 11.2929 13.7071C11.1054 13.5196 11 13.2652 11 13C11 12.7348 11.1054 12.4804 11.2929 12.2929C11.4804 12.1054 11.7348 12 12 12C12.2652 12 12.5196 12.1054 12.7071 12.2929C12.8946 12.4804 13 12.7348 13 13ZM8 17C8 17.2652 7.89464 17.5196 7.70711 17.7071C7.51957 17.8946 7.26522 18 7 18C6.73478 18 6.48043 17.8946 6.29289 17.7071C6.10536 17.5196 6 17.2652 6 17C6 16.7348 6.10536 16.4804 6.29289 16.2929C6.48043 16.1054 6.73478 16 7 16C7.26522 16 7.51957 16.1054 7.70711 16.2929C7.89464 16.4804 8 16.7348 8 17ZM8 13C8 13.2652 7.89464 13.5196 7.70711 13.7071C7.51957 13.8946 7.26522 14 7 14C6.73478 14 6.48043 13.8946 6.29289 13.7071C6.10536 13.5196 6 13.2652 6 13C6 12.7348 6.10536 12.4804 6.29289 12.2929C6.48043 12.1054 6.73478 12 7 12C7.26522 12 7.51957 12.1054 7.70711 12.2929C7.89464 12.4804 8 12.7348 8 13Z" fill="black" fill-opacity="0.5" />
                    </svg>
                </div>
            </div>
        );
    };







    return (
        <div>
            <Topbar />
            <div className="d-flex">
                <Sidebar />
                <div className="container " style={{ overflow: 'auto', maxHeight: 'calc(100vh - 50px)' }}>
                    <div className="back-button-icon-timesheet d-flex m-4">
                        <Link to={"/timesheet"} style={{ textDecoration: 'none' }}>
                            {/* <FontAwesomeIcon icon={faCircleArrowLeft} className="back-button-icon-timesheet-i" /> */}
                            <div className="back-button-icon-timesheet-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                                <path d="M4.99992 12.5L4.11617 13.3838L3.23242 12.5L4.11617 11.6163L4.99992 12.5ZM26.2499 22.5C26.2499 22.8315 26.1182 23.1495 25.8838 23.3839C25.6494 23.6183 25.3314 23.75 24.9999 23.75C24.6684 23.75 24.3505 23.6183 24.116 23.3839C23.8816 23.1495 23.7499 22.8315 23.7499 22.5H26.2499ZM10.3662 19.6338L4.11617 13.3838L5.88367 11.6163L12.1337 17.8663L10.3662 19.6338ZM4.11617 11.6163L10.3662 5.36627L12.1337 7.13377L5.88367 13.3838L4.11617 11.6163ZM4.99992 11.25H17.4999V13.75H4.99992V11.25ZM26.2499 20V22.5H23.7499V20H26.2499ZM17.4999 11.25C19.8206 11.25 22.0462 12.1719 23.6871 13.8128C25.328 15.4538 26.2499 17.6794 26.2499 20H23.7499C23.7499 18.3424 23.0914 16.7527 21.9193 15.5806C20.7472 14.4085 19.1575 13.75 17.4999 13.75V11.25Z" fill="black" fill-opacity="0.5" />
                            </svg>
                            </div>
                        </Link>
                        <p className="back-button-icon-timesheet-p">Timesheet</p>
                    </div>
                    <div className="employee-week-details ">
                        <div className="row container employee-details-week-timesheet d-flex justify-content-between">
                            <div className="employee-name-timesheet-week p-2 pt-3 col-auto">
                                <label className="employee-name-timesheet-week-label mb-2">Employee Name</label>
                                <div className="employee-name-timesheet-week-box-input">John Claddies</div>
                            </div>
                            <div className="employee-ID-timesheet-week p-2 pt-3 col-auto">
                                <label className="employee-ID-timesheet-week-label mb-2">Employee ID</label>
                                <div className="employee-ID-timesheet-week-box-input">AGT09887</div>
                            </div>
                            <div className="employee-status-timesheet-week p-2 pt-3 col-auto">
                                <label className="employee-status-timesheet-week-label mb-2">Status</label>
                                <div className="employee-status-timesheet-week-box-input">Re-Called</div>
                            </div>
                            <div className="employee-current-date-timesheet-week p-2 pt-3 col-auto">
                                <label className="employee-current-date-timesheet-week-label mb-2">Current Time and Date</label>
                                <div className="employee-current-date-timesheet-week-box-input d-flex">{formattedDate}
                                    <div className="ps-2 employee-current-date-timesheet-week-box-input-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <path d="M14 22H10C6.229 22 4.343 22 3.172 20.828C2 19.657 2 17.771 2 14V12C2 8.229 2 6.343 3.172 5.172C4.343 4 6.229 4 10 4H14C17.771 4 19.657 4 20.828 5.172C22 6.343 22 8.229 22 12V14C22 17.771 22 19.657 20.828 20.828C20.175 21.482 19.3 21.771 18 21.898M7 4V2.5M17 4V2.5M21.5 9H10.75M2 9H5.875" stroke="black" stroke-opacity="0.5" stroke-width="1.5" stroke-linecap="round" />
                                            <path d="M18 17C18 17.2652 17.8946 17.5196 17.7071 17.7071C17.5196 17.8946 17.2652 18 17 18C16.7348 18 16.4804 17.8946 16.2929 17.7071C16.1054 17.5196 16 17.2652 16 17C16 16.7348 16.1054 16.4804 16.2929 16.2929C16.4804 16.1054 16.7348 16 17 16C17.2652 16 17.5196 16.1054 17.7071 16.2929C17.8946 16.4804 18 16.7348 18 17ZM18 13C18 13.2652 17.8946 13.5196 17.7071 13.7071C17.5196 13.8946 17.2652 14 17 14C16.7348 14 16.4804 13.8946 16.2929 13.7071C16.1054 13.5196 16 13.2652 16 13C16 12.7348 16.1054 12.4804 16.2929 12.2929C16.4804 12.1054 16.7348 12 17 12C17.2652 12 17.5196 12.1054 17.7071 12.2929C17.8946 12.4804 18 12.7348 18 13ZM13 17C13 17.2652 12.8946 17.5196 12.7071 17.7071C12.5196 17.8946 12.2652 18 12 18C11.7348 18 11.4804 17.8946 11.2929 17.7071C11.1054 17.5196 11 17.2652 11 17C11 16.7348 11.1054 16.4804 11.2929 16.2929C11.4804 16.1054 11.7348 16 12 16C12.2652 16 12.5196 16.1054 12.7071 16.2929C12.8946 16.4804 13 16.7348 13 17ZM13 13C13 13.2652 12.8946 13.5196 12.7071 13.7071C12.5196 13.8946 12.2652 14 12 14C11.7348 14 11.4804 13.8946 11.2929 13.7071C11.1054 13.5196 11 13.2652 11 13C11 12.7348 11.1054 12.4804 11.2929 12.2929C11.4804 12.1054 11.7348 12 12 12C12.2652 12 12.5196 12.1054 12.7071 12.2929C12.8946 12.4804 13 12.7348 13 13ZM8 17C8 17.2652 7.89464 17.5196 7.70711 17.7071C7.51957 17.8946 7.26522 18 7 18C6.73478 18 6.48043 17.8946 6.29289 17.7071C6.10536 17.5196 6 17.2652 6 17C6 16.7348 6.10536 16.4804 6.29289 16.2929C6.48043 16.1054 6.73478 16 7 16C7.26522 16 7.51957 16.1054 7.70711 16.2929C7.89464 16.4804 8 16.7348 8 17ZM8 13C8 13.2652 7.89464 13.5196 7.70711 13.7071C7.51957 13.8946 7.26522 14 7 14C6.73478 14 6.48043 13.8946 6.29289 13.7071C6.10536 13.5196 6 13.2652 6 13C6 12.7348 6.10536 12.4804 6.29289 12.2929C6.48043 12.1054 6.73478 12 7 12C7.26522 12 7.51957 12.1054 7.70711 12.2929C7.89464 12.4804 8 12.7348 8 13Z" fill="black" fill-opacity="0.5" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div className="employee-select-week-timesheet-calendar p-2 pt-3 col-auto">
                                <label className="employee-select-week-timesheet-calendar-label mb-2">Select Date</label>
                                <div className="employee-select-week-timesheet-calendar-box-input">
                                    <DatePicker
                                        className="timesheet-week-calendar-wrapper-date-picker"
                                        selected={selectedWeek ? new Date(selectedWeek[0].date) : null}
                                        onChange={handleWeekChange}
                                        showWeekNumbers
                                        dateFormat={`MM/dd/yyyy - ${selectedWeek ? format(new Date(selectedWeek[6].date), 'MM/dd/yyyy') : ''}`}
                                        selectsStart
                                        startDate={selectedWeek ? new Date(selectedWeek[0].date) : null}
                                        endDate={selectedWeek ? new Date(selectedWeek[6].date) : null}
                                        customInput={<CustomDatePickerInput />}
                                    />
                                    {/* <FontAwesomeIcon icon={faCalendarAlt} /> */}
                                </div>
                            </div>
                            <div className="employee-reported-hours-timesheet-week p-2 pt-3 col-auto">
                                <label className="employee-reported-hours-timesheet-week-label pt-4">Reported Hours</label>
                                <div className="employee-reported-hours-timesheet-week-box-input">{calculateOverallTotalHours()} Hrs</div>
                            </div>
                        </div>
                        {/* <div className="row employee-details-week-timesheet-heading">
                            <p className="employee-details-week-timesheet-heading-p">Entries</p>
                        </div> */}
                        <div className="employee-add-entries-details-week-timesheet table-responsive">
                            <table class="table table-borderless custom-table ">
                                <thead >
                                    <tr className="employee-add-entries-details-week-timesheet-table-head">
                                        <th scope="col" className="custom-table-header-week-timesheet-entries" ></th>
                                        <th scope="col" className="custom-table-header-week-timesheet-entries-project">Projects</th>
                                        <th scope="col" className="custom-table-header-week-timesheet-entries-projectid">Project ID</th>
                                        <th scope="col" className="custom-table-header-week-timesheet-entries">Pay type</th>
                                        {selectedWeek.map((day, dayIndex) => (
                                            <th key={day.date} className={`add-day-${dayIndex + 1}`} style={{ whiteSpace: 'nowrap', backgroundColor: '#787DBD', color: 'white', fontSize: '14px', padding: '20px', alignItems: 'center', textAlign: 'center' }}>
                                                <div>
                                                    <label className="timesheet-add-hours-box-label" htmlFor={`working-hours-${dayIndex + 1}`}>
                                                        <div>{`${format(new Date(day.date), 'EEE')}`}</div>
                                                        <div>{`${format(new Date(day.date), 'MMM dd')}`}</div>
                                                    </label>
                                                </div>
                                            </th>
                                        ))}
                                        <th scope="col" className="custom-table-header-week-timesheet-entries" >Total</th>
                                        <th scope="col" className="custom-table-header-week-timesheet-entries" ></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {contentRows.map((row, index) => (
                                        <tr key={index}>
                                            {row.iconType !== 'paytypeadd' ? (
                                                <td className="custom-table-body-week-timesheet-entries">
                                                    <div className="timesheet-weekly-add-new-work-hours" id={`timesheet-weekly-add-new-work-hours-${index}`}>
                                                        <div className="timesheet-weekly-add-new-work-hours-icon ms-3 mt-1" onClick={handleCircleIconClick}>
                                                            {/* <label htmlFor="timesheet-weekly-add-new-work-hours-icon-display-box" className="timesheet-weekly-add-new-work-hours-icon-display-label"></label> */}
                                                            <IoMdAddCircleOutline style={{ fontSize: '22px', color: 'rgba(0, 0, 0, 0.50)', backgroundColor: '#EEECEC ', marginTop: '16px', cursor: 'pointer' }} />
                                                        </div>
                                                    </div>
                                                </td>
                                            ) : <td className="custom-table-body-week-timesheet-entries"></td>}
                                            {row.iconType !== 'paytypeadd' ? (
                                                <td className="custom-table-body-week-timesheet-entries">
                                                    <p className="timesheet-weekly-select-project " data-bs-toggle="modal" data-bs-target={`#projectpopupModal-${index}`}>{row.selectProject}</p>
                                                    {/* project popup start */}
                                                    <div className="modal" id={`projectpopupModal-${index}`} tabindex="-1" aria-labelledby="projectpopupModalLabel" aria-hidden="true">
                                                        <div className="modal-dialog search-project modal-dialog-centered">
                                                            <div className="modal-content timesheet-weekly-select-project-model">
                                                                <div class="modal-header">
                                                                    <h5 class="modal-title timesheet-weekly-select-project-model-title" id="projectpopupModalLabel">Search Project</h5>
                                                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                </div>
                                                                <div class="modal-body">
                                                                    <div>
                                                                        <h5 className="timesheet-weekly-select-project-model-body-value">{row.selectProject}</h5>
                                                                        <ReactSelect
                                                                            className="timesheet-week-select-project-id-display-label"
                                                                            value={row.selectProject}
                                                                            onChange={(selectedOption) => {
                                                                                handleProjectChange(selectedOption, index);
                                                                            }}
                                                                            id={`timesheet-week-select-project-id-display-label-${index + 1}`}
                                                                            options={Array.isArray(Project) ? Project.map((project) => ({
                                                                                key: project.projectid,
                                                                                value: project.projectname,
                                                                                label: project.projectname
                                                                            })) : []}
                                                                            placeholder="Select Project" />
                                                                    </div>
                                                                </div>
                                                                <div class="modal-footer">
                                                                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Save</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* project popup end */}
                                                </td>
                                            ) : <td className="custom-table-body-week-timesheet-entries"></td>}
                                            {row.iconType !== 'paytypeadd' ? (
                                                <td className="custom-table-body-week-timesheet-entries">
                                                    <p className="timesheet-weekly-select-project-description" id={`timesheet-weekly-select-project-description-${index}`}>id-3030303</p>
                                                </td>
                                            ) : <td className="custom-table-body-week-timesheet-entries"></td>}

                                            <td className="custom-table-body-week-timesheet-entries">
                                                <div className="d-flex flex-row">
                                                    <div className="timesheet-weekly-add-new-pay-type-icon" id={`timesheet-weekly-add-new-pay-type-icon-${index}`} onClick={handleAddIconClick}>
                                                        <IoMdAddCircleOutline style={{ fontSize: '22px', color: 'rgba(0, 0, 0, 0.50)', marginTop: '20px', cursor: 'pointer' }} />
                                                    </div>
                                                    {/* <select class="form-select" className="timesheet-weekly-pay-type-select" id={`timesheet-weekly-pay-type-select-${index}`} onChange={(e) => handlePayTypeChange(e.target.value, index)}
                                                        value={row.selectedPayType} >
                                                        <option value="regularhour">R</option>
                                                        <option value="overtimehour">OT</option>
                                                    </select> */}
                                                    <div class="timesheet-weekly-pay-type-select-custom-dropdown">
                                                        <select class="form-select timesheet-weekly-pay-type-select" id={`timesheet-weekly-pay-type-select-${index}`} onChange={(e) => handlePayTypeChange(e.target.value, index)} value={row.selectedPayType}>
                                                            <option value="regularhour">R</option>
                                                            <option value="overtimehour">OT</option>
                                                        </select>
                                                        {/* <div class="timesheet-weekly-pay-type-select-custom-dropdown-icon">
                                                            
                                                        </div> */}
                                                    </div>

                                                </div>
                                            </td>
                                            {selectedWeek.map((day, dayIndex) => (
                                                <td key={day.date} className="custom-table-body-week-timesheet-entries">
                                                    <div className="timesheet-weekly-add-hours-box d-flex flex-row mt-1 me-3">
                                                        <input
                                                            className="timesheet-weekly-add-hours-box-show"
                                                            type="number"
                                                            id={`working-hours-weekly-timesheet-${dayIndex + 1}`}
                                                            onChange={(event) => handleDayHoursChange(event, index, dayIndex)}
                                                            onClick={() => handleInputClick(index, dayIndex)}
                                                            value={contentRows[index].dayHours[dayIndex]}
                                                        />
                                                        {clickedInputIndex === dayIndex && clickedRowIndex === index && (
                                                            <div className="timesheet-weekly-add-hours-box-show-icon"  >
                                                                <FaRegCommentDots style={{ fontSize: '20px', marginTop: '9px', color: 'rgba(0, 0, 0, 0.50)' }} className="timesheet-weekly-enter-commend-box " data-bs-toggle="modal" data-bs-target={`#commentpopupModal-${index}-${dayIndex + 1}`} />
                                                                {/* popup comment box start*/}
                                                                <div class="modal" id={`commentpopupModal-${index}-${dayIndex + 1}`} tabindex="-1" aria-labelledby="commentpopupModalLabel" aria-hidden="true">
                                                                    <div class="modal-dialog modal-dialog-centered search-weekly">
                                                                        <div class="modal-content timesheet-weekly-comment-text-model">
                                                                            <div class="modal-header">
                                                                                <h5 class="modal-title timesheet-weekly-comment-text-model-title" id="commentpopupModalLabel">{`${format(new Date(day.date), 'EEE')}`} {`${format(new Date(day.date), 'dd/MM')}`}</h5>
                                                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                            </div>
                                                                            <div class="modal-body">
                                                                                <div>
                                                                                    <textarea
                                                                                        id={`timesheet-weekly-comment-textarea-${dayIndex + 1}`}
                                                                                        className="timesheet-weekly-comment-textarea-name"
                                                                                        rows="4"
                                                                                        placeholder="Any Comments for the Approver"
                                                                                        value={contentRows[index].commenttext[dayIndex]}
                                                                                        onChange={(event) => handleCommentChange(event, index, dayIndex)}
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                            <div class="modal-footer">
                                                                                <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Save</button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                {/* popup comment box end */}
                                                            </div>
                                                        )}

                                                    </div>
                                                </td>
                                            ))}
                                            <td className="custom-table-body-week-timesheet-entries">
                                                <div className="timesheet-weekly-add-total-hours-box pt-1">
                                                    {/* <label className="timesheet-add-total-hours-box-label" htmlFor="timesheet-add-total-hours-box-label" >{index === 0 ? "Total Hours" : null}</label> */}
                                                    <div >
                                                        <input
                                                            className="timesheet-weekly-add-total-hours-box-show"
                                                            type="text"
                                                            id="timesheet-weekly-add-total-hours-box-label"
                                                            value={calculateTotalHours(row.dayHours)}
                                                        />
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="custom-table-body-week-timesheet-entries" >
                                                <div className="timesheet-weekly-add-new-work-hours-delete">
                                                    <div className="timesheet-weekly-add-new-work-hours-icon-delete" onClick={() => handleDeleteRow(index)}>
                                                        {index !== 0 && (
                                                            <React.Fragment>
                                                                <label htmlFor={`timesheet-weekly-add-new-work-hours-icon-display-box-delete-${index}`} className="timesheet-weekly-add-new-work-hours-icon-display-label-delete"></label>
                                                                {/* <FontAwesomeIcon
                                                                    icon={faTrash}
                                                                    style={{ fontSize: '20px', color: 'red', padding: '10px' }}

                                                                /> */}
                                                                <div className="timesheet-weekly-add-new-work-hours-icon-display-delete-icon">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="16" viewBox="0 0 14 16" fill="none">
                                                                        <path d="M1.71112 5.6904L2.59192 14.4168C2.64072 14.7856 4.42152 15.9984 6.99992 16C9.57992 15.9984 11.3607 14.7856 11.4087 14.4168L12.2903 5.6904C10.9431 6.444 8.92952 6.8 6.99992 6.8C5.07192 6.8 3.05752 6.444 1.71112 5.6904ZM9.53432 1.208L8.84712 0.4472C8.58152 0.0688 8.29352 0 7.73272 0H6.26792C5.70792 0 5.41912 0.0688 5.15432 0.4472L4.46712 1.208C2.41112 1.5672 0.919922 2.52 0.919922 3.2232V3.3592C0.919922 4.5968 3.64232 5.6 6.99992 5.6C10.3583 5.6 13.0807 4.5968 13.0807 3.3592V3.2232C13.0807 2.52 11.5903 1.5672 9.53432 1.208ZM8.65592 3.472L7.79992 2.4H6.19992L5.34552 3.472H3.98552C3.98552 3.472 5.47512 1.6952 5.67432 1.4544C5.82632 1.2704 5.98152 1.2 6.18312 1.2H7.81752C8.01992 1.2 8.17512 1.2704 8.32712 1.4544C8.52552 1.6952 10.0159 3.472 10.0159 3.472H8.65592Z" fill="black" fill-opacity="0.5" />
                                                                    </svg>
                                                                </div>
                                                            </React.Fragment>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>

                                        </tr>
                                    ))}
                                    <tr >
                                        <td colspan="4" className="custom-table-body-week-timesheet-entries pt-2">
                                            <div className="d-flex justify-content-end timesheet-week-regular-hours-calculation">Regular :</div>
                                        </td>
                                        {selectedWeek.map((day, dayIndex) => (
                                            <td key={dayIndex} className="custom-table-body-week-timesheet-entries pt-2">
                                                <div className="timesheet-week-regular-hours-calculation">{calculateRegularHours(dayIndex)}</div>
                                            </td>
                                        ))}
                                        <td colSpan={selectedWeek.length} className="custom-table-body-week-timesheet-entries pt-2">
                                            <div className="timesheet-week-regular-hours-calculation-final">{calculateTotalRegularHours()}</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colspan="4" className="custom-table-body-week-timesheet-entries pt-1">
                                            <div className="d-flex justify-content-end timesheet-week-overtime-hours-calculation">Overtime :</div>
                                        </td>
                                        {selectedWeek.map((day, dayIndex) => (
                                            <td key={dayIndex} className="custom-table-body-week-timesheet-entries pt-1">
                                                <div className="timesheet-week-overtime-hours-calculation">{calculateOvertimeHours(dayIndex)}</div>
                                            </td>
                                        ))}
                                        <td colSpan={selectedWeek.length} className="custom-table-body-week-timesheet-entries pt-1">
                                            <div className="timesheet-week-overtime-hours-calculation-final">{calculateTotalOvertimeHours()}</div>
                                        </td>
                                    </tr>
                                    <tr >
                                        <td colSpan="4" className="custom-table-body-week-timesheet-entries pt-1">
                                            <div className="d-flex justify-content-end timesheet-week-total-hours-calculation">Total :</div>
                                        </td>
                                        {selectedWeek.map((day, dayIndex) => (
                                            <td key={dayIndex} className="custom-table-body-week-timesheet-entries pt-1">
                                                <div className="timesheet-week-total-hours-calculation">{calculatedayHourstotal(dayIndex)}</div>
                                            </td>
                                        ))}
                                        <td colSpan={selectedWeek.length} className="custom-table-body-week-timesheet-entries pt-1">
                                            <div className="timesheet-week-total-hours-calculation-final">{calculateOverallTotalHours()}</div>
                                        </td>
                                    </tr>
                                    <tr >
                                        <td colSpan="13" className="empty-space-color-table"></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="row copy-last-week-and-save-submit-cancel-button d-flex justify-content-between">
                            <div className="copy-last-week-activity  ms-4 col-auto">
                                <div className="d-flex flex-md-row flex-column">
                                    <div className="d-flex flex-column">
                                        {/* <p className="copy-last-week-activity-p">Copy Last Week</p> */}

                                        <div className="copy-last-week-activity-select-option mt-3 me-4 ">
                                            <select className="form-select copy-last-week-activity-select-option-form" aria-label="Default select example">
                                                <option value="1">Copy activities Only</option>
                                                <option value="2">Copy activities and Time</option>
                                            </select>
                                            {/* <div className="custom-arrow">
                                            </div> */}
                                        </div>
                                    </div>
                                    <div className="copy-last-week-activity-save-button ms-3 ">
                                        <div className="button btn d-flex copy-last-week-activity-save-button-and-icon">
                                            <div className="copy-last-week-activity-save-button-div ps-3 pe-2">Save</div>
                                            {/* <IoIosSave className="copy-last-week-activity-save-button-div opacity-50" /> */}
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                                                <path d="M0 2.75C0 2.02065 0.289731 1.32118 0.805456 0.805456C1.32118 0.289731 2.02065 0 2.75 0H12.715C13.5769 5.14719e-05 14.4035 0.342495 15.013 0.952L17.048 2.987C17.658 3.597 18 4.424 18 5.286V15.25C18 15.9793 17.7103 16.6788 17.1945 17.1945C16.6788 17.7103 15.9793 18 15.25 18H2.75C2.02065 18 1.32118 17.7103 0.805456 17.1945C0.289731 16.6788 0 15.9793 0 15.25V2.75ZM2.75 1.5C2.06 1.5 1.5 2.06 1.5 2.75V15.25C1.5 15.94 2.06 16.5 2.75 16.5H3V11.25C3 10.6533 3.23705 10.081 3.65901 9.65901C4.08097 9.23705 4.65326 9 5.25 9H12.75C13.3467 9 13.919 9.23705 14.341 9.65901C14.7629 10.081 15 10.6533 15 11.25V16.5H15.25C15.94 16.5 16.5 15.94 16.5 15.25V5.286C16.5 4.821 16.316 4.376 15.987 4.048L13.952 2.013C13.6937 1.75422 13.3607 1.58286 13 1.523V4.25C13 4.54547 12.9418 4.83805 12.8287 5.11104C12.7157 5.38402 12.5499 5.63206 12.341 5.84099C12.1321 6.04992 11.884 6.21566 11.611 6.32873C11.3381 6.4418 11.0455 6.5 10.75 6.5H6.25C5.65326 6.5 5.08097 6.26295 4.65901 5.84099C4.23705 5.41903 4 4.84674 4 4.25V1.5H2.75ZM13.5 16.5V11.25C13.5 11.0511 13.421 10.8603 13.2803 10.7197C13.1397 10.579 12.9489 10.5 12.75 10.5H5.25C5.05109 10.5 4.86032 10.579 4.71967 10.7197C4.57902 10.8603 4.5 11.0511 4.5 11.25V16.5H13.5ZM5.5 1.5V4.25C5.5 4.664 5.836 5 6.25 5H10.75C10.9489 5 11.1397 4.92098 11.2803 4.78033C11.421 4.63968 11.5 4.44891 11.5 4.25V1.5H5.5Z" fill="black" fill-opacity="0.5" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="timesheet-weekly-submit-save-cancel-button d-flex flex-row col-auto ms-4 mt-3 mb-4">

                                <div className="button btn d-flex flex-row timesheet-weekly-button-submit mb-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path d="M20 13V5.749C20.0001 5.67006 19.9845 5.59189 19.9543 5.51896C19.9241 5.44603 19.8798 5.37978 19.824 5.324L16.676 2.176C16.5636 2.06345 16.4111 2.00014 16.252 2H4.6C4.44087 2 4.28826 2.06321 4.17574 2.17574C4.06321 2.28826 4 2.44087 4 2.6V21.4C4 21.5591 4.06321 21.7117 4.17574 21.8243C4.28826 21.9368 4.44087 22 4.6 22H14" stroke="#38BA7C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M16 2V5.4C16 5.55913 16.0632 5.71174 16.1757 5.82426C16.2883 5.93679 16.4409 6 16.6 6H20M16 19H22M22 19L19 16M22 19L19 22" stroke="#38BA7C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>

                                    <div className="timesheet-weekly-button-submit-div ps-2"onClick={() => saveTimesheet('submitted')}>Sign</div>
                                </div>
                                <div className="button btn d-flex flex-row timesheet-weekly-button-save mb-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path d="M7 21H17C18.0609 21 19.0783 20.5786 19.8284 19.8284C20.5786 19.0783 21 18.0609 21 17V7.414C20.9999 7.14881 20.8946 6.89449 20.707 6.707L17.293 3.293C17.1055 3.10545 16.8512 3.00006 16.586 3H7C5.93913 3 4.92172 3.42143 4.17157 4.17157C3.42143 4.92172 3 5.93913 3 7V17C3 18.0609 3.42143 19.0783 4.17157 19.8284C4.92172 20.5786 5.93913 21 7 21Z" stroke="#787DBD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M17 21V14C17 13.7348 16.8946 13.4804 16.7071 13.2929C16.5196 13.1054 16.2652 13 16 13H8C7.73478 13 7.48043 13.1054 7.29289 13.2929C7.10536 13.4804 7 13.7348 7 14V21M9 3H15V6C15 6.26522 14.8946 6.51957 14.7071 6.70711C14.5196 6.89464 14.2652 7 14 7H10C9.73478 7 9.48043 6.89464 9.29289 6.70711C9.10536 6.51957 9 6.26522 9 6V3Z" stroke="#787DBD" stroke-width="2" />
                                        <path d="M11 17H13" stroke="#787DBD" stroke-width="2" stroke-linecap="round" />
                                    </svg>

                                    <div className="timesheet-weekly-button-save-div ps-2"onClick={() => saveTimesheet('draft')}>Save</div>
                                </div>
                                <div className="button btn d-flex flex-row timesheet-weekly-button-reset mb-2" onClick={handleCancel}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
                                        <path d="M7.5 5.5L4.5 2.5H10.5C12.0976 2.49986 13.6587 2.97788 14.9823 3.87253C16.306 4.76718 17.3315 6.03751 17.927 7.52C18.297 8.441 18.5 9.447 18.5 10.5C18.5 12.6217 17.6571 14.6566 16.1569 16.1569C14.6566 17.6571 12.6217 18.5 10.5 18.5C8.37827 18.5 6.34344 17.6571 4.84315 16.1569C3.34285 14.6566 2.5 12.6217 2.5 10.5C2.5 9.01 2.87 7.028 4.038 5.409M7.5 7.5L13.5 13.5M7.5 13.5L13.5 7.5" stroke="#FF7F7F" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>

                                    <div className="timesheet-weekly-button-reset-div ps-2">Reset</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="white-space-timesheet">
                    </div>
                </div>
            </div>
        </div>
    )
}
export default WeeklyAddnewtimesheet;
