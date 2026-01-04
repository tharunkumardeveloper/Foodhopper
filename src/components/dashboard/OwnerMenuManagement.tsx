import { useState } from "react";
import { Plus, Edit, Trash2, Camera } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { getFoodImages } from "../../utils/pixabayApi";

const OwnerMenuManagement = () => {
  const foodImages = getFoodImages();
  
  const [menuItems, setMenuItems] = useState([
    { id: 1, name: "Idli with Sambar", price: 60, category: "Main Course", image: foodImages[0] },
    { id: 2, name: "Masala Dosa", price: 80, category: "Main Course", image: foodImages[1] },
    { id: 3, name: "Filter Coffee", price: 30, category: "Beverages", image: foodImages[2] },
    { id: 4, name: "Chicken Biryani", price: 180, category: "Main Course", image: foodImages[3] },
    { id: 5, name: "Vada Sambar", price: 45, category: "Snacks", image: foodImages[4] },
    { id: 6, name: "Curd Rice", price: 70, category: "Main Course", image: foodImages[5] }
  ]);

  const { toast } = useToast();

  const handleMenuItemAdd = () => {
    const newItem = {
      id: Date.now(),
      name: "New Dish",
      price: 0,
      category: "Main Course",
      image: foodImages[Math.floor(Math.random() * foodImages.length)]
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

  return (
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {menuItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-4">
                <div 
                  className="w-16 h-16 rounded-lg bg-cover bg-center"
                  style={{ backgroundImage: `url(${item.image})` }}
                />
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
  );
};

export default OwnerMenuManagement;
