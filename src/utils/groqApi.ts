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

export interface DishRecommendation {
  id: string;
  name: string;
  restaurantName: string;
  restaurantId: string;
  price: number;
  description: string;
  image: string;
  category: string;
  isVeg: boolean;
  isSpicy?: boolean;
}

export interface OfferRecommendation {
  id: string;
  title: string;
  description: string;
  discount: string;
  restaurantName: string;
  restaurantId: string;
  validUntil: string;
  image: string;
  terms: string;
  originalPrice: number;
  discountedPrice: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface ChatResponse {
  message: string;
  suggestions?: string[];
  recommendations?: RestaurantRecommendation[];
  dishes?: DishRecommendation[];
  offers?: OfferRecommendation[];
}

// Enhanced chatbot function with robust fallback system
export const getChatbotResponse = async (
  message: string,
  conversationHistory: ChatMessage[] = []
): Promise<ChatResponse> => {
  // Analyze the message to determine what type of recommendations to provide
  const lowerMessage = message.toLowerCase();
  const isAskingForOffers = lowerMessage.includes('offer') || lowerMessage.includes('deal') || lowerMessage.includes('discount') || lowerMessage.includes('promotion');
  const isAskingForDishes = lowerMessage.includes('dish') || lowerMessage.includes('food') || lowerMessage.includes('menu') || lowerMessage.includes('eat') || lowerMessage.includes('popular');
  const isAskingForRestaurants = lowerMessage.includes('restaurant') || lowerMessage.includes('place') || lowerMessage.includes('where') || lowerMessage.includes('romantic') || lowerMessage.includes('family');

  // Prepare fallback data first
  const fallbackData = generateFallbackRecommendations(lowerMessage, isAskingForOffers, isAskingForDishes, isAskingForRestaurants);

  try {
    // Only try Groq API if we have the key
    if (!GROQ_API_KEY) {
      return fallbackData;
    }

    const context = `You are a helpful restaurant recommendation assistant for Chennai, India. 
    You help users find restaurants, dishes, and dining experiences based on their preferences.
    
    Available restaurants in Chennai:
    ${chennaiRestaurants.slice(0, 5).map(r => 
      `${r.name}: ${r.cuisine.join(', ')} cuisine, ₹${r.priceForTwo} for two, Rating: ${r.rating}/5`
    ).join('\n')}
    
    Guidelines:
    - Be friendly and conversational
    - Provide specific recommendations
    - Keep responses concise (max 2 sentences)
    - Focus on helping the user find what they're looking for`;

    const messages = [
      { role: 'system', content: context },
      { role: 'user', content: message }
    ];

    const completion = await groq.chat.completions.create({
      messages: messages as any,
      model: 'llama3-8b-8192',
      temperature: 0.7,
      max_tokens: 200,
    });

    const response = completion.choices[0]?.message?.content;
    
    // If we get a response from Groq, use it with our fallback recommendations
    if (response) {
      return {
        ...fallbackData,
        message: response
      };
    } else {
      return fallbackData;
    }

  } catch (error) {
    console.error('Groq API error, using fallback:', error);
    // Return fallback data with recommendations
    return fallbackData;
  }
};

// Generate fallback recommendations based on user query
const generateFallbackRecommendations = (
  lowerMessage: string,
  isAskingForOffers: boolean,
  isAskingForDishes: boolean,
  isAskingForRestaurants: boolean
): ChatResponse => {
  const recommendations: RestaurantRecommendation[] = [];
  const dishes: DishRecommendation[] = [];
  const offers: OfferRecommendation[] = [];

  // Generate appropriate message
  let message = "Here are some great recommendations for you!";
  
  if (isAskingForOffers) {
    message = "I found some amazing offers for you! Check out these special deals:";
  } else if (isAskingForDishes) {
    message = "Here are some delicious dishes you might love:";
  } else if (isAskingForRestaurants) {
    message = "I've found some perfect restaurants for you:";
  }

  // Get restaurant recommendations
  if (isAskingForRestaurants || (!isAskingForOffers && !isAskingForDishes)) {
    let selectedRestaurants = chennaiRestaurants.slice(0, 3);
    
    // Filter based on user preferences
    if (lowerMessage.includes('romantic')) {
      selectedRestaurants = chennaiRestaurants.filter(r => 
        r.priceForTwo > 800 || r.rating > 4.4
      ).slice(0, 3);
      message = "Perfect romantic restaurants for a special evening:";
    } else if (lowerMessage.includes('family')) {
      selectedRestaurants = chennaiRestaurants.filter(r => 
        r.features.includes('Family Friendly') || r.dineTypes.includes('Family Dining')
      ).slice(0, 3);
      message = "Great family-friendly restaurants:";
    } else if (lowerMessage.includes('budget')) {
      selectedRestaurants = chennaiRestaurants.filter(r => r.priceForTwo < 600).slice(0, 3);
      message = "Budget-friendly restaurants with great food:";
    } else if (lowerMessage.includes('south indian')) {
      selectedRestaurants = chennaiRestaurants.filter(r => 
        r.cuisine.includes('South Indian')
      ).slice(0, 3);
      message = "Authentic South Indian restaurants:";
    }

    selectedRestaurants.forEach(restaurant => {
      recommendations.push({
        id: restaurant.id,
        name: restaurant.name,
        reason: `${restaurant.cuisine.join(' & ')} cuisine with ${restaurant.rating} rating`,
        cuisine: restaurant.cuisine,
        rating: restaurant.rating,
        priceForTwo: restaurant.priceForTwo,
        image: restaurant.image,
        specialDishes: restaurant.menu.slice(0, 3).map(m => m.name)
      });
    });
  }

  // Get dish recommendations
  if (isAskingForDishes) {
    const allDishes = chennaiRestaurants.flatMap(restaurant => 
      restaurant.menu.map(dish => ({
        ...dish,
        restaurantName: restaurant.name,
        restaurantId: restaurant.id
      }))
    );

    let filteredDishes = allDishes;
    
    if (lowerMessage.includes('veg')) {
      filteredDishes = allDishes.filter(dish => dish.isVeg);
      message = "Delicious vegetarian dishes for you:";
    } else if (lowerMessage.includes('spicy')) {
      filteredDishes = allDishes.filter(dish => dish.isSpicy);
      message = "Spicy dishes to satisfy your cravings:";
    } else if (lowerMessage.includes('biryani')) {
      filteredDishes = allDishes.filter(dish => dish.name.toLowerCase().includes('biryani'));
      message = "Best biryani dishes in Chennai:";
    } else if (lowerMessage.includes('breakfast')) {
      filteredDishes = allDishes.filter(dish => 
        dish.name.toLowerCase().includes('idli') || 
        dish.name.toLowerCase().includes('dosa') || 
        dish.name.toLowerCase().includes('upma')
      );
      message = "Perfect breakfast dishes to start your day:";
    } else if (lowerMessage.includes('popular')) {
      // Get dishes from highly rated restaurants
      filteredDishes = allDishes.filter(dish => {
        const restaurant = chennaiRestaurants.find(r => r.id === dish.restaurantId);
        return restaurant && restaurant.rating > 4.3;
      });
      message = "Most popular dishes everyone loves:";
    }

    const selectedDishes = filteredDishes.slice(0, 4);
    
    selectedDishes.forEach(dish => {
      dishes.push({
        id: dish.id,
        name: dish.name,
        restaurantName: dish.restaurantName,
        restaurantId: dish.restaurantId,
        price: dish.price,
        description: dish.description,
        image: dish.image,
        category: dish.category,
        isVeg: dish.isVeg,
        isSpicy: dish.isSpicy
      });
    });
  }

  // Generate offers
  if (isAskingForOffers) {
    const offerRestaurants = chennaiRestaurants.slice(0, 4);
    
    offerRestaurants.forEach((restaurant, index) => {
      const discountPercentages = [25, 20, 30, 15];
      const discountPercentage = discountPercentages[index];
      const originalPrice = restaurant.priceForTwo;
      const discountedPrice = Math.round(originalPrice * (1 - discountPercentage / 100));
      
      offers.push({
        id: `offer-${restaurant.id}`,
        title: `${discountPercentage}% OFF at ${restaurant.name}`,
        description: `Enjoy authentic ${restaurant.cuisine.join(' & ')} cuisine with special discount`,
        discount: `${discountPercentage}% OFF`,
        restaurantName: restaurant.name,
        restaurantId: restaurant.id,
        validUntil: '2024-12-31',
        image: restaurant.image,
        terms: `Valid on orders above ₹${Math.round(originalPrice * 0.4)}. Cannot be combined with other offers.`,
        originalPrice,
        discountedPrice
      });
    });
  }

  // Generate contextual suggestions
  let suggestions: string[] = [];
  if (isAskingForOffers) {
    suggestions = [
      "Show me more offers",
      "Find budget restaurants",
      "What's the best deal today?",
      "Recommend lunch offers"
    ];
  } else if (isAskingForDishes) {
    suggestions = [
      "Show me vegetarian dishes",
      "Find spicy food options",
      "Recommend desserts",
      "What's popular for breakfast?"
    ];
  } else {
    suggestions = [
      "Show me current offers",
      "Recommend popular dishes",
      "Find romantic restaurants",
      "What's good for family dining?"
    ];
  }

  return {
    message,
    suggestions: suggestions.slice(0, 3),
    recommendations: recommendations.length > 0 ? recommendations : undefined,
    dishes: dishes.length > 0 ? dishes : undefined,
    offers: offers.length > 0 ? offers : undefined
  };
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
      `${query} restaurants in Chennai`,
      `Best ${query} near me`,
      `${query} delivery`,
      `Authentic ${query}`,
      `${query} with good ratings`
    ];
  }
};

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