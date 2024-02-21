import React from "react";
import { Link } from "react-router-dom";
import {
  BsGrid1X2Fill,
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsListCheck,
  BsMenuButtonWideFill,
  BsFillGearFill,
} from "react-icons/bs";
import { FaUser } from "react-icons/fa";

function Sidebar({ openSidebarToggle, OpenSidebar }) {
  return (
    <aside
      id="sidebar"
      className={openSidebarToggle ? "sidebar-responsive" : ""}
    >
      <div className="sidebar-title">
        <div className="sidebar-brand">
          <FaUser className="icon_header" /> username
        </div>
        <span className="icon close_icon" onClick={OpenSidebar}>
          X
        </span>
      </div>

      <ul className="sidebar-list">
        <li className="sidebar-list-item">
          <Link to="/dashboardbusiness">
            <BsGrid1X2Fill className="icon" /> Dashboard
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/productimport">
            <BsFillArchiveFill className="icon" />
            Product Import
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/category">
            <BsFillGrid3X3GapFill className="icon" /> Shelf Optimization
          </Link>
        </li>
        <li className="sidebar-list-item">
          <a href="/popularAnalysis">
            <BsPeopleFill className="icon" /> Popularity Analysis
          </a>
        </li>
        <li className="sidebar-list-item">
          <Link to="/Imageiput">
            <BsListCheck className="icon" />
            Margin and Season
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/seasonalAnalytics">
            <BsMenuButtonWideFill className="icon" />
            Seasonal Analytics
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/analytics">
            <BsMenuButtonWideFill className="icon" /> Analytics Reports
          </Link>
        </li>
        <li className="sidebar-list-item">
          <a href="">
            <BsFillGearFill className="icon" /> Setting
          </a>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
