import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { User, Mail, Phone, MapPin, Heart, Settings, Edit } from "lucide-react";

const UserProfile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [userProfile, setUserProfile] = useState({
    name: "Rajesh Kumar",
    email: "rajesh.kumar@email.com",
    phone: "+91 98765 43210",
    location: "T. Nagar, Chennai",
    dietaryPreferences: ["Vegetarian", "No Spicy Food"],
    favoritesCuisines: ["South Indian", "North Indian", "Continental"],
    budgetRange: "₹500-1000 per person"
  });

  const handleSaveProfile = () => {
    setIsEditing(false);
    // Here you would typically save to backend
  };

  const handleInputChange = (field: string, value: string) => {
    setUserProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="pt-20 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Profile Header */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center">
                  <User className="h-10 w-10 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-800">{userProfile.name}</h1>
                  <p className="text-gray-600">Food Explorer & Restaurant Enthusiast</p>
                </div>
              </div>
              <Button 
                onClick={() => setIsEditing(!isEditing)}
                variant="outline"
                className="flex items-center"
              >
                <Edit className="h-4 w-4 mr-2" />
                {isEditing ? "Cancel" : "Edit Profile"}
              </Button>
            </div>

            {/* Profile Information */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-gray-500" />
                  {isEditing ? (
                    <Input 
                      value={userProfile.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                    />
                  ) : (
                    <span className="text-gray-700">{userProfile.email}</span>
                  )}
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-gray-500" />
                  {isEditing ? (
                    <Input 
                      value={userProfile.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                    />
                  ) : (
                    <span className="text-gray-700">{userProfile.phone}</span>
                  )}
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-gray-500" />
                  {isEditing ? (
                    <Input 
                      value={userProfile.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                    />
                  ) : (
                    <span className="text-gray-700">{userProfile.location}</span>
                  )}
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-gray-700">Budget Range</Label>
                  {isEditing ? (
                    <Input 
                      value={userProfile.budgetRange}
                      onChange={(e) => handleInputChange('budgetRange', e.target.value)}
                      className="mt-1"
                    />
                  ) : (
                    <p className="text-gray-700 mt-1">{userProfile.budgetRange}</p>
                  )}
                </div>
              </div>
            </div>

            {isEditing && (
              <div className="mt-6 flex justify-end">
                <Button onClick={handleSaveProfile} className="bg-orange-500 hover:bg-orange-600">
                  Save Changes
                </Button>
              </div>
            )}
          </div>

          {/* Food Preferences */}
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Heart className="h-5 w-5 mr-2 text-red-500" />
                  Dietary Preferences
                </CardTitle>
                <CardDescription>
                  Your food restrictions and preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {userProfile.dietaryPreferences.map((pref, index) => (
                    <Badge key={index} variant="secondary" className="bg-green-100 text-green-800">
                      {pref}
                    </Badge>
                  ))}
                </div>
                <Button variant="outline" size="sm" className="mt-4">
                  <Settings className="h-4 w-4 mr-2" />
                  Manage Preferences
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Heart className="h-5 w-5 mr-2 text-orange-500" />
                  Favorite Cuisines
                </CardTitle>
                <CardDescription>
                  Cuisines you love the most
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {userProfile.favoritesCuisines.map((cuisine, index) => (
                    <Badge key={index} variant="secondary" className="bg-orange-100 text-orange-800">
                      {cuisine}
                    </Badge>
                  ))}
                </div>
                <Button variant="outline" size="sm" className="mt-4">
                  <Settings className="h-4 w-4 mr-2" />
                  Update Cuisines
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button 
                variant="outline" 
                className="h-20 flex flex-col items-center justify-center"
                onClick={() => navigate('/dashboard/bookings')}
              >
                <Settings className="h-6 w-6 mb-2" />
                <span className="text-sm">My Bookings</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-20 flex flex-col items-center justify-center"
                onClick={() => navigate('/dashboard/reviews')}
              >
                <Heart className="h-6 w-6 mb-2" />
                <span className="text-sm">My Reviews</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-20 flex flex-col items-center justify-center"
                onClick={() => navigate('/dashboard/saved')}
              >
                <Heart className="h-6 w-6 mb-2" />
                <span className="text-sm">Saved Places</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-20 flex flex-col items-center justify-center"
                onClick={() => navigate('/search')}
              >
                <MapPin className="h-6 w-6 mb-2" />
                <span className="text-sm">Find Restaurants</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default UserProfile;