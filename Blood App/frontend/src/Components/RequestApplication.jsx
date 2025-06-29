import { useEffect, useState } from 'react';
import Footer1 from "../Utilities/Footer1";
import Heading from "../Utilities/Heading";
import { useNavigate } from 'react-router-dom';
import { User, Phone, Calendar, MapPin, Droplets, Target } from 'lucide-react';

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
    units:'',
    urgencylevel:'',
  });

  const urgencyLevels = [
    { value: 'emergency', label: '🔴 Emergency (Within 2 hours)', color: 'text-red-600' },
    { value: 'urgent', label: '🟡 Urgent (Within 24 hours)', color: 'text-orange-600' },
    { value: 'scheduled', label: '🟢 Scheduled (Within 3 days)', color: 'text-green-600' }
  ];

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
    // Basic frontend validation
    const { name, gender, email, phoneno, date, platelets, address, donorEmail, units, urgencylevel } = formData;

    if (!name || !gender || !email || !phoneno || !date || !platelets || !address || !donorEmail || !units || !urgencylevel) {
      alert("Please fill all the fields before submitting.");
      return;
    }

    const payload = {
      ...formData,
      units: Number(units),
    };

    console.log("Sending payload:", payload);

    try {
      const response = await fetch("https://national-blood-donation-management-system-y10q.onrender.com/postrequest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Server error response:", errorData);
        throw new Error(errorData.message || "Something went wrong!");
      }

      const result = await response.json();
      alert("Request submitted successfully!");
      console.log(result);

      // Reset form
      setFormData({
        name: '',
        gender: '',
        email: localStorage.getItem("userEmail") || '',
        phoneno: '',
        platelets: '',
        date: '',
        address: '',
        units: '',
        urgencylevel: '',
        donorEmail: localStorage.getItem("donorEmail") || '',
      });

      navigate("/requestor");

    } catch (error) {
      console.error("Error submitting request:", error);
      alert("Failed to submit request. " + error.message);
    }
  };


  return (
    <>
      <Heading />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-50 to-orange-100 p-6 mb-16">
        <div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-2xl">
          <h1 className="text-3xl font-bold text-center mb-2 text-red-700 flex items-center justify-center">
            <Droplets className="w-6 h-6 mr-2" /> Request Blood
          </h1>
          <p className="text-center text-gray-600 mb-8">Fill in the form to request blood from a donor</p>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
                />
              </div>
            </div>

            {/* Mobile Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Number *</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="phoneno"
                  value={formData.phoneno}
                  onChange={handleChange}
                  placeholder="Enter mobile number"
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
                />
              </div>
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Gender *</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
              >
                <option value="">Select your gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Transgender">Transgender</option>
              </select>
            </div>

            {/* Platelets */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Platelets Required? *</label>
              <select
                name="platelets"
                value={formData.platelets}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
              >
                <option value="">Select option</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            {/* Date Needed */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date Needed *</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
                />
              </div>
            </div>

            {/* Units Needed */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Units Needed *</label>
              <div className="relative">
                <Target className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="number"
                  name="units"
                  value={formData.units}
                  onChange={handleChange}
                  min="1"
                  max="10"
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Urgency Level *
              </label>
              <div className="space-y-3">
                {urgencyLevels.map((level) => (
                  <label key={level.value} className="flex items-center p-4 border border-gray-200 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">
                    <input
                      type="radio"
                      name="urgencylevel"
                      value={level.value}
                      checked={formData.urgencylevel === level.value}
                      onChange={handleChange}
                      className="w-4 h-4 text-red-600 border-gray-300 focus:ring-red-500"
                    />
                    <span className={`ml-3 font-medium ${level.color}`}>{level.label}</span>
                  </label>
                ))}
              </div>
            </div>
              

            {/* Address */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Hospital Address *</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows={3}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
                  placeholder="Enter complete hospital address"
                />
              </div>
            </div>

            {/* Auto-filled User Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Your Email</label>
              <input
                type="text"
                name="email"
                value={formData.email}
                readOnly
                className="w-full px-4 py-3 border border-gray-300 bg-gray-100 rounded-xl cursor-not-allowed"
              />
            </div>

            {/* Auto-filled Donor Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Donor Email</label>
              <input
                type="text"
                name="donorEmail"
                value={formData.donorEmail}
                readOnly
                className="w-full px-4 py-3 border border-gray-300 bg-gray-100 rounded-xl cursor-not-allowed"
              />
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className="mt-8 w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-3 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 shadow-lg"
          >
            🚨 Submit Emergency Request
          </button>
        </div>
      </div>
      <Footer1 />
    </>
  );
};

export default RequestApplication;
