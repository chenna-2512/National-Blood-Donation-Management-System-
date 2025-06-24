import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Users, Heart, Clock } from 'lucide-react';

const Info = () => {
  const navigate = useNavigate();

  const gotoLoginPage = () => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/donor');
    } else {
      navigate('/login');
    }
  };

  const gotoRequestor = () => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/requestor');
    } else {
      navigate('/login');
    }
  };

  const stats = [
    { icon: Users, value: '10,000+', label: 'Lives Saved' },
    { icon: Heart, value: '25,000+', label: 'Donors Registered' },
    { icon: Clock, value: '24/7', label: 'Emergency Response' },
  ];

  return (
    <section id="home" className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-red-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen py-16">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center bg-red-100 text-red-800 px-4 py-2 rounded-full text-sm font-medium">
                <Heart className="w-4 h-4 mr-2 fill-current" />
                Be Someone's Hero Today
              </div>

              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Be Someone's
                <span className="block text-red-600">Lifesaver</span>
                <span className="block text-gray-900">Today</span>
              </h1>

              <p className="text-xl text-gray-600 max-w-lg leading-relaxed">
                Every donation can save up to 3 lives. Join our community of heroes 
                making a difference in emergency situations across the country.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={gotoLoginPage}
                className="group bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-red-200 flex items-center justify-center"
              >
                Start Donating
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
              </button>

              <button
                onClick={gotoRequestor}
                className="border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300"
              >
                Start Requesting
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="bg-red-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                    <stat.icon className="w-6 h-6 text-red-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Visual Hero */}
          <div className="relative">
            <div className="bg-gradient-to-br from-red-500 to-red-700 rounded-3xl p-8 shadow-2xl transform rotate-3 hover:rotate-1 transition-transform duration-500">
              <div className="bg-white rounded-2xl p-8 transform -rotate-3">
                <div className="text-center space-y-6">
                  <div className="bg-red-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto">
                    <Heart className="w-12 h-12 text-red-600 fill-current" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Your Blood Can Save Lives</h3>
                  <p className="text-gray-600">
                    Join thousands of donors who have already made a difference. 
                    Your single donation can help multiple patients in need.
                  </p>
                  <div className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-full inline-block font-semibold">
                    1 Donation = 3 Lives Saved
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Animations */}
            <div className="absolute -top-4 -right-4 bg-white p-4 rounded-full shadow-lg animate-bounce">
              <Heart className="w-8 h-8 text-red-500 fill-current" />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-red-500 p-4 rounded-full shadow-lg animate-pulse">
              <Users className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Info;
