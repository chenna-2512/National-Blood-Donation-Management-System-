import { useNavigate } from "react-router-dom";
import login from "../assets/loginlogo.png";
import emailjs from "emailjs-com";
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

    try {
      await emailjs.send(
        "service_tth3vuk",
        "template_rilhxya",
        { to_email: email, otp: newOtp },
        "KHeqyA1SqaXHSe7vT"
      );
      setShowOtp(true);
      toast.success("OTP sent successfully!");
    } catch (error) {
      console.error("Failed to send OTP:", error);
      toast.error("Failed to send OTP. Please try again.");
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
    <div>
      <Heading />
      <ToastContainer />
      <div className="flex mt-24 mb-48 items-center justify-center border-2 border-gray-400 p-6 rounded-lg w-[90%] sm:w-[60%] mx-auto flex-col sm:flex-row">
        <div className="text-center text-lg font-semibold font-serif flex flex-col justify-center w-[100%] sm:w-[40%]">
          <img src={login} alt="Login" className="w-[50%] mx-auto" />
          <h1 className="mt-2">Thanks for Not Choosing Us ..!</h1>
          <p className="mt-1">
            Oh..! You Are New Here
            <br />
            Please Sign Up to become a{" "}
            <span className="text-red-700 font-bold">DONOR</span>
          </p>
        </div>
        <div className="w-[100%] sm:w-[40%] flex flex-col justify-center items-center sm:items-start">
          <input
            type="email"
            placeholder="Enter Your Email"
            className="w-[80%] sm:w-[80%] p-2 border-2 border-gray-400 rounded-lg"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter Your Password"
            className="w-[80%] sm:w-[80%] p-2 border-2 border-gray-400 rounded-lg mt-2"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="mt-4 bg-black p-2 text-white rounded-lg hover:bg-red-700 w-[50%] sm:w-[50%] cursor-pointer"
            onClick={handleOtp}
          >
            Get OTP
          </button>
          <button
            className="mt-2 p-2 border-b-3 font-semibold cursor-pointer text-black w-[50%] sm:w-[50%]"
            onClick={() => navigate("/login")}
          >
            Existing User? Login
          </button>

          {showOtp ? (
            <div className="flex flex-col items-center">
              <input
                type="text"
                placeholder="Enter Your OTP"
                className="w-full sm:w-[80%] p-2 border-2 border-gray-400 rounded-lg mt-4"
                onChange={(e) => setOtp(e.target.value)}
              />
              <button
                className="mt-2 bg-black p-2 text-white rounded-lg hover:bg-red-700 w-[80%] sm:w-[50%] cursor-pointer"
                onClick={otpHandle}
              >
                Validate OTP
              </button>
            </div>
          ) : (
            <h1 className="mt-4 text-gray-500">OTP not sent yet</h1>
          )}
        </div>
      </div>
      <Footer1 />
    </div>
  );
};

export default SignUp;
