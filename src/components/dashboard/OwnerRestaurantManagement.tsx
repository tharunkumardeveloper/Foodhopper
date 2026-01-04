
import { useState } from "react";
import { Upload, Camera } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const OwnerRestaurantManagement = () => {
  const [restaurantData, setRestaurantData] = useState({
    name: "Murugan Idli Shop",
    address: "Besant Nagar Beach Road, Chennai",
    cuisine: ["South Indian", "Vegetarian"],
    rating: 4.5,
    isOpen: true,
    themeColor: "#f97316"
  });

  const { toast } = useToast();

  const handleImageUpload = (type: string) => {
    toast({
      title: "Image Upload",
      description: `${type} image upload functionality will be implemented with Firebase Storage.`
    });
  };

  return (
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
  );
};

export default OwnerRestaurantManagement;
