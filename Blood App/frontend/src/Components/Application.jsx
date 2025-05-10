import Heading from "../Utilities/Heading";
import Footer1 from "../Utilities/Footer1";
import { useEffect, useState } from "react";

const Application = () => {
  const [formData, setFormData] = useState({
    name: "", dob: "", email: "", phoneno: "", city: "", state: "", pincode: "",
    weight: "", height: "", lblooddonate: "", gender: "", bloodgroup: "",
    address: "", platelets: "", socialize: "", typeofdonar: "", requestorEmail: "", message: ""
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
        requestorEmail : "NA",
        message : "NA",
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
        alert("Please enter a valid email address.");
        return;
      }

      const loggedEmail = localStorage.getItem("userEmail");
      if (!loggedEmail) {
        alert("Login first");
        return;
      }

      const checkResponse = await fetch(`https://national-blood-donation-management-system-y10q.onrender.com/getdetails?email=${encodeURIComponent(loggedEmail)}`);
      const checkData = await checkResponse.json();

      if (checkData.exists) {
        alert("You have already filled the application and cannot submit again.");
        return;
      }

      const updatedFormData = {
        ...formData,
        lblooddonate: formData.lblooddonate ? new Date(formData.lblooddonate).toISOString() : null,
      };

      const response = await fetch("https://national-blood-donation-management-system-y10q.onrender.com/postdetails", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedFormData),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || "Failed to submit form.");
      }

      alert("Form submitted successfully!");
      setFormData({
        name: "", dob: "", email: "", phoneno: "", city: "", state: "", pincode: "",
        weight: "", height: "", lblooddonate: "", gender: "", bloodgroup: "",
        address: "", platelets: "", socialize: "", typeofdonar: "",
      });

    } catch (error) {
      console.error("Error submitting form:", error);
      alert(`Error submitting form: ${error.message}`);
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
    <div>
      <Heading />
      <h1 className="text-lg mt-[5%] font-serif font-semibold text-center p-2 underline">
        Application Form for Blood & Platelets Donation
      </h1>

      <div className="bg-white shadow-lg mb-[4%] p-[2%] rounded-xl w-[50%] mx-auto border-2 border-gray-300 mt-6">
        <div className="flex flex-col gap-6 justify-center">
          {[ 
            { label: "Full Name", type: "text", name: "name" },
            { label: "Date of Birth", type: "date", name: "dob" },
            { label: "Mobile Number", type: "text", name: "phoneno" },
            { label: "City", type: "text", name: "city" },
            { label: "State", type: "text", name: "state" },
            { label: "Pin Code", type: "text", name: "pincode" },
            { label: "Weight", type: "text", name: "weight" },
            { label: "Height", type: "text", name: "height" },
            { label: "Last Time Blood Donation Date", type: "date", name: "lblooddonate" }
          ].map(({ label, type, name }) => (
            <div key={name} className="flex gap-4 items-center justify-between p-3 bg-gray-100 rounded-lg shadow-sm hover:shadow-md transition">
              <label htmlFor={name} className="text-lg font-semibold text-gray-700">{label}</label>
              <input type={type} id={name} name={name} value={formData[name]}
                className="text-lg focus:outline-none focus:ring-0 border-b-2 border-gray-400 w-[80%] bg-transparent px-2 py-1"
                onChange={handleChange} />
            </div>
          ))}

          <div className="flex gap-4 items-center justify-between p-3 bg-gray-100 rounded-lg shadow-sm hover:shadow-md transition">
            <label htmlFor="gender" className="text-lg font-semibold text-gray-700">Gender</label>
            <select name="gender" id="gender" value={formData.gender} className="w-[80%] p-2 border-b-2 focus:outline-none focus:ring-0" onChange={handleChange}>
              <option>Select Your Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="trans">Transgender</option>
            </select>
          </div>

          <div className="flex flex-col gap-2 p-3 bg-gray-100 rounded-lg shadow-sm hover:shadow-md transition w-full">
            <label htmlFor="bloodgroup" className="text-lg font-semibold text-gray-700">Blood Group</label>
            <select name="bloodgroup" id="bloodgroup" value={formData.bloodgroup} className="w-full p-1 border-b-2 focus:outline-none focus:ring-0" onChange={handleChange}>
              <option>Select Your Blood Group</option>
              {bloodGroups.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          </div>

          <div className="flex gap-4 items-center justify-between p-3 bg-gray-100 rounded-lg">
            <label htmlFor="typeofdonar" className="text-lg font-semibold text-gray-700">Type of Donor</label>
            <select name="typeofdonar" id="typeofdonar" value={formData.typeofdonar} onChange={handleChange}
              className="w-[80%] p-2 border-b-2 focus:outline-none">
              <option>Select Type</option>
              <option value="normal">Normal</option>
              <option value="emergency">Emergency</option>
            </select>
          </div>

          <div className="flex gap-4 items-center justify-between p-3 bg-gray-100 rounded-lg">
            <label htmlFor="platelets" className="text-lg font-semibold text-gray-700">Willing to donate Platelets?</label>
            <select name="platelets" id="platelets" value={formData.platelets} onChange={handleChange}
              className="w-[80%] p-2 border-b-2 focus:outline-none">
              <option>Select Option</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>

          <div className="flex gap-4 items-center justify-between p-3 bg-gray-100 rounded-lg">
            <label htmlFor="socialize" className="text-lg font-semibold text-gray-700">Would you like to socialize with other donors?</label>
            <select name="socialize" id="socialize" value={formData.socialize} onChange={handleChange}
              className="w-[80%] p-2 border-b-2 focus:outline-none">
              <option>Select Option</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>

          <div className="flex gap-4 items-center p-3 bg-gray-100 rounded-lg shadow-sm hover:shadow-md transition">
            <label htmlFor="address" className="text-lg font-semibold text-gray-700">Address</label>
            <textarea name="address" placeholder="Address" className="mt-2 bg-white p-2 text-black w-full"
              rows="3" value={formData.address} onChange={handleChange}></textarea>
          </div>

          <button className="mt-4 bg-black text-white w-[20%] text-lg font-medium py-2 rounded-lg hover:bg-red-700 transition"
            onClick={postDetails}>
            Submit
          </button>
        </div>
      </div>
      <Footer1 />
    </div>
  );
};

export default Application;
