import { useState } from "react";
import { FiX, FiMenu } from "react-icons/fi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#010f1a] backdrop-blur-md border-b border-blue-900/40">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="text-white font-semibold text-xl">
            Sign<span className="text-blue-400">Flow</span>
          </span>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 text-gray-300 font-medium">
          <li className="hover:text-blue-400 transition">Features</li>
          <li className="hover:text-blue-400 transition">How It Works</li>
          <li className="hover:text-blue-400 transition">Audit Trail</li>
          <li className="hover:text-blue-400 transition">Pricing</li>
        </ul>

        {/* CTA Buttons */}
        <div className="hidden md:flex gap-4">
          <button className="text-gray-300 hover:text-blue-400 transition">
            Login
          </button>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-5 py-2 rounded-lg transition">
            Get Started
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div
          className="md:hidden text-white cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FiX size={28} /> : <FiMenu size={28} />}
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#010f1a] backdrop-blur-lg border-t border-blue-900/40">
          <ul className="flex flex-col items-center py-6 gap-6 text-gray-300 font-medium">
            <li className="hover:text-blue-400 transition">Features</li>
            <li className="hover:text-blue-400 transition">How It Works</li>
            <li className="hover:text-blue-400 transition">Audit Trail</li>
            <li className="hover:text-blue-400 transition">Pricing</li>
            <button className=" bg-blue-500 hover:bg-blue-600 text-white font-semibold px-5 py-2 rounded-lg transition">
              Get Started
            </button>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
