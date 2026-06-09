import { FiCheckCircle, FiXCircle, FiClock } from "react-icons/fi";
import Sidebar from "../components/Sidebar/Sidebar";
import ToggleButton from "../components/ToggleButton/ToggleButton";
import { useContext, useState } from "react";
import Topbar from "../components/Topbar/Topbar";
import { UserAuthContext } from "../Contexts/AuthContext";
import { Link } from "react-router-dom";
import SummaryCard from "../components/SummaryCard/SummaryCard";
import DocumentRow from "../components/DocumentRow/DocumentRow";

const Dashoard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const { user, loading } = useContext(UserAuthContext)!;
  if (loading) return null;
  if (!user)
    return (
      <div className="text-center mt-20 text-2xl flex flex-col items-center gap-4">
        Please log in to access the dashboard.
        <Link to="/login" className="text-blue-400 hover:underline ml-2">
          Go to Login
        </Link>
      </div>
    );
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };
  return (
    <div className="position-relative mt-18 bg-[url('/background.png')] min-h-screen bg-linear-to-br from-black via-[#0a0f1f] to-[#000000] text-white flex">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} />
      <ToggleButton toggle={toggleSidebar} isOpen={isSidebarOpen} />
      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Header */}
        <Topbar />

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <SummaryCard
            icon={<FiClock />}
            label="Pending Signatures"
            count="3"
            color="text-yellow-400"
          />
          <SummaryCard
            icon={<FiCheckCircle />}
            label="Completed"
            count="8"
            color="text-green-400"
          />
          <SummaryCard
            icon={<FiXCircle />}
            label="Rejected"
            count="1"
            color="text-red-400"
          />
        </div>

        {/* Documents Table */}
        <div className="bg-black/60 backdrop-blur-lg rounded-xl p-6 border border-blue-900/40">
          <h2 className="text-xl font-semibold mb-4">Your Documents</h2>
          <div className="table-auto md:table-fixed">
            <table className="table-auto w-full min-w-125 text-left text-gray-300">
              <thead>
                <tr className="border-b border-blue-900/40">
                  <th className="pb-2">Document</th>
                  <th className="pb-2">Status</th>
                  <th className="pb-2">Updated</th>
                  <th className="pb-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                <DocumentRow
                  name="NDA Agreement"
                  status="Pending"
                  date="Today, 10:45 AM"
                />
                <DocumentRow
                  name="Sales Contract"
                  status="Signed"
                  date="Yesterday, 3:15 PM"
                />
                <DocumentRow
                  name="Partnership Agreement"
                  status="Rejected"
                  date="Mar 22, 2026"
                />
                <DocumentRow
                  name="Employment Offer"
                  status="Signed"
                  date="Mar 18, 2026"
                />
              </tbody>
            </table>
          </div>

          <div className="flex justify-center mt-6">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg transition">
              Upload New Document
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashoard;
