
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
    image: "https://cdn.pixabay.com/photo/2017/09/16/19/21/salad-2756467_1920.jpg",
    gallery: [
      "https://cdn.pixabay.com/photo/2017/09/16/19/21/salad-2756467_1920.jpg",
      "https://cdn.pixabay.com/photo/2018/07/18/19/12/pasta-3547078_1920.jpg",
      "https://cdn.pixabay.com/photo/2017/05/01/05/18/pastry-2274750_1920.jpg"
    ],
    menu: [
      {
        id: "idli-sambar",
        name: "Idli with Sambar & Chutney",
        price: 60,
        category: "Main Course",
        description: "Soft steamed rice cakes served with tangy sambar and coconut chutney",
        image: "https://cdn.pixabay.com/photo/2017/09/16/19/21/salad-2756467_1920.jpg",
        isVeg: true
      },
      {
        id: "masala-dosa",
        name: "Masala Dosa",
        price: 80,
        category: "Main Course", 
        description: "Crispy rice crepe filled with spiced potato filling",
        image: "https://cdn.pixabay.com/photo/2018/07/18/19/12/pasta-3547078_1920.jpg",
        isVeg: true
      },
      {
        id: "filter-coffee",
        name: "Filter Coffee",
        price: 30,
        category: "Beverages",
        description: "Traditional South Indian filter coffee",
        image: "https://cdn.pixabay.com/photo/2017/05/01/05/18/pastry-2274750_1920.jpg",
        isVeg: true
      },
      {
        id: "rava-upma",
        name: "Rava Upma",
        price: 50,
        category: "Main Course",
        description: "Semolina cooked with vegetables and spices",
        image: "https://cdn.pixabay.com/photo/2016/12/26/17/28/spaghetti-1932466_1920.jpg",
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
    image: "https://cdn.pixabay.com/photo/2017/06/06/22/46/mediterranean-cuisine-2378758_1920.jpg",
    gallery: [
      "https://cdn.pixabay.com/photo/2017/06/06/22/46/mediterranean-cuisine-2378758_1920.jpg",
      "https://cdn.pixabay.com/photo/2016/11/18/14/39/beans-1834984_1920.jpg"
    ],
    menu: [
      {
        id: "south-indian-thali",
        name: "South Indian Thali",
        price: 220,
        category: "Thali",
        description: "Complete meal with rice, sambar, rasam, vegetables, and dessert",
        image: "https://cdn.pixabay.com/photo/2017/06/06/22/46/mediterranean-cuisine-2378758_1920.jpg",
        isVeg: true
      },
      {
        id: "paneer-butter-masala",
        name: "Paneer Butter Masala",
        price: 180,
        category: "Main Course",
        description: "Cottage cheese in rich tomato and butter gravy",
        image: "https://cdn.pixabay.com/photo/2016/11/18/14/39/beans-1834984_1920.jpg",
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
    image: "https://cdn.pixabay.com/photo/2017/01/26/02/06/platter-2009590_1920.jpg",
    gallery: [
      "https://cdn.pixabay.com/photo/2017/01/26/02/06/platter-2009590_1920.jpg"
    ],
    menu: [
      {
        id: "dal-makhani",
        name: "Dal Makhani",
        price: 280,
        category: "Main Course",
        description: "Creamy black lentils cooked overnight with butter and cream",
        image: "https://cdn.pixabay.com/photo/2017/01/26/02/06/platter-2009590_1920.jpg",
        isVeg: true
      },
      {
        id: "butter-chicken",
        name: "Butter Chicken",
        price: 380,
        category: "Main Course",
        description: "Tender chicken in rich tomato and butter gravy",
        image: "https://cdn.pixabay.com/photo/2017/08/03/13/30/people-2576336_1920.jpg",
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
    image: "https://cdn.pixabay.com/photo/2016/03/05/19/02/hamburger-1238246_1920.jpg",
    gallery: [
      "https://cdn.pixabay.com/photo/2016/03/05/19/02/hamburger-1238246_1920.jpg"
    ],
    menu: [
      {
        id: "chicken-biryani",
        name: "Chicken Biryani",
        price: 320,
        category: "Biryani",
        description: "Aromatic basmati rice cooked with tender chicken and spices",
        image: "https://cdn.pixabay.com/photo/2016/03/05/19/02/hamburger-1238246_1920.jpg",
        isVeg: false,
        isSpicy: true
      },
      {
        id: "mutton-biryani",
        name: "Mutton Biryani",
        price: 420,
        category: "Biryani",
        description: "Traditional mutton biryani with fragrant spices",
        image: "https://cdn.pixabay.com/photo/2017/12/09/08/18/pizza-3007395_1920.jpg",
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
    image: "https://cdn.pixabay.com/photo/2014/10/19/20/59/hamburger-494706_1920.jpg",
    gallery: [
      "https://cdn.pixabay.com/photo/2014/10/19/20/59/hamburger-494706_1920.jpg"
    ],
    menu: [
      {
        id: "bbq-buffet",
        name: "BBQ Buffet",
        price: 899,
        category: "Buffet",
        description: "Unlimited grilled items, live counters, and desserts",
        image: "https://cdn.pixabay.com/photo/2014/10/19/20/59/hamburger-494706_1920.jpg",
        isVeg: false
      }
    ],
    workingHours: "12:00 PM - 3:30 PM, 7:00 PM - 11:30 PM",
    phone: "+91 98765 43214",
    description: "Premium barbecue buffet restaurant with live grilling at your table.",
    features: ["Buffet", "Live Grilling", "Premium Dining", "Family Friendly"]
  },
  {
    id: "saravana-bhavan",
    name: "Saravana Bhavan",
    address: "Cathedral Road, Chennai - 600086",
    location: { lat: 13.0624, lng: 80.2574 },
    cuisine: ["South Indian", "Vegetarian"],
    dineTypes: ["Family Dining", "Quick Bites", "Traditional Indian Thali"],
    rating: 4.4,
    reviews: 3560,
    priceForTwo: 350,
    image: "https://cdn.pixabay.com/photo/2017/05/04/16/37/meeting-2280656_1920.jpg",
    gallery: [
      "https://cdn.pixabay.com/photo/2017/05/04/16/37/meeting-2280656_1920.jpg",
      "https://cdn.pixabay.com/photo/2015/03/26/09/47/sky-690293_1920.jpg"
    ],
    menu: [
      {
        id: "mini-tiffin",
        name: "Mini Tiffin",
        price: 120,
        category: "Combo",
        description: "Assortment of idli, vada, dosa with chutneys",
        image: "https://cdn.pixabay.com/photo/2017/05/04/16/37/meeting-2280656_1920.jpg",
        isVeg: true
      }
    ],
    workingHours: "7:00 AM - 10:30 PM",
    phone: "+91 98765 43215",
    description: "World-famous vegetarian restaurant chain serving authentic South Indian cuisine since 1981.",
    features: ["Vegetarian", "Chain Restaurant", "Authentic Recipes", "Family Friendly"]
  },
  {
    id: "pind-balluchi",
    name: "Pind Balluchi",
    address: "Velachery, Chennai - 600042",
    location: { lat: 12.9794, lng: 80.2185 },
    cuisine: ["North Indian", "Punjabi", "Mughlai"],
    dineTypes: ["Family Restaurants", "Fine Dining"],
    rating: 4.3,
    reviews: 1820,
    priceForTwo: 900,
    image: "https://cdn.pixabay.com/photo/2017/08/06/12/06/people-2591874_1920.jpg",
    gallery: [
      "https://cdn.pixabay.com/photo/2017/08/06/12/06/people-2591874_1920.jpg"
    ],
    menu: [
      {
        id: "punjabi-thali",
        name: "Punjabi Thali",
        price: 350,
        category: "Thali",
        description: "Complete North Indian meal with dal, paneer, roti, and dessert",
        image: "https://cdn.pixabay.com/photo/2017/08/06/12/06/people-2591874_1920.jpg",
        isVeg: true
      }
    ],
    workingHours: "12:00 PM - 11:00 PM",
    phone: "+91 98765 43216",
    description: "Authentic Punjabi dhaba-style restaurant with rustic ambiance and hearty food.",
    features: ["Dhaba Style", "North Indian", "Family Friendly", "Live Tandoor"]
  },
  {
    id: "cream-centre",
    name: "Cream Centre",
    address: "Anna Nagar, Chennai - 600040",
    location: { lat: 13.0850, lng: 80.2101 },
    cuisine: ["Chinese", "Continental", "Desserts"],
    dineTypes: ["Cafes and Bakeries", "Family Restaurants"],
    rating: 4.5,
    reviews: 2340,
    priceForTwo: 700,
    image: "https://cdn.pixabay.com/photo/2016/11/29/05/45/astronomy-1867616_1920.jpg",
    gallery: [
      "https://cdn.pixabay.com/photo/2016/11/29/05/45/astronomy-1867616_1920.jpg"
    ],
    menu: [
      {
        id: "brownie-sundae",
        name: "Sizzling Brownie with Ice Cream",
        price: 220,
        category: "Desserts",
        description: "Hot chocolate brownie served with vanilla ice cream",
        image: "https://cdn.pixabay.com/photo/2016/11/29/05/45/astronomy-1867616_1920.jpg",
        isVeg: true
      }
    ],
    workingHours: "11:00 AM - 11:00 PM",
    phone: "+91 98765 43217",
    description: "Popular family restaurant known for its sizzlers, desserts, and vibrant atmosphere.",
    features: ["Sizzlers", "Desserts", "Family Friendly", "Vegetarian Options"]
  },
  {
    id: "cafe-coffee-day",
    name: "Café Coffee Day",
    address: "Nungambakkam, Chennai - 600034",
    location: { lat: 13.0569, lng: 80.2425 },
    cuisine: ["Café", "Snacks", "Beverages"],
    dineTypes: ["Cafes and Bakeries", "Quick Bites"],
    rating: 4.1,
    reviews: 890,
    priceForTwo: 400,
    image: "https://cdn.pixabay.com/photo/2014/09/17/20/26/restaurant-449952_1920.jpg",
    gallery: [
      "https://cdn.pixabay.com/photo/2014/09/17/20/26/restaurant-449952_1920.jpg"
    ],
    menu: [
      {
        id: "cappuccino",
        name: "Classic Cappuccino",
        price: 150,
        category: "Beverages",
        description: "Rich espresso with steamed milk and foam",
        image: "https://cdn.pixabay.com/photo/2014/09/17/20/26/restaurant-449952_1920.jpg",
        isVeg: true
      }
    ],
    workingHours: "8:00 AM - 11:00 PM",
    phone: "+91 98765 43218",
    description: "India's favorite coffee chain offering great coffee and cozy ambiance.",
    features: ["Coffee", "WiFi", "Work Friendly", "Quick Service"]
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
