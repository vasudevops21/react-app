
import React, { useState, useEffect, useRef } from 'react';
import './Roles.css'; // Make sure your CSS is correctly imported
import Topbar from '../../../Components/Topbar';
import Sidebar from '../../../Components/Sidebar';
import SettingTopBar from '../SettingTopBar';
import { Link } from 'react-router-dom';
import Userpermissioncomponent from '../Userpermissioncomponent';
import { CgAdd } from "react-icons/cg";
import { MdOutlineCancel } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { Modal, Button, Toast } from "react-bootstrap";
import { AiOutlineSync } from "react-icons/ai";
import { FormattedMessage } from 'react-intl';
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';




//ROLE MAIN FUNCTION //

const Roles = () => {

  const navigate = useNavigate();
  const handleConfigurePermission = (role) => {
    navigate('/settings/UserAcceesControl/Permission', { state: { role } });
  };


  // ADD ROLE FUNCTION //
  const AddRoleModal = ({ isVisible, onClose, onSave }) => {

    const [role, setRole] = useState('');

    const [department, setDepartment] = useState('Custom Role');

    const clonerole = 'Custom Role';


    const isRoleNameDuplicate = (roleName, roles, newRoles) => {
      const isDuplicateInDefaultRoles = roles.some(role => role.name.toLowerCase() === roleName.toLowerCase());
      const isDuplicateInCustomRoles = newRoles.some(role => role.name.toLowerCase() === roleName.toLowerCase());
      return isDuplicateInDefaultRoles || isDuplicateInCustomRoles;
    };

    const handleSaveClick = () => {
      if (role.trim() && department.trim()) {
        if (isRoleNameDuplicate(role, roles, newRoles.filter((_, index) => index !== editingRoleIndex))) {
          toast(` ${role} Role already exists`, {
            style: {
              textAlign: 'center'
            }
          });
          return;
        }
        onSave(role, clonerole);
      } else {
        // Alert the user that both fields are required.
        toast('Both Role and Department are required', {
          style: {
            textAlign: 'center'
          }
        });
      }
    };

    useEffect(() => {
      if (!isVisible) {
        setRole('');
        setDepartment('');
      }
    }, [isVisible]);


    if (!isVisible) return null;

    return (
      <div className="modal-overlay">

        <ToastContainer
          position="top-center"
          autoClose={3000} // 5 seconds
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <div className="modal-content-roles">
          <div className='setting_role_addrole'>
            <p className='add_role_headline'>Add Role</p>
            <div className='setting_addrole_cancel_button' onClick={onClose}>
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                <path d="M6 18L18 6M18 18L6 6" stroke="#F8F8F8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </div>

          </div>
          <div className='please-fill-text'>
            <p className="instruction-text">PLEASE FILL OUT DETAILS</p>
          </div>
          <div className='add_role_department'>

            <div className='add_role'>
              <label className='setting_add_role_input'>Role</label>
              <input
                className='setting_placeholder'
                type="text"
                placeholder="Role Name"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required // Make this input mandatory

              />
            </div>
            {/* <div className='add_department'>
              <label className='setting_add_department_input'>Department</label>
              <input
                className='setting_placeholder'
                type="text"
                placeholder="Department"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                required // Make this input mandatory
              />
            </div> */}

            <div className=''>
              <label className='setting_add_department_input'>Clone Role</label>
              <select
                className='add_department_select'
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                required
              >
                <option disabled value="" className='setting_add_department_option'>Choose Role</option>
                {roles.map((role, index) => (
                  <option key={index} value={role.name}>{role.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="button-group d-flex gap-4 justify-content-center ms-4">
            <div className='roles_add_button d-flex'>

              <button className='add_button1 btn btn-sm px-4 py-2' onClick={handleSaveClick}>
                <CgAdd className='fs-4 me-2' />
                Add
              </button>


            </div>


            <div className='roles_cancel_buton' onClick={onClose}>

              <button className='cancel_button1 btn btn-sm px-3 py-2'>
                <MdOutlineCancel className='fs-4 me-2' />
                Cancel

              </button>


            </div>
          </div>
        </div>
      </div>

    );
  };




  // EDIT ROLE FUNCTION //

  const EditRoleModal = ({ isVisible, onClose, onSave, initialRole, initialDepartment }) => {
    const [role, setRole] = useState(initialRole || '');
    const [department, setDepartment] = useState(initialDepartment || '');

    const handleSaveClick = () => {
      if (role.trim() && department.trim()) {
        onSave(role, department);
      } else {
        // Alert the user that both fields are required.
        alert('Both Role and Department are required.');
      }
    };

    useEffect(() => {
      setRole(initialRole);
      setDepartment(initialDepartment);
    }, [initialRole, initialDepartment]);

    if (!isVisible) return null;

    return (
      <>
        <div className="modal-overlay">
          <div className="modal-content-roles">
            <div className='setting_role_addrole'>
              <p className='add_role_headline'>Edit Role</p>
              <div className='setting_addrole_cancel_button' onClick={onClose}>
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                  <path d="M6 18L18 6M18 18L6 6" stroke="#F8F8F8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </div>

            </div>
            <div className='please-fill-text'>
              <p className="instruction-text">PLEASE FILL OUT DETAILS</p>
            </div>
            <div className='add_role_department'>

              <div className='add_role'>
                <label className='setting_add_role_input'>Role</label>
                <input
                  className='setting_placeholder'
                  type="text"
                  placeholder="Role Name"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required // Make this input mandatory
                />
              </div>
              <div className='add_department'>
                <label className='setting_add_department_input'>Department</label>
                <input
                  className='setting_placeholder'
                  type="text"
                  placeholder="Department"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  required // Make this input mandatory
                />
              </div>
            </div>
            <div className="button-group d-flex gap-4 justify-content-center ms-4">
              <div className='roles_add_button d-flex'>
                <button className='edit_button1 btn px-3' onClick={handleSaveClick}>
                  <AiOutlineSync className='fs-5 me-2' />
                  Update
                </button>
              </div>


              <div className='roles_cancel_buton'>



                <button className='edit_cancel_button btn px-3' onClick={onClose}>
                  <MdOutlineCancel className='fs-4 me-2' />
                  cancel
                </button>




              </div>
            </div>
          </div>
        </div>

      </>
    );
  };



  const [editingRoleIndex, setEditingRoleIndex] = useState(null);
  const [editingRole, setEditingRole] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [roles, setRoles] = useState([
    { name: 'Administrator', department: 'Default Role' },
    { name: 'Supervisor', department: 'Default Role' },
    { name: 'Member', department: 'Default Role' }
  ]);

  const [newRoles, setNewRoles] = useState([]);

  const handleOpenModal = () => setIsModalVisible(true);
  const handleCloseModal = () => {
    setIsModalVisible(false);
    setEditingRole(null);
    setEditingRoleIndex(null);
  };

  const handleSave = (roleName, department) => {
    setNewRoles(currentRoles => [...currentRoles, { name: roleName, department }]);
    handleCloseModal();
  };

  const handleDeleteRole = (roleIndex) => {
    const updatedRoles = newRoles.filter((_, index) => index !== roleIndex);
    setNewRoles(updatedRoles);
  };

  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [selectedRoleIndex, setSelectedRoleIndex] = useState(null);

  const handleOpenDeleteModal = (index) => {
    setSelectedRoleIndex(index);
    setIsDeleteModalVisible(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalVisible(false);
    setSelectedRoleIndex(null);
  };

  const handleEditRole = (role, index) => {
    setEditingRole(role);
    setEditingRoleIndex(index);
    handleOpenModal();
  };
  return (
    <div>
      <Topbar />
      <div className='d-flex'>
        <Sidebar />
        <div className='roles-container'>
          <SettingTopBar />
          <div className=''>
            <Userpermissioncomponent />
            <div className='setting-con justify-content-center mx-5'>
              <div className='text-end me-5'>
                <div className="content-area">
                  <div className='d-flex justify-content-end'>
                    <div className="add-btn d-flex setting_role_create" onClick={handleOpenModal} >


                      <div className='add_button_svg '  >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                          <path d="M18.96 13.5714L14.5455 9.28571L18.96 5L20 6.00714L16.6255 9.28571L20 12.5643L18.96 13.5714ZM14.5455 20H13.0909V16.4286C13.0909 15.4814 12.7078 14.573 12.0258 13.9032C11.3439 13.2334 10.419 12.8571 9.45455 12.8571H5.09091C4.12649 12.8571 3.20156 13.2334 2.51961 13.9032C1.83766 14.573 1.45455 15.4814 1.45455 16.4286V20H0V16.4286C0 15.1025 0.536362 13.8307 1.49109 12.893C2.44582 11.9554 3.74072 11.4286 5.09091 11.4286H9.45455C10.8047 11.4286 12.0996 11.9554 13.0544 12.893C14.0091 13.8307 14.5455 15.1025 14.5455 16.4286V20ZM7.27273 1.42857C7.99193 1.42857 8.69499 1.63803 9.29298 2.03047C9.89098 2.4229 10.3571 2.98068 10.6323 3.63327C10.9075 4.28587 10.9795 5.00396 10.8392 5.69675C10.6989 6.38954 10.3526 7.02591 9.84402 7.52538C9.33547 8.02485 8.68753 8.365 7.98215 8.5028C7.27676 8.64061 6.54561 8.56988 5.88115 8.29957C5.21669 8.02926 4.64877 7.5715 4.2492 6.98418C3.84963 6.39686 3.63636 5.70636 3.63636 5C3.63636 4.0528 4.01948 3.14439 4.70143 2.47462C5.38338 1.80485 6.3083 1.42857 7.27273 1.42857ZM7.27273 0C6.26584 0 5.28157 0.293245 4.44437 0.842652C3.60717 1.39206 2.95466 2.17295 2.56934 3.08658C2.18402 4.00021 2.0832 5.00555 2.27964 5.97545C2.47607 6.94536 2.96093 7.83627 3.67291 8.53553C4.38489 9.2348 5.292 9.711 6.27954 9.90393C7.26708 10.0969 8.29069 9.99784 9.22093 9.6194C10.1512 9.24096 10.9463 8.6001 11.5057 7.77785C12.0651 6.95561 12.3636 5.98891 12.3636 5C12.3636 3.67392 11.8273 2.40215 10.8725 1.46447C9.91781 0.526784 8.62292 0 7.27273 0Z" fill="white" />
                        </svg>
                      </div>

                      <div className='add_button_text'  ><FormattedMessage id="createrole" /></div>
                    </div>
                  </div>
                  <AddRoleModal
                    isVisible={isModalVisible && editingRoleIndex === null}
                    onClose={handleCloseModal}
                    onSave={(roleName, department) => handleSave(roleName, department, roles, newRoles, setNewRoles, handleCloseModal)}
                    roles={roles}
                    newRoles={newRoles}
                  />

                  <EditRoleModal
                    isVisible={isModalVisible && editingRoleIndex !== null}
                    onClose={handleCloseModal}
                    onSave={(roleName, department) => {
                      const updatedRoles = newRoles.map((role, index) => {
                        if (index === editingRoleIndex) {
                          return { ...role, name: roleName, department };
                        }
                        return role;
                      });
                      setNewRoles(updatedRoles);
                      handleCloseModal();
                    }}
                    initialRole={editingRole?.name ?? ''}
                    initialDepartment={editingRole?.department ?? ''}
                  />

                </div>
              </div>
              <div className=''>
                <div className='default-roles mx-4'>
                  {roles.map((role, index) => (
                    <div key={index} className='card1 shadow mb-3 pt-2'> {/* Added mb-3 for spacing */}
                      <p className='dp'>{role.name}</p>
                      <p className='dp1'>{role.department}</p>

                      <div className={`ps-5  ${role.name === "Administrator" ? "roles-box-design2-disabled" : "roles-box-design2"}`} >
                        <div>
                          (0)
                        </div>


                        {role.name === "Administrator" ? (
                          <p
                            className='disabled'
                          >
                            Configure Permission
                          </p>
                        ) : (
                          <div>
                            <p
                              className='permission'
                              onClick={() => handleConfigurePermission(role.name)}
                            >
                              Configure Permission
                            </p>
                          </div>
                        )}



                      </div>

                    </div>
                  ))}


                  {newRoles.length > 0 && newRoles.map((role, index) => (
                    <div key={index} className='card1 shadow mb-3 pt-2 '>
                      <div className='edit-role-delete-div justify-content-end text-end'>
                        <button className='edit-role-button fs-5' onClick={() => handleEditRole(role, index)}  >
                          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="-5 0 17 23" fill="none">
                            <path d="M14.7825 6.02992L13.0275 7.77742L10.215 4.96492L11.97 3.21742C12.2625 2.92492 12.75 2.92492 13.0275 3.21742L14.7825 4.97242C15.075 5.24992 15.075 5.73742 14.7825 6.02992ZM2.25 12.9374L9.795 5.38492L12.6075 8.19742L5.0625 15.7499H2.25V12.9374ZM12.465 3.77992L11.31 4.93492L13.065 6.68992L14.22 5.53492L12.465 3.77992ZM11.52 8.24992L9.75 6.47992L3 13.2449V14.9999H4.755L11.52 8.24992Z" fill="white" />
                          </svg>


                        </button>
                        <button className='delete-role-button fs-5' data-bs-toggle="modal" data-bs-target="#conformationdeleteModal" onClick={() => handleOpenDeleteModal(index)}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="25" viewBox="-5 -2 16 20" fill="none">
                            <path d="M11.5 2.25H8.75V1.5C8.75 1.16848 8.6183 0.850537 8.38388 0.616117C8.14946 0.381696 7.83152 0.25 7.5 0.25H4.5C4.16848 0.25 3.85054 0.381696 3.61612 0.616117C3.3817 0.850537 3.25 1.16848 3.25 1.5V2.25H0.5C0.433696 2.25 0.370107 2.27634 0.323223 2.32322C0.276339 2.37011 0.25 2.4337 0.25 2.5C0.25 2.5663 0.276339 2.62989 0.323223 2.67678C0.370107 2.72366 0.433696 2.75 0.5 2.75H1.25V12C1.25 12.1989 1.32902 12.3897 1.46967 12.5303C1.61032 12.671 1.80109 12.75 2 12.75H10C10.1989 12.75 10.3897 12.671 10.5303 12.5303C10.671 12.3897 10.75 12.1989 10.75 12V2.75H11.5C11.5663 2.75 11.6299 2.72366 11.6768 2.67678C11.7237 2.62989 11.75 2.5663 11.75 2.5C11.75 2.4337 11.7237 2.37011 11.6768 2.32322C11.6299 2.27634 11.5663 2.25 11.5 2.25ZM3.75 1.5C3.75 1.30109 3.82902 1.11032 3.96967 0.96967C4.11032 0.829018 4.30109 0.75 4.5 0.75H7.5C7.69891 0.75 7.88968 0.829018 8.03033 0.96967C8.17098 1.11032 8.25 1.30109 8.25 1.5V2.25H3.75V1.5ZM10.25 12C10.25 12.0663 10.2237 12.1299 10.1768 12.1768C10.1299 12.2237 10.0663 12.25 10 12.25H2C1.9337 12.25 1.87011 12.2237 1.82322 12.1768C1.77634 12.1299 1.75 12.0663 1.75 12V2.75H10.25V12ZM4.75 5.5V9.5C4.75 9.5663 4.72366 9.62989 4.67678 9.67678C4.62989 9.72366 4.5663 9.75 4.5 9.75C4.4337 9.75 4.37011 9.72366 4.32322 9.67678C4.27634 9.62989 4.25 9.5663 4.25 9.5V5.5C4.25 5.4337 4.27634 5.37011 4.32322 5.32322C4.37011 5.27634 4.4337 5.25 4.5 5.25C4.5663 5.25 4.62989 5.27634 4.67678 5.32322C4.72366 5.37011 4.75 5.4337 4.75 5.5ZM7.75 5.5V9.5C7.75 9.5663 7.72366 9.62989 7.67678 9.67678C7.62989 9.72366 7.5663 9.75 7.5 9.75C7.4337 9.75 7.37011 9.72366 7.32322 9.67678C7.27634 9.62989 7.25 9.5663 7.25 9.5V5.5C7.25 5.4337 7.27634 5.37011 7.32322 5.32322C7.37011 5.27634 7.4337 5.25 7.5 5.25C7.5663 5.25 7.62989 5.27634 7.67678 5.32322C7.72366 5.37011 7.75 5.4337 7.75 5.5Z" fill="white" />
                          </svg>
                        </button>

                        {/* project popup start */}
                        <div className="modal setting_popup_box" id="conformationdeleteModal" tabindex="-1" aria-labelledby="conformationdeleteModalLabel" aria-hidden="true">
                          <div className="modal-dialog setting_popup_box_modal_dialog">
                            <div className="modal-content setting_popup_box_modal_contect">
                              <div class="modal-body" id="conformationdeleteModalLabel">

                                <div className="setting_role_delete_confirm_close" data-bs-dismiss="modal" aria-label="Close">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="-3 0 22 18" fill="none">
                                    <path d="M4 12L12 4M12 12L4 4" stroke="#F8F8F8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                  </svg>
                                </div>

                                <div className='d-flex mt-3 ' >

                                  <div className='setting_role_delete_svg '>

                                  </div>




                                  <div className='confirmdelete_word' >
                                    <h2 className='confirmdelete_word_h2'> Delete Role </h2>
                                    <p className='confirmdelete_word_p'>Are you certain you wish to proceed with the deletion of this?</p>
                                  </div>

                                </div>
                              </div>


                              <div className='d-flex justify-content-center mb-5'>
                                <div className="button btn d-flex flex-row setting_role_delete_button " onClick={() => {
                                  handleDeleteRole(selectedRoleIndex);
                                  handleCloseDeleteModal();
                                }} data-bs-dismiss="modal">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="4 0 30 26" fill="none">
                                    <path d="M7 21C6.45 21 5.97933 20.8043 5.588 20.413C5.19667 20.0217 5.00067 19.5507 5 19V6H4V4H9V3H15V4H20V6H19V19C19 19.55 18.8043 20.021 18.413 20.413C18.0217 20.805 17.5507 21.0007 17 21H7ZM9 17H11V8H9V17ZM13 17H15V8H13V17Z" fill="white" />
                                  </svg>

                                  {/* <BsFillArrowDownCircleFill className="timesheet-weekly-export-download-modal-footer-btn-download-icon" /> */}
                                  <div className="setting_role_delete_button_text " >Delete</div>
                                </div>
                                <div className="button btn d-flex flex-row setting_role_cancel_button " data-bs-dismiss="modal">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="2 0 30 26" fill="none">
                                    <path d="M8.4 17L12 13.4L15.6 17L17 15.6L13.4 12L17 8.4L15.6 7L12 10.6L8.4 7L7 8.4L10.6 12L7 15.6L8.4 17ZM12 22C10.6167 22 9.31667 21.7373 8.1 21.212C6.88333 20.6867 5.825 19.9743 4.925 19.075C4.025 18.175 3.31267 17.1167 2.788 15.9C2.26333 14.6833 2.00067 13.3833 2 12C2 10.6167 2.26267 9.31667 2.788 8.1C3.31333 6.88333 4.02567 5.825 4.925 4.925C5.825 4.025 6.88333 3.31267 8.1 2.788C9.31667 2.26333 10.6167 2.00067 12 2C13.3833 2 14.6833 2.26267 15.9 2.788C17.1167 3.31333 18.175 4.02567 19.075 4.925C19.975 5.825 20.6877 6.88333 21.213 8.1C21.7383 9.31667 22.0007 10.6167 22 12C22 13.3833 21.7373 14.6833 21.212 15.9C20.6867 17.1167 19.9743 18.175 19.075 19.075C18.175 19.975 17.1167 20.6877 15.9 21.213C14.6833 21.7383 13.3833 22.0007 12 22ZM12 20C14.2333 20 16.125 19.225 17.675 17.675C19.225 16.125 20 14.2333 20 12C20 9.76667 19.225 7.875 17.675 6.325C16.125 4.775 14.2333 4 12 4C9.76667 4 7.875 4.775 6.325 6.325C4.775 7.875 4 9.76667 4 12C4 14.2333 4.775 16.125 6.325 17.675C7.875 19.225 9.76667 20 12 20Z" fill="#FF7F7F" />
                                  </svg>

                                  {/* <BsFillArrowDownCircleFill className="timesheet-weekly-export-download-modal-footer-btn-download-icon" /> */}
                                  <div className="setting_role_cancel_button_text" data-bs-dismiss="modal" >Cancel</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* project popup end */}
                      </div>

                      <p className='p'>{role.name}</p>
                      <p className='p1'>{role.department}</p>
                      <div className='ps-5 roles-box-design2'>
                        <div>
                          (0)
                        </div>

                        <div>
                          <p
                            className='permission'
                            onClick={() => handleConfigurePermission(role.name)}
                          >
                            Configure Permission
                          </p>
                        </div>

                      </div>
                    </div>
                  ))}
                </div>



              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Roles;