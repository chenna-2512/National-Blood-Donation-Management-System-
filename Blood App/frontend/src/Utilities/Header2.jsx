import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Profile from "../Utilities/Profile";
import History from "./History";
// import BBDetails from "../Utilities/BBDetails";

const Header2 = () => {
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  const goToApplicationForm = () => {
    navigate("/applicationform");
  };

  const goToProfile = () => {
    setShowProfile(true);
    setShowHistory(false);
  };

  const gotoHistory = () => {
    setShowProfile(false);
    setShowHistory(true);
  };

  return (
    <div>
      <div className="mt-24 md:mt-24 lg:mt-16">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 p-2 font-semibold cursor-pointer">
          <h5
            className={`text-center font-serif p-1 text-lg relative transition-all duration-500 before:content-[''] before:absolute before:left-0 before:bottom-0 before:w-0 before:h-[2px] before:bg-black before:transition-all before:duration-1500 hover:before:w-full
              ${showProfile ? "text-white bg-black rounded-lg p-2" : "text-black"}`}
            onClick={goToProfile}
          >
            Your Profile
          </h5>
          {/* <h5
            className="text-center font-serif p-1 text-lg relative transition-all duration-500 before:content-[''] before:absolute before:left-0 before:bottom-0 before:w-0 before:h-[2px] before:bg-black before:transition-all before:duration-1500 hover:before:w-full"
            onClick={goToBBDetails}
          >
            Blood Bank Details
          </h5> */}
          <h5
            className="text-center font-serif p-1 text-lg relative transition-all duration-500 before:content-[''] before:absolute before:left-0 before:bottom-0 before:w-0 before:h-[2px] before:bg-black before:transition-all before:duration-1500 hover:before:w-full"
            onClick={goToApplicationForm}
          >
            Application Form
          </h5>
          <h5
            className="text-center font-serif p-1 text-lg relative transition-all duration-500 before:content-[''] before:absolute before:left-0 before:bottom-0 before:w-0 before:h-[2px] before:bg-black before:transition-all before:duration-1500 hover:before:w-full"
            onClick={gotoHistory}
          >
            Blood Donation Waitlist & History
          </h5>
        </div>
      </div>

      {showProfile && <Profile />}
      {/* {showBBDetails && <BBDetails />} */}
      {showHistory && <History />}
    </div>
  );
};

export default Header2;
