import { useNavigate } from "react-router-dom";
import login from "../assets/loginlogo.png";
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
    <div>
      <Heading />
      <ToastContainer />
      <div className="flex mt-24 mb-30 items-center justify-center border-2 border-gray-400 p-6 rounded-lg w-[90%] sm:w-[60%] mx-auto flex-col sm:flex-row">
        <div className="text-center text-lg font-semibold font-serif flex flex-col justify-center w-[100%] sm:w-[40%]">
          <img src={login} alt="" className="w-[50%] mx-auto" />
          <h1 className="mt-2">Thanks for Choosing Us ..!</h1>
          <p className="mt-1">
            We are happy to Welcome You ..! <br />
            Please Login to become a <span className="text-red-700 font-bold">DONOR</span>
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
            onClick={loginHandle}
          >
            Sign In
          </button>
          <button
            className="mt-4 p-2 border-b-3 font-semibold cursor-pointer text-black w-[50%] sm:w-[50%]"
            onClick={() => navigate("/signup")}
          >
            New User? Sign Up
          </button>
        </div>
      </div>
      <Footer1 />
    </div>
  );
};

export default Login;
