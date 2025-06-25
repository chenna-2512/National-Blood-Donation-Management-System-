import { useNavigate } from "react-router-dom";
import Footer1 from "../Utilities/Footer1";
import Heading from "../Utilities/Heading";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const loginHandle = async () => {
    try {
      const response = await axios.post("https://national-blood-donation-management-system-y10q.onrender.com/loginuser", {
        email,
        password,
      });

      if (response.status === 201) {
        const { token, id } = response.data.LoggedUser;

        localStorage.setItem("token", token);
        localStorage.setItem("userEmail", email);
        localStorage.setItem("id", id);
        toast.success("Login Successful");
        navigate("/");
      }
    } catch (error) {
      if (error.response) {
        console.log("Login Error : ", error);
        toast.error(error.response.data.message);
      } else {
        toast.error("Network Error. Please try again.");
      }
    }
  };

  return (
  <>
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Heading />

      {/* Toast Notifications */}
      <ToastContainer />

      {/* Main Content Area */}
      <main className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-red-50 px-4 py-8">
        <div className="w-full sm:w-[80%] lg:w-[60%] bg-white shadow-lg rounded-3xl px-6 py-10 flex flex-col md:flex-row justify-between items-center border-2 border-red-200">
          {/* Left Side Text */}
          <div className="text-center md:w-1/2 px-4 mb-6 md:mb-0 space-y-4">
            <h2 className="text-2xl font-semibold text-red-600">
              Welcome back, Lifesaver ❤️
            </h2>
            <p className="text-gray-700">
              "One drop of blood can bring a lifetime of happiness to someone."
            </p>
            <p className="font-medium text-gray-800">
              Join the mission. Be a{" "}
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
              onClick={loginHandle}
            >
              Sign In
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="text-sm text-red-700 hover:underline mt-2"
            >
              New User? Sign Up
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full">
        <Footer1 />
      </footer>
    </div>
  </>
);

};

export default Login;
