import Groq from 'groq-sdk';
import { chennaiRestaurants } from '../data/chennaiRestaurants';

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;

if (!GROQ_API_KEY) {
  console.warn('GROQ_API_KEY not found in environment variables');
}

// Initialize Groq client
const groq = new Groq({
  apiKey: GROQ_API_KEY,
  dangerouslyAllowBrowser: true // For client-side usage
});

export interface FoodRecommendation {
  restaurantId: string;
  restaurantName: string;
  dishName: string;
  reason: string;
  price: number;
  image: string;
  category: string;
}

export interface RestaurantRecommendation {
  id: string;
  name: string;
  reason: string;
  cuisine: string[];
  rating: number;
  priceForTwo: number;
  image: string;
  specialDishes: string[];
}

export interface OfferRecommendation {
  title: string;
  description: string;
  discount: string;
  restaurantName: string;
  validUntil: string;
  image: string;
  terms: string;
}

// Get food recommendations based on user preferences
export const getFoodRecommendations = async (
  preferences: {
    cuisine?: string;
    budget?: number;
    dietary?: string;
    mood?: string;
    occasion?: string;
  }
): Promise<FoodRecommendation[]> => {
  try {
    const prompt = `Based on the following preferences, recommend 5 specific dishes from Chennai restaurants:
    - Cuisine preference: ${preferences.cuisine || 'any'}
    - Budget per dish: ₹${preferences.budget || 500}
    - Dietary preference: ${preferences.dietary || 'any'}
    - Mood: ${preferences.mood || 'casual'}
    - Occasion: ${preferences.occasion || 'regular meal'}

    Available restaurants and their specialties:
    ${chennaiRestaurants.map(r => `${r.name}: ${r.cuisine.join(', ')} - Known for ${r.menu.map(m => m.name).join(', ')}`).join('\n')}

    Respond with exactly 5 recommendations in this JSON format:
    [
      {
        "restaurantName": "Restaurant Name",
        "dishName": "Dish Name",
        "reason": "Why this dish is perfect for the user",
        "category": "Main Course/Appetizer/Dessert/Beverage"
      }
    ]`;

    const completion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'llama3-8b-8192',
      temperature: 0.7,
      max_tokens: 1000,
    });

    const response = completion.choices[0]?.message?.content;
    if (!response) throw new Error('No response from Groq API');

    const recommendations = JSON.parse(response);
    
    // Match with actual restaurant data and add images
    return recommendations.map((rec: any) => {
      const restaurant = chennaiRestaurants.find(r => 
        r.name.toLowerCase().includes(rec.restaurantName.toLowerCase())
      );
      
      const dish = restaurant?.menu.find(m => 
        m.name.toLowerCase().includes(rec.dishName.toLowerCase())
      );

      return {
        restaurantId: restaurant?.id || '',
        restaurantName: restaurant?.name || rec.restaurantName,
        dishName: dish?.name || rec.dishName,
        reason: rec.reason,
        price: dish?.price || 0,
        image: dish?.image || restaurant?.image || 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        category: dish?.category || rec.category
      };
    });
  } catch (error) {
    console.error('Error getting food recommendations:', error);
    // Fallback recommendations
    return [
      {
        restaurantId: 'murugan-idli-shop',
        restaurantName: 'Murugan Idli Shop',
        dishName: 'Idli with Sambar & Chutney',
        reason: 'Perfect traditional South Indian breakfast, light and healthy',
        price: 60,
        image: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        category: 'Main Course'
      },
      {
        restaurantId: 'buhari-hotel',
        restaurantName: 'Buhari Hotel',
        dishName: 'Chicken Biryani',
        reason: 'Legendary Chennai biryani with authentic flavors and tender chicken',
        price: 320,
        image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        category: 'Biryani'
      }
    ];
  }
};

