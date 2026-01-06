import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import FoodMoodQuiz from "../components/FoodMoodQuiz";
import SmartReorder from "../components/SmartReorder";
import HiddenGems from "../components/HiddenGems";
import GroupBookingComponent from "../components/GroupBooking";
import DietPreferencesEngine from "../components/DietPreferences";
import TableAlertsComponent from "../components/TableAlerts";
import LoyaltyPassport from "../components/LoyaltyPassport";
import AIReviewSummarizer from "../components/AIReviewSummarizer";
import { 
  Brain, 
  Zap, 
  Eye, 
  Users, 
  Shield, 
  Bell, 
  Award, 
  Star,
  Sparkles,
  Heart,
  MapPin,
  Calculator
} from "lucide-react";

interface Feature {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  component: React.ReactNode;
  badge?: string;
}

const Features = () => {
  const [selectedFeature, setSelectedFeature] = useState<string>("mood-dna");
  const [showQuizResult, setShowQuizResult] = useState(false);

  const features: Feature[] = [
    {
      id: "mood-dna",
      title: "Food Mood DNA",
      description: "Discover your food personality through our smart quiz and get personalized restaurant recommendations",
      icon: <Brain className="w-6 h-6" />,
      color: "from-purple-500 to-pink-500",
      component: <FoodMoodQuiz onComplete={(personality) => {
        console.log('Food personality:', personality);
        setShowQuizResult(true);
      }} />,
      badge: "AI Powered"
    },
    {
      id: "smart-reorder",
      title: "Smart Reorder & One-Tap Booking",
      description: "Instantly rebook your favorite restaurants with the same preferences in just one tap",
      icon: <Zap className="w-6 h-6" />,
      color: "from-orange-500 to-red-500",
      component: <SmartReorder />,
      badge: "Time Saver"
    },
    {
      id: "hidden-gems",
      title: "Hidden Gems Mode",
      description: "Discover amazing local restaurants that are less known but highly rated by locals",
      icon: <Eye className="w-6 h-6" />,
      color: "from-green-500 to-teal-500",
      component: <HiddenGems />,
      badge: "Local Favorites"
    },
    {
      id: "group-booking",
      title: "Bill Split & Group Booking",
      description: "Plan group dinners and split bills digitally before you even arrive at the restaurant",
      icon: <Users className="w-6 h-6" />,
      color: "from-blue-500 to-cyan-500",
      component: <GroupBookingComponent restaurantId="demo" restaurantName="Demo Restaurant" />,
      badge: "Social"
    },
    {
      id: "diet-preferences",
      title: "Diet & Health Preference Engine",
      description: "Filter restaurants and menu items based on your dietary needs and health preferences",
      icon: <Shield className="w-6 h-6" />,
      color: "from-emerald-500 to-green-500",
      component: <DietPreferencesEngine />,
      badge: "Health Focused"
    },
    {
      id: "table-alerts",
      title: "Live Table Availability Alerts",
      description: "Get notified instantly when tables become available at your preferred restaurants",
      icon: <Bell className="w-6 h-6" />,
      color: "from-yellow-500 to-orange-500",
      component: <TableAlertsComponent />,
      badge: "Real-time"
    },
    {
      id: "loyalty-passport",
      title: "Loyalty Passport",
      description: "Collect stamps, earn badges, and unlock exclusive rewards as you explore restaurants",
      icon: <Award className="w-6 h-6" />,
      color: "from-indigo-500 to-purple-500",
      component: <LoyaltyPassport />,
      badge: "Gamified"
    },
    {
      id: "ai-reviews",
      title: "AI Review Summarizer",
      description: "Get instant insights from thousands of reviews summarized into actionable information",
      icon: <Star className="w-6 h-6" />,
      color: "from-pink-500 to-rose-500",
      component: <AIReviewSummarizer restaurantId="murugan-idli-shop" restaurantName="Murugan Idli Shop" />,
      badge: "AI Insights"
    }
  ];

  const selectedFeatureData = features.find(f => f.id === selectedFeature);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <div className="flex items-center justify-center mb-6">
              <Sparkles className="w-12 h-12 mr-4" />
              <h1 className="text-5xl font-bold">Smart Features</h1>
            </div>
            <p className="text-xl text-orange-100 mb-8 max-w-3xl mx-auto">
              Experience the future of dining with our AI-powered features designed to make 
              restaurant discovery and booking smarter, faster, and more personalized than ever.
            </p>
            <div className="flex items-center justify-center space-x-4">
              <Badge className="bg-white/20 text-white px-4 py-2 text-sm">
                <Brain className="w-4 h-4 mr-2" />
                AI Powered
              </Badge>
              <Badge className="bg-white/20 text-white px-4 py-2 text-sm">
                <Heart className="w-4 h-4 mr-2" />
                User Focused
              </Badge>
              <Badge className="bg-white/20 text-white px-4 py-2 text-sm">
                <Zap className="w-4 h-4 mr-2" />
                Lightning Fast
              </Badge>
            </div>
          </div>
        </section>

        {/* Features Overview */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Explore Our Features</h2>
              <p className="text-lg text-gray-600">
                Click on any feature to see it in action
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-12">
              {features.map((feature) => (
                <Card 
                  key={feature.id}
                  className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                    selectedFeature === feature.id 
                      ? 'ring-2 ring-orange-500 shadow-lg' 
                      : 'hover:shadow-md'
                  }`}
                  onClick={() => setSelectedFeature(feature.id)}
                >
                  <CardContent className="p-4 md:p-6 text-center">
                    <div className={`w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center text-white`}>
                      {feature.icon}
                    </div>
                    <h3 className="font-semibold text-base md:text-lg mb-2">{feature.title}</h3>
                    <p className="text-xs md:text-sm text-gray-600 mb-3">{feature.description}</p>
                    {feature.badge && (
                      <Badge variant="secondary" className="text-xs">
                        {feature.badge}
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Feature Demo */}
            {selectedFeatureData && (
              <Card className="mb-8">
                <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100">
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`p-3 rounded-full bg-gradient-to-r ${selectedFeatureData.color} text-white`}>
                        {selectedFeatureData.icon}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold">{selectedFeatureData.title}</h3>
                        <p className="text-gray-600">{selectedFeatureData.description}</p>
                      </div>
                    </div>
                    {selectedFeatureData.badge && (
                      <Badge className="bg-orange-500 text-white">
                        {selectedFeatureData.badge}
                      </Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 md:p-8">
                  {selectedFeatureData.component}
                </CardContent>
              </Card>
            )}

            {/* Feature Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
              <Card>
                <CardContent className="p-6 text-center">
                  <Brain className="w-12 h-12 mx-auto text-purple-500 mb-4" />
                  <div className="text-3xl font-bold text-purple-600 mb-2">AI</div>
                  <p className="text-sm text-gray-600">Powered Intelligence</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <Zap className="w-12 h-12 mx-auto text-orange-500 mb-4" />
                  <div className="text-3xl font-bold text-orange-600 mb-2">1-Tap</div>
                  <p className="text-sm text-gray-600">Quick Booking</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <Eye className="w-12 h-12 mx-auto text-green-500 mb-4" />
                  <div className="text-3xl font-bold text-green-600 mb-2">Hidden</div>
                  <p className="text-sm text-gray-600">Gem Discovery</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <Award className="w-12 h-12 mx-auto text-blue-500 mb-4" />
                  <div className="text-3xl font-bold text-blue-600 mb-2">Rewards</div>
                  <p className="text-sm text-gray-600">Loyalty Program</p>
                </CardContent>
              </Card>
            </div>

            {/* Call to Action */}
            <Card className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">Ready to Experience Smart Dining?</h3>
                <p className="text-orange-100 mb-6">
                  Join thousands of food lovers who are already using our smart features 
                  to discover amazing restaurants and create memorable dining experiences.
                </p>
                <div className="flex items-center justify-center space-x-4">
                  <Button className="bg-white text-orange-500 hover:bg-gray-100">
                    Start Your Food Journey
                  </Button>
                  <Button variant="outline" className="border-white text-white hover:bg-white/10">
                    Learn More
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Features;