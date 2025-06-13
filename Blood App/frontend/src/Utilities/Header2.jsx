import { useState } from "react";
import Profile from "../Utilities/Profile";
import History from "./History";
import Application from "../Components/Application";
import { Menu, X } from "lucide-react"; // optional: install lucide-react for icons

const Header2 = () => {
  const [showProfile, setShowProfile] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showApplication, setShowApplication] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // toggle for mobile menu

  const goToApplicationForm = () => {
    setShowApplication(true);
    setShowProfile(false);
    setShowHistory(false);
    setMenuOpen(false);
  };

  const goToProfile = () => {
    setShowProfile(true);
    setShowHistory(false);
    setShowApplication(false);
    setMenuOpen(false);
  };

  const gotoHistory = () => {
    setShowProfile(false);
    setShowHistory(true);
    setShowApplication(false);
    setMenuOpen(false);
  };

  return (
    <div>
      <div className="mt-24 md:mt-24 lg:mt-16">
        {/* Mobile Menu Button */}
        <div className="sm:hidden flex px-4">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-black">
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Menu Items */}
        <div
          className={`${
            menuOpen ? "flex" : "hidden"
          } sm:flex flex-col sm:flex-row items-center justify-center gap-5 p-2 font-semibold cursor-pointer`}
        >
          <h5
            className={`text-center font-serif p-1 text-sm md:text-lg relative transition-all duration-500
              before:content-[''] before:absolute before:left-0 before:bottom-0 before:h-[2px] before:bg-black before:transition-all before:duration-300
              ${showProfile ? "before:w-full text-black font-bold" : "before:w-0 text-gray-600"}`}
            onClick={goToProfile}
          >
            Profile
          </h5>

          <h5
            className={`text-center font-serif p-1 text-sm md:text-lg relative transition-all duration-500
              before:content-[''] before:absolute before:left-0 before:bottom-0 before:h-[2px] before:bg-black before:transition-all before:duration-300
              ${!showProfile && !showHistory ? "before:w-full text-black font-bold" : "before:w-0 text-gray-600"}`}
            onClick={goToApplicationForm}
          >
            Application
          </h5>

          <h5
            className={`text-center font-serif p-1 text-sm md:text-lg relative transition-all duration-500
              before:content-[''] before:absolute before:left-0 before:bottom-0 before:h-[2px] before:bg-black before:transition-all before:duration-300
              ${showHistory ? "before:w-full text-black font-bold" : "before:w-0 text-gray-600"}`}
            onClick={gotoHistory}
          >
            Donation History
          </h5>
        </div>
      </div>

      {/* Component Rendering */}
      {showApplication && <Application />}
      {showProfile && <Profile />}
      {showHistory && <History />}
    </div>
  );
};

export default Header2;
