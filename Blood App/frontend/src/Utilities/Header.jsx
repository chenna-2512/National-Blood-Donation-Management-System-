import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [loggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const logoutHandle = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const loginHandle = () => {
    navigate("/login");
  };

  const gotoHome = () => {
    navigate("/");
  };

  return (
    <div className="mt-24 sm:mt-16 lg:mt-16 md:mt-24">
      <div className="flex flex-wrap items-center justify-center gap-5 p-4 font-semibold cursor-pointer">
        <h5
          className="text-center font-serif p-2 text-base sm:text-lg relative transition-all duration-500 before:content-[''] before:absolute before:left-0 before:bottom-0 before:w-0 before:h-[2px] before:bg-black before:transition-all before:duration-500 hover:before:w-full"
          onClick={gotoHome}
        >
          Home
        </h5>
        <h5
          className="text-center font-serif p-2 text-base sm:text-lg relative transition-all duration-500 before:content-[''] before:absolute before:left-0 before:bottom-0 before:w-0 before:h-[2px] before:bg-black before:transition-all before:duration-500 hover:before:w-full"
        >
          About Us
        </h5>
        <h5
          className="text-center font-serif p-2 text-base sm:text-lg relative transition-all duration-500 before:content-[''] before:absolute before:left-0 before:bottom-0 before:w-0 before:h-[2px] before:bg-black before:transition-all before:duration-500 hover:before:w-full"
        >
          Message Us
        </h5>
        {loggedIn ? (
          <h5
            className="text-center font-serif p-2 text-base sm:text-lg relative transition-all duration-500 before:content-[''] before:absolute before:left-0 before:bottom-0 before:w-0 before:h-[2px] before:bg-black before:transition-all before:duration-500 hover:before:w-full"
            onClick={logoutHandle}
          >
            Log Out
          </h5>
        ) : (
          <h5
            className="text-center font-serif p-2 text-base sm:text-lg relative transition-all duration-500 before:content-[''] before:absolute before:left-0 before:bottom-0 before:w-0 before:h-[2px] before:bg-black before:transition-all before:duration-500 hover:before:w-full"
            onClick={loginHandle}
          >
            Log In
          </h5>
        )}
      </div>
    </div>
  );
};

export default Header;
