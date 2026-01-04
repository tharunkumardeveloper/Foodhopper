import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div>
            <Link to="/" className="text-3xl font-bold text-orange-400 mb-4 block">
              FoodHopper
            </Link>
            <p className="text-gray-400 mb-6">
              Your one-stop destination to discover and book at top restaurants across your city. 
              Experience the best dining moments with us.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          {/* For Users */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">For Users</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/search" className="text-gray-400 hover:text-orange-400 transition-colors">
                  Find Restaurants
                </Link>
              </li>
              <li>
                <Link to="/dining-types" className="text-gray-400 hover:text-orange-400 transition-colors">
                  Explore Dining Types
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-gray-400 hover:text-orange-400 transition-colors">
                  My Dashboard
                </Link>
              </li>
              <li>
                <Link to="/help" className="text-gray-400 hover:text-orange-400 transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/city/Chennai" className="text-gray-400 hover:text-orange-400 transition-colors">
                  Restaurants in Chennai
                </Link>
              </li>
            </ul>
          </div>
          
          {/* For Restaurants */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">For Restaurants</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/owner-login" className="text-gray-400 hover:text-orange-400 transition-colors">
                  Partner with Us
                </Link>
              </li>
              <li>
                <Link to="/owner-login" className="text-gray-400 hover:text-orange-400 transition-colors">
                  Restaurant Dashboard
                </Link>
              </li>
              <li>
                <Link to="/help" className="text-gray-400 hover:text-orange-400 transition-colors">
                  Marketing Solutions
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-orange-400 transition-colors">
                  Support
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 text-orange-400 mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-400">
                  123 Food Street, Restaurant District<br />
                  Chennai, Tamil Nadu 600001
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 text-orange-400 mr-3 flex-shrink-0" />
                <a href="tel:+919876543210" className="text-gray-400 hover:text-orange-400 transition-colors">
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 text-orange-400 mr-3 flex-shrink-0" />
                <a href="mailto:support@foodhopper.com" className="text-gray-400 hover:text-orange-400 transition-colors">
                  support@foodhopper.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 FoodHopper. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <Link to="/help" className="text-gray-400 hover:text-orange-400 transition-colors">
                Terms of Service
              </Link>
              <Link to="/help" className="text-gray-400 hover:text-orange-400 transition-colors">
                Privacy Policy
              </Link>
              <Link to="/help" className="text-gray-400 hover:text-orange-400 transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
