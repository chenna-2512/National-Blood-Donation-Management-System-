import { useState } from "react";
import Donorpage from "../Utilities/Donorpage";
import RequestHistory from "../Utilities/RequestHistory";
import { Heart, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Header3 = () => {
  const [showDonars, setShowDonors] = useState(true);
  const [showRequestHistory, setShowRequestHistory] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const gotoDonors = () => {
    setShowDonors(true);
    setShowRequestHistory(false);
    setMobileMenuOpen(false);
  };

  const gotoRequestHistory = () => {
    setShowDonors(false);
    setShowRequestHistory(true);
    setMobileMenuOpen(false);
  };

  const goToHome = () => {
    navigate("/");
  };

  return (
    <>
      {/* Header */}
      <div className="fixed top-0 left-0 w-full z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2 cursor-pointer" onClick={goToHome}>
              <div className="bg-red-600 p-2 rounded-full">
                <Heart className="w-6 h-6 text-white fill-current" />
              </div>
              <span className="text-xl font-bold text-gray-900">BloodConnect</span>
            </div>

            {/* Desktop Tabs */}
            <div className="hidden sm:flex space-x-6">
              <button
                onClick={gotoDonors}
                className={`relative font-medium text-sm sm:text-base hover:text-red-600 transition-all duration-200 ${
                  showDonars ? "text-red-600 font-semibold" : "text-gray-600"
                }`}
              >
                Blood Donors
                {showDonars && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-red-600"></span>
                )}
              </button>
              <button
                onClick={gotoRequestHistory}
                className={`relative font-medium text-sm sm:text-base hover:text-red-600 transition-all duration-200 ${
                  showRequestHistory ? "text-red-600 font-semibold" : "text-gray-600"
                }`}
              >
                Your Request History
                {showRequestHistory && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-red-600"></span>
                )}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="sm:hidden">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                <Menu className="w-6 h-6 text-gray-800" />
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="sm:hidden flex flex-col mt-2 space-y-2 pb-4">
              <button
                onClick={gotoDonors}
                className={`w-full text-left px-4 py-2 text-sm font-medium ${
                  showDonars ? "text-red-600 font-semibold" : "text-gray-700"
                }`}
              >
                Blood Donors
              </button>
              <button
                onClick={gotoRequestHistory}
                className={`w-full text-left px-4 py-2 text-sm font-medium ${
                  showRequestHistory ? "text-red-600 font-semibold" : "text-gray-700"
                }`}
              >
                Your Request History
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="pt-16">
        {showDonars && <Donorpage />}
        {showRequestHistory && <RequestHistory />}
      </div>
    </>
  );
};

export default Header3;
