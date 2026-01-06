import { useState, useEffect } from "react";
import { Search, Sparkles, TrendingUp } from "lucide-react";
import { getSearchSuggestions } from "../utils/groqApi";

interface AISearchSuggestionsProps {
  query: string;
  onSuggestionClick: (suggestion: string) => void;
  isVisible: boolean;
}

const AISearchSuggestions = ({ query, onSuggestionClick, isVisible }: AISearchSuggestionsProps) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadSuggestions = async () => {
      if (query.length < 2) {
        setSuggestions([]);
        return;
      }

      setLoading(true);
      try {
        const aiSuggestions = await getSearchSuggestions(query);
        setSuggestions(aiSuggestions);
      } catch (error) {
        console.error('Error loading AI suggestions:', error);
        // Fallback suggestions
        setSuggestions([
          `${query} restaurants`,
          `Best ${query} in Chennai`,
          `${query} near me`,
          `Authentic ${query}`,
          `${query} delivery`
        ]);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(loadSuggestions, 300);
    return () => clearTimeout(debounceTimer);
  }, [query]);

  if (!isVisible || (!loading && suggestions.length === 0)) {
    return null;
  }

  return (
    <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-50 mt-1">
      <div className="p-3 border-b border-gray-100">
        <div className="flex items-center text-sm text-gray-600">
          <Sparkles className="h-4 w-4 mr-2 text-orange-500" />
          AI-Powered Suggestions
        </div>
      </div>
      
      {loading ? (
        <div className="p-4">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-orange-500"></div>
            <span className="ml-2 text-sm text-gray-600">Getting smart suggestions...</span>
          </div>
        </div>
      ) : (
        <div className="max-h-64 overflow-y-auto">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => onSuggestionClick(suggestion)}
              className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center transition-colors duration-200"
            >
              <Search className="h-4 w-4 text-gray-400 mr-3" />
              <span className="text-gray-700">{suggestion}</span>
              <TrendingUp className="h-3 w-3 text-orange-500 ml-auto" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AISearchSuggestions;