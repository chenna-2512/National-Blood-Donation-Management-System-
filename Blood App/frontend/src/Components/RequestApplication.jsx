import { useEffect, useState } from 'react';
import Footer1 from "../Utilities/Footer1";
import Heading from "../Utilities/Heading";
import { useNavigate } from 'react-router-dom';
// import axios from "axios"

const RequestApplication = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    email: '',
    phoneno: '',
    date: '',
    platelets: '',
    address: '',
    donorEmail: '',
  });

  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");
    const donorEmail = localStorage.getItem("donorEmail");
    if (userEmail && donorEmail) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        email: userEmail,
        donorEmail: donorEmail,
      }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  

  const handleSubmit = async () => {
    try {
      const response = await fetch("https://national-blood-donation-management-system-y10q.onrender.com/postrequest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
  
      const result = await response.json();
      console.log("Request submitted successfully:", result);
      alert("Request submitted successfully!");

      setFormData({
        name: '',
        gender: '',
        email: localStorage.getItem("userEmail") || '',
        phoneno: '',
        platelets: '',
        date: '',
        address: '',
        donorEmail: localStorage.getItem("donorEmail") || '',
      });

      navigate("/requestor")
  
    } catch (error) {
      console.error("Error submitting request:", error);
      alert("Failed to submit request. Please try again.");
    }
  };
  

  return (
    <>
      <Heading />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6 mt-20 mb-24 md:mb-8 lg:mt-16">
        <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
          <h1 className="text-2xl font-bold text-center mb-2">Request Blood Application</h1>
          <p className="text-center text-gray-600 mb-6">
            Please kindly fill your details to request blood from a donor
          </p>

          <div className="flex flex-col gap-4">
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              className="border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
            />

            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
            >
              <option value="">Select your gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Transgender">Transgender</option>
            </select>

            <input
              type="text"
              name="phoneno"
              placeholder="Enter your mobile number"
              value={formData.phoneno}
              onChange={handleChange}
              className="border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
            />

            <input 
              type="date" 
              name="date" 
              placeholder='Please enter the date when you need blood' 
              value={formData.date} 
              onChange={handleChange}
              className='border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400'
            />

            <select
              name="platelets"
              value={formData.platelets}
              onChange={handleChange}
              className="border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
            >
              <option value="">Do you require platelets?</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>

            <textarea
              name="address"
              placeholder="Enter the location of Hospital"
              value={formData.location}
              onChange={handleChange}
              className="border border-gray-300 rounded-xl px-4 py-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-red-400"
            ></textarea>

            <input
              type="text"
              name="email"
              value={formData.email}
              readOnly
              className="border border-gray-300 rounded-xl px-4 py-2 bg-gray-100 cursor-not-allowed"
              placeholder="User email (auto-filled)"
            />

            <input
              type="text"
              name="donorEmail"
              value={formData.donorEmail}
              readOnly
              className="border border-gray-300 rounded-xl px-4 py-2 bg-gray-100 cursor-not-allowed"
              placeholder="Donor email (auto-filled)"
            />

            <button
              className="bg-red-500 text-white py-2 rounded-xl hover:bg-red-600 transition-all mt-4"
              onClick={handleSubmit}
            >
              Submit Request
            </button>
          </div>
        </div>
      </div>
      <Footer1 />
    </>
  );
};

export default RequestApplication;
