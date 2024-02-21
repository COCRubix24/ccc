import { useState } from "react";
import "../Pages/Login/dashboard_for_buiness/Dashboard.css";
import Header from "../Pages/Login/dashboard_for_buiness/Header.jsx";
import Sidebar from "../Pages/Login/dashboard_for_buiness/Sidebar.jsx";
import PopularAnalysis from "./PopularAnalysis.jsx";
function PopularAnalysisPage() {
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
            <PopularAnalysis />
        </div>
    );
}

export default PopularAnalysisPage;
