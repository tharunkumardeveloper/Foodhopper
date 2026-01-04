
import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Store, 
  Upload, 
  Camera, 
  Menu as MenuIcon, 
  Clock, 
  Users, 
  Star, 
  TrendingUp, 
  Settings,
  Eye,
  MapPin,
  Edit,
  Trash2,
  Plus
} from "lucide-react";
import Navigation from "../components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const OwnerDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [restaurantData, setRestaurantData] = useState({
    name: "Murugan Idli Shop",
    address: "Besant Nagar Beach Road, Chennai",
    cuisine: ["South Indian", "Vegetarian"],
    rating: 4.5,
    isOpen: true,
    themeColor: "#f97316"
  });
  
  const [menuItems, setMenuItems] = useState([
    { id: 1, name: "Idli with Sambar", price: 60, category: "Main Course", image: "" },
    { id: 2, name: "Masala Dosa", price: 80, category: "Main Course", image: "" },
    { id: 3, name: "Filter Coffee", price: 30, category: "Beverages", image: "" }
  ]);

  const { toast } = useToast();

  const handleImageUpload = (type: string) => {
    toast({
      title: "Image Upload",
      description: `${type} image upload functionality will be implemented with Firebase Storage.`
    });
  };

  const handleMenuItemAdd = () => {
    const newItem = {
      id: Date.now(),
      name: "New Dish",
      price: 0,
      category: "Main Course",
      image: ""
    };
    setMenuItems([...menuItems, newItem]);
  };

  const handleMenuItemDelete = (id: number) => {
    setMenuItems(menuItems.filter(item => item.id !== id));
    toast({
      title: "Item Deleted",
      description: "Menu item has been removed successfully."
    });
  };

  const tabs = [
    { id: "overview", name: "Overview", icon: TrendingUp },
    { id: "restaurant", name: "Restaurant Profile", icon: Store },
    { id: "menu", name: "Menu Management", icon: MenuIcon },
    { id: "gallery", name: "Gallery", icon: Camera },
    { id: "bookings", name: "Bookings", icon: Users },
    { id: "settings", name: "Settings", icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                  Welcome back, {restaurantData.name}! 👋
                </h1>
                <p className="text-gray-600 flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  {restaurantData.address}
                </p>
              </div>
              <div className="flex items-center space-x-4 mt-4 md:mt-0">
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-yellow-500" />
                  <span className="font-semibold">{restaurantData.rating}</span>
                </div>
                <Button 
                  variant="outline"
                  onClick={() => window.open(`/restaurant/murugan-idli-shop`, '_blank')}
                  className="flex items-center"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Preview Restaurant
                </Button>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
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
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Status</p>
                    <p className="text-2xl font-bold text-green-600">Open</p>
                  </div>
                  <Clock className="h-8 w-8 text-orange-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Dashboard Menu</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <nav className="space-y-1">
                    {tabs.map((tab) => {
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
              {/* Restaurant Profile Tab */}
              {activeTab === "restaurant" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Restaurant Profile</CardTitle>
                    <CardDescription>Customize how your restaurant appears to customers</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="restaurantName">Restaurant Name</Label>
                        <Input 
                          id="restaurantName"
                          value={restaurantData.name}
                          onChange={(e) => setRestaurantData({...restaurantData, name: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <Input 
                          id="address"
                          value={restaurantData.address}
                          onChange={(e) => setRestaurantData({...restaurantData, address: e.target.value})}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="themeColor">Theme Color</Label>
                      <div className="flex items-center space-x-4">
                        <input 
                          type="color"
                          id="themeColor"
                          value={restaurantData.themeColor}
                          onChange={(e) => setRestaurantData({...restaurantData, themeColor: e.target.value})}
                          className="w-16 h-10 rounded border"
                        />
                        <span className="text-sm text-gray-600">Choose your restaurant's brand color</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label>Logo Upload</Label>
                        <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                          <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                          <Button variant="outline" onClick={() => handleImageUpload("Logo")}>
                            Upload Logo
                          </Button>
                        </div>
                      </div>
                      <div>
                        <Label>Hero Banner</Label>
                        <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                          <Camera className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                          <Button variant="outline" onClick={() => handleImageUpload("Banner")}>
                            Upload Banner
                          </Button>
                        </div>
                      </div>
                    </div>

                    <Button className="bg-orange-500 hover:bg-orange-600">
                      Save Changes
                    </Button>
                  </CardContent>
                </Card>
              )}

              {/* Menu Management Tab */}
              {activeTab === "menu" && (
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle>Menu Management</CardTitle>
                        <CardDescription>Add, edit, and organize your menu items</CardDescription>
                      </div>
                      <Button onClick={handleMenuItemAdd} className="bg-orange-500 hover:bg-orange-600">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Item
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {menuItems.map((item) => (
                        <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center space-x-4">
                            <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                              <Camera className="h-6 w-6 text-gray-400" />
                            </div>
                            <div>
                              <h3 className="font-semibold">{item.name}</h3>
                              <p className="text-gray-600">₹{item.price}</p>
                              <span className="text-sm text-gray-500">{item.category}</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleMenuItemDelete(item.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Gallery Tab */}
              {activeTab === "gallery" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Restaurant Gallery</CardTitle>
                    <CardDescription>Upload and manage images of your restaurant and dishes</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {['Ambience', 'Food Items', 'Seating Areas'].map((category) => (
                        <div key={category} className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                          <Camera className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                          <h3 className="font-medium text-gray-700 mb-2">{category}</h3>
                          <Button 
                            variant="outline" 
                            onClick={() => handleImageUpload(category)}
                          >
                            Upload Images
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Default Overview Tab */}
              {activeTab === "overview" && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Button className="h-16 bg-orange-500 hover:bg-orange-600" onClick={() => setActiveTab("menu")}>
                        <MenuIcon className="h-6 w-6 mr-2" />
                        Update Menu
                      </Button>
                      <Button variant="outline" className="h-16" onClick={() => setActiveTab("gallery")}>
                        <Camera className="h-6 w-6 mr-2" />
                        Upload Photos
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Bookings</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {[
                          { name: "Priya Sharma", time: "7:30 PM", people: 4, status: "Confirmed" },
                          { name: "Raj Kumar", time: "8:00 PM", people: 2, status: "Pending" },
                          { name: "Anita Singh", time: "8:30 PM", people: 6, status: "Confirmed" }
                        ].map((booking, index) => (
                          <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                            <div>
                              <p className="font-medium">{booking.name}</p>
                              <p className="text-sm text-gray-600">{booking.time} • {booking.people} people</p>
                            </div>
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              booking.status === 'Confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {booking.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerDashboard;
