
const PIXABAY_API_KEY = '51101534-5ea0626a1f88bac19855c0037';
const PIXABAY_BASE_URL = 'https://pixabay.com/api/';

// Cache to store fetched images and avoid duplicates
const imageCache = new Map<string, string[]>();
const usedImages = new Set<string>();

export const searchPixabayImages = async (query: string, perPage: number = 12, page: number = 1) => {
  const cacheKey = `${query}-${perPage}-${page}`;

  // Check cache first
  if (imageCache.has(cacheKey)) {
    return imageCache.get(cacheKey)!;
  }

  try {
    const response = await fetch(
      `${PIXABAY_BASE_URL}?key=${PIXABAY_API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&per_page=${perPage}&page=${page}&safesearch=true&min_width=1920&min_height=1080&order=popular&category=food,places,backgrounds`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch images');
    }

    const data = await response.json();
    const images = data.hits.map((hit: any) => hit.largeImageURL || hit.webformatURL);

    // Filter out already used images to ensure uniqueness
    const uniqueImages = images.filter((img: string) => !usedImages.has(img));

    // Add to used images set
    uniqueImages.forEach((img: string) => usedImages.add(img));

    // Cache the results
    imageCache.set(cacheKey, uniqueImages);

    return uniqueImages;
  } catch (error) {
    console.error('Error fetching Pixabay images:', error);
    return getFallbackImages().slice(0, perPage);
  }
};

// Enhanced fallback high-quality images with more variety
const getFallbackImages = () => [
  'https://cdn.pixabay.com/photo/2017/08/03/13/30/people-2576336_1920.jpg',
  'https://cdn.pixabay.com/photo/2014/09/17/20/26/restaurant-449952_1920.jpg',
  'https://cdn.pixabay.com/photo/2016/03/05/19/02/hamburger-1238246_1920.jpg',
  'https://cdn.pixabay.com/photo/2017/12/09/08/18/pizza-3007395_1920.jpg',
  'https://cdn.pixabay.com/photo/2014/10/19/20/59/hamburger-494706_1920.jpg',
  'https://cdn.pixabay.com/photo/2017/01/26/02/06/platter-2009590_1920.jpg',
  'https://cdn.pixabay.com/photo/2016/11/18/14/39/beans-1834984_1920.jpg',
  'https://cdn.pixabay.com/photo/2017/05/04/16/37/meeting-2280656_1920.jpg',
  'https://cdn.pixabay.com/photo/2015/03/26/09/47/sky-690293_1920.jpg',
  'https://cdn.pixabay.com/photo/2017/08/06/12/06/people-2591874_1920.jpg',
  'https://cdn.pixabay.com/photo/2016/11/29/05/45/astronomy-1867616_1920.jpg',
  'https://cdn.pixabay.com/photo/2017/09/16/19/21/salad-2756467_1920.jpg',
  'https://cdn.pixabay.com/photo/2018/07/18/19/12/pasta-3547078_1920.jpg',
  'https://cdn.pixabay.com/photo/2017/05/01/05/18/pastry-2274750_1920.jpg',
  'https://cdn.pixabay.com/photo/2016/12/26/17/28/spaghetti-1932466_1920.jpg',
  'https://cdn.pixabay.com/photo/2017/06/06/22/46/mediterranean-cuisine-2378758_1920.jpg'
];

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

// Static getter functions that return dynamic results
export const getHeroImages = () => getFallbackImages();
export const getRestaurantImages = () => getFallbackImages();
export const getFoodImages = () => getFallbackImages();
export const getCuisineImages = () => getFallbackImages();
export const getCityImages = () => getFallbackImages();
export const getDiningImages = () => getFallbackImages();
export const getUserAvatars = () => getFallbackImages();
export const getAmbientImages = () => getFallbackImages();
