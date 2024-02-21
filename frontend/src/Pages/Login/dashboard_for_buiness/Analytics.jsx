import React from "react";
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    PieChart,
    Pie,
    AreaChart,
    Area,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Analytics = () => {
    // Sample data for seasonal trends
    const seasonalData = [
        { month: "Jan", sales: 1000 },
        { month: "Feb", sales: 1500 },
        { month: "Mar", sales: 2000 },
        // Add more data for other months
    ];
    const data = [
        { name: "Electronics", value: 400 },
        { name: "Clothing", value: 300 },
        { name: "Home Decor", value: 200 },
        // Add more data for other categories
    ];

    const profitData = [
        { product: "Smartphone", margin: 0.25 },
        { product: "T-Shirt", margin: 0.35 },
        { product: "Vase", margin: 0.2 },
        // Add more data for other products
    ];

    const Hdata = [
        { month: "Jan", sales: 1000 },
        { month: "Feb", sales: 1500 },
        { month: "Mar", sales: 2000 },
        // Add more data for other months
    ];
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

    const OpenSidebar = () => {
        setOpenSidebarToggle(!openSidebarToggle);
    };
    return (
        <div
            className="analytics"
            style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}
        >
            {/* <Header OpenSidebar={OpenSidebar} /> */}
            <Sidebar
                openSidebarToggle={openSidebarToggle}
                OpenSidebar={OpenSidebar}
            />
            <div style={chartContainerStyle}>
                {/* Line chart for seasonal trends */}
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={seasonalData}>
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line
                            type="monotone"
                            dataKey="sales"
                            name="Sales"
                            stroke="#8884d8"
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
            <div style={chartContainerStyle}>
                <PieChart width={400} height={400}>
                    <Pie
                        dataKey="value"
                        data={data}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        label
                    />
                    <Tooltip />
                    <Legend />
                </PieChart>
            </div>
            <div style={chartContainerStyle}>
                <AreaChart width={400} height={300} data={Hdata}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area
                        type="monotone"
                        dataKey="sales"
                        stroke="#8884d8"
                        fill="#8884d8"
                    />
                </AreaChart>
            </div>
            <div style={chartContainerStyle}>
                {/* Bar chart for profit margins */}
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={profitData}>
                        <XAxis dataKey="product" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar
                            dataKey="margin"
                            name="Profit Margin"
                            fill="#82ca9d"
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default Analytics;

const chartContainerStyle = {
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
    marginBottom: "20px", // Add spacing between charts
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "40%",
    flexDirection: "column",
};
