import { 
  Heart, 
  Users, 
  Phone, 
  Clock, 
  Shield, 
  Droplets, 
  Target,
  Zap,
  TrendingUp,
  Gift,
} from 'lucide-react';
import Footer1 from './Footer1';
import Main from './Heading';
import { useNavigate } from 'react-router-dom';

const Readmore = () => {

    const navigate = useNavigate();
  
    // Blood Compatibility Data
  const bloodCompatibility = [
    { group: 'O-', canDonateTo: 'All groups', canReceiveFrom: 'O-', color: 'bg-red-500' },
    { group: 'O+', canDonateTo: 'O+, A+, B+, AB+', canReceiveFrom: 'O+, O-', color: 'bg-red-400' },
    { group: 'A-', canDonateTo: 'A+, A-, AB+, AB-', canReceiveFrom: 'A-, O-', color: 'bg-blue-500' },
    { group: 'A+', canDonateTo: 'A+, AB+', canReceiveFrom: 'A+, A-, O+, O-', color: 'bg-blue-400' },
    { group: 'B-', canDonateTo: 'B+, B-, AB+, AB-', canReceiveFrom: 'B-, O-', color: 'bg-green-500' },
    { group: 'B+', canDonateTo: 'B+, AB+', canReceiveFrom: 'B+, B-, O+, O-', color: 'bg-green-400' },
    { group: 'AB-', canDonateTo: 'AB+, AB-', canReceiveFrom: 'AB-, A-, B-, O-', color: 'bg-purple-500' },
    { group: 'AB+', canDonateTo: 'AB+ only', canReceiveFrom: 'All groups', color: 'bg-purple-400' }
  ];

  const gotohome = () => {
    navigate("/");
  }

  return (
    <>
        <Main/>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-red-50 mb-8">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-br from-red-600 via-red-700 to-red-800 text-white overflow-hidden">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="absolute inset-0">
            <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-24 h-24 bg-white/5 rounded-full animate-bounce"></div>
            <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-white/10 rounded-full animate-pulse delay-300"></div>
            </div>
            
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center">
                <div className="inline-flex items-center bg-white/20 backdrop-blur-md px-6 py-3 rounded-full mb-8">
                <Heart className="w-5 h-5 mr-2 fill-current animate-pulse" />
                <span className="font-semibold">24/7 Emergency Blood Network</span>
                </div>
                
                <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
                Why Blood Donation
                <span className="block text-red-200">Matters Most</span>
                </h1>
                
                <p className="text-xl lg:text-2xl text-red-100 max-w-3xl mx-auto mb-8 leading-relaxed">
                Understanding the life-saving impact of blood donation and how your contribution 
                creates a ripple effect of healing and hope in our communities.
                </p>

                
            </div>
            </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            
            {/* Why Blood Donation Matters Section */}
            <div className="mb-20">
            <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                The Life-Saving Impact of Your Donation
                </h2>
                <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Blood donation is a life-saving act that supports emergency care, surgeries, cancer treatment, and more. 
                With no artificial substitute for blood, donor support is absolutely essential for saving lives.
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center group hover:shadow-xl transition-all duration-300">
                <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-red-500 transition-colors duration-300">
                    <Droplets className="w-8 h-8 text-red-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">One Donation = Multiple Lives</h3>
                <p className="text-gray-600">
                    One unit of blood can be separated into components—red cells, plasma, and platelets—to treat different conditions. 
                    This makes each donation incredibly impactful.
                </p>
                </div>

                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center group hover:shadow-xl transition-all duration-300">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-green-500 transition-colors duration-300">
                    <Heart className="w-8 h-8 text-green-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Health Benefits for Donors</h3>
                <p className="text-gray-600">
                    Donating blood helps reduce iron overload, improves heart health, and gives you a sense of purpose 
                    knowing you&apos;ve helped save lives.
                </p>
                </div>

                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center group hover:shadow-xl transition-all duration-300">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-500 transition-colors duration-300">
                    <Shield className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">100% Safe Process</h3>
                <p className="text-gray-600">
                    All equipment is sterile and used only once. The donation process is completely safe, 
                    with trained medical professionals overseeing every step.
                </p>
                </div>
            </div>
            </div>

            {/* Blood Group Compatibility Section */}
            <div className="mb-20">
            <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                🩸 Blood Group Compatibility Guide
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Understanding blood group compatibility is crucial for safe transfusions. 
                Here&apos;s a comprehensive guide to who can donate to whom.
                </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {bloodCompatibility.map((blood, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                    <div className={`${blood.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <span className="text-white font-bold text-xl">{blood.group}</span>
                    </div>
                    
                    <div className="space-y-4">
                    <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Can Donate To:</h4>
                        <p className="text-sm text-gray-600 bg-green-50 p-2 rounded-lg">{blood.canDonateTo}</p>
                    </div>
                    
                    <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Can Receive From:</h4>
                        <p className="text-sm text-gray-600 bg-blue-50 p-2 rounded-lg">{blood.canReceiveFrom}</p>
                    </div>
                    </div>
                </div>
                ))}
            </div>

            {/* Special Blood Types Highlight */}
            <div className="grid md:grid-cols-2 gap-8 mt-12">
                <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">🌟 Universal Donor: O-</h3>
                <p className="text-red-100 mb-4">
                    O- blood type is known as the &quot;universal donor&quot; because it can be given to patients of any blood type. 
                    O- donors are especially valuable in emergency situations.
                </p>
                <div className="bg-white/20 p-4 rounded-xl">
                    <p className="text-sm font-semibold">Only 6.6% of the population has O- blood type!</p>
                </div>
                </div>

                <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">🎯 Universal Recipient: AB+</h3>
                <p className="text-purple-100 mb-4">
                    AB+ blood type is known as the &quot;universal recipient&quot; because these patients can receive red blood cells 
                    from any blood type. However, AB+ plasma is universal for plasma transfusions.
                </p>
                <div className="bg-white/20 p-4 rounded-xl">
                    <p className="text-sm font-semibold">Only 3.4% of the population has AB+ blood type!</p>
                </div>
                </div>
            </div>
            </div>

            {/* Critical Facts Section */}
            <div className="mb-20">
            <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Critical Facts About Blood Donation
                </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center group hover:shadow-xl transition-all duration-300">
                <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-red-500 transition-colors duration-300">
                    <Clock className="w-8 h-8 text-red-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Every 2 Seconds</h3>
                <p className="text-gray-600">
                    Someone in the world needs blood. Your donation could be the difference between life and death.
                </p>
                </div>

                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center group hover:shadow-xl transition-all duration-300">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-green-500 transition-colors duration-300">
                    <Users className="w-8 h-8 text-green-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Only 37% Can Donate</h3>
                <p className="text-gray-600">
                    Only 37% of the population is eligible to donate blood, making every donor incredibly valuable.
                </p>
                </div>

                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center group hover:shadow-xl transition-all duration-300">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-500 transition-colors duration-300">
                    <Zap className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">10-Minute Process</h3>
                <p className="text-gray-600">
                    The actual blood donation takes just 10 minutes of your time to potentially save three lives.
                </p>
                </div>

                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center group hover:shadow-xl transition-all duration-300">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-purple-500 transition-colors duration-300">
                    <Target className="w-8 h-8 text-purple-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">56-Day Recovery</h3>
                <p className="text-gray-600">
                    Your body completely replenishes donated red blood cells within 56 days, making regular donation safe.
                </p>
                </div>

                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center group hover:shadow-xl transition-all duration-300">
                <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-orange-500 transition-colors duration-300">
                    <Gift className="w-8 h-8 text-orange-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Free Health Screening</h3>
                <p className="text-gray-600">
                    Every donation includes a free mini-physical and blood screening for infectious diseases.
                </p>
                </div>

                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center group hover:shadow-xl transition-all duration-300">
                <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-yellow-500 transition-colors duration-300">
                    <TrendingUp className="w-8 h-8 text-yellow-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Reduces Heart Disease</h3>
                <p className="text-gray-600">
                    Regular blood donation can reduce the risk of heart disease by maintaining healthy iron levels.
                </p>
                </div>
            </div>
            </div>

            {/* Emergency CTA Section */}
            <div className="bg-gradient-to-r from-red-500 to-red-700 rounded-3xl p-12 text-white text-center">
            <div className="max-w-4xl mx-auto">
                <h3 className="text-4xl font-bold mb-6">🚨 Ready to Save Lives?</h3>
                <p className="text-xl text-red-100 mb-8 leading-relaxed">
                Every donation matters. Every donor is a hero. Join our community of lifesavers 
                and make a difference that will ripple through generations.
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button className="bg-white text-red-600 hover:bg-gray-100 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-200 transform hover:scale-105 flex items-center justify-center" onClick={gotohome}>
                    <Heart className="w-5 h-5 mr-2 fill-current" />
                    Become a Donor Today
                </button>
                <button className="border-2 border-white text-white hover:bg-white hover:text-red-600 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-200 flex items-center justify-center">
                    <Phone className="w-5 h-5 mr-2" />
                    Emergency Hotline: +1 (555) 123-BLOOD
                </button>
                </div>
            </div>
            </div>

            
        </div>

            <Footer1/>
        </div>
    </>
  );
};

export default Readmore;