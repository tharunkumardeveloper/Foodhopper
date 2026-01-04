
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  Calendar, 
  Heart, 
  Star, 
  User, 
  MapPin, 
  Clock, 
  Phone,
  Mail,
  Camera,
  Trash2,
  Edit,
  Store,
  Menu as MenuIcon,
  Users,
  TrendingUp,
  Settings,
  LogOut,
  Bell,
  Plus,
  Eye
} from "lucide-react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import UserBookings from "../components/dashboard/UserBookings";
import UserSavedRestaurants from "../components/dashboard/UserSavedRestaurants";
import UserReviews from "../components/dashboard/UserReviews";
import OwnerRestaurantManagement from "../components/dashboard/OwnerRestaurantManagement";
import OwnerMenuManagement from "../components/dashboard/OwnerMenuManagement";
import OwnerBookingRequests from "../components/dashboard/OwnerBookingRequests";
import ProfileSettings from "../components/dashboard/ProfileSettings";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [dashboardMode, setDashboardMode] = useState<"user" | "owner">("user");
  const [userData, setUserData] = useState({
    name: "John Doe",
    email: "john@example.com",
    phone: "+91 98765 43210",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
  });
  const [ownerData, setOwnerData] = useState({
    name: "Restaurant Owner",
    email: "owner@muruganidli.com",
    phone: "+91 98765 43210",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
  });
  
  const { toast } = useToast();

  // Mock role detection on component mount
  useEffect(() => {
    const mockRole = localStorage.getItem('dashboardMode') || 'user';
    setDashboardMode(mockRole as "user" | "owner");
    
    if (mockRole === 'owner') {
      setActiveTab("restaurant-overview");
    } else {
      setActiveTab("overview");
    }
  }, []);

  const handleModeSwitch = (newMode: "user" | "owner") => {
    setDashboardMode(newMode);
    localStorage.setItem('dashboardMode', newMode);
    
    if (newMode === 'owner') {
      setActiveTab("restaurant-overview");
    } else {
      setActiveTab("overview");
    }
    
    toast({
      title: "Dashboard Switched",
      description: `You are now viewing the ${newMode === 'owner' ? 'Restaurant Owner' : 'User'} Dashboard`,
    });
  };

  const userTabs = [
    { id: "overview", name: "Dashboard", icon: TrendingUp },
    { id: "bookings", name: "My Bookings", icon: Calendar },
    { id: "saved", name: "Saved", icon: Heart },
    { id: "reviews", name: "Reviews", icon: Star },
    { id: "profile", name: "Profile", icon: User }
  ];

  const ownerTabs = [
    { id: "restaurant-overview", name: "Overview", icon: TrendingUp },
    { id: "restaurant", name: "Restaurant Profile", icon: Store },
    { id: "menu", name: "Menu Management", icon: MenuIcon },
    { id: "booking-requests", name: "Booking Requests", icon: Users },
    { id: "profile", name: "Profile", icon: User }
  ];

  const currentTabs = dashboardMode === "owner" ? ownerTabs : userTabs;
  const currentUserData = dashboardMode === "owner" ? ownerData : userData;
  const setCurrentUserData = dashboardMode === "owner" ? setOwnerData : setUserData;

  const handleLogout = () => {
    localStorage.removeItem('dashboardMode');
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="pt-20 pb-8">
        <div className="container mx-auto px-4">
          {/* Header with Dashboard Mode Toggle */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
              <div className="flex items-center space-x-4">
                <div 
                  className="w-16 h-16 rounded-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${currentUserData.avatar})` }}
                />
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Welcome back, {currentUserData.name}! 👋</h1>
                  <div className="flex items-center space-x-2">
                    <p className="text-gray-600">{currentUserData.email}</p>
                    <Badge variant={dashboardMode === "owner" ? "default" : "secondary"}>
                      {dashboardMode === "owner" ? "Restaurant Owner" : "Customer"}
                    </Badge>
                  </div>
                </div>
              </div>
              
              {/* Dashboard Mode Toggle */}
              <div className="flex items-center space-x-4">
                <Tabs value={dashboardMode} onValueChange={(value) => handleModeSwitch(value as "user" | "owner")} className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="user" className="flex items-center space-x-2">
                      <User className="h-4 w-4" />
                      <span>User Portal</span>
                    </TabsTrigger>
                    <TabsTrigger value="owner" className="flex items-center space-x-2">
                      <Store className="h-4 w-4" />
                      <span>Owner Portal</span>
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
                
                <Button variant="outline" size="icon">
                  <Bell className="h-4 w-4" />
                </Button>
                <Button variant="outline" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    {dashboardMode === "owner" ? <Store className="h-5 w-5" /> : <User className="h-5 w-5" />}
                    <span>{dashboardMode === "owner" ? "Owner" : "User"} Menu</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <nav className="space-y-1">
                    {currentTabs.map((tab) => {
                      const Icon = tab.icon;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={`w-full flex items-center px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
                            activeTab === tab.id ? 'bg-orange-50 text-orange-600 border-r-2 border-orange-500' : 'text-gray-600'
                          }`}
                        >
                          <Icon className="h-5 w-5 mr-3" />
                          {tab.name}
                        </button>
                      );
                    })}
                  </nav>
                </CardContent>
              </Card>
            </div>

            {/* Content Area */}
            <div className="lg:col-span-3">
              {/* User Dashboard Content */}
              {dashboardMode === "user" && (
                <>
                  {activeTab === "overview" && (
                    <div className="space-y-6">
                      <Card>
                        <CardHeader>
                          <CardTitle>Quick Actions</CardTitle>
                        </CardHeader>
                        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Button className="h-16 bg-orange-500 hover:bg-orange-600" onClick={() => setActiveTab("bookings")}>
                            <Calendar className="h-6 w-6 mr-2" />
                            View My Bookings
                          </Button>
                          <Button variant="outline" className="h-16" onClick={() => setActiveTab("saved")}>
                            <Heart className="h-6 w-6 mr-2" />
                            Saved Restaurants
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  )}
                  {activeTab === "bookings" && <UserBookings />}
                  {activeTab === "saved" && <UserSavedRestaurants />}
                  {activeTab === "reviews" && <UserReviews />}
                </>
              )}

              {/* Owner Dashboard Content */}
              {dashboardMode === "owner" && (
                <>
                  {activeTab === "restaurant-overview" && (
                    <div className="space-y-6">
                      {/* Stats Cards */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Card>
                          <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm font-medium text-gray-600">Today's Bookings</p>
                                <p className="text-2xl font-bold text-gray-900">12</p>
                              </div>
                              <Users className="h-8 w-8 text-blue-500" />
                            </div>
                          </CardContent>
                        </Card>
                        
                        <Card>
                          <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm font-medium text-gray-600">This Month</p>
                                <p className="text-2xl font-bold text-gray-900">384</p>
                              </div>
                              <TrendingUp className="h-8 w-8 text-green-500" />
                            </div>
                          </CardContent>
                        </Card>
                        
                        <Card>
                          <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm font-medium text-gray-600">Average Rating</p>
                                <p className="text-2xl font-bold text-gray-900">4.5</p>
                              </div>
                              <Star className="h-8 w-8 text-yellow-500" />
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      <Card>
                        <CardHeader>
                          <CardTitle>Quick Actions</CardTitle>
                        </CardHeader>
                        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Button className="h-16 bg-orange-500 hover:bg-orange-600" onClick={() => setActiveTab("menu")}>
                            <MenuIcon className="h-6 w-6 mr-2" />
                            Update Menu
                          </Button>
                          <Button variant="outline" className="h-16" onClick={() => setActiveTab("booking-requests")}>
                            <Users className="h-6 w-6 mr-2" />
                            View Bookings
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  )}
                  {activeTab === "restaurant" && <OwnerRestaurantManagement />}
                  {activeTab === "menu" && <OwnerMenuManagement />}
                  {activeTab === "booking-requests" && <OwnerBookingRequests />}
                </>
              )}

              {/* Common Profile Settings */}
              {activeTab === "profile" && <ProfileSettings userData={currentUserData} setUserData={setCurrentUserData} />}
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
