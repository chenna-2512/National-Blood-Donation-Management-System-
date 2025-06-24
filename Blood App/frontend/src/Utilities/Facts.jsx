import { Clock, Heart, Users, Shield, Zap, Globe } from 'lucide-react';

const Facts = () => {
  const facts = [
    {
      icon: Clock,
      title: 'Every 2 Seconds',
      description: 'Someone in the world needs blood. Your donation could be the difference between life and death.',
      color: 'bg-red-500'
    },
    {
      icon: Heart,
      title: 'One Donation Saves 3 Lives',
      description: 'A single blood donation can be separated into components helping multiple patients.',
      color: 'bg-pink-500'
    },
    {
      icon: Users,
      title: '37% Population Can Donate',
      description: 'Only 37% of the population is eligible to donate blood, making every donor incredibly valuable.',
      color: 'bg-purple-500'
    },
    {
      icon: Shield,
      title: '100% Safe Process',
      description: 'All equipment is sterile and used only once. Donating blood is completely safe.',
      color: 'bg-blue-500'
    },
    {
      icon: Zap,
      title: 'Quick 10-Minute Process',
      description: 'The actual blood donation takes just 10 minutes of your time to save lives.',
      color: 'bg-green-500'
    },
    {
      icon: Globe,
      title: 'Global Impact',
      description: 'Blood donations help in surgeries, cancer treatment, chronic illnesses, and traumatic injuries.',
      color: 'bg-orange-500'
    }
  ];

  return (
    <section id="facts" className="py-10 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Why Your Blood
            <span className="block text-red-600">Donation Matters</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Understanding the critical importance of blood donation and how your contribution 
            creates a ripple effect of healing and hope in our communities.
          </p>
        </div>

        {/* Facts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {facts.map((fact, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
            >
              {/* Icon */}
              <div className={`${fact.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <fact.icon className="w-8 h-8 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-red-600 transition-colors duration-200">
                {fact.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed">
                {fact.description}
              </p>

              {/* Hover indicator */}
              <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-12 h-1 bg-gradient-to-r from-red-500 to-red-600 rounded-full"></div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
            <button className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
              Learn More Facts
            </button>
          </div>
      </div>
    </section>
  );
};

export default Facts;