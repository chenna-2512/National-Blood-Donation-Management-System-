import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import img1 from "../assets/Chenna Keshava.png";
import img2 from "../assets/Ramu.jpg";
import img3 from "../assets/Ajay.png";
import img4 from "../assets/Bharath.png";
import img5 from "../assets/Raj.png";

const bloodDonors = [
  {
    id: 1,
    name: "Chenna Keshava",
    age: "22",
    profession: "Student",
    description: "A Person Studying Bachelor of technology.",
    image: img1,
    title: "DEDICATED TO LEARNING, GROWING, AND SHAPING THE WORLD THROUGH TECHNOLOGY.",
  },
  {
    id: 2,
    name: "Ramu",
    age: "24",
    profession: "Student",
    description: "Completed Graduation and a Job Holder.",
    image: img2,
    title: "BLOOD IS ESSENTIAL FOR EVERY PERSON, DONATE BLOOD AND SAVE LIFE",
  },
  {
    id: 3,
    name: "Ajay",
    age: "21",
    profession: "Student",
    description: "Believes in the power of youth to create change through donation.",
    image: img3,
    title: "STUDENTS CAN BE LIFESAVERS TOO",
  },
  {
    id: 4,
    name: "Bharath",
    age: "21",
    profession: "Trainee",
    description: "Passionate about learning and giving back to the community.",
    image: img4,
    title: "TRAINING TO HELP, TRAINING TO GIVE",
  },
  {
    id: 5,
    name: "Raj Kishore",
    age: "20",
    profession: "Job Holder",
    description: "Balancing work and social responsibility through donation.",
    image: img5,
    title: "WORKING HARD, GIVING BACK",
  },
];

const Message = () => {
  return (
    <div className="p-4 bg-black text-white">
      <h1 className="text-center font-semibold font-sans text-xl p-4 text-white">
        Message from the <span className="font-bold text-2xl text-red-600">DONORS</span>
      </h1>
      <Swiper
        spaceBetween={10}
        navigation
        modules={[Navigation]}
        loop
        breakpoints={{
          0: {
            slidesPerView: 1, // ✅ 1 slide for mobile
          },
          768: {
            slidesPerView: 2, // ✅ 2 slides for tablet and up
          },
        }}
        className="mySwiper"
      >
        {bloodDonors.map((donor) => (
          <SwiperSlide key={donor.id} className="text-center">
            <img
              src={donor.image}
              alt={donor.name}
              className="w-24 h-24 mx-auto rounded-full border-4 border-white"
            />
            <h3 className="font-bold text-lg mt-3 font-sans">{donor.title}</h3>
            <p className="mt-2 font-sans font-semibold">{donor.description}</p>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Message;
