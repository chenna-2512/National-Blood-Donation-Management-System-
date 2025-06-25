import { useNavigate } from "react-router-dom";
import { Heart } from 'lucide-react';

const Heading = () => {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/");
  };

  return (
    <div className="flex items-center p-3 lg:pl-40 cursor-pointer space-x-2" onClick={goToHome}>
      <div className="bg-red-600 p-2 rounded-full">
        <Heart className="lg:w-6 lg:h-6 w-4 h-4 text-white fill-current" />
      </div>
      <span className="lg:text-xl font-bold text-gray-900">BloodConnect</span>
    </div>
  );
};

export default Heading;
