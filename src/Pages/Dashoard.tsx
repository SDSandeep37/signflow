import { FiCheckCircle, FiXCircle, FiClock } from "react-icons/fi";

import { useContext, useEffect, useState } from "react";

import { UserAuthContext } from "../Contexts/AuthContext";
import { Link } from "react-router-dom";
import SummaryCard from "../components/SummaryCard/SummaryCard";
import ResponisveTable from "../components/ResponsiveTable/ResponisveTable";
import { userPendingSignature } from "../utils/userPendingSignatures";

const Dashoard = () => {
  const { user, loading } = useContext(UserAuthContext)!;
  const [pendingSignatures, setPendingSignatures] = useState([]);

  useEffect(() => {
    async function getPendingSignatures() {
      const result = await userPendingSignature();
      setPendingSignatures(result);
    }
    getPendingSignatures();
  }, []);
  if (loading) return null;
  if (!user) {
    return (
      <div className="text-center mt-20 text-2xl flex flex-col items-center gap-4">
        Please log in to access the dashboard.
        <Link to="/login" className="text-blue-400 hover:underline ml-2">
          Go to Login
        </Link>
      </div>
    );
  }

  return (
    // <div className="position-relative mt-18 bg-[url('/background.png')] min-h-screen bg-linear-to-br from-black via-[#0a0f1f] to-[#000000] text-white flex">
    //   {/* Sidebar */}
    //   <Sidebar isOpen={isSidebarOpen} />
    //   <ToggleButton toggle={toggleSidebar} isOpen={isSidebarOpen} />
    //   {/* Main Content */}
    //   <main className="flex-1 p-8">
    //     {/* Header */}
    //     <Topbar />

    //     {/* Summary Cards */}
    //     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
    //       <SummaryCard
    //         icon={<FiClock />}
    //         label="Pending Signatures"
    //         count="3"
    //         color="text-yellow-400"
    //       />
    //       <SummaryCard
    //         icon={<FiCheckCircle />}
    //         label="Completed"
    //         count="8"
    //         color="text-green-400"
    //       />
    //       <SummaryCard
    //         icon={<FiXCircle />}
    //         label="Rejected"
    //         count="1"
    //         color="text-red-400"
    //       />
    //     </div>

    //     {/* Documents Table */}

    //     <ResponisveTable />
    //   </main>
    // </div>
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <SummaryCard
          icon={<FiClock />}
          label="Pending Signatures"
          count={Number(pendingSignatures.length)}
          color="text-yellow-400"
          link="dashboard/pending-signatures"
        />
        <SummaryCard
          icon={<FiCheckCircle />}
          label="Completed"
          count="0"
          color="text-green-400"
          link="#"
        />
        <SummaryCard
          icon={<FiXCircle />}
          label="Rejected"
          count="0"
          color="text-red-400"
          link="#"
        />
      </div>

      {/* Documents Table */}

      <ResponisveTable />
    </>
  );
};

export default Dashoard;
