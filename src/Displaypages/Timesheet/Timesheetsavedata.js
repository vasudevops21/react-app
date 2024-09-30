import React, { useState, useEffect } from 'react';
import './Timesheetsavedata.css';
import { FaFilter } from 'react-icons/fa6';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
// import Button from 'react-bootstrap/Button';
// import { IoClose } from "react-icons/io5";

const columns = [
  { field: 'Empname', headerName: 'Emp Name', },
  { field: 'Empid', headerName: 'Emp ID' },
  { field: 'Enteredperiods', headerName: 'Entered Periods' },
  { field: 'Workhours', headerName: 'W' },
  { field: 'Holiday', headerName: 'H' },
  { field: 'Leave', headerName: 'L' },
  { field: 'Totalhours', headerName: 'Total Hours' },
];

const rows = [
  { id: 1, Empname: 'Jon', Empid: 'Empid A', Enteredperiods: 'Period 1', Workhours: '8', Holiday: '0', Leave: '0', Totalhours: '8' },
  { id: 2, Empname: 'Cersei', Empid: 'Empid B', Enteredperiods: 'Period 2', Workhours: '7', Holiday: '1', Leave: '0', Totalhours: '6' },

  // Add more rows as needed
];

export default function Timesheetweekdatadraft() {
  const [visibleColumns, setVisibleColumns] = useState(columns.map(col => col.field));
  const [manageColumnsVisible, setManageColumnsVisible] = useState(false);
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [rowCheckboxes, setRowCheckboxes] = useState({});


  useEffect(() => {
    // Update the rowCheckboxes state when rows change
    const checkboxes = {};
    rows.forEach(row => {
      checkboxes[row.id] = selectAllChecked;
    });
    setRowCheckboxes(checkboxes);
  }, [selectAllChecked, rows]);

  const handleColumnToggle = field => {
    setVisibleColumns(prevColumns => {
      if (prevColumns.includes(field)) {
        return prevColumns.filter(col => col !== field);
      } else {
        return [...prevColumns, field];
      }
    });
  };

  const handleSelectAllChange = () => {
    setSelectAllChecked(!selectAllChecked);
  };

  const handleRowCheckboxChange = (id) => {
    setRowCheckboxes(prevCheckboxes => {
      return {
        ...prevCheckboxes,
        [id]: !prevCheckboxes[id]
      };
    });
  };

  return (
    <div className='container-fluid timesheet-save-draft-data'>
      <div className='p-3 pt-4 mt-3'>
        <div className="timesheet-week-table-column-filter-button">
          <div className="button btn d-flex timesheet-week-table-column-filter-button-and-icon" onClick={() => setManageColumnsVisible(true)}>
            <div className="timesheet-week-table-column-filter-button-div ps-1 pe-1">Filter</div>
            <FaFilter className="timesheet-week-table-column-filter-button-div-icon" />
          </div>
        </div>
      </div>
      <div style={{}}>
        <Modal show={manageColumnsVisible} onHide={() => setManageColumnsVisible(false)} className='filter-data-column-popup' dialogClassName="modal-transparent">
          <Modal.Header closeButton>
            <Modal.Title className='filter-data-column-popup-body-title'>Choose Columns</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{}}>
            {columns.map(col => (
              <div key={col.field} className='d-flex flex-row'>
                <div>
                  <input className='filter-data-column-popup-body-input' type="checkbox" checked={visibleColumns.includes(col.field)} onChange={() => handleColumnToggle(col.field)} />
                </div>
                <div>
                  <label className='filter-data-column-popup-body-label'>{col.field}</label>
                </div>
              </div>
            ))}
          </Modal.Body>
          <Modal.Footer>
          </Modal.Footer>
        </Modal>
      </div>
      <div className="timesheet-save-draft-data-table-weekly table-responsive ">
        <Table className='timesheet-save-draft-data-table table-borderless'>
          <thead>
            <tr className='timesheet-save-draft-data-table-head-tr'>
              <th className='timesheet-save-draft-data-table-head-th-checkbox'><input type='checkbox' checked={selectAllChecked} onChange={handleSelectAllChange} className='timesheet-save-draft-data-table-head-tr-checkbox' /></th>
              {columns.map(col => (
                visibleColumns.includes(col.field) && <th key={col.field} className='timesheet-save-draft-data-table-head-th-column'><div className='timesheet-save-draft-data-table-head-tr-column'>{col.headerName}</div></th>
              ))}
              <th className='timesheet-save-draft-data-table-head-option'><div className='timesheet-save-draft-data-table-head-option-div'>Options</div></th>
            </tr>
          </thead>
          <tbody>
            {rows.map(row => (
              <tr key={row.id} className='timesheet-save-draft-data-table-body-tr'>
                <td className='timesheet-save-draft-data-table-body-td-checkbox-td'><input type='checkbox' className='timesheet-save-draft-data-table-body-td-checkbox' checked={rowCheckboxes[row.id]} onChange={() => handleRowCheckboxChange(row.id)} /></td>
                {columns.map(col => (
                  visibleColumns.includes(col.field) && <td key={col.field} className='timesheet-save-draft-data-table-body-td-column-td'><div className='timesheet-save-draft-data-table-body-td-column'>{row[col.field]}</div></td>
                ))}
                <td className='d-flex flex-row timesheet-save-draft-data-table-body-td-option-td'>
                  <div className="button btn timesheet-week-table-save-data-view-button d-flex flex-row " data-bs-toggle="modal" data-bs-target="#timesheetdraftviewpopupModal">
                    <div className='pe-1 d-flex align-items-center'>
                      <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
                        <path d="M6.00016 2.97332C6.64696 2.76828 7.32165 2.66482 8.00016 2.66665C10.7882 2.66665 12.6855 4.33332 13.8168 5.80265C14.3835 6.53998 14.6668 6.90732 14.6668 7.99998C14.6668 9.09332 14.3835 9.46065 13.8168 10.1973C12.6855 11.6666 10.7882 13.3333 8.00016 13.3333C5.21216 13.3333 3.31483 11.6666 2.1835 10.1973C1.61683 9.46132 1.3335 9.09265 1.3335 7.99998C1.3335 6.90665 1.61683 6.53932 2.1835 5.80265C2.52907 5.35112 2.9139 4.93104 3.3335 4.54732" stroke="white" strokeLinecap="round" />
                        <path d="M10 7.99997C10 8.5304 9.78929 9.03911 9.41421 9.41418C9.03914 9.78926 8.53043 9.99997 8 9.99997C7.46957 9.99997 6.96086 9.78926 6.58579 9.41418C6.21071 9.03911 6 8.5304 6 7.99997C6 7.46954 6.21071 6.96083 6.58579 6.58576C6.96086 6.21068 7.46957 5.99997 8 5.99997C8.53043 5.99997 9.03914 6.21068 9.41421 6.58576C9.78929 6.96083 10 7.46954 10 7.99997Z" stroke="white" />
                      </svg>
                    </div>
                    <div className='d-flex align-items-center'>View</div>
                  </div>
                  {/* popup for view timesheet draft data */}
                  <div class="modal" id="timesheetdraftviewpopupModal" tabindex="-1" aria-labelledby="timesheetdraftviewpopupModalLabel" aria-hidden="true">
                    <div class="modal-dialog timesheet-weekly-draft-view-option-model-dialog" style={{ margin: '25%', position:'absolute' }}>
                      <div class="modal-content timesheet-weekly-draft-view-option-model">
                        <div class="modal-header timesheet-weekly-draft-view-option-modal-header ">
                          {/* <div className="timesheet-weekly-draft-view-option-modal-header-div"> */}
                          <h4 className="timesheet-weekly-draft-view-option-modal-header-h4 pt-3">Project Details</h4>
                          <button type="button" className="timesheet-weekly-draft-view-option-model-close-icon " data-bs-dismiss="modal" aria-label="Close">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                              <path d="M6 18L18 6M18 18L6 6" stroke="#F8F8F8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                          </button>
                          {/* </div> */}

                        </div>
                        <div class="modal-body timesheet-weekly-draft-view-option-modal-body">
                          <div className="timesheet-weekly-draft-view-option-modal-body-empty-line"></div>
                          <div className='d-flex flex-row pt-3'>
                            <label className='timesheet-weekly-draft-view-option-modal-body-empname-label'>Employee Name:</label>
                            <input className='timesheet-weekly-draft-view-option-modal-body-empname-input ps-3' type="text" value="Albey" />
                          </div>
                          <div className='d-flex flex-row pt-3'>
                            <label className='timesheet-weekly-draft-view-option-modal-body-empid-label'>Employee ID:</label>
                            <input className='timesheet-weekly-draft-view-option-modal-body-empid-input ps-4' type="text" value="AGT092454" />
                          </div>
                          <div className='d-flex flex-row pt-3'>
                            <label className='timesheet-weekly-draft-view-option-modal-body-project-label pt-2'>Projects:</label>
                            <div className='timesheet-weekly-draft-view-option-modal-body-project-select-div ms-4'>
                              <select className='timesheet-weekly-draft-view-option-modal-body-project-select'>
                                <option value="someOption">Some option</option>
                                <option value="otherOption">Other option</option>
                              </select>
                            </div>
                          </div>
                          <div className='timesheet-weekly-draft-view-option-modal-body-totalvacation-totalholidays-totalleave-totalreports d-flex flex-row pt-4'>
                            <div className='timesheet-weekly-draft-view-option-modal-body-totalvacation-totalholidays-totalleave'>
                              <div className='d-flex flex-row pt-1'>
                                <div className='d-flex flex-row align-items-center timesheet-weekly-draft-view-option-modal-body-totalvacation-label-div'>
                                  <div className='d-flex flex-column'>
                                    <div >Total</div>
                                    <div >Vacation</div>
                                  </div>
                                  <div className='ps-2'>:</div>
                                </div>
                                <input className='timesheet-weekly-draft-view-option-modal-body-totalvacation-input ps-3' type="text" value="19 hours" />
                              </div>
                              <div className='d-flex flex-row pt-4'>
                                <div className='d-flex flex-row align-items-center timesheet-weekly-draft-view-option-modal-body-totalholidays-label-div'>
                                  <div className='d-flex flex-column'>
                                    <div >Total</div>
                                    <div >Holidays</div>
                                  </div>
                                  <div className='ps-2' >:</div>
                                </div>
                                <input className='timesheet-weekly-draft-view-option-modal-body-totalholidays-input ps-3' type="text" value="19 hours" />
                              </div>
                              <div className='d-flex flex-row pt-4 pb-4'> 
                                <div className='d-flex flex-row align-items-center timesheet-weekly-draft-view-option-modal-body-totalleave-label-div'>
                                  <div className='d-flex flex-column'>
                                    <div >Total</div>
                                    <div >Leave</div>
                                  </div>
                                  <div className='ps-4'>:</div>
                                </div>
                                <input className='timesheet-weekly-draft-view-option-modal-body-totalleave-input ps-3' type="text" value="19 hours" />
                              </div>
                            </div>
                            <div className='d-flex flex-row timesheet-weekly-draft-view-option-modal-body-totalreports-label'>
                              <div className='d-flex flex-row align-items-center timesheet-weekly-draft-view-option-modal-body-totalreports-label-div'>
                                <div className='d-flex flex-column'>
                                  <div style={{ whiteSpace: 'nowrap' }}>Total Reported</div>
                                  <div >Hours</div>
                                </div>
                                <div className='ps-3'>:</div>
                              </div>
                              <input className='timesheet-weekly-draft-view-option-modal-body-totalreports-input ps-3' type="text" value="19 hours" />
                            </div>
                          </div>
                        </div>
                        {/* <div class="modal-footer d-flex justify-content-center timesheet-weekly-export-download-modal-footer">

                        </div> */}
                      </div>
                    </div>
                  </div>

                  {/* popup for popup for view timesheet draft data */}
                  <div className="button btn timesheet-week-table-save-data-edit-button d-flex flex-row ">
                    <div className='pe-1 d-flex align-items-center'>
                      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                        <path d="M2.84458 11.788C4.69943 13.6429 7.11029 14.1986 8.29543 14.3126C8.64372 14.3526 8.838 14.1383 8.86458 13.9174C8.89143 13.6832 8.744 13.4286 8.40943 13.3817C7.338 13.2343 5.12143 12.7523 3.51429 11.1252C0.889147 8.49344 0.393718 4.51572 2.53658 2.37287C4.27772 0.638582 7.17715 0.859439 9.31343 2.01115L10.0097 1.33487C7.41143 -0.225419 3.916 -0.352561 1.86686 1.70315C-0.570568 4.14744 -0.249139 8.6943 2.84458 11.788ZM12.6617 2.29915L13.1971 1.76344C13.4514 1.50915 13.4651 1.13401 13.204 0.892867L13.0297 0.732296C12.8023 0.51801 12.4471 0.524582 12.1994 0.758867L11.6706 1.30144L12.6617 2.29915ZM6.15943 8.78773L12.1726 2.78115L11.1749 1.7903L5.16829 7.7903L4.61258 9.06915C4.55886 9.20973 4.69943 9.35058 4.84686 9.30344L6.15943 8.78773ZM5.28229 9.78572C7.47172 11.9754 10.994 12.8394 12.9629 10.8772C14.57 9.26344 14.3623 6.39715 12.6414 3.93315L11.9586 4.61601C13.3243 6.6383 13.5923 8.90858 12.2931 10.2074C10.7131 11.788 8.10115 11.038 6.30657 9.34372L5.28229 9.78572Z" fill="white" />
                      </svg>
                    </div>
                    <div className='d-flex align-items-center'>Edit</div>
                  </div>
                  <div className="button btn timesheet-week-table-save-data-delete-button  d-flex flex-row ">
                    <div className='pe-1 d-flex align-items-center'>
                      <svg xmlns="http://www.w3.org/2000/svg" width="13" height="15" viewBox="0 0 13 15" fill="none">
                        <path d="M1.71112 5.6904L2.59192 14.4168C2.64072 14.7856 4.42152 15.9984 6.99992 16C9.57992 15.9984 11.3607 14.7856 11.4087 14.4168L12.2903 5.6904C10.9431 6.444 8.92952 6.8 6.99992 6.8C5.07192 6.8 3.05752 6.444 1.71112 5.6904ZM9.53432 1.208L8.84712 0.4472C8.58152 0.0688 8.29352 0 7.73272 0H6.26792C5.70792 0 5.41912 0.0688 5.15432 0.4472L4.46712 1.208C2.41112 1.5672 0.919922 2.52 0.919922 3.2232V3.3592C0.919922 4.5968 3.64232 5.6 6.99992 5.6C10.3583 5.6 13.0807 4.5968 13.0807 3.3592V3.2232C13.0807 2.52 11.5903 1.5672 9.53432 1.208ZM8.65592 3.472L7.79992 2.4H6.19992L5.34552 3.472H3.98552C3.98552 3.472 5.47512 1.6952 5.67432 1.4544C5.82632 1.2704 5.98152 1.2 6.18312 1.2H7.81752C8.01992 1.2 8.17512 1.2704 8.32712 1.4544C8.52552 1.6952 10.0159 3.472 10.0159 3.472H8.65592Z" fill="white" />
                      </svg>
                    </div>
                    <div className='d-flex align-items-center'>Delete</div>
                  </div>
                </td>
              </tr>
            ))}
            <tr>
              <td className='timesheet-save-draft-data-table-body-tr-empty' colSpan={12}></td>
            </tr>
          </tbody>
        </Table>
      </div>
      <div className='timesheet-weekly-save-draft-data-submit-and-cancel-button d-flex flex-row justify-content-end'>
        <div className="button btn timesheet-weekly-save-draft-data-submit-button">Submit</div>
      </div>
    </div>
  );
}
