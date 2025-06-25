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
        socialize : "No",
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
      <h1 className="text-2xl font-serif font-bold text-center p-4 underline decoration-2 underline-offset-4 text-red-700">
        Application Form for Blood & Platelets Donation
      </h1>

      <div className="bg-white shadow-2xl mb-10 p-8 rounded-2xl w-[90%] max-w-2xl mx-auto border border-gray-300 mt-2 mb-18">
        <div className="flex flex-col gap-6">
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
            <div key={name} className="flex flex-col gap-2">
              <label htmlFor={name} className="text-base font-medium text-gray-800">{label}</label>
              <input
                type={type}
                id={name}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                className="bg-gray-100 rounded-md px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400 transition"
              />
            </div>
          ))}

          <div className="flex flex-col gap-2">
            <label htmlFor="gender" className="text-base font-medium text-gray-800">Gender</label>
            <select
              name="gender"
              id="gender"
              value={formData.gender}
              onChange={handleChange}
              className="bg-gray-100 rounded-md px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400"
            >
              <option>Select Your Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="trans">Transgender</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="bloodgroup" className="text-base font-medium text-gray-800">Blood Group</label>
            <select
              name="bloodgroup"
              id="bloodgroup"
              value={formData.bloodgroup}
              onChange={handleChange}
              className="bg-gray-100 rounded-md px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400"
            >
              <option>Select Your Blood Group</option>
              {bloodGroups.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          </div>

          {[
            { label: "Type of Donor", name: "typeofdonar", options: ["normal", "emergency"] },
            { label: "Willing to donate Platelets?", name: "platelets", options: ["yes", "no"] },
            // { label: "Would you like to socialize with other donors?", name: "socialize", options: ["yes", "no"] }
          ].map(({ label, name, options }) => (
            <div key={name} className="flex flex-col gap-2">
              <label htmlFor={name} className="text-base font-medium text-gray-800">{label}</label>
              <select
                name={name}
                id={name}
                value={formData[name]}
                onChange={handleChange}
                className="bg-gray-100 rounded-md px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400"
              >
                <option>Select Option</option>
                {options.map((opt) => (
                  <option key={opt} value={opt}>{opt.charAt(0).toUpperCase() + opt.slice(1)}</option>
                ))}
              </select>
            </div>
          ))}

          <div className="flex flex-col gap-2">
            <label htmlFor="address" className="text-base font-medium text-gray-800">Address</label>
            <textarea
              name="address"
              id="address"
              rows="3"
              placeholder="Enter your address"
              value={formData.address}
              onChange={handleChange}
              className="bg-gray-100 rounded-md px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400 resize-none"
            />
          </div>

          <button
            className="self-center mt-6 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-8 rounded-full transition duration-300"
            onClick={postDetails}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Application;