// Get restaurant recommendations based on user context
export const getRestaurantRecommendations = async (
  context: {
    location?: string;
    occasion?: string;
    groupSize?: number;
    budget?: number;
    cuisine?: string;
  }
): Promise<RestaurantRecommendation[]> => {
  try {
    const prompt = `Recommend 4 restaurants in Chennai for the following context:
    - Location preference: ${context.location || 'anywhere in Chennai'}
    - Occasion: ${context.occasion || 'casual dining'}
    - Group size: ${context.groupSize || 2} people
    - Budget for two: ₹${context.budget || 1000}
    - Cuisine preference: ${context.cuisine || 'any'}

    Available restaurants:
    ${chennaiRestaurants.map(r => `${r.name}: ${r.cuisine.join(', ')}, ₹${r.priceForTwo} for two, Rating: ${r.rating}, Location: ${r.address}`).join('\n')}

    Respond with exactly 4 recommendations in this JSON format:
    [
      {
        "restaurantName": "Restaurant Name",
        "reason": "Why this restaurant is perfect for the context",
        "specialDishes": ["dish1", "dish2", "dish3"]
      }
    ]`;

    const completion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'llama3-8b-8192',
      temperature: 0.7,
      max_tokens: 1000,
    });

    const response = completion.choices[0]?.message?.content;
    if (!response) throw new Error('No response from Groq API');

    const recommendations = JSON.parse(response);
    
    return recommendations.map((rec: any) => {
      const restaurant = chennaiRestaurants.find(r => 
        r.name.toLowerCase().includes(rec.restaurantName.toLowerCase())
      );

      return {
        id: restaurant?.id || '',
        name: restaurant?.name || rec.restaurantName,
        reason: rec.reason,
        cuisine: restaurant?.cuisine || [],
        rating: restaurant?.rating || 4.0,
        priceForTwo: restaurant?.priceForTwo || 500,
        image: restaurant?.image || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        specialDishes: rec.specialDishes || []
      };
    });
  } catch (error) {
    console.error('Error getting restaurant recommendations:', error);
    // Fallback recommendations
    return chennaiRestaurants.slice(0, 4).map(restaurant => ({
      id: restaurant.id,
      name: restaurant.name,
      reason: `Highly rated ${restaurant.cuisine.join(' & ')} restaurant with excellent reviews`,
      cuisine: restaurant.cuisine,
      rating: restaurant.rating,
      priceForTwo: restaurant.priceForTwo,
      image: restaurant.image,
      specialDishes: restaurant.menu.slice(0, 3).map(m => m.name)
    }));
  }
};

// Generate personalized offers
export const getPersonalizedOffers = async (
  userProfile: {
    favoriteRestaurants?: string[];
    favoriteCuisines?: string[];
    averageSpending?: number;
    diningFrequency?: string;
  }
): Promise<OfferRecommendation[]> => {
  try {
    const prompt = `Generate 3 personalized restaurant offers for a user with these preferences:
    - Favorite restaurants: ${userProfile.favoriteRestaurants?.join(', ') || 'none specified'}
    - Favorite cuisines: ${userProfile.favoriteCuisines?.join(', ') || 'varied'}
    - Average spending: ₹${userProfile.averageSpending || 500} per meal
    - Dining frequency: ${userProfile.diningFrequency || 'weekly'}

    Available restaurants: ${chennaiRestaurants.map(r => r.name).join(', ')}

    Create attractive offers that would appeal to this user. Respond in this JSON format:
    [
      {
        "title": "Offer Title",
        "description": "Detailed offer description",
        "discount": "20% OFF or Buy 1 Get 1 etc",
        "restaurantName": "Restaurant Name",
        "validUntil": "Date",
        "terms": "Terms and conditions"
      }
    ]`;

    const completion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'llama3-8b-8192',
      temperature: 0.8,
      max_tokens: 1000,
    });

    const response = completion.choices[0]?.message?.content;
    if (!response) throw new Error('No response from Groq API');

    const offers = JSON.parse(response);
    
    return offers.map((offer: any) => {
      const restaurant = chennaiRestaurants.find(r => 
        r.name.toLowerCase().includes(offer.restaurantName.toLowerCase())
      );

      return {
        title: offer.title,
        description: offer.description,
        discount: offer.discount,
        restaurantName: restaurant?.name || offer.restaurantName,
        validUntil: offer.validUntil,
        image: restaurant?.image || 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        terms: offer.terms
      };
    });
  } catch (error) {
    console.error('Error getting personalized offers:', error);
    // Fallback offers
    return [
      {
        title: '20% OFF on South Indian Breakfast',
        description: 'Start your day with authentic South Indian breakfast at unbeatable prices',
        discount: '20% OFF',
        restaurantName: 'Murugan Idli Shop',
        validUntil: '2024-07-31',
        image: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        terms: 'Valid on orders above ₹200. Cannot be combined with other offers.'
      },
      {
        title: 'Buy 1 Get 1 Biryani',
        description: 'Double the joy with our signature biryani offer',
        discount: 'Buy 1 Get 1',
        restaurantName: 'Buhari Hotel',
        validUntil: '2024-07-31',
        image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        terms: 'Valid on Chicken and Mutton Biryani. Dine-in only.'
      }
    ];
  }
};

// Get AI-powered search suggestions
export const getSearchSuggestions = async (query: string): Promise<string[]> => {
  try {
    const prompt = `Given the search query "${query}", suggest 5 related food/restaurant search terms that would be helpful for someone looking for restaurants in Chennai.

    Available restaurants and cuisines: ${chennaiRestaurants.map(r => `${r.name} (${r.cuisine.join(', ')})`).join(', ')}

    Respond with exactly 5 suggestions as a JSON array of strings:
    ["suggestion1", "suggestion2", "suggestion3", "suggestion4", "suggestion5"]`;

    const completion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'llama3-8b-8192',
      temperature: 0.6,
      max_tokens: 200,
    });

    const response = completion.choices[0]?.message?.content;
    if (!response) throw new Error('No response from Groq API');

    return JSON.parse(response);
  } catch (error) {
    console.error('Error getting search suggestions:', error);
    return [
      'South Indian breakfast',
      'Biryani restaurants',
      'Vegetarian thali',
      'North Indian curry',
      'Coffee and snacks'
    ];
  }
};