
// import React from 'react';
// import './home.css'

// const HomePage = () => {
//     return (
//         <div>
//           <div className='header1'>
//           <div className=''>
// test
//           </div>

//             <div className="div-content">
//                 <h1>Effectively monitor your time & approach your work with Strategic Precision</h1>
//                 <p>This modern software offers a comprehensive time management feature...</p>
//                 <button>Get Started</button>
//                 <button>Watch Demo</button>
//             </div>
//             </div>


//         </div>

//     );
// };

// export default HomePage;


// src/components/ProductCheckout.js
import React, { useState } from 'react';
import axios from 'axios';

const HomePage = () => {
    const [quantity, setQuantity] = useState({ basic: 1, standard: 1, premium: 1 });
    const prices = {
        basic: 1.00,    // Example price in INR
        standard: 2.00, // Example price in INR
        premium: 3.00   // Example price in INR
    };

    const handleQuantityChange = (plan) => (event) => {
        setQuantity({ ...quantity, [plan]: Number(event.target.value) });
    };

    const handleCheckout = async (plan) => {

        try {
            const totalAmount = (quantity[plan] * prices[plan]).toFixed(2);

            // Request the server to create an order
            const orderResponse = await axios.post('http://localhost:8080/api/payment/create-order', {
                amount: totalAmount
            });

            const { orderId } = orderResponse.data;

            // Configure Razorpay options
            const options = {
                key: 'rzp_test_awJBpFbNf0GXjI', // Replace with your Razorpay key ID
                amount: totalAmount * 100, // Amount in paise
                currency: 'INR',
                name: `${plan.charAt(0).toUpperCase() + plan.slice(1)} Plan`,
                description: `Subscription for ${plan.charAt(0).toUpperCase() + plan.slice(1)} Plan`,
                order_id: orderId,
                handler: function (response) {
                    alert(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
                },
                prefill: {
                    name: 'Vasu',
                    email: 'vasudevops21@gmail.com',
                    contact: '8760961924'
                },
                notes: {
                    address: 'ArthurGrand Technologies, Trichy'
                },
                theme: {
                    color: plan === 'premium' ? '#FF6347' : plan === 'standard' ? '#1E90FF' : '#32CD32'
                }
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (error) {
            console.error('Error during checkout:', error);
            alert(`Error: ${error.message}`);
        }
    };

    return (
        <div style={styles.container}>
            <h1>Choose Your Plan</h1>
            <div style={styles.plansContainer}>
                {Object.keys(prices).map(plan => (
                    <div key={plan} style={styles.product}>
                        <h2 style={styles.planTitle}>{plan.charAt(0).toUpperCase() + plan.slice(1)} Plan</h2>
                        <p style={styles.description}>
                            {plan === 'basic' ? 'Timeentry and Tracking attendance only' :
                                plan === 'standard' ? 'Includes everything in Basic plus Reports' :
                                    'Includes everything in Standard plus Premium Support'}
                        </p>
                        <p style={styles.price}>Price: ₹{prices[plan].toFixed(2)}</p>
                        <div style={styles.quantity}>
                            <label>Quantity:</label>
                            <input
                                type="number"
                                value={quantity[plan]}
                                min="1"
                                onChange={handleQuantityChange(plan)}
                                style={styles.input}
                            />
                        </div>
                        <p style={styles.total}>Total: ₹{(quantity[plan] * prices[plan]).toFixed(2)}</p>
                        <button onClick={() => handleCheckout(plan)} style={styles.button}>Buy</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
        maxWidth: '1200px',
        margin: '0 auto',
        textAlign: 'center',
    },
    plansContainer: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'stretch',
        gap: '20px',
        marginTop: '30px',
    },
    product: {
        flex: '1',
        border: '1px solid #ddd',
        padding: '20px',
        borderRadius: '10px',
        backgroundColor: '#fff',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.3s, box-shadow 0.3s',
    },
    planTitle: {
        fontSize: '24px',
        marginBottom: '10px',
        color: '#333',
    },
    description: {
        fontSize: '16px',
        color: '#666',
        marginBottom: '15px',
    },
    price: {
        fontSize: '20px',
        color: '#333',
        marginBottom: '10px',
    },
    quantity: {
        marginBottom: '15px',
    },
    input: {
        marginLeft: '10px',
        padding: '5px',
        width: '50px',
        borderRadius: '5px',
        border: '1px solid #ccc',
    },
    total: {
        fontSize: '18px',
        color: '#333',
        marginBottom: '20px',
    },
    button: {
        padding: '10px 20px',
        backgroundColor: '#28a745',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
        transition: 'background-color 0.3s, transform 0.3s',
    },
};

export default HomePage;






































// import React, { useState, useEffect } from 'react';
// import '../settings/UserAccessControl/Permission.css'
// import { useLocation } from 'react-router-dom';
// import Userpermissioncomponent from '../settings/Userpermissioncomponent';
// import Topbar from '../../Components/Topbar';
// import Sidebar from '../../Components/Sidebar';
// import SettingTopBar from '../settings/SettingTopBar';
// import { MdExpandLess } from "react-icons/md";
// import { GoChevronLeft } from "react-icons/go";


// const EditPermission = ({ isVisible, onClose }) => {
//   const [activePage, setActivePage] = useState('record');

//   if (!isVisible) return null;

//   const handleRecordPermissionClick = () => {
//     setActivePage('record');
//   };

//   const handleFieldPermissionClick = () => {
//     setActivePage('field');
//   };

//   const handleClose = () => {
//     setActivePage('record'); // Reset the active page to 'record'
//     onClose(); // Call the original onClose prop function if any additional actions are needed
//   };



//   return (
//     <div className="setting_permission_modal_overlay">
//       {activePage === 'record' && (
//         <div className="setting_permission_modal_content">
//           <div className='setting_permission_popup_main d-flex'>
//             <div className='d-flex setting_permission_head'>
//               <div className='me-5'>
//                 <p className={`setting_permission_text_1 ${activePage === 'record' ? 'active-permission' : ''}`}  >Record Permission</p>
//               </div>
//               <div className=''>
//                 <p className={`setting_permission_text_2 ${activePage === 'field' ? 'active-permission' : ''}`} onClick={handleFieldPermissionClick}>Field Permission</p>

//               </div>
//             </div>
//             <div className='setting_permission_popup_cancel ' onClick={handleClose}>
//               <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
//                 <path d="M6 18L18 6M18 18L6 6" stroke="#F8F8F8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//               </svg>
//             </div>
//           </div>

//           <hr className='setting_permission_edit_underline' />
//           <div className='d-flex setting_permission_edit_1'>
//             <div className='setting_permission_popup_view'>
//               <div className='setting_permission_common_text_style'>
//                 View
//               </div>
//               <div class="form-check pt-2">
//                 <input
//                   class="form-check-input"
//                   type="radio"
//                   name="exampleRadios1"
//                   id="exampleRadios11"
//                   value="option1"
//                 />
//                 <label class="form-check-label setting_permission_edit_popup_content setting_permission_common_text_option" for="exampleRadios1">
//                   None
//                 </label>
//               </div>
//               <div class="form-check pt-2">
//                 <input
//                   class="form-check-input"
//                   type="radio" name="exampleRadios1"
//                   id="exampleRadios21"
//                   value="option2"
//                 />
//                 <label class="form-check-label setting_permission_edit_popup_content setting_permission_common_text_option" for="exampleRadios21">
//                   Own
//                 </label>
//               </div>
//               <div class="form-check pt-2">
//                 <input
//                   class="form-check-input"
//                   type="radio"
//                   name="exampleRadios1"
//                   id="exampleRadios31"
//                   value="option3"
//                 />
//                 <label class="form-check-label setting_permission_edit_popup_content setting_permission_common_text_option" for="exampleRadios31">
//                   All Data
//                 </label>
//               </div>
//               <div class="form-check pt-2">
//                 <input
//                   class="form-check-input"
//                   type="radio"
//                   name="exampleRadios1"
//                   id="exampleRadios31"
//                   value="option3"
//                 />
//                 <label class="form-check-label setting_permission_edit_popup_content setting_permission_common_text_option" for="exampleRadios31">
//                   All in Department
//                 </label>
//               </div>
//             </div>

//             <div className='setting_permission_popup_edit'>
//               <div className='setting_permission_common_text_style'>
//                 Edit
//               </div>
//               <div class="form-check pt-2">
//                 <input
//                   class="form-check-input"
//                   type="radio"
//                   name="exampleRadios"
//                   id="exampleRadios1"
//                   value="option1"
//                 />
//                 <label class="form-check-label setting_permission_edit_popup_content setting_permission_common_text_option" for="exampleRadios1">
//                   Restricted
//                 </label>
//               </div>
//               <div class="form-check pt-2">
//                 <input
//                   class="form-check-input"
//                   type="radio"
//                   name="exampleRadios"
//                   id="exampleRadios2"
//                   value="option2"
//                 />
//                 <label class="form-check-label setting_permission_edit_popup_content setting_permission_common_text_option" for="exampleRadios2">
//                   Allowed to Edit
//                 </label>
//               </div>
//             </div>
//             <div className='setting_permission_popup_add '>
//               <div className='setting_permission_common_text_style'>
//                 Add
//               </div>
//               <div class="form-check pt-2">
//                 <input
//                   class="form-check-input"
//                   type="radio"
//                   name="exampleRadios2"
//                   id="exampleRadios13"
//                   value="option1"
//                 />
//                 <label class="form-check-label setting_permission_edit_popup_content setting_permission_common_text_option" for="exampleRadios13">
//                   Restricted
//                 </label>
//               </div>
//               <div class="form-check pt-2">
//                 <input
//                   class="form-check-input"
//                   type="radio"
//                   name="exampleRadios2"
//                   id="exampleRadios23"
//                   value="option2"
//                 />
//                 <label class="form-check-label setting_permission_edit_popup_content setting_permission_common_text_option" for="exampleRadios23">
//                   Allowed to Create
//                 </label>
//               </div>
//             </div>


//             <div className='setting_permission_popup_delete'>
//               <div className='setting_permission_common_text_style'>
//                 Delete
//               </div>
//               <div class="form-check pt-2">
//                 <input
//                   class="form-check-input"
//                   type="radio"
//                   name="exampleRadios3"
//                   id="exampleRadios113"
//                   value="option1"
//                 />
//                 <label class="form-check-label setting_permission_edit_popup_content setting_permission_common_text_option" for="exampleRadios113">
//                   None
//                 </label>
//               </div>
//               <div class="form-check pt-2">
//                 <input
//                   class="form-check-input"
//                   type="radio"
//                   name="exampleRadios3"
//                   id="exampleRadios213"
//                   value="option2"
//                 />
//                 <label class="form-check-label setting_permission_edit_popup_content setting_permission_common_text_option" for="exampleRadios213">
//                   Own
//                 </label>
//               </div>
//               <div class="form-check pt-2">
//                 <input
//                   class="form-check-input"
//                   type="radio"
//                   name="exampleRadios3"
//                   id="exampleRadios312"
//                   value="option3"
//                 />
//                 <label class="form-check-label setting_permission_edit_popup_content setting_permission_common_text_option" for="exampleRadios312">
//                   All Data
//                 </label>
//               </div>
//               <div class="form-check pt-2">
//                 <input
//                   class="form-check-input"
//                   type="radio"
//                   name="exampleRadios3"
//                   id="exampleRadios312"
//                   value="option3"
//                 />
//                 <label class="form-check-label setting_permission_edit_popup_content setting_permission_common_text_option" for="exampleRadios312">
//                   All in Department
//                 </label>
//               </div>

//             </div>

//           </div>

//           <div className='d-flex settings_permission_popup_save_div gap-4'>
//             <div type="button" className='settings_permission_popup_save_btn'>
//               Save
//             </div>

//             <div type="button" className='settings_permission_popup_close_btn' onClick={handleClose}>
//               Close
//             </div>
//           </div>

//         </div>
//       )}


//       {activePage === 'field' && (
//         <div className="setting_permission_modal_content">
//           <div className='setting_permission_popup_main d-flex'>
//             <div className='d-flex setting_permission_head'>
//               <div className='me-5'>
//                 <p className={`setting_permission_text_1 ${activePage === 'record' ? 'active-permission' : ''}`} onClick={handleRecordPermissionClick}>Record Permission</p>
//               </div>
//               <div className=''>
//                 <p className={`setting_permission_text_2 ${activePage === 'field' ? 'active-permission' : ''}`} onClick={handleFieldPermissionClick}>Field Permission</p>
//               </div>
//             </div>
//             <div className='setting_permission_popup_cancel ' onClick={handleClose}>
//               <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
//                 <path d="M6 18L18 6M18 18L6 6" stroke="#F8F8F8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//               </svg>
//             </div>
//           </div>

//           <hr className='setting_permission_edit_underline' />

//           <div className='text-center pt-3'>
//             Under Progress!
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };


// const MyTable = () => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [pageSize, setPageSize] = useState(7); // Default page size
//   const location = useLocation();
//   const passedRole = location.state?.role;

//   const initialTableData = [
//     {
//       role: 'Administrator',
//       view: 'All Data',
//       edit: 'All Data',
//       create: 'All Data',
//       delete: 'All Data',
//     },
//     {
//       role: 'Supervisor',
//       view: 'All Data',
//       edit: 'All Data',
//       create: 'Allowed to create',
//       delete: 'All Data',
//     },
//     {
//       role: 'Member',
//       view: 'All Data',
//       edit: 'All Data',
//       create: 'Allowed to create',
//       delete: 'All Data',
//     }


//   ];



//   const [tableData, setTableData] = useState(initialTableData);
//   const [editRole, setEditRole] = useState(null);
//   const [isModalVisible, setIsModalVisible] = useState(false);



//   useEffect(() => {
//     if (passedRole) {
//       const roleIndex = tableData.findIndex((row) => row.role === passedRole);
//       if (roleIndex !== -1) {
//         handleOpenModal(tableData[roleIndex].role);
//       }
//     }
//   }, [passedRole, tableData]);

//   const handleOpenModal = (role) => {
//     setEditRole(role);
//     setIsModalVisible(true);
//   };

//   const handleCloseModal = () => {
//     setIsModalVisible(false);
//     setEditRole(null);
//   };

//   const handlePermissionUpdate = (updatedValues) => {
//     const updatedData = tableData.map((row) => {
//       if (row.role === editRole) {
//         return { ...row, ...updatedValues };
//       }
//       return row;
//     });
//     setTableData(updatedData);
//     handleCloseModal();
//   };



//   const totalPages = Math.ceil(tableData.length / pageSize);

//   const handleChangePage = (page) => {
//     setCurrentPage(page);
//   };

//   const handleChangePageSize = (e) => {
//     setPageSize(parseInt(e.target.value, 10));
//     setCurrentPage(1); // Reset to first page when changing page size
//   };

//   const startIndex = (currentPage - 1) * pageSize;
//   const endIndex = Math.min(startIndex + pageSize, tableData.length);

//   const paginatedData = tableData.slice(startIndex, endIndex);

//   const renderPagination = () => {
//     const pageNumbers = [];
//     let startPage, endPage;

//     if (totalPages <= 5) {
//       // Less than 5 total pages so show all
//       startPage = 1;
//       endPage = totalPages;
//     } else {
//       // More than 5 total pages so calculate start and end pages
//       if (currentPage <= 3) {
//         startPage = 1;
//         endPage = 5;
//       } else if (currentPage + 1 >= totalPages) {
//         startPage = totalPages - 4;
//         endPage = totalPages;
//       } else {
//         startPage = currentPage - 1;
//         endPage = currentPage + 1;
//       }
//     }

//     // for (let i = startPage; i <= endPage; i++) {
//     //   pageNumbers.push(
//     //     <button
//     //       key={i}
//     //       onClick={() => handleChangePage(i)}
//     //       className={`${currentPage === i ? 'pagination_primary rounded-3 p-1 mx-2' : 'pagination_secondary'} mx-2`}
//     //     >
//     //       {i}
//     //     </button>
//     //   );
//     // }
//     for (let i = startPage; i <= endPage; i++) {
//       pageNumbers.push(
//         <div className="pagination-number-container">
//           <button
//             key={i}
//             onClick={() => handleChangePage(i)}
//             className={`${
//               currentPage === i ? 'pagination_primary' : 'pagination_secondary'
//             } mx-2`}
//           >
//             {i}
//           </button>
//         </div>
//       );
//     }

//     if (startPage > 1) {
//       pageNumbers.unshift(<span key="start-ellipsis">...</span>);
//       pageNumbers.unshift(
//         <button
//           key={1}
//           onClick={() => handleChangePage(1)}
//           className="pagination_secondary mx-2"
//         >
//           1
//         </button>
//       );
//     }

//     if (endPage < totalPages) {
//       pageNumbers.push(<span key="end-ellipsis">...</span>);
//       pageNumbers.push(
//         <button
//           key={totalPages}
//           onClick={() => handleChangePage(totalPages)}
//           className="pagination_secondary mx-2"
//         >
//           {totalPages}
//         </button>
//       );
//     }

//     return (
//       <div className="pagination-container">
//         {pageNumbers}
//       </div>
//     );
//   };



//   // const renderPagination = () => {
//   //   const pageNumbers = [];
//   //   let startPage, endPage;

//   //   if (totalPages <= 5) {
//   //     startPage = 1;
//   //     endPage = totalPages;
//   //   } else {
//   //     if (currentPage <= 3) {
//   //       startPage = 1;
//   //       endPage = 5;
//   //     } else if (currentPage + 2 >= totalPages) {
//   //       startPage = totalPages - 4;
//   //       endPage = totalPages;
//   //     } else {
//   //       startPage = currentPage - 2;
//   //       endPage = currentPage + 2;
//   //     }
//   //   }

//   //   for (let i = startPage; i <= endPage; i++) {
//   //     pageNumbers.push(
//   //       <button
//   //         key={i}
//   //         onClick={() => handleChangePage(i)}
//   //         className={`${currentPage === i ? 'pagination_primary rounded-3 p-1 mx-2' : 'pagination_secondary'} mx-2`}
//   //       >
//   //         {i}
//   //       </button>
//   //     );
//   //   }

//   //   if (startPage > 1) {
//   //     pageNumbers.unshift(<span key="start-ellipsis">...</span>);
//   //     pageNumbers.unshift(
//   //       <button
//   //         key={1}
//   //         onClick={() => handleChangePage(1)}
//   //         className="pagination_secondary mx-2"
//   //       >
//   //         1
//   //       </button>
//   //     );
//   //   }

//   //   if (endPage < totalPages) {
//   //     pageNumbers.push(<span key="end-ellipsis">...</span>);
//   //     pageNumbers.push(
//   //       <button
//   //         key={totalPages}
//   //         onClick={() => handleChangePage(totalPages)}
//   //         className="pagination_secondary mx-2"
//   //       >
//   //         {totalPages}
//   //       </button>
//   //     );
//   //   }

//   //   return (
//   //     <div className="pagination-container">
//   //       {pageNumbers}
//   //     </div>
//   //   );
//   // };


//   return (
//     <div>
//       <div>
//         <Topbar />
//         <div className='d-flex'>
//           <Sidebar />
//           <div className='setting_permission_top'>
//             <SettingTopBar />
//             <div className=''>
//               <Userpermissioncomponent />
//               <div className='setting_permission_main rounded-4 mx-5 my-3 px-5 mt-2 shadow' >
//                 <table class="main_table">
//                   <thead className='py-5 sticky-table-head'>
//                     <tr className="table_head_box_shadow">
//                       <th scope="col" className="table_head_underline">
//                         <div className='bg_colour_roles'>Roles</div>
//                       </th>
//                       <th scope="col" className="table_head_underline">
//                         <div className='bg_colour_roles'>View</div>
//                       </th>
//                       <th scope="col" className="table_head_underline">
//                         <div className='bg_colour_roles'>Edit</div>
//                       </th>
//                       <th scope="col" className="table_head_underline">
//                         <div className='bg_colour_roles'>Create</div>
//                       </th>
//                       <th scope="col" className="table_head_underline">
//                         <div className='bg_colour_roles'>Delete</div>
//                       </th>
//                       <th scope="col" className="table_head_underline">
//                         <div className='bg_colour_roles'>Action</div>
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody className='setting_permission_table_row' >
//                     {paginatedData.map((row) => (
//                       <tr key={row.role} className="table_body_underline">
//                         <td>
//                           <div className='setting_permission_table_value'>
//                             {row.role}
//                           </div>
//                         </td>
//                         <td>
//                           <div className='setting_permission_table_value'>
//                             {row.view}
//                           </div>
//                         </td>
//                         <td>
//                           <div className='setting_permission_table_value'>
//                             {row.edit}
//                           </div>
//                         </td>
//                         <td>
//                           <div className='setting_permission_table_value'>
//                             {row.create}
//                           </div>
//                         </td>
//                         <td>
//                           <div className='setting_permission_table_value'>
//                             {row.delete}
//                           </div>
//                         </td>
//                         <td>
//                           <button
//                             className='px-2 setting_permission_edit_btn'
//                             disabled={row.role === 'Administrator'}
//                             onClick={() => handleOpenModal(row.role)}
//                           >
//                             <svg className='me-2' xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
//                               <path d="M3.84488 12.7881C5.69974 14.643 8.11059 15.1987 9.29574 15.3127C9.64402 15.3527 9.83831 15.1384 9.86488 14.9176C9.89174 14.6833 9.74431 14.4287 9.40974 14.3818C8.33831 14.2344 6.12174 13.7524 4.51459 12.1253C1.88945 9.49356 1.39402 5.51585 3.53688 3.37299C5.27802 1.6387 8.17745 1.85956 10.3137 3.01127L11.01 2.33499C8.41174 0.774704 4.91631 0.647561 2.86717 2.70328C0.429737 5.14756 0.751166 9.69442 3.84488 12.7881ZM13.662 3.29928L14.1975 2.76356C14.4517 2.50928 14.4655 2.13413 14.2043 1.89299L14.03 1.73242C13.8026 1.51813 13.4475 1.5247 13.1997 1.75899L12.6709 2.30156L13.662 3.29928ZM7.15974 9.78785L13.1729 3.78128L12.1752 2.79042L6.16859 8.79042L5.61288 10.0693C5.55917 10.2098 5.69974 10.3507 5.84717 10.3036L7.15974 9.78785ZM6.28259 10.7858C8.47202 12.9756 11.9943 13.8396 13.9632 11.8773C15.5703 10.2636 15.3626 7.39728 13.6417 4.93328L12.9589 5.61613C14.3246 7.63842 14.5926 9.9087 13.2935 11.2076C11.7135 12.7881 9.10145 12.0381 7.30688 10.3438L6.28259 10.7858Z" fill="white" />
//                             </svg>
//                             Edit
//                           </button>
//                           <EditPermission
//                             isVisible={isModalVisible}
//                             onClose={handleCloseModal}
//                             role={editRole}
//                             initialValues={tableData.find((row) => row.role === editRole)}
//                             onSave={(updatedValues) => handlePermissionUpdate(updatedValues)}
//                           />
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>


//               </div>
//               <div className='justify-content-end d-flex text-end me-5 gap-5'>
//                 <div className='mt-2 pagination_page_size_1'>
//                   <select onChange={handleChangePageSize} value={pageSize} className='permission_page_content_size px-2 py-1'>
//                     <option value={7}>7</option>
//                     <option value={10}>10</option>
//                     <option value={15}>15</option>
//                   </select>
//                 </div>
//                 <div className="d-flex align-items-center permission_pagination_main">
//                   <div className= 'permission_pagination_move_left_icon py-2'
//                   >
//                     <button
//                       className='pagination_page_size mx-1'
//                       onClick={() => handleChangePage(currentPage - 1)}
//                       disabled={currentPage === 1}>
//                      <GoChevronLeft

//                     className={`${currentPage === 1 ? 'permission_pagination_move_left_icon3' : 'permission_pagination_move_left_icon1 '}`}/>

//                     </button>
//                   </div>
//                   <div className='pagination_navigation'>
//                   {renderPagination()}
//                   </div>

//                   <div className='permission_pagination_move_right_icon py-2'>
//                     <button
//                       onClick={() => handleChangePage(currentPage + 1)}
//                       disabled={currentPage === totalPages}
//                       className='pagination_page_size mx-1'
//                     >
//                <GoChevronLeft

//               className='permission_pagination_move_left_icon2' />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default MyTable;
