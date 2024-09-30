import React, { useRef, useState } from 'react';
import './GeneralSettings.css';
import Topbar from '../../Components/Topbar';
import Sidebar from '../../Components/Sidebar';
import SettingTopBar from './SettingTopBar';
import defaultImage from './Settingprofile.png';
import { IoCallOutline } from "react-icons/io5";
import { CiMail } from "react-icons/ci";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function GeneralSettings() {

    const fileInputRef = useRef(null);
    const [imagePreview, setImagePreview] = useState(defaultImage);
    const [name, setName] = useState('Arthur Grand');
    const [phone, setPhone] = useState('+91-9876543212');
    const [website, setWebsite] = useState('arthurgrand.com');
    const [address, setAddress] = useState('Trichy, Tamilnadu');
    const [country, setCountry] = useState("USA");
    // Local settings state
    const [timeZone, setTimeZone] = useState('Eastern Daylight Time');
    const [timeFormat, setTimeFormat] = useState('12-hours');
    const [dateFormat, setDateFormat] = useState('dd/mm/yyyy');
    const [standardWorkHoursPerDay, setStandardWorkHoursPerDay] = useState('8-hours');
    const [standardWorkdaysPerWeek, setStandardWorkdaysPerWeek] = useState('Mon,Tue,Wed,Thur,Fri');

    // Overtime rules state
    const [dailyOvertime, setDailyOvertime] = useState(false);
    const [restdayOvertime, setRestdayOvertime] = useState(false);
    const [dailyDoubleOvertime, setDailyDoubleOvertime] = useState(false);
    const [publicHolidayOvertime, setPublicHolidayOvertime] = useState(false);
    const [weeklyOvertime, setWeeklyOvertime] = useState(false);

    // Default project settings state
    const [billable, setBillable] = useState(true);
    const [nonBillable, setNonBillable] = useState(false);
    const [billableRate, setBillableRate] = useState(0);
    const [language, setLanguage] = useState('');
    const [currency, setCurrency] = useState('');
    const [autoSave, setAutoSave] = useState(false);
    const [sessionTimeout, setSessionTimeout] = useState('');
    const [expenseTracking, setExpenseTracking] = useState(false);
    const [costRate, setCostRate] = useState(false);
    const [workspaceCostRate, setWorkspaceCostRate] = useState(0);
    const [captureScreensheets, setCaptureScreensheets] = useState(false);

    const [editMode, setEditMode] = useState(false); // State to track edit mode

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    function handleFileChange(event) {
        const file = event.target.files[0];
        if (file) {
            // Check if file size exceeds 1MB
            if (file.size > 1024 * 1024) {
                toast('File size exceeds the maximum limit of 1MB.');
                // Clear the file input
                event.target.value = null;
                return;
            }
            // File size is within limits, set image preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    }

    const handleModifySettings = () => {
        setEditMode(true); // Enter edit mode
    };

    const handleSaveAndClose = () => {
        // Handle saving settings
        setEditMode(false); // Exit edit mode
    };
    return (
        <div>
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
            <Topbar />
            <div className='d-flex'>
                <Sidebar />

                <div className='settings-general-body '>

                    <SettingTopBar />
                    <>

                        {/* <Grid container spacing={1}> */}
                        <div className='settings-full'>


                            <div className='settings-general-allcontent row d-flex '>

                                {/* <Grid item xs={12}>
                                        <Paper style={{  borderRadius:30}}>
                                            <Grid container spacing={0}>
                                                <Grid item xs={12} md={3}>
                                                    <Paper style={{ padding: 10, borderTopLeftRadius: 30, borderBottomLeftRadius: 30 }}> */}
                                <div className='settings-genaral-columnone col-md-3'>
                                    <div className='settings-general-details-content'>

                                        <h2 className='settings-general-heading-company font-weight-bold'>Company Logo</h2>
                                        <p className='settings-general-paragraph-text'>Formats: png, jpg, gif. Max size: 1 MB.</p>
                                        <div>
                                            {imagePreview && <img src={imagePreview} alt="Preview" className="settings-general-image-preview" />}
                                            <input
                                                type="file"
                                                accept=".png,.jpg,.gif"
                                                style={{ display: 'none' }}
                                                ref={fileInputRef}
                                                onChange={handleFileChange}
                                                disabled={!editMode} // Disable input field when not in edit mode
                                            />
                                            <button className='settings-general-image-button' onClick={handleButtonClick} disabled={!editMode}>Upload Image</button>
                                        </div>

                                        <div>


                                            <div>
                                                {editMode ? (
                                                    <input className='settings-general-heading-name font-weight-bold' type="text" value={name} onChange={(e) => setName(e.target.value)} />
                                                ) : (
                                                    <input className='settings-general-heading-name font-weight-bold' type="text" value={name} readOnly />
                                                )}
                                            </div>
                                            <div className='settings-general-company-details-container'>
                                                <div className='settings-general-company-details-icon'>
                                                    <IoCallOutline />
                                                </div>
                                                {editMode ? (
                                                    <input className='settings-general-company-details-edit' type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />

                                                ) : (
                                                    <input className='settings-general-company-details' type="text" value={phone} readOnly />

                                                )}
                                            </div>
                                            <div className='settings-general-company-details-container'>
                                                <div className='settings-general-company-details-icon1'>
                                                    <CiMail />
                                                </div>
                                                {editMode ? (
                                                    <input className='settings-general-company-details-edit' type="text" value={website} onChange={(e) => setWebsite(e.target.value)} />
                                                ) : (
                                                    <input className='settings-general-company-details1' type="text" value={website} readOnly />
                                                )}

                                            </div>
                                            {editMode ? (
                                                <div>
                                                    <h4 className='settings-general-heading-text font-weight-bold'>Address Information</h4>
                                                    <input className='settings-general-heading-address-edit' type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
                                                </div>
                                            ) : (
                                                <div>
                                                    <h4 className='settings-general-heading-text font-weight-bold'>Address Information</h4>
                                                    <input className='settings-general-heading-address' type="text" value={address} readOnly />
                                                </div>
                                            )}


                                            <div>
                                                {!editMode && (
                                                    <button className='settings-general-modify-button' onClick={handleModifySettings}>Modify Settings</button>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {editMode && (
                                        <div >
                                            <button className='settings-general-save-button' onClick={handleSaveAndClose}>Save</button>
                                            <button className='settings-general-close-button' onClick={() => setEditMode(false)}>Close</button>
                                        </div>
                                    )}


                                </div>

                                <div className="settings-genaral-columntwo col-md-5" style={{ borderLeft: '1px solid #D9D9D9', borderRight: '1px solid #D9D9D9', marginTop: '5px', marginBottom: '5px' }}>
                                    <div className='settings-general-local-content'>

                                        <div className='settings-general-local-text'>
                                            <h2 className='settings-general-textsize font-weight-bold'>Local Settings</h2>
                                            {editMode ? (
                                                <div className='settings-general-space-text'>
                                                    <div className="settings-general-input-container">
                                                        <label className="settings-general-label">Country / Region:</label>
                                                        <input className="settings-general-input-edit" type="text" value={country} onChange={(e) => setCountry(e.target.value)} />
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className='settings-general-space-text'>
                                                    <div className="settings-general-input-container">
                                                        <label className="settings-general-label">Country / Region:</label>
                                                        <input className="settings-general-input" type="text" value={country} readOnly />
                                                    </div>
                                                </div>
                                            )}

                                            {editMode ? (
                                                <div className='settings-general-space-timezone '>
                                                    <div className="settings-general-input-container ">
                                                        <label className="settings-general-label-time-edit ">Time Zone:</label>
                                                        <input className="settings-general-input-time-edit " type="text" value={timeZone} onChange={(e) => setTimeZone(e.target.value)} />
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className='settings-general-space-timezone '>
                                                    <div className="settings-general-input-container ">
                                                        <label className="settings-general-label ">Time Zone:</label>
                                                        <input className="settings-general-input " type="text" value={timeZone} readOnly />
                                                    </div>
                                                </div>
                                            )}

                                            <h2 className='settings-general-textsize font-weight-bold'>Display Settings</h2>
                                            {editMode ? (
                                                <div className='settings-general-space-timeformat'>
                                                    <div className="settings-general-input-container">
                                                        <label className="settings-general-label">Time Format:</label>
                                                        <input className="settings-general-input-time-edit" type="text" value={timeFormat} onChange={(e) => setTimeFormat(e.target.value)} />
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className='settings-general-space-timeformat'>
                                                    <div className="settings-general-input-container">
                                                        <label className="settings-general-label">Time Format:</label>
                                                        <input className="settings-general-input" type="text" value={timeFormat} readOnly />
                                                    </div>
                                                </div>
                                            )}

                                            {editMode ? (
                                                <div className='settings-general-space-dateformat'>
                                                    <div className="settings-general-input-container">
                                                        <label className="settings-general-label">Date Format:</label>
                                                        <input className="settings-general-input-date-edit" type="text" value={dateFormat} onChange={(e) => setDateFormat(e.target.value)} />
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className='settings-general-space-dateformat'>
                                                    <div className="settings-general-input-container">
                                                        <label className="settings-general-label">Date Format:</label>
                                                        <input className="settings-general-input" type="text" value={dateFormat} readOnly />
                                                    </div>
                                                </div>
                                            )}


                                            <h2 className='settings-general-textsize font-weight-bold'> Work Schedule</h2>
                                            {editMode ? (
                                                <div className='settings-general-space-workday'>
                                                    <div className="settings-general-input-container">
                                                        <label className="settings-general-label ">Standard Work Hours Per Day:</label>
                                                        <input className="settings-general-input-work-edit " type="text" value={standardWorkHoursPerDay} onChange={(e) => setStandardWorkHoursPerDay(e.target.value)} />
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className='settings-general-space-workday'>
                                                    <div className="settings-general-input-container">
                                                        <label className="settings-general-label">Standard Work Hours Per Day:</label>
                                                        <input className="settings-general-input" type="text" value={standardWorkHoursPerDay} readOnly />
                                                    </div>
                                                </div>
                                            )}

                                            {editMode ? (
                                                <div className='settings-general-space-workweek'>
                                                    <div className="settings-general-input-container">
                                                        <label className="settings-general-label">Standard Workdays Per Week:</label>
                                                        <input className="settings-general-input-week-edit" type="text" value={standardWorkdaysPerWeek} onChange={(e) => setStandardWorkdaysPerWeek(e.target.value)} />
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className='settings-general-space-workweek'>
                                                    <div className="settings-general-input-container">
                                                        <label className="settings-general-label">Standard Workdays Per Week:</label>
                                                        <input className="settings-general-input" type="text" value={standardWorkdaysPerWeek} readOnly />
                                                    </div>
                                                </div>
                                            )}

                                            <h2 className='settings-general-textsize font-weight-bold'>Overtime rules :</h2>

                                            <div className='settings-general-space-overtime'>

                                                <div className='d-flex'>
                                                    <div>
                                                        <label className=" settings-general-label-daily form-check-label " htmlFor="flexSwitchCheckDefault">Daily Overtime:</label>
                                                        <div className="form-check form-switch">
                                                            {editMode ? (
                                                                <input className=" settings-general-toggle-daily-edit form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" checked={dailyOvertime} onChange={() => setDailyOvertime(!dailyOvertime)} />
                                                            ) : (
                                                                <input className=" settings-general-toggle-daily form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" checked={dailyOvertime} readOnly />
                                                            )}
                                                        </div>
                                                    </div>

                                                    <div class="settings-general-local-restdayovertime">
                                                        <label class="settings-general-label-restdayovertime">Restday Overtime:</label>
                                                        <div class="form-check form-switch">
                                                            {editMode ? (

                                                                <input class=" settings-general-toggle-restdayovertime-edit form-check-input " type="checkbox" id="restdayOvertime" checked={restdayOvertime} onChange={() => setRestdayOvertime(!restdayOvertime)} />
                                                            ) : (
                                                                <input class=" settings-general-toggle-restdayovertime form-check-input " type="checkbox" id="restdayOvertime" checked={restdayOvertime} readOnly />
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className=' settings-general-overtime d-flex'>
                                                    <div className='settings-general-local-overtime'>
                                                        <label className="settings-general-label-overtime form-check-label">Daily Double Overtime:</label>
                                                        <div class="form-check form-switch">
                                                            {editMode ? (
                                                                <input class="settings-general-toggle-overtime-edit form-check-input" type="checkbox" checked={dailyDoubleOvertime} onChange={() => setDailyDoubleOvertime(!dailyDoubleOvertime)} />
                                                            ) : (<input class="settings-general-toggle-overtime form-check-input" type="checkbox" checked={dailyDoubleOvertime} readOnly />
                                                            )}
                                                        </div>
                                                    </div>

                                                    <div class="settings-general-local-publicovertime">
                                                        <label class="settings-general-label-publicovertime"> Public Holiday<br /> Overtime:</label>
                                                        <div class="form-check form-switch">
                                                            {editMode ? (
                                                                <input class="settings-general-toggle-publicovertime-edit form-check-input" type="checkbox" checked={publicHolidayOvertime} onChange={() => setPublicHolidayOvertime(!publicHolidayOvertime)} />
                                                            ) : (

                                                                <input class="settings-general-toggle-publicovertime form-check-input" type="checkbox" checked={publicHolidayOvertime} readOnly />
                                                            )}

                                                        </div>
                                                    </div>
                                                </div>

                                                <div>

                                                    <div className='settings-general-local-weeklyovertime'>
                                                        <label class="form-check-label settings-general-label-weeklyovertime" for="weeklyOvertime">Weekly Overtime:</label>
                                                        <div class="form-check form-switch">
                                                            {editMode ? (
                                                                <input class="form-check-input settings-general-toggle-weeklyovertime-edit" type="checkbox" id="weeklyOvertime" checked={weeklyOvertime} onChange={() => setWeeklyOvertime(!weeklyOvertime)} />

                                                            ) : (<input class="form-check-input settings-general-toggle-weeklyovertime" type="checkbox" id="weeklyOvertime" checked={weeklyOvertime} readOnly />

                                                            )}</div>
                                                    </div>

                                                </div>


                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className='settings-genaral-columnthree col-md-3 ' >
                                    <div className="settings-general-project-content">
                                        <div className="settings-general-project-left">
                                            <h2 className='settings-general-project-text font-weight-bold'>Default Project Settings</h2>
                                        </div>
                                        <div className="settings-general-project-right">
                                            <div className='settings-general-radiobutton'>
                                                <div className="settings-general-project-input-billable ">
                                                    {editMode ? (

                                                        <input
                                                            name="radiobillabel1"
                                                            id="radiobillabel"
                                                            className="settings-general-project-toggle-billable-edit form-check-input"
                                                            type="radio"
                                                            checked={billable}
                                                            onChange={() => {
                                                                setBillable(true);
                                                                setNonBillable(false);
                                                            }}
                                                        />
                                                    ) : (
                                                        <input
                                                            name="radiobillabel1"
                                                            id="radiobillabel"
                                                            className="settings-general-project-toggle-billable form-check-input"
                                                            type="radio"
                                                            checked={billable}
                                                            readOnly
                                                        />
                                                    )}
                                                    <label className="settings-general-project-label-billable form-check-label" htmlFor="radiobillabel">Billable</label>
                                                </div>
                                                <div className="settings-general-project-input-non-billable">
                                                    {editMode ? (


                                                        <input
                                                            name="radiononbillabel1"
                                                            id="radiononbillabel1"
                                                            className="settings-general-project-toggle-non-billable-edit form-check-input"
                                                            type="radio"
                                                            checked={nonBillable}
                                                            onChange={() => {
                                                                setBillable(false);
                                                                setNonBillable(true);
                                                            }}
                                                        />
                                                    ) : (
                                                        <input
                                                            name="radiononbillabel1"
                                                            id="radiononbillabel1"
                                                            className="settings-general-project-toggle-non-billable form-check-input"
                                                            type="radio"
                                                            checked={nonBillable}
                                                            readOnly
                                                        />
                                                    )}
                                                    <label className="settings-general-project-label-non-billable form-check-label" htmlFor="radiononbillabel1">Non-Billable</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>



                                    <div className="settings-general-project-billabelrate d-flex">
                                        <div>
                                            <label className="settings-general-project-label-billabelrate">Billable Rate:</label>
                                        </div>
                                        <div>
                                            {editMode ? (


                                                <input
                                                    className="settings-general-project-input-billabelrate-edit "
                                                    type="number"
                                                    value={billableRate}
                                                    onChange={(e) => setBillableRate(e.target.value)}
                                                />
                                            ) : (
                                                <input
                                                    className="settings-general-project-input-billabelrate "
                                                    type="number"
                                                    value={billableRate}
                                                    readOnly
                                                />
                                            )}
                                        </div>
                                    </div>

                                    <div className="settings-general-project-languager d-flex">

                                        <div>
                                            <label className="settings-general-project-label-languager">Language:</label>

                                        </div>
                                        <div> {editMode ? (


                                            <input
                                                className="settings-general-project-input-languager-edit"
                                                placeholder='English'
                                                type="text"
                                                value={language}
                                                onChange={(e) => setLanguage(e.target.value)}
                                            />
                                        ) : (
                                            <input
                                                className="settings-general-project-input-languager"
                                                placeholder='English'
                                                type="text"
                                                value={language}
                                                readOnly
                                            />
                                        )}
                                        </div>
                                    </div>

                                    <div className="settings-general-project-currency d-flex">

                                        <div>
                                            <label className="settings-general-project-label-currency">Currencies:</label>
                                        </div>
                                        <div>
                                            {editMode ? (
                                                <input
                                                    className="settings-general-project-input-currency-edit"
                                                    placeholder='USD'
                                                    type="text"
                                                    value={currency}
                                                    onChange={(e) => setCurrency(e.target.value)}
                                                />
                                            ) : (
                                                <input
                                                    className="settings-general-project-input-currency"
                                                    placeholder='USD'
                                                    type="text"
                                                    value={currency}
                                                    readOnly
                                                />
                                            )}
                                        </div>
                                    </div>

                                    <div className="settings-general-project-save">
                                        <label className="settings-general-project-label-save form-check-label">Auto Save Settings :</label>
                                        <div class="form-check form-switch">
                                            {editMode ? (
                                                <input
                                                    className="settings-general-project-toggle-save-edit form-check-input"
                                                    type="checkbox"
                                                    checked={autoSave}
                                                    onChange={() => setAutoSave(!autoSave)}
                                                />
                                            ) : (
                                                <input
                                                    className="settings-general-project-toggle-save form-check-input"
                                                    type="checkbox"
                                                    checked={autoSave}
                                                    readOnly
                                                />
                                            )}
                                        </div>
                                    </div>

                                    <div className="settings-general-project-timeout">
                                        <label className="settings-general-project-label-timeout">Session Timeout Settings: </label>
                                        {editMode ? (
                                            <input
                                                className="settings-general-project-input-timeout-edit"
                                                placeholder='8.30'
                                                type="text"
                                                value={sessionTimeout}
                                                onChange={(e) => setSessionTimeout(e.target.value)}
                                            />
                                        ) : (

                                            <input
                                                className="settings-general-project-input-timeout"
                                                placeholder='8.30'
                                                type="text"
                                                value={sessionTimeout}
                                                readOnly
                                            />

                                        )}
                                        {editMode ? (
                                            <p className='Settings-general-timeout-text-edit'>hrs</p>
                                        ) : (
                                            <p className='Settings-general-timeout-text'>hrs</p>
                                        )}
                                    </div>

                                    <div className="settings-general-project-tracking">
                                        <label className="settings-general-project-label-tracking">Activate Expense Tracking :</label>
                                        <div class="form-check form-switch">
                                            {editMode ? (


                                                <input
                                                    className="settings-general-project-toggle-tracking-edit form-check-input"
                                                    type="checkbox"
                                                    checked={expenseTracking}
                                                    onChange={() => setExpenseTracking(!expenseTracking)}
                                                />
                                            ) : (
                                                <input
                                                    className="settings-general-project-toggle-tracking form-check-input"
                                                    type="checkbox"
                                                    checked={expenseTracking}
                                                    readOnly
                                                />
                                            )}
                                        </div>
                                    </div>

                                    <div className="settings-general-project-costrate">
                                        <label className="settings-general-project-label-costrate">Activate Cost Rate :</label>
                                        <div class="form-check form-switch">
                                            {editMode ? (
                                                <input
                                                    className="settings-general-project-toggle-costrate-edit form-check-input"
                                                    type="checkbox"
                                                    checked={costRate}
                                                    onChange={() => setCostRate(!costRate)}
                                                />) : (
                                                <input
                                                    className="settings-general-project-toggle-costrate form-check-input"
                                                    type="checkbox"
                                                    checked={costRate}
                                                    readOnly
                                                />
                                            )}
                                        </div>
                                    </div>

                                    <div className="settings-general-project-Workspace d-flex">
                                        <div>
                                            <label className="settings-general-project-label-Workspace">Workspace Cost Rate:</label>
                                        </div>
                                        <div>
                                            {editMode ? (
                                                <input
                                                    className="settings-general-project-input-Workspace-edit"
                                                    type="number"
                                                    value={workspaceCostRate}
                                                    onChange={(e) => setWorkspaceCostRate(e.target.value)}
                                                />
                                            ) : (
                                                <input
                                                    className="settings-general-project-input-Workspace"
                                                    type="number"
                                                    value={workspaceCostRate}
                                                    readOnly
                                                />
                                            )}
                                        </div>
                                    </div>

                                    <div className="settings-general-project-input-screensheet">
                                        <label className="settings-general-project-label-screensheet">Capture Screensheets : </label>
                                        <div class="form-check form-switch">
                                            {editMode ? (

                                                <input
                                                    className="settings-general-project-toggle-screensheet-edit form-check-input"
                                                    type="checkbox"
                                                    checked={captureScreensheets}
                                                    onChange={() => setCaptureScreensheets(!captureScreensheets)}
                                                />
                                            ) : (
                                                <input
                                                    className="settings-general-project-toggle-screensheet form-check-input"
                                                    type="checkbox"
                                                    checked={captureScreensheets}
                                                    readOnly
                                                />
                                            )}

                                        </div>
                                        <p className='settings-general-project-screensheet-text'>For Every 5 minutes </p>
                                    </div>
                                </div>
                                {/* </Paper>
                                                </Grid>
                                            </Grid>
                                        </Paper>
                                    </Grid> */}

                            </div>
                        </div>
                        {/* </Grid> */}


                    </>

                </div>
            </div>
        </div>
    );
}

export default GeneralSettings;
