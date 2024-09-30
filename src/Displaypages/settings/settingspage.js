
import Sidebar from '../../Components/Sidebar';
import Topbar from '../../Components/Topbar';


import './Settingspage.css';
import SettingTopBar from './SettingTopBar';

function SettingsPages() {



    return (
        <>
            <div>
                <Topbar />
                <div className="d-flex">
                    <Sidebar />
                    <SettingTopBar />

                </div>
            </div>
        </>
    );
}

export default SettingsPages;
