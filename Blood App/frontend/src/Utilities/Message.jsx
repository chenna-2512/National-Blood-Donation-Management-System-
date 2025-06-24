import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import img1 from "../assets/Chenna Keshava.png";
import img2 from "../assets/Ramu.jpg";
import img3 from "../assets/Ajay.png";
import img4 from "../assets/Bharath.png";
import img5 from "../assets/Raj.png";

const Message = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const bloodDonors = [
    {
      id: 1,
      name: "Chenna Keshava",
      age: "22",
      profession: "Student",
      image: img1,
      title: "DEDICATED TO LEARNING, GROWING, AND SHAPING THE WORLD THROUGH TECHNOLOGY.",
      description: "A Person Studying Bachelor of Technology.",
      donations: 5,
    },
    {
      id: 2,
      name: "Ramu",
      age: "24",
      profession: "Student",
      image: img2,
      title: "BLOOD IS ESSENTIAL FOR EVERY PERSON, DONATE BLOOD AND SAVE LIFE",
      description: "Completed Graduation and a Job Holder.",
      donations: 8,
    },
    {
      id: 3,
      name: "Ajay",
      age: "21",
      profession: "Student",
      image: img3,
      title: "STUDENTS CAN BE LIFESAVERS TOO",
      description: "Believes in the power of youth to create change through donation.",
      donations: 4,
    },
    {
      id: 4,
      name: "Bharath",
      age: "21",
      profession: "Trainee",
      image: img4,
      title: "TRAINING TO HELP, TRAINING TO GIVE",
      description: "Passionate about learning and giving back to the community.",
      donations: 3,
    },
    {
      id: 5,
      name: "Raj Kishore",
      age: "20",
      profession: "Job Holder",
      image: img5,
      title: "WORKING HARD, GIVING BACK",
      description: "Balancing work and social responsibility through donation.",
      donations: 6,
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % bloodDonors.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + bloodDonors.length) % bloodDonors.length);
  };

  return (
    <section id="stories" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Message from the
            <span className="block text-red-600">Donors</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Real words from real people. These stories prove how powerful one donation can be.
          </p>
        </div>

        {/* Testimonial Card */}
        <div className="relative max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-gray-50 to-red-50 rounded-3xl p-8 md:p-12 shadow-xl">
            {/* Quote Icon */}
            <div className="absolute top-6 left-6 bg-red-500 p-3 rounded-full">
              <Quote className="w-6 h-6 text-white" />
            </div>

            {/* Donor Content */}
            <div className="text-center pt-8">
              {/* Image */}
              <div className="relative w-24 h-24 mx-auto mb-6">
                <img
                  src={bloodDonors[currentSlide].image}
                  alt={bloodDonors[currentSlide].name}
                  className="w-full h-full rounded-full object-cover border-4 border-white shadow-lg"
                />
                <div className="absolute -bottom-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                  {bloodDonors[currentSlide].donations}+ Donations
                </div>
              </div>

              {/* Stars */}
              <div className="flex justify-center space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-xl md:text-2xl text-gray-700 font-medium leading-relaxed mb-6 max-w-3xl mx-auto">
                “{bloodDonors[currentSlide].title}”
              </blockquote>

              {/* Info */}
              <h4 className="text-xl font-bold text-gray-900">
                {bloodDonors[currentSlide].name} ({bloodDonors[currentSlide].age})
              </h4>
              <p className="text-red-600 font-medium">{bloodDonors[currentSlide].profession}</p>
              <p className="text-gray-600 mt-2 font-semibold">{bloodDonors[currentSlide].description}</p>
            </div>
          </div>

          {/* Controls */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white hover:bg-gray-50 p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white hover:bg-gray-50 p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>

          {/* Dots */}
          <div className="flex justify-center space-x-2 mt-8">
            {bloodDonors.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                  index === currentSlide ? 'bg-red-500' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Message;
