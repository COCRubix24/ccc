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

const Analytics = () => {
    // Sample data for seasonal trends
    const seasonalData = [
        { month: "Jan", sales: 1000 },
        { month: "Feb", sales: 1500 },
        { month: "Mar", sales: 2000 },
        // Add more data for other months
    ];
    const data = [
        { name: "Category A", value: 400 },
        { name: "Category B", value: 300 },
        { name: "Category C", value: 200 },
        // Add more data for other categories
    ];
    // Sample data for profit margins
    const profitData = [
        { product: "Product A", margin: 0.25 },
        { product: "Product B", margin: 0.35 },
        { product: "Product C", margin: 0.2 },
        // Add more data for other products
    ];
    const Hdata = [
        { month: "Jan", sales: 1000 },
        { month: "Feb", sales: 1500 },
        { month: "Mar", sales: 2000 },
        // Add more data for other months
    ];

    return (
        <div
            className="analytics"
            style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}
        >
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
    width: "30%",
    flexDirection: "column",
};
