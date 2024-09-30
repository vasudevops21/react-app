import React from 'react'
import Topbar from '../../../Components/Topbar'
import Sidebar from '../../../Components/Sidebar'
import SettingTopBar from '../SettingTopBar'
import Userpermissioncomponent from '../Userpermissioncomponent'
const Module = () => {
  return (
    <div>
      <Topbar />
      <div className='d-flex'>
        <Sidebar />
        <div>
          <SettingTopBar />

          <div>
            <Userpermissioncomponent />
          </div>
        </div>


      </div>

    </div>
  )
}

export default Module
