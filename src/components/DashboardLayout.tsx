import { useState } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import ToggleButton from "../components/ToggleButton/ToggleButton";
import Topbar from "../components/Topbar/Topbar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  return (
    <div className="position-relative mt-18 bg-[url('/background.png')] min-h-screen bg-linear-to-br from-black via-[#0a0f1f] to-[#000000] text-white flex">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} />
      <ToggleButton toggle={toggleSidebar} isOpen={isSidebarOpen} />
      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Header */}
        <Topbar />
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
