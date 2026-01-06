import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Leaf, Heart, Shield, Zap, AlertTriangle, Check } from "lucide-react";
import { chennaiRestaurants, Restaurant, MenuItem } from "../data/chennaiRestaurants";

interface DietaryPreference {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  restrictions: string[];
  safeIngredients: string[];
}

interface FilteredResult {
  restaurant: Restaurant;
  safeMenuItems: MenuItem[];
  warningItems: MenuItem[];
  compatibilityScore: number;
}

const DietPreferencesEngine = () => {
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>([]);
  const [filteredResults, setFilteredResults] = useState<FilteredResult[]>([]);
  const [showResults, setShowResults] = useState(false);

  const dietaryPreferences: DietaryPreference[] = [
    {
      id: "vegan",
      name: "Vegan",
      description: "No animal products including dairy, eggs, honey",
      icon: <Leaf className="w-5 h-5" />,
      color: "bg-green-500",
      restrictions: ["dairy", "eggs", "honey", "meat", "fish", "ghee", "paneer", "curd"],
      safeIngredients: ["vegetables", "fruits", "grains", "legumes", "nuts", "seeds"]
    },
    {
      id: "vegetarian",
      name: "Vegetarian",
      description: "No meat, fish, or poultry",
      icon: <Leaf className="w-5 h-5" />,
      color: "bg-green-400",
      restrictions: ["meat", "fish", "chicken", "mutton", "seafood", "eggs"],
      safeIngredients: ["dairy", "vegetables", "fruits", "grains", "paneer"]
    },
    {
      id: "jain",
      name: "Jain",
      description: "No root vegetables, onion, garlic, potatoes",
      icon: <Heart className="w-5 h-5" />,
      color: "bg-orange-500",
      restrictions: ["onion", "garlic", "potato", "carrot", "radish", "beetroot", "ginger"],
      safeIngredients: ["leafy vegetables", "tomato", "capsicum", "dairy", "grains"]
    },
    {
      id: "diabetic",
      name: "Diabetic-Friendly",
      description: "Low sugar, controlled carbs, high fiber",
      icon: <Shield className="w-5 h-5" />,
      color: "bg-blue-500",
      restrictions: ["sugar", "jaggery", "honey", "refined flour", "white rice"],
      safeIngredients: ["brown rice", "whole grains", "vegetables", "lean protein"]
    },
    {
      id: "keto",
      name: "Keto",
      description: "High fat, very low carb, moderate protein",
      icon: <Zap className="w-5 h-5" />,
      color: "bg-purple-500",
      restrictions: ["rice", "wheat", "sugar", "potato", "fruits", "legumes"],
      safeIngredients: ["meat", "fish", "eggs", "cheese", "nuts", "oils", "leafy greens"]
    },
    {
      id: "gluten_free",
      name: "Gluten-Free",
      description: "No wheat, barley, rye, or gluten-containing grains",
      icon: <Shield className="w-5 h-5" />,
      color: "bg-yellow-500",
      restrictions: ["wheat", "barley", "rye", "bread", "pasta", "naan"],
      safeIngredients: ["rice", "corn", "quinoa", "vegetables", "meat", "dairy"]
    },
    {
      id: "lactose_free",
      name: "Lactose-Free",
      description: "No dairy products or lactose",
      icon: <AlertTriangle className="w-5 h-5" />,
      color: "bg-red-500",
      restrictions: ["milk", "cheese", "butter", "ghee", "paneer", "curd", "cream"],
      safeIngredients: ["plant milk", "vegetables", "meat", "grains", "fruits"]
    },
    {
      id: "low_sodium",
      name: "Low Sodium",
      description: "Reduced salt for heart health",
      icon: <Heart className="w-5 h-5" />,
      color: "bg-pink-500",
      restrictions: ["pickles", "papad", "processed foods", "excess salt"],
      safeIngredients: ["fresh vegetables", "fruits", "herbs", "spices", "lean protein"]
    }
  ];

  useEffect(() => {
    // Load saved preferences
    const saved = localStorage.getItem('dietaryPreferences');
    if (saved) {
      setSelectedPreferences(JSON.parse(saved));
    }
  }, []);

  const togglePreference = (preferenceId: string) => {
    const updated = selectedPreferences.includes(preferenceId)
      ? selectedPreferences.filter(id => id !== preferenceId)
      : [...selectedPreferences, preferenceId];
    
    setSelectedPreferences(updated);
    localStorage.setItem('dietaryPreferences', JSON.stringify(updated));
  };

  const analyzeMenuCompatibility = (menuItem: MenuItem, preferences: DietaryPreference[]): {
    isSafe: boolean;
    warnings: string[];
    score: number;
  } => {
    let warnings: string[] = [];
    let score = 100;

    // Check if item is vegetarian when vegan/vegetarian is selected
    if (preferences.some(p => p.id === 'vegan' || p.id === 'vegetarian')) {
      if (!menuItem.isVeg) {
        warnings.push("Contains non-vegetarian ingredients");
        score -= 50;
      }
    }

    // Check for specific restrictions
    preferences.forEach(pref => {
      pref.restrictions.forEach(restriction => {
        if (menuItem.name.toLowerCase().includes(restriction) || 
            menuItem.description.toLowerCase().includes(restriction)) {
          warnings.push(`May contain ${restriction}`);
          score -= 20;
        }
      });
    });

    // Special checks for specific diets
    if (preferences.some(p => p.id === 'diabetic')) {
      if (menuItem.name.toLowerCase().includes('sweet') || 
          menuItem.category === 'Desserts') {
        warnings.push("High sugar content");
        score -= 30;
      }
    }

    if (preferences.some(p => p.id === 'keto')) {
      if (menuItem.name.toLowerCase().includes('rice') || 
          menuItem.name.toLowerCase().includes('bread') ||
          menuItem.category === 'Rice') {
        warnings.push("High carb content");
        score -= 40;
      }
    }

    return {
      isSafe: warnings.length === 0,
      warnings,
      score: Math.max(0, score)
    };
  };

  const filterRestaurants = () => {
    if (selectedPreferences.length === 0) {
      setFilteredResults([]);
      setShowResults(false);
      return;
    }

    const activePreferences = dietaryPreferences.filter(p => 
      selectedPreferences.includes(p.id)
    );

    const results: FilteredResult[] = chennaiRestaurants.map(restaurant => {
      const safeMenuItems: MenuItem[] = [];
      const warningItems: MenuItem[] = [];
      let totalScore = 0;

      restaurant.menu.forEach(item => {
        const analysis = analyzeMenuCompatibility(item, activePreferences);
        
        if (analysis.isSafe) {
          safeMenuItems.push(item);
        } else {
          warningItems.push(item);
        }
        
        totalScore += analysis.score;
      });

      const compatibilityScore = Math.round(totalScore / restaurant.menu.length);

      return {
        restaurant,
        safeMenuItems,
        warningItems,
        compatibilityScore
      };
    })
    .filter(result => result.safeMenuItems.length > 0) // Only show restaurants with safe options
    .sort((a, b) => b.compatibilityScore - a.compatibilityScore);

    setFilteredResults(results);
    setShowResults(true);
  };

  const getPreferenceColor = (preferenceId: string) => {
    const pref = dietaryPreferences.find(p => p.id === preferenceId);
    return pref?.color || 'bg-gray-500';
  };

  return (
    <div className="space-y-6">
      {/* Dietary Preferences Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-green-500" />
            <span>Diet & Health Preferences</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600">
            Select your dietary preferences to get personalized restaurant and menu recommendations.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {dietaryPreferences.map((preference) => (
              <div
                key={preference.id}
                className={`border rounded-lg p-3 md:p-4 cursor-pointer transition-all ${
                  selectedPreferences.includes(preference.id)
                    ? 'border-orange-500 bg-orange-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => togglePreference(preference.id)}
              >
                <div className="flex items-start space-x-2 md:space-x-3">
                  <div className="flex items-center space-x-1 md:space-x-2">
                    <Checkbox
                      checked={selectedPreferences.includes(preference.id)}
                      onChange={() => {}}
                    />
                    <div className={`p-1.5 md:p-2 rounded-lg ${preference.color} text-white`}>
                      {preference.icon}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-xs md:text-sm">{preference.name}</h3>
                    <p className="text-xs text-gray-600 mt-1">{preference.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {selectedPreferences.length > 0 && (
            <div className="space-y-3">
              <Separator />
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {selectedPreferences.map(prefId => {
                    const pref = dietaryPreferences.find(p => p.id === prefId);
                    return (
                      <Badge key={prefId} variant="secondary" className="flex items-center space-x-1">
                        {pref?.icon}
                        <span>{pref?.name}</span>
                      </Badge>
                    );
                  })}
                </div>
                <Button onClick={filterRestaurants} className="bg-green-500 hover:bg-green-600">
                  <Shield className="w-4 h-4 mr-2" />
                  Find Safe Options
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Filtered Results */}
      {showResults && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Check className="w-5 h-5 text-green-500" />
                <span>Compatible Restaurants</span>
              </div>
              <Badge variant="secondary">
                {filteredResults.length} restaurants found
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {filteredResults.map((result) => (
              <div key={result.restaurant.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div 
                      className="w-16 h-16 rounded-lg bg-cover bg-center"
                      style={{ backgroundImage: `url(${result.restaurant.image})` }}
                    />
                    <div>
                      <h3 className="font-semibold text-lg">{result.restaurant.name}</h3>
                      <p className="text-gray-600 text-sm">{result.restaurant.cuisine.join(', ')}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          ⭐ {result.restaurant.rating}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          ₹{result.restaurant.priceForTwo} for two
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      result.compatibilityScore >= 80 ? 'bg-green-100 text-green-800' :
                      result.compatibilityScore >= 60 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {result.compatibilityScore}% Compatible
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Safe Menu Items */}
                  <div>
                    <h4 className="font-medium text-green-700 mb-2 flex items-center space-x-1">
                      <Check className="w-4 h-4" />
                      <span>Safe Options ({result.safeMenuItems.length})</span>
                    </h4>
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      {result.safeMenuItems.slice(0, 5).map((item) => (
                        <div key={item.id} className="flex items-center justify-between text-sm">
                          <span className="flex items-center space-x-2">
                            <div className={`w-2 h-2 rounded-full ${item.isVeg ? 'bg-green-500' : 'bg-red-500'}`} />
                            <span>{item.name}</span>
                          </span>
                          <span className="text-gray-600">₹{item.price}</span>
                        </div>
                      ))}
                      {result.safeMenuItems.length > 5 && (
                        <p className="text-xs text-gray-500">
                          +{result.safeMenuItems.length - 5} more safe options
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Warning Items */}
                  {result.warningItems.length > 0 && (
                    <div>
                      <h4 className="font-medium text-yellow-700 mb-2 flex items-center space-x-1">
                        <AlertTriangle className="w-4 h-4" />
                        <span>Items to Avoid ({result.warningItems.length})</span>
                      </h4>
                      <div className="space-y-2 max-h-32 overflow-y-auto">
                        {result.warningItems.slice(0, 3).map((item) => (
                          <div key={item.id} className="text-sm text-gray-600">
                            <span className="flex items-center space-x-2">
                              <div className={`w-2 h-2 rounded-full ${item.isVeg ? 'bg-green-500' : 'bg-red-500'}`} />
                              <span>{item.name}</span>
                            </span>
                          </div>
                        ))}
                        {result.warningItems.length > 3 && (
                          <p className="text-xs text-gray-500">
                            +{result.warningItems.length - 3} more items to check
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-4 border-t flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {selectedPreferences.map(prefId => (
                      <div key={prefId} className={`w-3 h-3 rounded-full ${getPreferenceColor(prefId)}`} />
                    ))}
                  </div>
                  <Button variant="outline" size="sm">
                    View Full Menu
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* No Results */}
      {showResults && filteredResults.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <AlertTriangle className="w-12 h-12 mx-auto text-yellow-500 mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Compatible Restaurants Found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your dietary preferences or contact restaurants directly for custom options.
            </p>
            <Button variant="outline" onClick={() => setSelectedPreferences([])}>
              Clear Preferences
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DietPreferencesEngine;