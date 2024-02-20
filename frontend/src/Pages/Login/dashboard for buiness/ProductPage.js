import { useState } from "react";
import "./Dashboard.css"
import Header from "./Header";
import Sidebar from "./Sidebar";
import ProductImport from "./importdata";

function ProductPage() {
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
            <ProductImport />
        </div>
    );
}

export default ProductPage;
