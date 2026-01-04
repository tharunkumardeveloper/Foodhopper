
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

export const chennaiRestaurants: Restaurant[] = [
  {
    id: "murugan-idli-shop",
    name: "Murugan Idli Shop",
    address: "Besant Nagar Beach Road, Chennai - 600090",
    location: { lat: 13.006, lng: 80.259 },
    cuisine: ["South Indian", "Vegetarian"],
    dineTypes: ["Family Dining", "Quick Bites", "Traditional Indian"],
    rating: 4.5,
    reviews: 2847,
    priceForTwo: 300,
    image: "https://images.unsplash.com/photo-1630383249896-424e482df921?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1630383249896-424e482df921?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1596797038530-2c107229654b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    menu: [
      {
        id: "idli-sambar",
        name: "Idli with Sambar & Chutney",
        price: 60,
        category: "Main Course",
        description: "Soft steamed rice cakes served with tangy sambar and coconut chutney",
        image: "https://images.unsplash.com/photo-1630383249896-424e482df921?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        isVeg: true
      },
      {
        id: "masala-dosa",
        name: "Masala Dosa",
        price: 80,
        category: "Main Course", 
        description: "Crispy rice crepe filled with spiced potato filling",
        image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        isVeg: true
      },
      {
        id: "filter-coffee",
        name: "Filter Coffee",
        price: 30,
        category: "Beverages",
        description: "Traditional South Indian filter coffee",
        image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        isVeg: true
      },
      {
        id: "rava-upma",
        name: "Rava Upma",
        price: 50,
        category: "Main Course",
        description: "Semolina cooked with vegetables and spices",
        image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        isVeg: true
      }
    ],
    workingHours: "6:00 AM - 10:00 PM",
    phone: "+91 98765 43210",
    description: "Famous for authentic South Indian breakfast items, especially fluffy idlis and crispy dosas.",
    features: ["Vegetarian", "Family Friendly", "Quick Service", "Traditional Recipes"]
  },
  {
    id: "sangeetha-veg-restaurant",
    name: "Sangeetha Veg Restaurant",
    address: "T. Nagar, Chennai - 600017",
    location: { lat: 13.0418, lng: 80.2341 },
    cuisine: ["South Indian", "North Indian", "Vegetarian"],
    dineTypes: ["Family Dining", "Buffet Restaurants", "Traditional Indian Thali"],
    rating: 4.3,
    reviews: 1923,
    priceForTwo: 450,
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1585937421612-70a008356fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    menu: [
      {
        id: "south-indian-thali",
        name: "South Indian Thali",
        price: 220,
        category: "Thali",
        description: "Complete meal with rice, sambar, rasam, vegetables, and dessert",
        image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        isVeg: true
      },
      {
        id: "paneer-butter-masala",
        name: "Paneer Butter Masala",
        price: 180,
        category: "Main Course",
        description: "Cottage cheese in rich tomato and butter gravy",
        image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        isVeg: true
      }
    ],
    workingHours: "11:00 AM - 10:30 PM",
    phone: "+91 98765 43211",
    description: "Multi-cuisine vegetarian restaurant known for its traditional thalis and North Indian dishes.",
    features: ["Vegetarian", "AC Dining", "Thali Meals", "Family Friendly"]
  },
  {
    id: "copper-chimney",
    name: "Copper Chimney",
    address: "Express Avenue Mall, Chennai - 600002",
    location: { lat: 13.0691, lng: 80.2623 },
    cuisine: ["North Indian", "Punjabi", "Tandoor"],
    dineTypes: ["Fine Dining", "Family Restaurants"],
    rating: 4.6,
    reviews: 3421,
    priceForTwo: 1200,
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1585937421612-70a008356fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    menu: [
      {
        id: "dal-makhani",
        name: "Dal Makhani",
        price: 280,
        category: "Main Course",
        description: "Creamy black lentils cooked overnight with butter and cream",
        image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        isVeg: true
      },
      {
        id: "butter-chicken",
        name: "Butter Chicken",
        price: 380,
        category: "Main Course",
        description: "Tender chicken in rich tomato and butter gravy",
        image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        isVeg: false
      }
    ],
    workingHours: "12:00 PM - 11:00 PM",
    phone: "+91 98765 43212",
    description: "Premium North Indian restaurant known for authentic tandoor dishes and elegant dining experience.",
    features: ["Fine Dining", "AC Restaurant", "Tandoor Speciality", "Premium Experience"]
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
    image: "https://images.unsplash.com/photo-1563379091339-03246967d4d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1563379091339-03246967d4d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    menu: [
      {
        id: "chicken-biryani",
        name: "Chicken Biryani",
        price: 320,
        category: "Biryani",
        description: "Aromatic basmati rice cooked with tender chicken and spices",
        image: "https://images.unsplash.com/photo-1563379091339-03246967d4d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        isVeg: false,
        isSpicy: true
      },
      {
        id: "mutton-biryani",
        name: "Mutton Biryani",
        price: 420,
        category: "Biryani",
        description: "Traditional mutton biryani with fragrant spices",
        image: "https://images.unsplash.com/photo-1563379091339-03246967d4d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        isVeg: false,
        isSpicy: true
      }
    ],
    workingHours: "11:30 AM - 11:00 PM",
    phone: "+91 98765 43213",
    description: "Legendary Chennai restaurant famous for its biryanis and traditional South Indian non-vegetarian dishes.",
    features: ["Biryani Specialist", "Heritage Restaurant", "Non-Veg", "Family Dining"]
  },
  {
    id: "absolute-barbecue",
    name: "Absolute Barbecue",
    address: "Phoenix MarketCity, Chennai - 600142",
    location: { lat: 12.9956, lng: 80.2103 },
    cuisine: ["Barbecue", "North Indian", "Continental"],
    dineTypes: ["Buffet Restaurants", "Fine Dining"],
    rating: 4.7,
    reviews: 4821,
    priceForTwo: 1500,
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    menu: [
      {
        id: "bbq-buffet",
        name: "BBQ Buffet",
        price: 899,
        category: "Buffet",
        description: "Unlimited grilled items, live counters, and desserts",
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        isVeg: false
      }
    ],
    workingHours: "12:00 PM - 3:30 PM, 7:00 PM - 11:30 PM",
    phone: "+91 98765 43214",
    description: "Premium barbecue buffet restaurant with live grilling at your table.",
    features: ["Buffet", "Live Grilling", "Premium Dining", "Family Friendly"]
  }
];

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
  "Dhaba-style"
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
  "Desserts"
];
