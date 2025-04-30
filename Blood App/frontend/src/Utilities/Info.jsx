import { useNavigate } from "react-router-dom";
import img from "../assets/BloodBackground.jpg";

const Info = () => {
  const navigate = useNavigate();

  const gotoLoginPage = () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/donor");
      return;
    }
    navigate("/login");
  };

  const gotoRequestor = () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/requestor");
      return;
    }
    navigate("/login");
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Image */}
      <img 
        src={img} 
        alt="Background" 
        className="absolute top-0 left-0 w-full h-full object-cover" 
      />

      {/* Left Centered Content */}
      <div className="absolute top-1/2 left-8 md:left-16 transform -translate-y-1/2 text-left p-4">
        <p className="text-red-700 text-2xl md:text-4xl font-bold font-sans mb-4">
          Be Someone’s Lifesaver - Donate Blood Today!
        </p>
        <hr className="h-1 w-1/2 bg-red-700 border-none mb-6" />

        <p className="text-black text-md md:text-xl font-semibold font-serif mb-4">
          Your one donation can save up to three lives.<br />
          Join us in making a difference today!
        </p>

        <p className="text-black text-md md:text-xl font-semibold font-serif mb-6">
          Click below to <span className="text-red-700">Donate Blood</span> or <span className="text-red-700">Request Blood</span>
        </p>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row gap-4">
          <button
            className="bg-black p-2 px-6 rounded-lg hover:bg-red-600 transition-all text-white"
            onClick={gotoLoginPage}
          >
            Donate Blood
          </button>
          <button
            className="bg-black p-2 px-6 rounded-lg hover:bg-red-600 transition-all text-white"
            onClick={gotoRequestor}
          >
            Request Blood
          </button>
        </div>
      </div>
    </div>
  );
};

export default Info;
