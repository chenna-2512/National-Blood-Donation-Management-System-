import { useState } from "react";
import Profile from "../Utilities/Profile";
import History from "./History";
import Application from "../Components/Application";
import { Menu, X, Heart } from "lucide-react";

const Header2 = () => {
  const [showProfile, setShowProfile] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showApplication, setShowApplication] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

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
    <>
      {/* Top Navigation Bar */}
      <div className="fixed w-full z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo on the left */}
            <div className="flex items-center space-x-2">
              <div className="bg-red-600 p-2 rounded-full">
                <Heart className="w-6 h-6 text-white fill-current" />
              </div>
              <span className="text-xl font-bold text-gray-900">BloodConnect</span>
            </div>

            {/* Tabs - Center Aligned on Desktop */}
            <div className="hidden sm:flex gap-6">
              <button
                onClick={goToProfile}
                className={`relative font-medium text-sm sm:text-base hover:text-red-600 transition-all duration-200 ${
                  showProfile ? "text-red-600 font-semibold" : "text-gray-600"
                }`}
              >
                Profile
                {showProfile && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-red-600"></span>
                )}
              </button>

              <button
                onClick={goToApplicationForm}
                className={`relative font-medium text-sm sm:text-base hover:text-red-600 transition-all duration-200 ${
                  showApplication && !showProfile && !showHistory
                    ? "text-red-600 font-semibold"
                    : "text-gray-600"
                }`}
              >
                Application
                {showApplication && !showProfile && !showHistory && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-red-600"></span>
                )}
              </button>

              <button
                onClick={gotoHistory}
                className={`relative font-medium text-sm sm:text-base hover:text-red-600 transition-all duration-200 ${
                  showHistory ? "text-red-600 font-semibold" : "text-gray-600"
                }`}
              >
                Donation History
                {showHistory && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-red-600"></span>
                )}
              </button>
            </div>

            {/* Mobile Toggle Button */}
            <div className="sm:hidden">
              <button onClick={() => setMenuOpen(!menuOpen)} className="text-gray-700">
                {menuOpen ? <X size={26} /> : <Menu size={26} />}
              </button>
            </div>
          </div>

          {/* Mobile Dropdown */}
          {menuOpen && (
            <div className="flex flex-col sm:hidden gap-4 items-center py-4">
              <button
                onClick={goToProfile}
                className={`font-medium ${
                  showProfile ? "text-red-600 font-semibold" : "text-gray-600"
                }`}
              >
                Profile
              </button>
              <button
                onClick={goToApplicationForm}
                className={`font-medium ${
                  showApplication ? "text-red-600 font-semibold" : "text-gray-600"
                }`}
              >
                Application
              </button>
              <button
                onClick={gotoHistory}
                className={`font-medium ${
                  showHistory ? "text-red-600 font-semibold" : "text-gray-600"
                }`}
              >
                Donation History
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Page Content Below Header */}
      <div className="pt-16">
        {showApplication && <Application />}
        {showProfile && <Profile />}
        {showHistory && <History />}
      </div>
    </>
  );
};

export default Header2;
