import { useState } from "react";
import "../Pages/Login/dashboard for buiness/Dashboard.css";
import Header from "../Pages/Login/dashboard for buiness/Header.jsx";
import Sidebar from "../Pages/Login/dashboard for buiness/Sidebar.jsx";
import ReportAnaly from "./ReportAnaly";

function ReportPage() {
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
    const OpenSidebar = () => {
        setOpenSidebarToggle(!openSidebarToggle);
    };

    return (
        <div className="grid-container">
            {/* <Header OpenSidebar={Category} /> */}
            <Sidebar
                openSidebarToggle={openSidebarToggle}
                OpenSidebar={OpenSidebar}
            />
            <ReportAnaly />
        </div>
    );
}

export default ReportPage;
