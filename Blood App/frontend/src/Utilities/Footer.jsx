// import React from 'react'

const Footer = () => {
  return (
    <div className="flex flex-col sm:flex-row items-center bg-red-700 p-4">
      {/* Left section */}
      <div className="w-full sm:w-[50%]">
        <p className="text-white font-semibold font-serif text-lg text-center sm:text-left">
          National Blood Donation Management <br /> System for a Self-Reliant India
        </p>
        <hr className="mt-2 ml-3 h-1 bg-white border-none w-[20%] mx-auto sm:mx-0" />
        <p className="mt-2 font-semibold font-serif text-lg text-white text-center sm:text-left">
          To Message Us, <br /> Fill the details and Click on Send Button
        </p>
      </div>

      {/* Right section */}
      <div className="bg-black text-white font-serif w-full sm:w-[50%] p-4 rounded-lg mt-4 sm:mt-0">
        <p className="text-lg text-center sm:text-left">Please feel free to text us</p>
        <input
          type="text"
          placeholder="Enter Your Name"
          className="mt-2 bg-white p-2 text-black w-full"
        />
        <input
          type="text"
          placeholder="Enter Your Email"
          className="mt-2 bg-white p-2 text-black w-full"
        />
        <textarea
          placeholder="Message"
          className="mt-2 bg-white p-2 text-black w-full"
          rows="3"
        ></textarea>
        <center>
          <button className="mt-2 cursor-pointer text-black bg-white p-2 rounded-lg hover:bg-red-700 hover:text-white">
            Send Message
          </button>
        </center>
      </div>
    </div>
  );
};

export default Footer;
