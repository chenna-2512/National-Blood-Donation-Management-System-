import { Heart, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer2 = () => {
  const footerLinks = {
    'Quick Links': [
      { label: 'About Us', href: '/aboutus' },
      { label: 'Blood Facts', href: '#facts' },
      { label: 'Success Stories', href: '#stories' },
      { label: 'Contact Us', href: '#contact' }
    ],
    'Donation Info': [
      { label: 'Eligibility Criteria', href: '#' },
      { label: 'Donation Process', href: '#' },
      { label: 'Find Blood Bank', href: '#' },
      { label: 'Emergency Request', href: '#' }
    ],
    'Support': [
      { label: 'Help Center', href: '#' },
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
      { label: 'Accessibility', href: '#' }
    ]
  };

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="bg-red-600 p-2 rounded-full">
                <Heart className="w-6 h-6 text-white fill-current" />
              </div>
              <span className="text-2xl font-bold">BloodConnect</span>
            </div>
            
            <p className="text-gray-300 mb-6 leading-relaxed max-w-md">
              Connecting donors with those in need. Every donation saves lives and strengthens 
              our community. Join us in making a difference, one donation at a time.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-red-400" />
                <span className="text-gray-300">+1 (555) 123-BLOOD</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-red-400" />
                <span className="text-gray-300">info@bloodconnect.org</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-red-400" />
                <span className="text-gray-300">123 Healthcare Ave, Medical District</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4 mt-6">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="bg-gray-800 hover:bg-red-600 p-3 rounded-full transition-colors duration-200 group"
                >
                  <social.icon className="w-5 h-5 text-gray-400 group-hover:text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold text-lg mb-4">{category}</h3>
              <ul className="space-y-3">
                {links.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-gray-300 hover:text-red-400 transition-colors duration-200 hover:underline"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
    </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 BloodConnect. All rights reserved. Saving lives together.
            </p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <span className="flex items-center text-sm text-gray-400">
                <Heart className="w-4 h-4 text-red-400 mr-2 fill-current" />
                Made with care for humanity
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer2;