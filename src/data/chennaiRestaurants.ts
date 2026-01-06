export interface Restaurant {
  id: string;
  name: string;
  address: string;
  location: {
    lat: number;
    lng: number;
  };
  cuisine: string[];
  dineTypes: string[];
  rating: number;
  reviews: number;
  priceForTwo: number;
  image: string;
  gallery: string[];
  menu: MenuItem[];
  workingHours: string;
  phone: string;
  description: string;
  features: string[];
}

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  image: string;
  isVeg: boolean;
  isSpicy?: boolean;
}

export const chennaiRestaurants: Restaurant[] = [{

  id: "murugan-idli-shop",
  name: "Murugan Idli Shop",
  address: "Besant Nagar Beach Road, Chennai - 600090",
  location: { lat: 13.006, lng: 80.259 },
  cuisine: ["South Indian", "Vegetarian"],
  dineTypes: ["Family Dining", "Quick Bites", "Traditional Indian"],
  rating: 4.5,
  reviews: 2847,
  priceForTwo: 300,
  image: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  gallery: [
    "https://images.unsplash.com/photo-1626132647523-66f5bf380027?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
  ],
  menu: [
    {
      id: "idli-sambar",
      name: "Idli with Sambar & Chutney",
      price: 60,
      category: "Main Course",
      description: "Soft steamed rice cakes served with tangy sambar and coconut chutney",
      image: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      isVeg: true
    },
    {
      id: "masala-dosa",
      name: "Masala Dosa",
      price: 80,
      category: "Main Course",
      description: "Crispy rice crepe filled with spiced potato filling",
      image: "https://images.unsplash.com/photo-1630383249896-424e482df921?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      isVeg: true
    },
    {
      id: "filter-coffee",
      name: "Filter Coffee",
      price: 30,
      category: "Beverages",
      description: "Traditional South Indian filter coffee",
      image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      isVeg: true
    },
    {
      id: "rava-upma",
      name: "Rava Upma",
      price: 50,
      category: "Main Course",
      description: "Semolina cooked with vegetables and spices",
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      isVeg: true
    },
    {
      id: "vada-sambar",
      name: "Medu Vada with Sambar",
      price: 70,
      category: "Main Course",
      description: "Crispy lentil donuts served with sambar and coconut chutney",
      image: "https://images.unsplash.com/photo-1574484284002-952d92456975?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      isVeg: true
    },
    {
      id: "pongal",
      name: "Ven Pongal",
      price: 65,
      category: "Main Course",
      description: "Savory rice and lentil porridge with ghee and pepper",
      image: "https://images.unsplash.com/photo-1563379091339-03246963d51a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      isVeg: true
    }
  ],
  workingHours: "6:00 AM - 10:00 PM",
  phone: "+91 98765 43210",
  description: "Famous for authentic South Indian breakfast items, especially fluffy idlis and crispy dosas.",
  features: ["Vegetarian", "Family Friendly", "Quick Service", "Traditional Recipes"]
},
{
  id: "buhari-hotel",
  name: "Buhari Hotel",
  address: "Anna Salai, Chennai - 600002",
  location: { lat: 13.0674, lng: 80.2376 },
  cuisine: ["South Indian", "North Indian", "Biryani"],
  dineTypes: ["Family Restaurants", "Non-Veg Speciality"],
  rating: 4.4,
  reviews: 2156,
  priceForTwo: 600,
  image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  gallery: [
    "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
  ],
  menu: [
    {
      id: "chicken-biryani",
      name: "Chicken Biryani",
      price: 320,
      category: "Biryani",
      description: "Aromatic basmati rice cooked with tender chicken and spices",
      image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      isVeg: false,
      isSpicy: true
    },
    {
      id: "mutton-biryani",
      name: "Mutton Biryani",
      price: 420,
      category: "Biryani",
      description: "Traditional mutton biryani with fragrant spices",
      image: "https://images.unsplash.com/photo-1563379091339-03246963d51a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      isVeg: false,
      isSpicy: true
    },
    {
      id: "fish-curry",
      name: "Fish Curry",
      price: 280,
      category: "Main Course",
      description: "Traditional South Indian fish curry with coconut and tamarind",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      isVeg: false,
      isSpicy: true
    },
    {
      id: "chicken-65",
      name: "Chicken 65",
      price: 250,
      category: "Appetizers",
      description: "Spicy deep-fried chicken appetizer with curry leaves",
      image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      isVeg: false,
      isSpicy: true
    },
    {
      id: "prawn-fry",
      name: "Prawn Fry",
      price: 350,
      category: "Main Course",
      description: "Crispy fried prawns with South Indian spices",
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      isVeg: false,
      isSpicy: true
    },
    {
      id: "egg-biryani",
      name: "Egg Biryani",
      price: 220,
      category: "Biryani",
      description: "Flavorful biryani with boiled eggs and aromatic spices",
      image: "https://images.unsplash.com/photo-1574484284002-952d92456975?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      isVeg: false
    }
  ],
  workingHours: "11:30 AM - 11:00 PM",
  phone: "+91 98765 43213",
  description: "Legendary Chennai restaurant famous for its biryanis and traditional South Indian non-vegetarian dishes.",
  features: ["Biryani Specialist", "Heritage Restaurant", "Non-Veg", "Family Dining"]
},
{
  id: "chettinad-mansion",
  name: "Chettinad Mansion",
  address: "Mylapore, Chennai - 600004",
  location: { lat: 13.0339, lng: 80.2619 },
  cuisine: ["Chettinad", "South Indian", "Spicy"],
  dineTypes: ["Fine Dining", "Traditional Indian"],
  rating: 4.6,
  reviews: 1890,
  priceForTwo: 800,
  image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  gallery: [
    "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
  ],
  menu: [
    {
      id: "chettinad-chicken",
      name: "Chettinad Chicken Curry",
      price: 380,
      category: "Main Course",
      description: "Fiery chicken curry with authentic Chettinad spices and coconut",
      image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      isVeg: false,
      isSpicy: true
    },
    {
      id: "pepper-mutton",
      name: "Pepper Mutton Fry",
      price: 450,
      category: "Main Course",
      description: "Dry mutton preparation with black pepper and traditional spices",
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      isVeg: false,
      isSpicy: true
    },
    {
      id: "crab-masala",
      name: "Chettinad Crab Masala",
      price: 520,
      category: "Main Course",
      description: "Fresh crab cooked in spicy Chettinad masala with coconut",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      isVeg: false,
      isSpicy: true
    },
    {
      id: "kola-urundai",
      name: "Kola Urundai",
      price: 180,
      category: "Appetizers",
      description: "Spicy meatballs made with minced mutton and aromatic spices",
      image: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      isVeg: false,
      isSpicy: true
    },
    {
      id: "chettinad-fish-fry",
      name: "Chettinad Fish Fry",
      price: 320,
      category: "Main Course",
      description: "Marinated fish fried with Chettinad spice powder",
      image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      isVeg: false,
      isSpicy: true
    },
    {
      id: "appam",
      name: "Appam with Stew",
      price: 150,
      category: "Main Course",
      description: "Soft fermented rice pancakes with vegetable or chicken stew",
      image: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      isVeg: true
    }
  ],
  workingHours: "12:00 PM - 3:00 PM, 7:00 PM - 11:00 PM",
  phone: "+91 98765 43220",
  description: "Authentic Chettinad cuisine with traditional recipes passed down through generations.",
  features: ["Chettinad Speciality", "Spicy Food", "Traditional Recipes", "Heritage Cuisine"]
}, {

  id: "rajdhani-thali",
  name: "Rajdhani Thali Restaurant",
  address: "Adyar, Chennai - 600020",
  location: { lat: 13.0067, lng: 80.2206 },
  cuisine: ["Gujarati", "Rajasthani", "Vegetarian"],
  dineTypes: ["Traditional Indian Thali", "Family Dining"],
  rating: 4.5,
  reviews: 2340,
  priceForTwo: 650,
  image: "https://images.unsplash.com/photo-1574484284002-952d92456975?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  gallery: [
    "https://images.unsplash.com/photo-1574484284002-952d92456975?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
  ],
  menu: [
    {
      id: "gujarati-thali",
      name: "Gujarati Unlimited Thali",
      price: 450,
      category: "Thali",
      description: "Unlimited traditional Gujarati thali with dal, sabzi, roti, rice, and sweets",
      image: "https://images.unsplash.com/photo-1574484284002-952d92456975?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      isVeg: true
    },
    {
      id: "dhokla-plate",
      name: "Khaman Dhokla",
      price: 120,
      category: "Snacks",
      description: "Steamed gram flour cakes with green chutney and sweet tamarind sauce",
      image: "https://images.unsplash.com/photo-1563379091339-03246963d51a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      isVeg: true
    },
    {
      id: "khandvi",
      name: "Khandvi",
      price: 140,
      category: "Snacks",
      description: "Rolled gram flour sheets with mustard seeds and curry leaves",
      image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      isVeg: true
    },
    {
      id: "thepla",
      name: "Methi Thepla",
      price: 80,
      category: "Breads",
      description: "Spiced flatbread with fenugreek leaves and served with pickle",
      image: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      isVeg: true
    },
    {
      id: "undhiyu",
      name: "Undhiyu",
      price: 220,
      category: "Main Course",
      description: "Mixed vegetable curry with stuffed baby eggplants and spices",
      image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      isVeg: true
    },
    {
      id: "shrikhand",
      name: "Shrikhand",
      price: 100,
      category: "Desserts",
      description: "Sweet yogurt dessert flavored with cardamom and saffron",
      image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      isVeg: true
    }
  ],
  workingHours: "11:30 AM - 3:30 PM, 7:00 PM - 10:30 PM",
  phone: "+91 98765 43221",
  description: "Authentic Gujarati and Rajasthani thali experience with unlimited servings.",
  features: ["Unlimited Thali", "Gujarati Cuisine", "Vegetarian", "Traditional Service"]
}, {

  id: "bengali-sweet-house",
  name: "Bengali Sweet House",
  address: "Park Town, Chennai - 600003",
  location: { lat: 13.0878, lng: 80.2785 },
  cuisine: ["Bengali", "Sweets", "Fish Curry"],
  dineTypes: ["Traditional Indian", "Sweet Shop"],
  rating: 4.4,
  reviews: 1560,
  priceForTwo: 500,
  image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  gallery: [
    "https://images.unsplash.com/photo-1585937421612-70a008356fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
  ],
  menu: [
    {
      id: "fish-curry-rice",
      name: "Bengali Fish Curry with Rice",
      price: 280,
      category: "Main Course",
      description: "Traditional Bengali fish curry with mustard oil and panch phoron spices",
      image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      isVeg: false
    },
    {
      id: "rasgulla",
      name: "Rasgulla",
      price: 80,
      category: "Desserts",
      description: "Soft cottage cheese balls in sugar syrup",
      image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      isVeg: true
    },
    {
      id: "mishti-doi",
      name: "Mishti Doi",
      price: 60,
      category: "Desserts",
      description: "Sweet yogurt dessert served in earthen pots",
      image: "https://images.unsplash.com/photo-1563379091339-03246963d51a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      isVeg: true
    },
    {
      id: "kosha-mangsho",
      name: "Kosha Mangsho",
      price: 350,
      category: "Main Course",
      description: "Slow-cooked mutton curry with onions and Bengali spices",
      image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      isVeg: false,
      isSpicy: true
    },
    {
      id: "chingri-malai-curry",
      name: "Chingri Malai Curry",
      price: 420,
      category: "Main Course",
      description: "Prawns cooked in coconut milk with Bengali spices",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      isVeg: false
    },
    {
      id: "sandesh",
      name: "Sandesh",
      price: 90,
      category: "Desserts",
      description: "Traditional Bengali sweet made from cottage cheese and sugar",
      image: "https://images.unsplash.com/photo-1574484284002-952d92456975?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      isVeg: true
    }
  ],
  workingHours: "10:00 AM - 10:00 PM",
  phone: "+91 98765 43222",
  description: "Authentic Bengali cuisine and sweets made with traditional recipes.",
  features: ["Bengali Cuisine", "Fresh Sweets", "Fish Speciality", "Traditional Recipes"]
}, {

  id: "punjabi-tadka",
  name: "Punjabi Tadka",
  address: "Egmore, Chennai - 600008",
  location: { lat: 13.0732, lng: 80.2609 },
  cuisine: ["Punjabi", "North Indian", "Tandoor"],
  dineTypes: ["Family Restaurants", "Dhaba-style"],
  rating: 4.3,
  reviews: 1890,
  priceForTwo: 750,
  image: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  gallery: [
    "https://images.unsplash.com/photo-1565299507177-b0ac66763828?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
  ],
  menu: [
    {
      id: "sarson-saag",
      name: "Sarson Ka Saag with Makki Roti",
      price: 320,
      category: "Main Course",
      description: "Traditional mustard greens curry served with corn flour bread",
      image: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      isVeg: true
    },
    {
      id: "amritsari-kulcha",
      name: "Amritsari Kulcha",
      price: 180,
      category: "Breads",
      description: "Stuffed bread with spiced potatoes, served with chole and pickle",
      image: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      isVeg: true
    },
    {
      id: "butter-chicken",
      name: "Butter Chicken",
      price: 380,
      category: "Main Course",
      description: "Creamy tomato-based chicken curry with butter and cream",
      image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      isVeg: false
    },
    {
      id: "dal-makhani",
      name: "Dal Makhani",
      price: 280,
      category: "Main Course",
      description: "Creamy black lentils cooked overnight with butter and cream",
      image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      isVeg: true
    },
    {
      id: "tandoori-chicken",
      name: "Tandoori Chicken",
      price: 350,
      category: "Main Course",
      description: "Marinated chicken cooked in clay oven with yogurt and spices",
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      isVeg: false,
      isSpicy: true
    },
    {
      id: "lassi",
      name: "Punjabi Lassi",
      price: 80,
      category: "Beverages",
      description: "Thick yogurt drink served in traditional clay glass",
      image: "https://images.unsplash.com/photo-1574484284002-952d92456975?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      isVeg: true
    }
  ],
  workingHours: "11:00 AM - 11:00 PM",
  phone: "+91 98765 43223",
  description: "Authentic Punjabi dhaba experience with traditional clay oven cooking.",
  features: ["Punjabi Dhaba", "Clay Oven", "Authentic Flavors", "Rustic Ambiance"]
}, {

  id: "kerala-kitchen",
  name: "Kerala Kitchen",
  address: "Kilpauk, Chennai - 600010",
  location: { lat: 13.0827, lng: 80.2707 },
  cuisine: ["Kerala", "South Indian", "Seafood"],
  dineTypes: ["Traditional Indian", "Seafood Speciality"],
  rating: 4.5,
  reviews: 2100,
  priceForTwo: 650,
  image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  gallery: [
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
  ],
  menu: [
    {
      id: "fish-moilee",
      name: "Kerala Fish Moilee",
      price: 380,
      category: "Main Course",
      description: "Fish curry in coconut milk with curry leaves and green chilies",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      isVeg: false
    },
    {
      id: "appam-stew",
      name: "Appam with Vegetable Stew",
      price: 220,
      category: "Main Course",
      description: "Fermented rice pancakes with coconut milk vegetable curry",
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      isVeg: true
    },
    {
      id: "kerala-beef-fry",
      name: "Kerala Beef Fry",
      price: 420,
      category: "Main Course",
      description: "Spicy beef fry with coconut slices and curry leaves",
      image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      isVeg: false,
      isSpicy: true
    },
    {
      id: "puttu-kadala",
      name: "Puttu with Kadala Curry",
      price: 180,
      category: "Main Course",
      description: "Steamed rice cake with spiced black chickpea curry",
      image: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      isVeg: true
    },
    {
      id: "karimeen-fry",
      name: "Karimeen Fry",
      price: 450,
      category: "Main Course",
      description: "Pearl spot fish marinated and fried with Kerala spices",
      image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      isVeg: false,
      isSpicy: true
    },
    {
      id: "payasam",
      name: "Palada Payasam",
      price: 120,
      category: "Desserts",
      description: "Traditional Kerala dessert with rice flakes and coconut milk",
      image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      isVeg: true
    }
  ],
  workingHours: "12:00 PM - 3:00 PM, 7:00 PM - 10:30 PM",
  phone: "+91 98765 43224",
  description: "Authentic Kerala cuisine with traditional spices and coconut-based curries.",
  features: ["Kerala Cuisine", "Coconut Curries", "Seafood", "Traditional Spices"]
},
{
  id: "hyderabadi-biryani-house",
  name: "Hyderabadi Biryani House",
  address: "Thousand Lights, Chennai - 600006",
  location: { lat: 13.0569, lng: 80.2425 },
  cuisine: ["Hyderabadi", "Biryani", "Mughlai"],
  dineTypes: ["Non-Veg Speciality", "Family Restaurants"],
  rating: 4.7,
  reviews: 3200,
  priceForTwo: 900,
  image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  gallery: [
    "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
  ],
  menu: [
    {
      id: "hyderabadi-dum-biryani",
      name: "Hyderabadi Dum Biryani",
      price: 450,
      category: "Biryani",
      description: "Slow-cooked basmati rice with marinated mutton in sealed pot",
      image: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      isVeg: false,
      isSpicy: true
    },
    {
      id: "haleem",
      name: "Hyderabadi Haleem",
      price: 280,
      category: "Main Course",
      description: "Slow-cooked lentil and meat stew with aromatic spices",
      image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      isVeg: false
    },
    {
      id: "nihari",
      name: "Nihari",
      price: 320,
      category: "Main Course",
      description: "Slow-cooked beef stew with bone marrow and spices",
      image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      isVeg: false,
      isSpicy: true
    },
    {
      id: "seekh-kebab",
      name: "Seekh Kebab",
      price: 250,
      category: "Appetizers",
      description: "Minced meat kebabs grilled on skewers with aromatic spices",
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      isVeg: false,
      isSpicy: true
    },
    {
      id: "double-ka-meetha",
      name: "Double Ka Meetha",
      price: 150,
      category: "Desserts",
      description: "Hyderabadi bread pudding with milk, nuts, and saffron",
      image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      isVeg: true
    },
    {
      id: "sheer-khurma",
      name: "Sheer Khurma",
      price: 120,
      category: "Desserts",
      description: "Vermicelli pudding with milk, dates, and dry fruits",
      image: "https://images.unsplash.com/photo-1574484284002-952d92456975?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      isVeg: true
    }
  ],
  workingHours: "12:00 PM - 11:00 PM",
  phone: "+91 98765 43225",
  description: "Authentic Hyderabadi cuisine with traditional dum cooking methods.",
  features: ["Dum Cooking", "Hyderabadi Speciality", "Premium Biryani", "Traditional Methods"]
},
{
  id: "maharashtrian-bhavan",
  name: "Maharashtrian Bhavan",
  address: "Gopalapuram, Chennai - 600086",
  location: { lat: 13.0624, lng: 80.2574 },
  cuisine: ["Maharashtrian", "Street Food", "Vegetarian"],
  dineTypes: ["Traditional Indian", "Quick Bites"],
  rating: 4.2,
  reviews: 1450,
  priceForTwo: 400,
  image: "https://images.unsplash.com/photo-1574484284002-952d92456975?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  gallery: [
    "https://images.unsplash.com/photo-1574484284002-952d92456975?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
  ],
  menu: [
    {
      id: "vada-pav",
      name: "Vada Pav",
      price: 40,
      category: "Street Food",
      description: "Mumbai's famous potato fritter sandwich with chutneys",
      image: "https://images.unsplash.com/photo-1574484284002-952d92456975?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      isVeg: true
    },
    {
      id: "misal-pav",
      name: "Misal Pav",
      price: 120,
      category: "Main Course",
      description: "Spicy sprouts curry topped with farsan and served with pav",
      image: "https://images.unsplash.com/photo-1563379091339-03246963d51a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      isVeg: true,
      isSpicy: true
    },
    {
      id: "pav-bhaji",
      name: "Pav Bhaji",
      price: 100,
      category: "Street Food",
      description: "Spiced vegetable mash served with buttered bread rolls",
      image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      isVeg: true,
      isSpicy: true
    },
    {
      id: "bhel-puri",
      name: "Bhel Puri",
      price: 60,
      category: "Street Food",
      description: "Puffed rice salad with chutneys, onions, and sev",
      image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      isVeg: true
    },
    {
      id: "puran-poli",
      name: "Puran Poli",
      price: 80,
      category: "Desserts",
      description: "Sweet flatbread stuffed with jaggery and lentil filling",
      image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      isVeg: true
    },
    {
      id: "solkadhi",
      name: "Solkadhi",
      price: 50,
      category: "Beverages",
      description: "Refreshing drink made with coconut milk and kokum",
      image: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      isVeg: true
    }
  ],
  workingHours: "8:00 AM - 10:00 PM",
  phone: "+91 98765 43226",
  description: "Authentic Maharashtrian street food and traditional dishes.",
  features: ["Street Food", "Maharashtrian Cuisine", "Quick Service", "Authentic Flavors"]
}, {

  id: "andhra-spice-kitchen",
  name: "Andhra Spice Kitchen",
  address: "Vadapalani, Chennai - 600026",
  location: { lat: 13.0501, lng: 80.2060 },
  cuisine: ["Andhra", "Spicy", "South Indian"],
  dineTypes: ["Traditional Indian", "Spicy Food"],
  rating: 4.4,
  reviews: 1780,
  priceForTwo: 550,
  image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  gallery: [
    "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
  ],
  menu: [
    {
      id: "gongura-mutton",
      name: "Gongura Mutton Curry",
      price: 420,
      category: "Main Course",
      description: "Tangy mutton curry with sorrel leaves and Andhra spices",
      image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      isVeg: false,
      isSpicy: true
    },
    {
      id: "pesarattu",
      name: "Pesarattu with Upma",
      price: 150,
      category: "Main Course",
      description: "Green gram dosa stuffed with upma and served with ginger chutney",
      image: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      isVeg: true
    },
    {
      id: "andhra-chicken-curry",
      name: "Andhra Chicken Curry",
      price: 380,
      category: "Main Course",
      description: "Spicy chicken curry with red chilies and traditional Andhra spices",
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      isVeg: false,
      isSpicy: true
    },
    {
      id: "pulihora",
      name: "Pulihora (Tamarind Rice)",
      price: 120,
      category: "Main Course",
      description: "Tangy tamarind rice with peanuts and curry leaves",
      image: "https://images.unsplash.com/photo-1574484284002-952d92456975?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      isVeg: true
    },
    {
      id: "gongura-pickle",
      name: "Gongura Pickle",
      price: 80,
      category: "Sides",
      description: "Spicy sorrel leaves pickle with sesame oil",
      image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      isVeg: true,
      isSpicy: true
    },
    {
      id: "bobbatlu",
      name: "Bobbatlu",
      price: 100,
      category: "Desserts",
      description: "Sweet flatbread stuffed with jaggery and lentil filling",
      image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      isVeg: true
    }
  ],
  workingHours: "7:00 AM - 10:30 PM",
  phone: "+91 98765 43227",
  description: "Fiery Andhra cuisine with traditional recipes and authentic spice levels.",
  features: ["Andhra Cuisine", "Very Spicy", "Traditional Recipes", "Authentic Flavors"]
}, {

  id: "kashmiri-wazwan",
  name: "Kashmiri Wazwan",
  address: "Alwarpet, Chennai - 600018",
  location: { lat: 13.0339, lng: 80.2619 },
  cuisine: ["Kashmiri", "Mughlai", "Non-Veg"],
  dineTypes: ["Fine Dining", "Traditional Indian"],
  rating: 4.6,
  reviews: 1200,
  priceForTwo: 1200,
  image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  gallery: [
    "https://images.unsplash.com/photo-1585937421612-70a008356fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
  ],
  menu: [
    {
      id: "rogan-josh",
      name: "Kashmiri Rogan Josh",
      price: 480,
      category: "Main Course",
      description: "Tender lamb curry with aromatic Kashmiri spices and yogurt",
      image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      isVeg: false
    },
    {
      id: "kahwa",
      name: "Kashmiri Kahwa",
      price: 120,
      category: "Beverages",
      description: "Traditional green tea with saffron, almonds, and cardamom",
      image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      isVeg: true
    },
    {
      id: "yakhni",
      name: "Yakhni",
      price: 420,
      category: "Main Course",
      description: "Aromatic mutton curry cooked in yogurt-based gravy",
      image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      isVeg: false
    },
    {
      id: "kashmiri-pulao",
      name: "Kashmiri Pulao",
      price: 280,
      category: "Rice",
      description: "Fragrant rice with dry fruits, saffron, and aromatic spices",
      image: "https://images.unsplash.com/photo-1574484284002-952d92456975?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      isVeg: true
    },
    {
      id: "tabak-maaz",
      name: "Tabak Maaz",
      price: 380,
      category: "Main Course",
      description: "Fried lamb ribs marinated in yogurt and spices",
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      isVeg: false,
      isSpicy: true
    },
    {
      id: "shufta",
      name: "Shufta",
      price: 150,
      category: "Desserts",
      description: "Traditional Kashmiri sweet with dry fruits and cottage cheese",
      image: "https://images.unsplash.com/photo-1563379091339-03246963d51a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      isVeg: true
    }
  ],
  workingHours: "12:00 PM - 3:00 PM, 7:00 PM - 11:00 PM",
  phone: "+91 98765 43228",
  description: "Authentic Kashmiri cuisine with traditional wazwan dining experience.",
  features: ["Kashmiri Cuisine", "Wazwan Experience", "Premium Dining", "Saffron Speciality"]
}, {

  id: "rajasthani-royal-thali",
  name: "Rajasthani Royal Thali",
  address: "Anna Nagar, Chennai - 600040",
  location: { lat: 13.0850, lng: 80.2101 },
  cuisine: ["Rajasthani", "Vegetarian", "Traditional"],
  dineTypes: ["Traditional Indian Thali", "Fine Dining"],
  rating: 4.5,
  reviews: 1650,
  priceForTwo: 800,
  image: "https://images.unsplash.com/photo-1574484284002-952d92456975?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  gallery: [
    "https://images.unsplash.com/photo-1574484284002-952d92456975?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
  ],
  menu: [
    {
      id: "rajasthani-thali",
      name: "Royal Rajasthani Thali",
      price: 550,
      category: "Thali",
      description: "Complete Rajasthani meal with dal baati churma, gatte ki sabzi, and sweets",
      image: "https://images.unsplash.com/photo-1574484284002-952d92456975?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      isVeg: true
    },
    {
      id: "laal-maas",
      name: "Laal Maas",
      price: 450,
      category: "Main Course",
      description: "Spicy red mutton curry with Mathania red chilies",
      image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      isVeg: false,
      isSpicy: true
    },
    {
      id: "dal-baati-churma",
      name: "Dal Baati Churma",
      price: 320,
      category: "Main Course",
      description: "Baked wheat balls served with lentil curry and sweet churma",
      image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      isVeg: true
    },
    {
      id: "gatte-ki-sabzi",
      name: "Gatte Ki Sabzi",
      price: 220,
      category: "Main Course",
      description: "Gram flour dumplings in spicy yogurt curry",
      image: "https://images.unsplash.com/photo-1563379091339-03246963d51a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      isVeg: true,
      isSpicy: true
    },
    {
      id: "ker-sangri",
      name: "Ker Sangri",
      price: 180,
      category: "Main Course",
      description: "Desert beans and berries cooked with traditional spices",
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      isVeg: true
    },
    {
      id: "ghevar",
      name: "Ghevar",
      price: 120,
      category: "Desserts",
      description: "Traditional Rajasthani sweet made with flour and soaked in sugar syrup",
      image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      isVeg: true
    }
  ],
  workingHours: "12:00 PM - 3:30 PM, 7:00 PM - 10:30 PM",
  phone: "+91 98765 43229",
  description: "Royal Rajasthani dining experience with traditional thali service.",
  features: ["Rajasthani Cuisine", "Royal Thali", "Traditional Service", "Desert Flavors"]
}, {
  id
    : "goan-coastal-kitchen",
  name: "Goan Coastal Kitchen",
  address: "Besant Nagar, Chennai - 600090",
  location: { lat: 13.006, lng: 80.259 },
  cuisine: ["Goan", "Seafood", "Portuguese"],
  dineTypes: ["Seafood Speciality", "Coastal Cuisine"],
  rating: 4.3,
  reviews: 1340,
  priceForTwo: 750,
  image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  gallery: [
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
  ],
  menu: [
    {
      id: "fish-curry-rice",
      name: "Goan Fish Curry Rice",
      price: 320,
      category: "Main Course",
      description: "Coconut-based fish curry with kokum and served with steamed rice",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      isVeg: false
    },
    {
      id: "pork-vindaloo",
      name: "Pork Vindaloo",
      price: 380,
      category: "Main Course",
      description: "Spicy pork curry with vinegar and Portuguese spices",
      image: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      isVeg: false,
      isSpicy: true
    },
    {
      id: "bebinca",
      name: "Bebinca",
      price: 150,
      category: "Desserts",
      description: "Traditional Goan layered dessert with coconut milk and jaggery",
      image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      isVeg: true
    },
    {
      id: "prawn-balchao",
      name: "Prawn Balchao",
      price: 420,
      category: "Main Course",
      description: "Spicy prawn pickle with vinegar and red chilies",
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      isVeg: false,
      isSpicy: true
    },
    {
      id: "sorpotel",
      name: "Sorpotel",
      price: 350,
      category: "Main Course",
      description: "Spicy pork curry with liver and traditional Goan spices",
      image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      isVeg: false,
      isSpicy: true
    },
    {
      id: "feni",
      name: "Feni",
      price: 200,
      category: "Beverages",
      description: "Traditional Goan spirit made from cashew or palm",
      image: "https://images.unsplash.com/photo-1574484284002-952d92456975?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      isVeg: true
    }
  ],
  workingHours: "12:00 PM - 3:00 PM, 7:00 PM - 11:00 PM",
  phone: "+91 98765 43230",
  description: "Authentic Goan cuisine with Portuguese influences and fresh seafood.",
  features: ["Goan Cuisine", "Fresh Seafood", "Portuguese Influence", "Coastal Flavors"]
}, {

  id: "awadhi-dastarkhwan",
  name: "Awadhi Dastarkhwan",
  address: "Nungambakkam, Chennai - 600034",
  location: { lat: 13.0569, lng: 80.2425 },
  cuisine: ["Awadhi", "Lucknowi", "Mughlai"],
  dineTypes: ["Fine Dining", "Traditional Indian"],
  rating: 4.7,
  reviews: 2100,
  priceForTwo: 1100,
  image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  gallery: [
    "https://images.unsplash.com/photo-1585937421612-70a008356fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
  ],
  menu: [
    {
      id: "lucknowi-biryani",
      name: "Lucknowi Biryani",
      price: 480,
      category: "Biryani",
      description: "Fragrant biryani cooked in dum style with tender meat and aromatic spices",
      image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      isVeg: false
    },
    {
      id: "galouti-kebab",
      name: "Galouti Kebab",
      price: 350,
      category: "Appetizers",
      description: "Melt-in-mouth minced meat kebabs with secret blend of spices",
      image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      isVeg: false
    },
    {
      id: "tunday-kebab",
      name: "Tunday Kebab",
      price: 320,
      category: "Appetizers",
      description: "Famous Lucknowi kebabs made with tenderized meat and spices",
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      isVeg: false
    },
    {
      id: "awadhi-korma",
      name: "Awadhi Korma",
      price: 420,
      category: "Main Course",
      description: "Rich and creamy meat curry with yogurt and aromatic spices",
      image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      isVeg: false
    },
    {
      id: "roomali-roti",
      name: "Roomali Roti",
      price: 80,
      category: "Breads",
      description: "Paper-thin handkerchief bread cooked on inverted wok",
      image: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      isVeg: true
    },
    {
      id: "kulfi",
      name: "Kulfi Falooda",
      price: 120,
      category: "Desserts",
      description: "Traditional ice cream with vermicelli and rose syrup",
      image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      isVeg: true
    }
  ],
  workingHours: "12:00 PM - 3:00 PM, 7:00 PM - 11:30 PM",
  phone: "+91 98765 43231",
  description: "Authentic Awadhi cuisine with royal recipes from the kitchens of Lucknow.",
  features: ["Awadhi Cuisine", "Royal Recipes", "Dum Cooking", "Premium Experience"]
}, {

  id: "tamil-brahmin-mess",
  name: "Tamil Brahmin Mess",
  address: "Mylapore, Chennai - 600004",
  location: { lat: 13.0339, lng: 80.2619 },
  cuisine: ["Tamil Brahmin", "South Indian", "Vegetarian"],
  dineTypes: ["Traditional Indian", "Mess Style"],
  rating: 4.4,
  reviews: 1890,
  priceForTwo: 300,
  image: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  gallery: [
    "https://images.unsplash.com/photo-1626132647523-66f5bf380027?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
  ],
  menu: [
    {
      id: "curd-rice",
      name: "Thayir Sadam (Curd Rice)",
      price: 80,
      category: "Main Course",
      description: "Traditional Tamil comfort food with yogurt, rice, and tempering",
      image: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      isVeg: true
    },
    {
      id: "mor-kuzhambu",
      name: "Mor Kuzhambu",
      price: 120,
      category: "Curries",
      description: "Tangy buttermilk curry with vegetables and coconut",
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      isVeg: true
    },
    {
      id: "rasam",
      name: "Tomato Rasam",
      price: 60,
      category: "Curries",
      description: "Tangy tomato soup with tamarind and traditional spices",
      image: "https://images.unsplash.com/photo-1574484284002-952d92456975?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      isVeg: true
    },
    {
      id: "kootu",
      name: "Paruppu Kootu",
      price: 100,
      category: "Main Course",
      description: "Lentil and vegetable stew with coconut and spices",
      image: "https://images.unsplash.com/photo-1563379091339-03246963d51a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      isVeg: true
    },
    {
      id: "payasam",
      name: "Semiya Payasam",
      price: 80,
      category: "Desserts",
      description: "Sweet vermicelli pudding with milk and cardamom",
      image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      isVeg: true
    },
    {
      id: "appalam",
      name: "Appalam",
      price: 30,
      category: "Sides",
      description: "Crispy lentil wafers served as accompaniment",
      image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      isVeg: true
    }
  ],
  workingHours: "11:00 AM - 3:00 PM, 6:00 PM - 9:00 PM",
  phone: "+91 98765 43232",
  description: "Traditional Tamil Brahmin cuisine served in authentic mess style.",
  features: ["Tamil Brahmin Cuisine", "Mess Style", "Traditional Recipes", "Comfort Food"]
}, {

  id: "bihari-litti-chokha",
  name: "Bihari Litti Chokha",
  address: "Perambur, Chennai - 600011",
  location: { lat: 13.1185, lng: 80.2314 },
  cuisine: ["Bihari", "Traditional", "Vegetarian"],
  dineTypes: ["Traditional Indian", "Regional Cuisine"],
  rating: 4.2,
  reviews: 980,
  priceForTwo: 350,
  image: "https://images.unsplash.com/photo-1574484284002-952d92456975?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  gallery: [
    "https://images.unsplash.com/photo-1574484284002-952d92456975?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
  ],
  menu: [
    {
      id: "litti-chokha",
      name: "Litti Chokha",
      price: 150,
      category: "Main Course",
      description: "Roasted wheat balls stuffed with sattu served with mashed vegetables",
      image: "https://images.unsplash.com/photo-1574484284002-952d92456975?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      isVeg: true
    },
    {
      id: "sattu-paratha",
      name: "Sattu Paratha",
      price: 120,
      category: "Breads",
      description: "Stuffed flatbread with roasted gram flour and spices",
      image: "https://images.unsplash.com/photo-1563379091339-03246963d51a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      isVeg: true
    },
    {
      id: "thekua",
      name: "Thekua",
      price: 80,
      category: "Desserts",
      description: "Traditional Bihari sweet made with wheat flour and jaggery",
      image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      isVeg: true
    },
    {
      id: "sattu-drink",
      name: "Sattu Drink",
      price: 60,
      category: "Beverages",
      description: "Refreshing drink made with roasted gram flour and spices",
      image: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      isVeg: true
    },
    {
      id: "aloo-chokha",
      name: "Aloo Chokha",
      price: 100,
      category: "Sides",
      description: "Mashed potatoes with mustard oil, onions, and green chilies",
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      isVeg: true
    },
    {
      id: "kheer",
      name: "Kheer",
      price: 90,
      category: "Desserts",
      description: "Rice pudding with milk, sugar, and cardamom",
      image: "https://images.unsplash.com/photo-1574484284002-952d92456975?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      isVeg: true
    }
  ],
  workingHours: "10:00 AM - 9:00 PM",
  phone: "+91 98765 43233",
  description: "Authentic Bihari cuisine featuring traditional litti chokha and sattu preparations.",
  features: ["Bihari Cuisine", "Traditional Cooking", "Sattu Speciality", "Regional Flavors"]
},
{
  id: "kongunadu-cuisine",
  name: "Kongunadu Cuisine",
  address: "Coimbatore Road, Chennai - 600026",
  location: { lat: 13.0501, lng: 80.2060 },
  cuisine: ["Kongunadu", "Tamil", "Traditional"],
  dineTypes: ["Traditional Indian", "Regional Speciality"],
  rating: 4.3,
  reviews: 1230,
  priceForTwo: 450,
  image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  gallery: [
    "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
  ],
  menu: [
    {
      id: "arisi-paruppu-sadam",
      name: "Arisi Paruppu Sadam",
      price: 180,
      category: "Main Course",
      description: "Traditional rice and lentil dish with ghee and spices",
      image: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      isVeg: true
    },
    {
      id: "nattu-kozhi-curry",
      name: "Nattu Kozhi Curry",
      price: 350,
      category: "Main Course",
      description: "Country chicken curry with traditional Kongunadu spices",
      image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      isVeg: false,
      isSpicy: true
    },
    {
      id: "keerai-masiyal",
      name: "Keerai Masiyal",
      price: 120,
      category: "Main Course",
      description: "Mashed spinach with lentils and coconut",
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      isVeg: true
    },
    {
      id: "mutton-kuzhambu",
      name: "Mutton Kuzhambu",
      price: 380,
      category: "Main Course",
      description: "Spicy mutton curry with tamarind and traditional spices",
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      isVeg: false,
      isSpicy: true
    },
    {
      id: "ragi-mudde",
      name: "Ragi Mudde",
      price: 100,
      category: "Main Course",
      description: "Finger millet balls served with sambar or curry",
      image: "https://images.unsplash.com/photo-1574484284002-952d92456975?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      isVeg: true
    },
    {
      id: "ellu-urundai",
      name: "Ellu Urundai",
      price: 60,
      category: "Desserts",
      description: "Sesame seed balls with jaggery and cardamom",
      image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      isVeg: true
    }
  ],
  workingHours: "11:30 AM - 3:00 PM, 6:30 PM - 10:00 PM",
  phone: "+91 98765 43234",
  description: "Authentic Kongunadu cuisine from the western districts of Tamil Nadu.",
  features: ["Kongunadu Cuisine", "Traditional Recipes", "Country Chicken", "Regional Speciality"]
},];


export const getDineTypes = () => [
  "Fine Dining",
  "Rooftop Dining",
  "Buffet Restaurants",
  "Traditional Indian Thali",
  "Quick Bites",
  "Family Restaurants",
  "Veg-Only",
  "Non-Veg Speciality",
  "Cafes and Bakeries",
  "Dhaba-style",
  "Seafood Speciality",
  "Spicy Food",
  "Regional Cuisine",
  "Street Food",
  "Sweet Shop",
  "Mess Style",
  "Coastal Cuisine"
];

export const getCuisineTypes = () => [
  "South Indian",
  "North Indian",
  "Punjabi",
  "Bengali",
  "Gujarati",
  "Rajasthani",
  "Chettinad",
  "Continental",
  "Chinese",
  "Italian",
  "Biryani",
  "Street Food",
  "Desserts",
  "Kerala",
  "Andhra",
  "Hyderabadi",
  "Maharashtrian",
  "Kashmiri",
  "Goan",
  "Awadhi",
  "Tamil Brahmin",
  "Bihari",
  "Kongunadu",
  "Mughlai",
  "Tandoor",
  "Seafood",
  "Vegetarian"
];