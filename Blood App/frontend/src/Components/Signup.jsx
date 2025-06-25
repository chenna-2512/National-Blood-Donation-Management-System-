import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
import Footer1 from "../Utilities/Footer1";
import Heading from "../Utilities/Heading";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");

  const navigate = useNavigate();

  const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const handleOtp = async () => {
  if (!email.trim() || !password.trim()) {
    toast.error("Please enter your email and password!");
    return;
  }

  const newOtp = generateOtp();
  setGeneratedOtp(newOtp);

  const templateParams = {
    to_email: email,
    otp: newOtp
  };

  try {
    const result = await emailjs.send(
      "service_tth3vuk",       // ✅ your EmailJS service ID
      "template_rilhxya",      // ✅ your EmailJS template ID
      templateParams,
      "KHeqyA1SqaXHSe7vT"      // ✅ your EmailJS PUBLIC KEY only
    );
    console.log("Email sent: ", result.text);
    setShowOtp(true);
    toast.success("OTP sent successfully!");
  } catch (err) {
    console.error("Failed to send OTP:", err);
    toast.error("Failed to send OTP. Try again.");
  }
};
  const otpHandle = async () => {
    if (otp === generatedOtp) {
      toast.success("OTP verified successfully! Now go to Login");

      const userDetails = {
        email: email,
        password: password,
      };

      try {
        const response = await fetch("https://national-blood-donation-management-system-y10q.onrender.com/postuser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userDetails),
        });

        const userData = await response.json();
        console.log("Response from server: ", userData);

        navigate("/login");
        if (userData.message.includes("User Registered Successfully")) {
          toast.error(userData.message);
        }
      } catch (error) {
        console.log("Error Updating Details: ", error);
      }
    } else {
      toast.error("Invalid OTP! Please try again.");
    }
  };

  return (
  <div className="flex flex-col min-h-screen">
    {/* Header */}
    <Heading />
    <ToastContainer />

    {/* Main Content */}
    <main className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-red-50 px-4 py-8">
      <div className="w-full sm:w-[80%] lg:w-[60%] bg-white shadow-lg rounded-3xl px-6 py-10 flex flex-col md:flex-row justify-between items-center border-2 border-red-200">
        
        {/* Left Side Quote */}
        <div className="text-center md:w-1/2 px-4 mb-6 md:mb-0 space-y-4">
          <h2 className="text-2xl font-semibold text-red-600">
            Thanks for Choosing Us ❤️
          </h2>
          <p className="text-gray-700">
            Oh..! You Are New Here
          </p>
          <p className="font-medium text-gray-800">
            Please Sign Up to become a{" "}
            <span className="text-red-700 font-bold">DONOR</span>
          </p>
        </div>

        {/* Right Side Form */}
        <div className="md:w-1/2 w-full flex flex-col items-center space-y-4">
          <input
            type="email"
            placeholder="Enter Your Email"
            className="w-[90%] p-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter Your Password"
            className="w-[90%] p-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="w-[90%] bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-xl transition-all duration-300"
            onClick={handleOtp}
          >
            Get OTP
          </button>
          <button
            className="text-sm text-red-700 hover:underline"
            onClick={() => navigate("/login")}
          >
            Existing User? Login
          </button>

          {showOtp ? (
            <div className="w-full flex flex-col items-center space-y-3 mt-4">
              <input
                type="text"
                placeholder="Enter Your OTP"
                className="w-[90%] p-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
                onChange={(e) => setOtp(e.target.value)}
              />
              <button
                className="w-[90%] bg-black hover:bg-red-700 text-white text-sm py-2 rounded-xl transition-all duration-300"
                onClick={otpHandle}
              >
                Validate OTP
              </button>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </main>

    {/* Footer */}
    <footer className="w-full">
      <Footer1 />
    </footer>
  </div>
);
};

export default SignUp;
