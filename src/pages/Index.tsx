
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
        <Footer />
      </div>
    </div>
  );
};

export default Index;
