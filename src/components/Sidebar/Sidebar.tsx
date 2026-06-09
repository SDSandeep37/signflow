import { RxDashboard } from "react-icons/rx";
import { HiOutlineDocumentText } from "react-icons/hi2";
import { AiOutlineAudit } from "react-icons/ai";
import { CiSettings } from "react-icons/ci";
import { Link } from "react-router-dom";
const Sidebar = ({ isOpen }: { isOpen: boolean }) => {
  return (
    isOpen && (
      <aside className="w-50 bg-[#010f1a] backdrop-blur-lg border-r border-blue-900/40 flex flex-col justify-between">
        <div>
          {/* <div className="p-6 flex items-center gap-2">
            <img src="/logo.png" alt="SignFlow Logo" className="w-30 h-auto" />
            <span className="font-semibold text-xl">
            Sign<span className="text-blue-400">Flow</span>
          </span>
        </div> */}
          <nav className="flex flex-col gap-4 px-6 mt-4 text-gray-300">
            <Link
              to="/dashboard"
              className="hover:text-blue-400 transition flex items-center gap-2"
            >
              <RxDashboard /> Dashboard
            </Link>
            <Link
              to="/documents"
              className="hover:text-blue-400 transition flex items-center gap-2"
            >
              <HiOutlineDocumentText /> Documents
            </Link>
            <Link
              to="/audit"
              className="hover:text-blue-400 transition flex items-center gap-2"
            >
              <AiOutlineAudit /> Audit Trail
            </Link>
            <Link
              to="/settings"
              className="hover:text-blue-400 transition flex items-center gap-2"
            >
              <CiSettings /> Settings
            </Link>
          </nav>
        </div>
        <div className="px-6 py-4 text-gray-400 text-sm border-t border-blue-900/40">
          Support
        </div>
      </aside>
    )
  );
};

export default Sidebar;
