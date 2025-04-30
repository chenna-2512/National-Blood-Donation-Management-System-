import { useNavigate } from "react-router-dom";
import img from "../assets/Logo.jpg";

const Facts = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-8 p-6">
      {/* Left Section: Text Content */}
      <div className="w-full md:w-1/2">
        <h1 className="text-center font-semibold text-2xl md:text-3xl mb-6">
          Facts About Blood Donation
        </h1>
        <ul className="font-serif list-disc list-inside text-lg md:text-xl space-y-4">
          <li>Every year, our nation requires about 5 crore units of blood, but only 2.5 crore units are available.</li>
          <li>Blood is life—there is no substitute for it.</li>
          <li>Every two seconds, someone needs blood.</li>
          <li>Over 38,000 blood donations are needed daily.</li>
          <li>A car accident victim may need up to 100 units of blood.</li>
          <li>One blood donation can save up to three lives.</li>
          <li>Blood cannot be manufactured; it can only be given by donors.</li>
          <li>Regular blood donation helps improve heart health and reduces harmful iron levels.</li>
          <li>Donating blood burns about 650 calories per donation.</li>
          <li>Type O negative blood is the universal donor, while AB positive is the universal recipient.</li>
        </ul>

        {/* Button */}
        <div className="flex justify-end mt-6">
          <button
            className="p-2 px-6 bg-black text-white rounded-lg hover:bg-red-700 transition-all"
            onClick={() => navigate("/readmore")}
          >
            Read More
          </button>
        </div>
      </div>

      {/* Right Section: Image */}
      <div className="w-full md:w-1/2 flex justify-center">
        <img src={img} alt="Facts" className="w-full h-auto max-w-md object-contain" />
      </div>
    </div>
  );
};

export default Facts;
