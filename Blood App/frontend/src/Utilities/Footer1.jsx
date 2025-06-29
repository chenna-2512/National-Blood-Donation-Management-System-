import { Heart } from 'lucide-react';

const Footer1 = () => {
  return (
    <footer className="fixed bottom-0 left-0 w-full z-50 bg-gray-900 text-white">
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-xs">
              © 2024 BloodConnect. All rights reserved. Saving lives together.
            </p>
            <div className="flex items-center space-x-4 mt-3 md:mt-0">
              <span className="flex items-center text-xs text-gray-400">
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

export default Footer1;
