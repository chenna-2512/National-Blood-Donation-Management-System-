import { useState } from "react";
import Profile from "../Utilities/Profile";
import History from "./History";
import Application from "../Components/Application";

const Header2 = () => {
  
  const [showProfile, setShowProfile] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showApplication, setShowApplication] = useState(false);

  const goToApplicationForm = () => {
    setShowApplication(true);
    setShowProfile(false);
    setShowHistory(false);
  };

  const goToProfile = () => {
    setShowProfile(true);
    setShowHistory(false);
     setShowApplication(false);
  };

  const gotoHistory = () => {
    setShowProfile(false);
    setShowHistory(true);
     setShowApplication(false);
  };

  return (
    <div>
      <div className="mt-24 md:mt-24 lg:mt-16">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 p-2 font-semibold cursor-pointer">
         <h5
            className={`text-center font-serif p-1 text-lg relative transition-all duration-500
              before:content-[''] before:absolute before:left-0 before:bottom-0 before:h-[2px] before:bg-black before:transition-all before:duration-300
              ${showProfile ? "before:w-full text-black font-bold" : "before:w-0 text-gray-600"}`}
            onClick={goToProfile}
          >
            Your Profile
          </h5>

          <h5
            className={`text-center font-serif p-1 text-lg relative transition-all duration-500
              before:content-[''] before:absolute before:left-0 before:bottom-0 before:h-[2px] before:bg-black before:transition-all before:duration-300
              ${!showProfile && !showHistory ? "before:w-full text-black font-bold" : "before:w-0 text-gray-600"}`}
            onClick={goToApplicationForm}
          >
            Application Form
          </h5>

          <h5
            className={`text-center font-serif p-1 text-lg relative transition-all duration-500
              before:content-[''] before:absolute before:left-0 before:bottom-0 before:h-[2px] before:bg-black before:transition-all before:duration-300
              ${showHistory ? "before:w-full text-black font-bold" : "before:w-0 text-gray-600"}`}
            onClick={gotoHistory}
          >
            Blood Donation Waitlist & History
          </h5>

        </div>
      </div>
      {showApplication && <Application/>}
      {showProfile && <Profile />}
      {showHistory && <History />}
    </div>
  );
};

export default Header2;
