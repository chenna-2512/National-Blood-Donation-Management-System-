import { useEffect, useState } from "react";
import { Heart, Star, User, Calendar, Phone, MapPin, Landmark, Hash, Scale, Ruler, HeartPulse, Venus, Droplet, Target } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";

const Application = () => {
  const [formData, setFormData] = useState({
    name: "", dob: "", email: "", phoneno: "", city: "", state: "", pincode: "",
    weight: "", height: "", lblooddonate: "", gender: "", bloodgroup: "",
    address: "", platelets: "", socialize: "", typeofdonar: "", requestorEmail: "", message: "", totalDonations: "", createdAt: "",
  });

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const bloodGroups = [
    "O Positive", "O Negative", "A Positive", "A Negative",
    "B Positive", "B Negative", "AB Positive", "AB Negative"
  ];

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setIsAuthenticated(true);

    const userEmail = localStorage.getItem("userEmail");
    if (userEmail) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        email: userEmail,
        socialize : "No",
        requestorEmail : "NA",
        message : "NA",
        totalDonations : 1,
        createdAt : new Date().toISOString().split("T")[0],
      }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue = ["phoneno", "pincode", "weight", "height"].includes(name)
      ? Number(value) || ""
      : value;
    setFormData({ ...formData, [name]: newValue });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const postDetails = async () => {
    try {
      if (!validateEmail(formData.email)) {
        toast.error("Please enter a valid email address.");
        return;
      }

      const loggedEmail = localStorage.getItem("userEmail");
      if (!loggedEmail) {
        toast.error("Login first");
        return;
      }

      const checkResponse = await fetch(`https://national-blood-donation-management-system-y10q.onrender.com/getdetails?email=${encodeURIComponent(loggedEmail)}`);
      const checkData = await checkResponse.json();

      if (checkData.exists) {
        toast.error("You have already filled the application and cannot submit again.");
        return;
      }

      const updatedFormData = {
        ...formData,
        lblooddonate: formData.lblooddonate ? new Date(formData.lblooddonate).toISOString() : null,
      };

      console.log("📦 Sending form data:", updatedFormData);
      const response = await fetch("https://national-blood-donation-management-system-y10q.onrender.com/postdetails", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedFormData),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || "Failed to submit form.");
      }

      toast.success("Form submitted successfully!");
      setFormData({
        name: "", dob: "", email: "", phoneno: "", city: "", state: "", pincode: "",
        weight: "", height: "", lblooddonate: "", gender: "", bloodgroup: "",
        address: "", platelets: "", socialize: "", typeofdonar: "",requestorEmail: "NA", message: "NA", totalDonations : "", createdAt : "",
      });

    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(`Error submitting form: ${error.message}`);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h2 className="text-2xl font-bold text-red-600">Please log in to access the application form.</h2>
      </div>
    );
  }

  return (
    <>
      <ToastContainer/>
      <div className="bg-gradient-to-b from-white via-red-50 to-white py-12 mb-14">
        <div className="text-center mb-12">
            <div className="relative inline-block mb-6">
              <div className="bg-gradient-to-br from-red-500 to-red-700 w-20 h-20 rounded-full flex items-center justify-center mx-auto animate-pulse">
                <Heart className="w-10 h-10 text-white fill-current" />
              </div>
              <div className="absolute -top-2 -right-2 bg-yellow-400 p-2 rounded-full animate-bounce">
                <Star className="w-4 h-4 text-white" />
              </div>
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              💖 Help Save Lives
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed mb-6">
              Fill out this quick form and join our mission to provide safe blood & platelets to those in need.
            </p>
            
            <div className="bg-gradient-to-r from-red-100 to-pink-100 rounded-2xl p-4 max-w-lg mx-auto">
              <p className="text-red-800 font-medium">
                &quot;Every drop counts. Your willingness today could rewrite someone&apos;s tomorrow. ❤️&quot;
              </p>
            </div>
          </div>

        <div className="bg-white shadow-2xl p-8 rounded-2xl w-[90%] max-w-3xl mx-auto border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[{
              label: "Full Name", type: "text", name: "name", icon: <User className='w-5 h-5 text-red-500 mr-2' /> },
              { label: "Date of Birth", type: "date", name: "dob", icon: <Calendar className='w-5 h-5 text-red-500 mr-2' /> },
              { label: "Mobile Number", type: "text", name: "phoneno", icon: <Phone className='w-5 h-5 text-red-500 mr-2' /> },
              { label: "City", type: "text", name: "city", icon: <MapPin className='w-5 h-5 text-red-500 mr-2' /> },
              { label: "State", type: "text", name: "state", icon: <Landmark className='w-5 h-5 text-red-500 mr-2' /> },
              { label: "Pin Code", type: "text", name: "pincode", icon: <Hash className='w-5 h-5 text-red-500 mr-2' /> },
              { label: "Weight", type: "text", name: "weight", icon: <Scale className='w-5 h-5 text-red-500 mr-2' /> },
              { label: "Height", type: "text", name: "height", icon: <Ruler className='w-5 h-5 text-red-500 mr-2' /> },
              { label: "Last Time Blood Donation Date", type: "date", name: "lblooddonate", icon: <HeartPulse className='w-5 h-5 text-red-500 mr-2' /> }
            ].map(({ label, type, name, icon }) => (
              <div key={name}>
                <label htmlFor={name} className="block text-sm font-semibold text-gray-700 mb-1 flex items-center">{icon}{label}</label>
                <input
                  type={type}
                  id={name}
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:outline-none"
                />
              </div>
            ))}

            <div>
              <label htmlFor="gender" className="block text-sm font-semibold text-gray-700 mb-1 flex items-center">
                <Venus className="w-5 h-5 text-red-500 mr-2" /> Gender
              </label>
              <select
                name="gender"
                id="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:outline-none"
              >
                <option>Select Your Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="trans">Transgender</option>
              </select>
            </div>

            <div>
              <label htmlFor="bloodgroup" className="block text-sm font-semibold text-gray-700 mb-1 flex items-center">
                <Droplet className="w-5 h-5 text-red-500 mr-2" /> Blood Group
              </label>
              <select
                name="bloodgroup"
                id="bloodgroup"
                value={formData.bloodgroup}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:outline-none"
                >
                <option>Select Your Blood Group</option>
                {bloodGroups.map((bg) => (
                  <option key={bg} value={bg}>{bg}</option>
                ))}
              </select>
            </div>

            {[{
              label: "Type of Donor", name: "typeofdonar", options: ["normal", "emergency"], icon: <Target className='w-5 h-5 text-red-500 mr-2' />
            }].map(({ label, name, options, icon }) => (
              <div key={name}>
                <label htmlFor={name} className="block text-sm font-semibold text-gray-700 mb-1 flex items-center">{icon}{label}</label>
                <select
                  name={name}
                  id={name}
                  value={formData[name]}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:outline-none"
                  >
                  <option>Select Option</option>
                  {options.map((opt) => (
                    <option key={opt} value={opt}>{opt.charAt(0).toUpperCase() + opt.slice(1)}</option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        

          <div className="flex flex-col gap-2 mt-4">
            <label htmlFor="address" className="text-base font-medium text-gray-800">
              Address
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 text-red-500 w-5 h-5" />
              <textarea
                name="address"
                id="address"
                rows="4"
                value={formData.address}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl resize-none focus:ring-2 focus:ring-red-500 focus:outline-none text-sm"
                placeholder="Enter your complete address"
                />
            </div>
          </div>

          {/* Platelet Donation Section */}
            <div className="bg-blue-50 rounded-2xl p-6 mt-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center text-lg">
                🧬 <span className="ml-2">Platelet Donation</span>
              </h3>
              <p className="text-gray-600 mb-4 text-sm">
                Platelets are crucial for cancer patients and those undergoing surgeries. Will you be a platelet hero? 💪
              </p>
              <div className="space-y-3 text-sm text-gray-700">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="platelets"
                    value="yes"
                    checked={formData.platelets === "yes"}
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="ml-3">✅ Yes, I’m willing to donate platelets when needed</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="platelets"
                    value="no"
                    checked={formData.platelets === "no"}
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                  <span className="ml-3">❌ No, I’m only comfortable with whole blood donation</span>
                </label>
              </div>
            </div>

          <div className="mt-8 flex justify-center">
            <button
              onClick={postDetails}
              className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-red-200"
              >
              🚀 Submit & Join the Lifesaver Squad
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Application;
