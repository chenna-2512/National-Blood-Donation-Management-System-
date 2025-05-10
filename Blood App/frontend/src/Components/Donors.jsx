import { useLocation, useNavigate } from "react-router-dom";
import Footer1 from "../Utilities/Footer1";
import Heading from "../Utilities/Heading";
import axios from "axios";

const Donors = () => {
  const location = useLocation();
  const donor = location?.state?.donor;
  console.log(donor);

  const userEmail = localStorage.getItem("userEmail");
  const navigate = useNavigate();
  localStorage.setItem("donorEmail", donor.email);

  const handleRequest = async () => {
    if (!userEmail) {
      return (
        <p className="text-center text-red-500 font-semibold">Please Login to Request</p>
      );
    }

    if (donor.socialize === "block") {
      alert("Someone has already requested blood from this donor. Please try another user!");
      return;
    }

    try {
      await axios.put("https://national-blood-donation-management-system-y10q.onrender.com/updateSocialize", {
        email: donor.email,
        socialize: "block",
      });

      navigate("/requestApplication");
    } catch (error) {
      console.log("Error updating Socialize:", error);
    }
  };

  if (!donor) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-600 text-lg">
        No donor data available.
      </div>
    );
  }

  return (
    <>
      <Heading />

      <div className="flex justify-center items-center mt-16 min-h-[80vh] p-4">
        <div className="w-full max-w-2xl bg-white p-6 sm:p-8 rounded-2xl shadow-md border border-gray-200">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-red-600 mb-6">
            Donor Details
          </h2>
          <div className="space-y-4 text-gray-700 text-sm sm:text-base">
            <p><span className="font-semibold">Name:</span> {donor.name}</p>
            <p><span className="font-semibold">Blood Group:</span> {donor.bloodgroup}</p>
            <p><span className="font-semibold">City:</span> {donor.city}</p>
            <p><span className="font-semibold">Mobile:</span> {donor.phoneno}</p>
            <p><span className="font-semibold">Weight:</span> {donor.weight} kg</p>
            <p><span className="font-semibold">Height:</span> {donor.height} cm</p>
            <p><span className="font-semibold">Platelets:</span> {donor.platelets}</p>
            <p><span className="font-semibold">Type of Donor:</span> {donor.typeofdonar}</p>
            <p><span className="font-semibold">Email:</span> {donor.email}</p>

            <div className="flex justify-center">
              <button
                className="mt-6 bg-red-600 hover:bg-black text-white font-bold py-2 px-6 rounded-lg transition duration-300 ease-in-out"
                onClick={handleRequest}
              >
                Request Blood
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer1 />
    </>
  );
};

export default Donors;
