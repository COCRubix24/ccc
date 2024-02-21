import "./App.css";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { UserProvider } from "./Components/context/UserContext.js";
import { CompanyProvider } from "./Components/context/CompanyContext.js";
import Login from "./Pages/Login/Login.js";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer.js";
import Documents from "./Pages/Login/Documents.js";
import LP from "./Pages/Login/LP.js";
import Help from "./Pages/Login/Help.js";
import Header from "./Pages/Login/dashboard_for_buiness/Header.jsx";
import Sidebar from "./Pages/Login/dashboard_for_buiness/Sidebar.jsx";
import Main from "./Pages/Login/dashboard_for_buiness/Main.jsx";
import Dashboard from "./Pages/Login/dashboard_for_buiness/Dashboard.jsx";
// import DisplayCaseDetailsPage from "./Pages/Login/DisplayCaseDetailsPage.js";
import Thanks from "./Pages/Login/Thanks.js";
import ProductPage from "./Pages/Login/dashboard_for_buiness/ProductPage.js";
import Chat from "./Components/Chat.js";
// import Blog from "./Components/Navbar/Blog.jsx";
import Contactus from "./Components/Navbar/Contactus.jsx";
import ChatEngineComponent from "./Pages/Login/ChatEngine.js";
import CategoryPage from "./Pages/Login/dashboard_for_buiness/CategoryPage.js";
import ComplaintList from "./Pages/Login/dashboard_for_buiness/ComplaintList.js";
import Dept from "./Pages/Login/dashboard_for_buiness/Dept.js";
import Leaderboard from "./Pages/Login/LeaderBoard.js";
import Apps from "./Components/Apps.jsx";
import Analytics from "./Pages/Login/dashboard_for_buiness/Analytics.jsx";
import MarginPage from "./Pages/Login/dashboard_for_buiness/MarginPage.js";
// import ProductPage from "./Pages/Login/dashboard_for_buiness/ProductPage.js";
import PopularAnalysisPage from "./Pages/PopularAnalysisPage.jsx";
function App() {
    return (
        <UserProvider>
            <CompanyProvider>
                <BrowserRouter>
                    <Navbar />
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        {/* <Route path="/" element={<Home />} /> */}
                        <Route
                            path="/dashboardbusiness"
                            element={<Dashboard />}
                        />
                        <Route path="/dragdrop" element={<Apps />} />
                        <Route path="/help" element={<Help />} />
                        <Route path="/analytics" element={<Analytics />} />
                        // <Route path="/" element={<LP />} />
                        // <Route path="/docs" element={<Documents />} />
                        {/* <Route path="/Imageiput" element={<MarginPage />} /> */}
                        {/* <Route
                            path="/case"
                            element={<DisplayCaseDetailsPage />}
                        /> */}
                        <Route path="/thanks" element={<Thanks />} />
                        <Route path="/imageiput" element={<MarginPage />} />
                        {/* <Route path="/dashb" element={<DashboardB />} /> */}
                        <Route path="/chat" element={<Chat />} />
                        {/* <Route path="/Blogs" element={<Blog />} /> */}
                        <Route path="/contact" element={<Contactus />} />
                        <Route
                            path="/productimport"
                            element={<ProductPage />}
                        />
                        <Route
                            path="/popularAnalysis "
                            element={<PopularAnalysisPage />}
                        />
                        <Route
                            path="/chatengine"
                            element={<ChatEngineComponent />}
                        />
                        {/* <Route path="/category" element={<CategoryPage />} /> */}
                        /*{" "}
                        <Route
                            path="/customer-seervice"
                            element={<ComplaintList />}
                        />
                        <Route path="/dept/:index" element={<Dept />} />
                        <Route path="/leaderboard" element={<Leaderboard />} />
                    </Routes>
                    <Footer />
                </BrowserRouter>
            </CompanyProvider>
        </UserProvider>
    );
}

export default App;
