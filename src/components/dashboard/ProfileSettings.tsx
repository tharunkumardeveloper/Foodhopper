
import { Camera } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface ProfileSettingsProps {
  userData: {
    name: string;
    email: string;
    phone: string;
    avatar: string;
  };
  setUserData: (data: any) => void;
}

const ProfileSettings = ({ userData, setUserData }: ProfileSettingsProps) => {
  const { toast } = useToast();

  const handleProfileUpdate = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile has been updated successfully.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Settings</CardTitle>
        <CardDescription>Update your personal information</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-4">
          <div 
            className="w-20 h-20 rounded-full bg-cover bg-center"
            style={{ backgroundImage: `url(${userData.avatar})` }}
          />
          <Button variant="outline">
            <Camera className="h-4 w-4 mr-2" />
            Change Photo
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={userData.name}
              onChange={(e) => setUserData({...userData, name: e.target.value})}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={userData.email}
              onChange={(e) => setUserData({...userData, email: e.target.value})}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              value={userData.phone}
              onChange={(e) => setUserData({...userData, phone: e.target.value})}
            />
          </div>
        </div>
        
        <Button onClick={handleProfileUpdate} className="w-full md:w-auto">
          Update Profile
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProfileSettings;
