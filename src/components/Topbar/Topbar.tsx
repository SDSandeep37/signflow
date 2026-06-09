import { useContext } from "react";
import { UserAuthContext } from "../../Contexts/AuthContext";

const Topbar = () => {
  const { user, loading } = useContext(UserAuthContext)!;
  if (loading) return null;

  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-3xl font-bold">
        Welcome Back,{" "}
        <span className="text-blue-400 capitalize">{user?.name || "User"}</span>
      </h1>
      {/* <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Search documents..."
          className="bg-black/50 border border-blue-900/40 rounded-lg px-4 py-2 text-gray-300 focus:ring-2 focus:ring-blue-400"
        />
        <img
          src="/background.png"
          alt="User Avatar"
          className="w-10 h-10 rounded-full"
        />
      </div> */}
    </div>
  );
};

export default Topbar;
