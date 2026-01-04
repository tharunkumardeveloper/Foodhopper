
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, User, Phone, Upload, Store } from "lucide-react";
import Navigation from "../components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const OwnerLogin = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
    restaurantName: "",
    address: "",
    cuisine: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      if (isLogin) {
        toast({
          title: "Welcome back!",
          description: "Successfully logged in to your restaurant dashboard.",
        });
        navigate("/owner-dashboard");
      } else {
        toast({
          title: "Registration successful!",
          description: "Your restaurant has been added to FoodHopper. Welcome aboard!",
        });
        navigate("/owner-dashboard");
      }
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50">
      <Navigation />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            {/* Header */}
            <div className="text-center mb-8 animate-fade-in">
              <div className="bg-gradient-to-r from-orange-500 to-red-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Store className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-2">
                Restaurant Owner Portal
              </h1>
              <p className="text-gray-600">
                {isLogin ? "Manage your restaurant with ease" : "Join thousands of successful restaurants"}
              </p>
            </div>

            <Card className="shadow-xl border-0 backdrop-blur-sm bg-white/95 animate-scale-in">
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl font-bold text-gray-800">
                  {isLogin ? "Welcome Back" : "Create Your Restaurant"}
                </CardTitle>
                <CardDescription>
                  {isLogin 
                    ? "Access your dashboard to manage bookings and menu" 
                    : "Start your journey with FoodHopper today"
                  }
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  {!isLogin && (
                    <div className="grid grid-cols-1 gap-4 p-4 bg-orange-50 rounded-lg border border-orange-200">
                      <h4 className="font-semibold text-orange-800 mb-2 flex items-center">
                        <User className="h-4 w-4 mr-2" />
                        Owner Information
                      </h4>
                      
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Enter your full name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="pl-10"
                            required={!isLogin}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            placeholder="+91 XXXXX XXXXX"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="pl-10"
                            required={!isLogin}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {!isLogin && (
                    <div className="grid grid-cols-1 gap-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <h4 className="font-semibold text-blue-800 mb-2 flex items-center">
                        <Store className="h-4 w-4 mr-2" />
                        Restaurant Details
                      </h4>
                      
                      <div className="space-y-2">
                        <Label htmlFor="restaurantName">Restaurant Name</Label>
                        <Input
                          id="restaurantName"
                          name="restaurantName"
                          type="text"
                          placeholder="e.g., Murugan Idli Shop"
                          value={formData.restaurantName}
                          onChange={handleInputChange}
                          required={!isLogin}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <Input
                          id="address"
                          name="address"
                          type="text"
                          placeholder="e.g., T. Nagar, Chennai"
                          value={formData.address}
                          onChange={handleInputChange}
                          required={!isLogin}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="cuisine">Cuisine Type</Label>
                        <Input
                          id="cuisine"
                          name="cuisine"
                          type="text"
                          placeholder="e.g., South Indian, North Indian"
                          value={formData.cuisine}
                          onChange={handleInputChange}
                          required={!isLogin}
                        />
                      </div>
                    </div>
                  )}

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="restaurant@example.com"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter secure password"
                          value={formData.password}
                          onChange={handleInputChange}
                          className="pl-10 pr-10"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  {isLogin && (
                    <div className="flex justify-between items-center text-sm">
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="remember"
                          className="rounded border-gray-300"
                        />
                        <label htmlFor="remember" className="text-gray-600">
                          Remember me
                        </label>
                      </div>
                      <Link
                        to="/forgot-password"
                        className="text-orange-500 hover:text-orange-600 transition-colors"
                      >
                        Forgot password?
                      </Link>
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-3 transition-all duration-200 transform hover:scale-105"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        {isLogin ? "Signing in..." : "Creating account..."}
                      </div>
                    ) : (
                      isLogin ? "Sign In to Dashboard" : "Create Restaurant Account"
                    )}
                  </Button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-gray-600">
                    {isLogin ? "New restaurant partner?" : "Already have an account?"}
                    <button
                      onClick={() => setIsLogin(!isLogin)}
                      className="ml-1 text-orange-500 hover:text-orange-600 font-medium transition-colors"
                    >
                      {isLogin ? "Join FoodHopper" : "Sign in instead"}
                    </button>
                  </p>
                </div>

                {!isLogin && (
                  <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                    <h4 className="font-bold text-green-800 mb-3 text-center">🚀 Partner Benefits</h4>
                    <div className="grid grid-cols-1 gap-2 text-sm text-green-700">
                      <div className="flex items-center">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                        Reach 10,000+ hungry customers in Chennai
                      </div>
                      <div className="flex items-center">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                        Real-time booking management system
                      </div>
                      <div className="flex items-center">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                        Advanced analytics and customer insights
                      </div>
                      <div className="flex items-center">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                        Zero setup fees - commission only on bookings
                      </div>
                      <div className="flex items-center">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                        Professional photography & marketing support
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="mt-8 text-center text-sm text-gray-500">
              <p>
                Need assistance? <Link to="/contact" className="text-orange-500 hover:text-orange-600 transition-colors">Contact our restaurant success team</Link>
              </p>
              <p className="mt-1">
                📞 Support: +91 98765 43210 | 📧 partners@foodhopper.in
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerLogin;
