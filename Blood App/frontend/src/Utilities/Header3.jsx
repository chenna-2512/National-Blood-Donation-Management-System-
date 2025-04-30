import { useState } from "react";
import Donorpage from "../Utilities/Donorpage";
import RequestHistory from "../Utilities/RequestHistory";

const Header3 = () => {
   
   const [showDonars,setShowDonors] = useState(false);
   const [showRequestHistory,setShowRequestHistory] = useState(false);

    const gotoDonors = () => {
      setShowDonors(true);
      setShowRequestHistory(false);
    }
    
    const gotoRequestHistory = () => {
      setShowDonors(false);
      setShowRequestHistory(true);
    }

  return (
    <div>
      <div className="mt-24 md:mt-24 lg:mt-16">
        <div className="flex items-center justify-center gap-5 p-2 font-semibold cursor-pointer">
            <h5 className="text-center font-serif p-1 text-lg relative transition-all duration-500 before:content-[''] before:absolute before:left-0 before:bottom-0 before:w-0 before:h-[2px] before:bg-black before:transition-all before:duration-1500 hover:before:w-full"
            onClick={gotoDonors}>
                Blood Donors
            </h5>
            <h5 className="text-center font-serif p-1 text-lg relative transition-all duration-500 before:content-[''] before:absolute before:left-0 before:bottom-0 before:w-0 before:h-[2px] before:bg-black before:transition-all before:duration-1500 hover:before:w-full"
            onClick={gotoRequestHistory}>
                Your Request History
            </h5>
        </div>
      </div>

      {showDonars && <Donorpage/>}
      {showRequestHistory && <RequestHistory/>}
    </div>
  )
}

export default Header3
