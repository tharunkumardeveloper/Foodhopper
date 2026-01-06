import { useState, useRef, useEffect } from "react";
import { MessageCircle, Send, X, Bot, User, Sparkles, Tag, Utensils, Percent } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getChatbotResponse, ChatMessage, RestaurantRecommendation, DishRecommendation, OfferRecommendation } from "../utils/groqApi";
import { useNavigate } from "react-router-dom";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hi! I'm your AI restaurant assistant. I can help you find restaurants, discover amazing dishes, and show you the best offers in Chennai. What would you like to explore today?",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([
    "Show me current offers",
    "Recommend popular dishes",
    "Find romantic restaurants",
    "What's good for breakfast?"
  ]);
  const [recommendations, setRecommendations] = useState<RestaurantRecommendation[]>([]);
  const [dishes, setDishes] = useState<DishRecommendation[]>([]);
  const [offers, setOffers] = useState<OfferRecommendation[]>([]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (message?: string) => {
    const messageToSend = message || inputMessage.trim();
    if (!messageToSend || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: messageToSend,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    // Clear previous recommendations
    setRecommendations([]);
    setDishes([]);
    setOffers([]);

    try {
      const response = await getChatbotResponse(messageToSend, messages);
      
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.message,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
      
      // Set new recommendations
      if (response.suggestions) {
        setSuggestions(response.suggestions);
      }
      
      if (response.recommendations) {
        setRecommendations(response.recommendations);
      }
      
      if (response.dishes) {
        setDishes(response.dishes);
      }
      
      if (response.offers) {
        setOffers(response.offers);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I'm having trouble right now, but let me show you some great options!",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
      
      // Show fallback recommendations
      const fallbackRestaurants = [
        {
          id: 'murugan-idli-shop',
          name: 'Murugan Idli Shop',
          reason: 'Famous for authentic South Indian breakfast',
          cuisine: ['South Indian', 'Vegetarian'],
          rating: 4.5,
          priceForTwo: 300,
          image: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
          specialDishes: ['Idli', 'Dosa', 'Filter Coffee']
        }
      ];
      setRecommendations(fallbackRestaurants);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRestaurantClick = (restaurantId: string) => {
    navigate(`/restaurant/${restaurantId}`);
    setIsOpen(false);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <>
      {/* Chatbot Toggle Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 h-14 w-14 rounded-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 shadow-lg z-40 transition-all duration-300 ${
          isOpen ? 'scale-0' : 'scale-100'
        }`}
      >
        <MessageCircle className="h-6 w-6 text-white" />
      </Button>

      {/* Chatbot Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl z-50 flex flex-col border border-gray-200">
          {/* Header */}
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-t-2xl">
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold">Restaurant Assistant</h3>
                <p className="text-xs opacity-90">Powered by AI</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20 h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start space-x-2 max-w-[80%] ${
                  message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                }`}>
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                    message.role === 'user' 
                      ? 'bg-orange-500 text-white' 
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {message.role === 'user' ? (
                      <User className="h-4 w-4" />
                    ) : (
                      <Bot className="h-4 w-4" />
                    )}
                  </div>
                  <div className={`rounded-2xl px-4 py-2 ${
                    message.role === 'user'
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    <p className="text-sm">{message.content}</p>
                    <p className={`text-xs mt-1 ${
                      message.role === 'user' ? 'text-orange-100' : 'text-gray-500'
                    }`}>
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Restaurant Recommendations */}
            {recommendations.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <Sparkles className="h-4 w-4 mr-2 text-orange-500" />
                  Recommended Restaurants
                </div>
                {recommendations.map((restaurant) => (
                  <div
                    key={restaurant.id}
                    onClick={() => handleRestaurantClick(restaurant.id)}
                    className="bg-gray-50 rounded-lg p-3 cursor-pointer hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <img
                        src={restaurant.image}
                        alt={restaurant.name}
                        className="h-12 w-12 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm">{restaurant.name}</h4>
                        <p className="text-xs text-gray-600">{restaurant.cuisine.join(', ')}</p>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-xs text-orange-600">₹{restaurant.priceForTwo} for two</span>
                          <span className="text-xs text-gray-500">★ {restaurant.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Dish Recommendations */}
            {dishes.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <Utensils className="h-4 w-4 mr-2 text-green-500" />
                  Recommended Dishes
                </div>
                {dishes.map((dish) => (
                  <div
                    key={dish.id}
                    onClick={() => handleRestaurantClick(dish.restaurantId)}
                    className="bg-green-50 rounded-lg p-3 cursor-pointer hover:bg-green-100 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <img
                        src={dish.image}
                        alt={dish.name}
                        className="h-12 w-12 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm">{dish.name}</h4>
                        <p className="text-xs text-gray-600">{dish.restaurantName}</p>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-xs text-green-600">₹{dish.price}</span>
                          <div className="flex items-center space-x-1">
                            {dish.isVeg && <span className="text-xs bg-green-100 text-green-800 px-1 rounded">Veg</span>}
                            {dish.isSpicy && <span className="text-xs bg-red-100 text-red-800 px-1 rounded">Spicy</span>}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Offer Recommendations */}
            {offers.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <Tag className="h-4 w-4 mr-2 text-purple-500" />
                  Special Offers
                </div>
                {offers.map((offer) => (
                  <div
                    key={offer.id}
                    onClick={() => handleRestaurantClick(offer.restaurantId)}
                    className="bg-purple-50 rounded-lg p-3 cursor-pointer hover:bg-purple-100 transition-colors border border-purple-200"
                  >
                    <div className="flex items-center space-x-3">
                      <img
                        src={offer.image}
                        alt={offer.restaurantName}
                        className="h-12 w-12 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-semibold text-sm">{offer.title}</h4>
                          <span className="bg-purple-500 text-white text-xs px-2 py-1 rounded-full flex items-center">
                            <Percent className="h-3 w-3 mr-1" />
                            {offer.discount}
                          </span>
                        </div>
                        <p className="text-xs text-gray-600 mb-1">{offer.restaurantName}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-gray-500 line-through">₹{offer.originalPrice}</span>
                            <span className="text-xs text-purple-600 font-semibold">₹{offer.discountedPrice}</span>
                          </div>
                          <span className="text-xs text-gray-500">Valid till {offer.validUntil}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Loading indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-center space-x-2">
                  <div className="h-8 w-8 bg-gray-100 rounded-full flex items-center justify-center">
                    <Bot className="h-4 w-4 text-gray-600" />
                  </div>
                  <div className="bg-gray-100 rounded-2xl px-4 py-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions */}
          {suggestions.length > 0 && (
            <div className="px-4 py-2 border-t border-gray-100">
              <div className="flex flex-wrap gap-2">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSendMessage(suggestion)}
                    className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full transition-colors"
                    disabled={isLoading}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-gray-100">
            <div className="flex space-x-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask me about restaurants..."
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                disabled={isLoading}
                className="flex-1"
              />
              <Button
                onClick={() => handleSendMessage()}
                disabled={isLoading || !inputMessage.trim()}
                size="sm"
                className="bg-orange-500 hover:bg-orange-600"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;