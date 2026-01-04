
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold text-orange-400 mb-4">FoodHopper</h3>
            <p className="text-gray-300 mb-4">
              Your one-stop destination to discover and book at top restaurants across your city.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-orange-400 transition-colors">Facebook</a>
              <a href="#" className="text-gray-300 hover:text-orange-400 transition-colors">Twitter</a>
              <a href="#" className="text-gray-300 hover:text-orange-400 transition-colors">Instagram</a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">For Users</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-orange-400 transition-colors">How to Book</a></li>
              <li><a href="#" className="text-gray-300 hover:text-orange-400 transition-colors">My Account</a></li>
              <li><a href="#" className="text-gray-300 hover:text-orange-400 transition-colors">Help Center</a></li>
              <li><a href="#" className="text-gray-300 hover:text-orange-400 transition-colors">Safety Guidelines</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">For Restaurants</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-orange-400 transition-colors">Partner with Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-orange-400 transition-colors">Restaurant Dashboard</a></li>
              <li><a href="#" className="text-gray-300 hover:text-orange-400 transition-colors">Marketing Solutions</a></li>
              <li><a href="#" className="text-gray-300 hover:text-orange-400 transition-colors">Support</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-orange-400 transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-orange-400 transition-colors">Careers</a></li>
              <li><a href="#" className="text-gray-300 hover:text-orange-400 transition-colors">Press</a></li>
              <li><a href="#" className="text-gray-300 hover:text-orange-400 transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-300">© 2024 FoodHopper. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
