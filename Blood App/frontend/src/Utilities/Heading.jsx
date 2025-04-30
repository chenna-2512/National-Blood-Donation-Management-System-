import { useNavigate } from "react-router-dom";

const Heading = () => {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/");
  };

  return (
    <div>
      <h3
        className="fixed top-0 left-0 w-full bg-red-700 p-4 text-white text-lg md:text-2xl text-center font-serif font-bold cursor-pointer z-50"
        onClick={goToHome}
      >
        National Blood Donation Management System
        <br className="block md:hidden" />
        <span className="hidden md:inline"> For A Self-Reliant India</span>
      </h3>
    </div>
  );
};

export default Heading;
