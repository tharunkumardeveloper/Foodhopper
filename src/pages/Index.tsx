
import Navigation from "../components/Navigation";
import Hero from "../components/Hero";
import FeaturedCities from "../components/FeaturedCities";
import TrendingRestaurants from "../components/TrendingRestaurants";
import Categories from "../components/Categories";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="pt-16">
        <Hero />
        <FeaturedCities />
        <TrendingRestaurants />
        <Categories />
        <Testimonials />
        
        {/* Call to Action Section */}
        <section className="py-20 bg-gradient-to-r from-orange-500 to-red-500">
          <div className="container mx-auto px-4 text-center text-white">
            <h2 className="text-4xl font-bold mb-4">Ready to discover amazing restaurants?</h2>
            <p className="text-xl mb-8 opacity-90">Join thousands of food lovers and start your culinary journey today</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/search" className="bg-white text-orange-500 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Explore Restaurants
              </a>
              <a href="/owner-login" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-orange-500 transition-colors">
                Partner with Us
              </a>
            </div>
          </div>
        </section>
        
        <Footer />
      </div>
    </div>
  );
};

export default Index;
