import { useState } from "react";
import "../dashboard for buiness/Dashboard.css";

import Sidebar from "../dashboard for buiness/Sidebar.jsx";
import Margin from "./Margin.jsx";;

function MarginPage() {
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
            <Margin />
        </div>
    );
}

export default MarginPage;
