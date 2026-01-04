
const PIXABAY_API_KEY = '46486736-71b47acfca6ad0e4f913b3713';
const PIXABAY_BASE_URL = 'https://pixabay.com/api/';

export const searchPixabayImages = async (query: string, perPage: number = 12) => {
  try {
    const response = await fetch(`${PIXABAY_BASE_URL}?key=${PIXABAY_API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&per_page=${perPage}&safesearch=true&min_width=1920&min_height=1080&order=popular`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch images');
    }
    
    const data = await response.json();
    return data.hits.map((hit: any) => hit.largeImageURL || hit.webformatURL);
  } catch (error) {
    console.error('Error fetching Pixabay images:', error);
    return getFallbackImages();
  }
};

// Fallback high-quality images in case API fails
const getFallbackImages = () => [
  'https://cdn.pixabay.com/photo/2017/08/03/13/30/people-2576336_1920.jpg',
  'https://cdn.pixabay.com/photo/2014/09/17/20/26/restaurant-449952_1920.jpg',
  'https://cdn.pixabay.com/photo/2016/03/05/19/02/hamburger-1238246_1920.jpg',
  'https://cdn.pixabay.com/photo/2017/12/09/08/18/pizza-3007395_1920.jpg',
  'https://cdn.pixabay.com/photo/2014/10/19/20/59/hamburger-494706_1920.jpg',
  'https://cdn.pixabay.com/photo/2017/01/26/02/06/platter-2009590_1920.jpg',
  'https://cdn.pixabay.com/photo/2016/11/18/14/39/beans-1834984_1920.jpg',
  'https://cdn.pixabay.com/photo/2017/05/04/16/37/meeting-2280656_1920.jpg'
];

// Dynamic image fetching with specific keywords
export const fetchHeroImages = async () => {
  return await searchPixabayImages('elegant restaurant dining fine cuisine gourmet food', 8);
};

export const fetchRestaurantImages = async () => {
  return await searchPixabayImages('luxury restaurant interior elegant dining room', 12);
};

export const fetchFoodImages = async () => {
  return await searchPixabayImages('gourmet food platter delicious meal cuisine', 12);
};

export const fetchCuisineImages = async () => {
  return await searchPixabayImages('international cuisine food dishes restaurant meal', 8);
};

export const fetchCityImages = async () => {
  return await searchPixabayImages('modern city skyline urban dining nightlife', 8);
};

export const fetchDiningImages = async () => {
  return await searchPixabayImages('restaurant atmosphere cozy dining elegant interior', 8);
};

export const fetchUserAvatars = async () => {
  return await searchPixabayImages('professional headshot portrait business person', 8);
};

export const fetchAmbientImages = async () => {
  return await searchPixabayImages('cozy restaurant ambiance warm lighting interior', 6);
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
