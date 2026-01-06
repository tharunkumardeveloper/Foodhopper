const PIXABAY_API_KEY = import.meta.env.VITE_PIXABAY_API_KEY || '51101534-5ea0626a1f88bac19855c0037';
const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
const PIXABAY_BASE_URL = 'https://pixabay.com/api/';
const UNSPLASH_BASE_URL = 'https://api.unsplash.com';

// Cache to store fetched images and avoid duplicates
const imageCache = new Map<string, string[]>();
const usedImages = new Set<string>();

// High-quality fallback images for different categories
const fallbackImages = {
  restaurant: [
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80",
    "https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80",
    "https://images.unsplash.com/photo-1559329007-40df8a9345d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1551218808-94e220e084d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
  ],
  food: [
    "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1626132647523-66f5bf380027?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
  ],
  cuisine: [
    "https://images.unsplash.com/photo-1574484284002-952d92456975?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1563379091339-03246963d51a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1585937421612-70a008356fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1571091718767-18b5b1457add?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1565299507177-b0ac66763828?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
  ]
};

// Search Unsplash for high-quality images
export const searchUnsplashImages = async (query: string, perPage: number = 12) => {
  if (!UNSPLASH_ACCESS_KEY) {
    console.warn('Unsplash API key not found, using fallbacks');
    return [];
  }

  try {
    const response = await fetch(
      `${UNSPLASH_BASE_URL}/search/photos?query=${encodeURIComponent(query)}&per_page=${perPage}&orientation=landscape`,
      {
        headers: {
          'Authorization': `Client-ID ${UNSPLASH_ACCESS_KEY}`
        }
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch from Unsplash');
    }

    const data = await response.json();
    return data.results.map((photo: any) => photo.urls.regular);
  } catch (error) {
    console.error('Error fetching from Unsplash:', error);
    return [];
  }
};

export const searchPixabayImages = async (query: string, perPage: number = 12, page: number = 1) => {
  const cacheKey = `${query}-${perPage}-${page}`;

  // Check cache first
  if (imageCache.has(cacheKey)) {
    return imageCache.get(cacheKey)!;
  }

  let allImages: string[] = [];

  try {
    // Try Unsplash first for higher quality images
    const unsplashImages = await searchUnsplashImages(query, Math.min(perPage, 8));
    allImages.push(...unsplashImages);

    // If we need more images or Unsplash failed, try Pixabay
    if (allImages.length < perPage) {
      const remainingCount = perPage - allImages.length;
      const response = await fetch(
        `${PIXABAY_BASE_URL}?key=${PIXABAY_API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&per_page=${remainingCount}&page=${page}&safesearch=true&min_width=800&min_height=600&order=popular&category=food,places,backgrounds`
      );

      if (response.ok) {
        const data = await response.json();
        const pixabayImages = data.hits.map((hit: any) => hit.largeImageURL || hit.webformatURL);
        allImages.push(...pixabayImages);
      }
    }

    // Filter out already used images to ensure uniqueness
    const uniqueImages = allImages.filter((img: string) => !usedImages.has(img));

    // Add to used images set
    uniqueImages.forEach(img => usedImages.add(img));

    // If we still don't have enough images, add fallbacks
    if (uniqueImages.length < perPage) {
      const fallbackType = query.toLowerCase().includes('food') || query.toLowerCase().includes('dish') ? 'food' :
        query.toLowerCase().includes('cuisine') ? 'cuisine' : 'restaurant';

      const fallbacks = fallbackImages[fallbackType] || fallbackImages.restaurant;
      const neededCount = perPage - uniqueImages.length;
      const availableFallbacks = fallbacks.filter(img => !usedImages.has(img));

      uniqueImages.push(...availableFallbacks.slice(0, neededCount));
      availableFallbacks.slice(0, neededCount).forEach(img => usedImages.add(img));
    }

    // Cache the results
    imageCache.set(cacheKey, uniqueImages);
    return uniqueImages;

  } catch (error) {
    console.error('Error fetching images:', error);

    // Return fallback images on error
    const fallbackType = query.toLowerCase().includes('food') || query.toLowerCase().includes('dish') ? 'food' :
      query.toLowerCase().includes('cuisine') ? 'cuisine' : 'restaurant';

    const fallbacks = fallbackImages[fallbackType] || fallbackImages.restaurant;
    const result = fallbacks.slice(0, perPage);
    imageCache.set(cacheKey, result);
    return result;
  }
};

// Enhanced dynamic image fetching with specific keywords and unique results
export const fetchHeroImages = async () => {
  const queries = [
    'elegant restaurant dining fine cuisine gourmet food',
    'luxury restaurant interior fine dining atmosphere',
    'beautiful restaurant ambiance romantic dining',
    'modern restaurant design contemporary dining',
    'cozy restaurant warm lighting intimate dining'
  ];

  const allImages: string[] = [];
  for (const query of queries) {
    const images = await searchPixabayImages(query, 3);
    allImages.push(...images);
  }

  return allImages.slice(0, 8);
};

export const fetchRestaurantImages = async () => {
  const queries = [
    'luxury restaurant interior elegant dining room',
    'modern restaurant design beautiful ambiance',
    'cozy restaurant atmosphere warm lighting',
    'fine dining restaurant elegant interior'
  ];

  const allImages: string[] = [];
  for (const query of queries) {
    const images = await searchPixabayImages(query, 4);
    allImages.push(...images);
  }

  return allImages.slice(0, 12);
};

export const fetchFoodImages = async () => {
  const queries = [
    'gourmet food platter delicious meal cuisine',
    'indian food traditional dishes authentic',
    'international cuisine diverse food dishes',
    'restaurant meal presentation fine dining'
  ];

  const allImages: string[] = [];
  for (const query of queries) {
    const images = await searchPixabayImages(query, 4);
    allImages.push(...images);
  }

  return allImages.slice(0, 12);
};

export const fetchCuisineImages = async () => {
  const queries = [
    'international cuisine food dishes restaurant meal',
    'asian cuisine chinese japanese thai food',
    'european cuisine italian french mediterranean',
    'indian cuisine spicy traditional authentic'
  ];

  const allImages: string[] = [];
  for (const query of queries) {
    const images = await searchPixabayImages(query, 3);
    allImages.push(...images);
  }

  return allImages.slice(0, 8);
};

export const fetchCityImages = async () => {
  const queries = [
    'modern city skyline urban dining nightlife',
    'indian city architecture beautiful buildings',
    'urban landscape modern city development',
    'city lights evening atmosphere dining'
  ];

  const allImages: string[] = [];
  for (const query of queries) {
    const images = await searchPixabayImages(query, 3);
    allImages.push(...images);
  }

  return allImages.slice(0, 8);
};

export const fetchDiningImages = async () => {
  const queries = [
    'restaurant atmosphere cozy dining elegant interior',
    'fine dining experience luxury restaurant',
    'casual dining family restaurant atmosphere',
    'outdoor dining terrace restaurant view'
  ];

  const allImages: string[] = [];
  for (const query of queries) {
    const images = await searchPixabayImages(query, 3);
    allImages.push(...images);
  }

  return allImages.slice(0, 8);
};

export const fetchUserAvatars = async () => {
  const queries = [
    'professional headshot portrait business person',
    'diverse people portraits professional photos',
    'business professional headshots corporate',
    'friendly people portraits smiling faces'
  ];

  const allImages: string[] = [];
  for (const query of queries) {
    const images = await searchPixabayImages(query, 3);
    allImages.push(...images);
  }

  return allImages.slice(0, 8);
};

export const fetchAmbientImages = async () => {
  const queries = [
    'cozy restaurant ambiance warm lighting interior',
    'romantic restaurant atmosphere candles dining',
    'modern restaurant design contemporary ambiance',
    'traditional restaurant authentic atmosphere'
  ];

  const allImages: string[] = [];
  for (const query of queries) {
    const images = await searchPixabayImages(query, 2);
    allImages.push(...images);
  }

  return allImages.slice(0, 6);
};

// Specific image fetchers for different categories
export const fetchCategoryImages = async (category: string) => {
  const categoryQueries: { [key: string]: string[] } = {
    'fine-dining': ['fine dining elegant restaurant luxury interior', 'upscale restaurant sophisticated dining'],
    'fast-food': ['hamburger fast food burger fries', 'quick service restaurant modern counter'],
    'cafes': ['coffee cafe latte cappuccino breakfast', 'cozy cafe interior warm atmosphere'],
    'vegan': ['fresh salad healthy vegan vegetables', 'plant based food colorful vegetables'],
    'desserts': ['delicious cake dessert pastry sweet', 'bakery desserts chocolate cake'],
    'street-food': ['street food tacos authentic local cuisine', 'food truck vendor authentic street'],
    'buffet': ['buffet restaurant food spread variety', 'all you can eat buffet dining'],
    'romantic': ['romantic restaurant intimate dining candles', 'date night restaurant romantic atmosphere']
  };

  const queries = categoryQueries[category] || ['restaurant food dining'];
  const allImages: string[] = [];

  for (const query of queries) {
    const images = await searchPixabayImages(query, 2);
    allImages.push(...images);
  }

  return allImages.slice(0, 3);
};

// Clear cache function for development
export const clearImageCache = () => {
  imageCache.clear();
  usedImages.clear();
};

// Enhanced fallback high-quality images with more variety
const getFallbackImages = () => [
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
  'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80',
  'https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80',
  'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
  'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
  'https://images.unsplash.com/photo-1626132647523-66f5bf380027?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
  'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
  'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
];

// Static getter functions that return dynamic results
export const getHeroImages = () => getFallbackImages();
export const getRestaurantImages = () => getFallbackImages();
export const getFoodImages = () => getFallbackImages();
export const getCuisineImages = () => getFallbackImages();
export const getCityImages = () => getFallbackImages();
export const getDiningImages = () => getFallbackImages();
export const getUserAvatars = () => getFallbackImages();
export const getAmbientImages = () => getFallbackImages();

// Specific dish image mapping for better accuracy
export const getDishImage = (dishName: string, category: string = '') => {
  const dishImages: { [key: string]: string } = {
    // South Indian dishes
    'idli': 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    'masala dosa': 'https://images.unsplash.com/photo-1630383249896-424e482df921?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    'dosa': 'https://images.unsplash.com/photo-1630383249896-424e482df921?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    'vada': 'https://images.unsplash.com/photo-1574484284002-952d92456975?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    'upma': 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    'pongal': 'https://images.unsplash.com/photo-1563379091339-03246963d51a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    'sambar': 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    'rasam': 'https://images.unsplash.com/photo-1574484284002-952d92456975?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    'curd rice': 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    
    // Biryani dishes
    'chicken biryani': 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    'mutton biryani': 'https://images.unsplash.com/photo-1563379091339-03246963d51a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    'egg biryani': 'https://images.unsplash.com/photo-1574484284002-952d92456975?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    'hyderabadi biryani': 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    'lucknowi biryani': 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    
    // North Indian dishes
    'dal makhani': 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    'butter chicken': 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    'paneer butter masala': 'https://images.unsplash.com/photo-1563379091339-03246963d51a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    'tandoori chicken': 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    
    // Beverages
    'filter coffee': 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    'lassi': 'https://images.unsplash.com/photo-1574484284002-952d92456975?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    'kahwa': 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    
    // Desserts
    'rasgulla': 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    'kulfi': 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    'payasam': 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
  };

  const dishKey = dishName.toLowerCase();
  
  // Try exact match first
  if (dishImages[dishKey]) {
    return dishImages[dishKey];
  }
  
  // Try partial matches
  for (const [key, image] of Object.entries(dishImages)) {
    if (dishKey.includes(key) || key.includes(dishKey)) {
      return image;
    }
  }
  
  // Category-based fallbacks
  if (category.toLowerCase().includes('biryani')) {
    return dishImages['chicken biryani'];
  }
  if (category.toLowerCase().includes('dessert')) {
    return dishImages['rasgulla'];
  }
  if (category.toLowerCase().includes('beverage')) {
    return dishImages['filter coffee'];
  }
  
  // Default fallback
  return 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80';
};