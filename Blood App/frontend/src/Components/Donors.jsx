import { useLocation, useNavigate } from "react-router-dom";
import Footer1 from "../Utilities/Footer1";
import Heading from "../Utilities/Heading";
import axios from "axios";
import {
  Droplets,
  MapPin,
  Phone,
  Heart,
  Mail,
  User,
  TrendingUp,
  Ruler,
  Scale,
  Target,
  Calendar,
  Clock,
} from "lucide-react";

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

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dateDiff = today.getDate() - birthDate.getDate();

    // If birthday hasn't occurred yet this year, subtract 1
    if (monthDiff < 0 || (monthDiff === 0 && dateDiff < 0)) {
      age--;
    }

    return age;
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

      <div className="flex justify-center items-center mb-14 min-h-[80vh] p-4">
        <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
          {/* Header */}
          <div className="bg-gradient-to-r from-red-600 to-red-700 px-8 py-10 text-white relative">
            <div className="absolute top-4 right-4">
              <span className="bg-green-500 text-white px-3 py-2 rounded-full text-sm font-semibold animate-pulse">
                🟢 {donor.typeofdonar.charAt(0).toUpperCase() + donor.typeofdonar.slice(1)} Donor
              </span>
            </div>
            <div className="absolute inset-0 bg-black/10" />
            <div className="relative flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-3xl font-bold">{donor.name}</h2>
                <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-2 mt-2">
                  <span className="bg-white text-red-600 font-bold px-4 py-1 rounded-full shadow">🩸 {donor.bloodgroup}</span>
                  <div className="flex items-center gap-1 text-sm text-red-100">
                    <MapPin className="w-4 h-4" /> {donor.city}, {donor.state || "India"}
                  </div>
                  
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-xl font-bold">{donor.totalDonations}</div>
                    <div className="text-sm text-red-200">Total Donations</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold">{new Date(donor.lblooddonate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</div>
                    <div className="text-sm text-red-200">Last Donated</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Info */}
          <div className="grid md:grid-cols-2 gap-8 mb-8 px-10 py-6">
              {/* Personal Details */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-900 flex items-center mb-4">
                  <User className="w-5 h-5 mr-2 text-red-600" />
                  Personal Details
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <span className="text-gray-600 flex items-center">
                      <User className="w-4 h-4 mr-2" />
                      Full Name
                    </span>
                    <span className="font-semibold text-gray-900">{donor.name}</span>
                  </div>
                  
                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <span className="text-gray-600 flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      Age
                    </span>
                    <span className="font-semibold text-gray-900">
                      {calculateAge(donor.dob)} years
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <span className="text-gray-600 flex items-center">
                      <Scale className="w-4 h-4 mr-2" />
                      Weight
                    </span>
                    <span className="font-semibold text-gray-900">{donor.weight} kg</span>
                  </div>
                  
                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <span className="text-gray-600 flex items-center">
                      <Ruler className="w-4 h-4 mr-2" />
                      Height
                    </span>
                    <span className="font-semibold text-gray-900">{donor.height} cm</span>
                  </div>
                </div>
              </div>

              {/* Donation Details */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-900 flex items-center mb-4">
                  <Droplets className="w-5 h-5 mr-2 text-red-600" />
                  Donation Details
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <span className="text-gray-600 flex items-center">
                      <Droplets className="w-4 h-4 mr-2" />
                      Blood Group
                    </span>
                    <span className="font-semibold text-red-600">{donor.bloodgroup}</span>
                  </div>
                  
                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <span className="text-gray-600 flex items-center">
                      <Target className="w-4 h-4 mr-2" />
                      Platelet Donor
                    </span>
                    <span className="font-semibold text-green-600">
                      {donor.platelets === 'yes' ? '✓ Yes' : '✗ No'}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <span className="text-gray-600 flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      Last Donation
                    </span>
                    <span className="font-semibold text-gray-900">
                      {new Date(donor.lblooddonate).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <span className="text-gray-600 flex items-center">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Total Donations
                    </span>
                    <span className="font-semibold text-gray-900">{donor.totalDonations}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="flex flex-col md:flex-row justify-center items-center gap-4 pb-8">
              <button
                onClick={handleRequest}
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-3 px-8 rounded-full transition duration-300 hover:scale-105 shadow hover:shadow-red-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >  
                <Heart className="w-5 h-5 mr-2 fill-current" />
                Request Blood                
              </button>

              <a
                href={`tel:${donor.phoneno}`}
                className="border border-red-600 text-red-600 font-semibold py-3 px-8 rounded-full hover:bg-red-50 transition flex items-center justify-center"
              >
                <Phone className="w-5 h-5 mr-2" />
                Call Now
              </a>

              <button
                className="border border-green-600 text-green-600 font-semibold py-3 px-8 rounded-full hover:bg-green-50 transition"
              >
                <a href={`mailto:${donor.email}`} className="flex items-center justify-center">
                  <Mail className="w-5 h-5 mr-2" />
                  Mail
                </a>
              </button>
            </div>


            
            
          </div>
        </div>
      

      <Footer1 />
    </>
  );
};

export default Donors;