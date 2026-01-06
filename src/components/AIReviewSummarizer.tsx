import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Brain, Star, ThumbsUp, ThumbsDown, Clock, Users, Utensils, MapPin, Volume2 } from "lucide-react";

interface ReviewInsight {
  category: string;
  insight: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  confidence: number;
  icon: React.ReactNode;
  color: string;
  examples: string[];
}

interface ReviewSummary {
  restaurantId: string;
  restaurantName: string;
  totalReviews: number;
  averageRating: number;
  lastUpdated: string;
  insights: ReviewInsight[];
  keyHighlights: string[];
  commonComplaints: string[];
  bestFor: string[];
  worstFor: string[];
  trendingTopics: string[];
}

const AIReviewSummarizer = ({ restaurantId, restaurantName }: { restaurantId: string; restaurantName: string }) => {
  const [summary, setSummary] = useState<ReviewSummary | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    generateSummary();
  }, [restaurantId]);

  const generateSummary = async () => {
    setIsLoading(true);
    
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Mock AI-generated insights based on restaurant type
    const mockSummary: ReviewSummary = {
      restaurantId,
      restaurantName,
      totalReviews: Math.floor(Math.random() * 3000) + 500,
      averageRating: 4.2 + Math.random() * 0.6,
      lastUpdated: new Date().toISOString(),
      insights: [
        {
          category: "Food Quality",
          insight: "Consistently praised for authentic flavors and fresh ingredients",
          sentiment: 'positive',
          confidence: 92,
          icon: <Utensils className="w-4 h-4" />,
          color: "text-green-600",
          examples: ["Amazing taste!", "Fresh and authentic", "Best food in the area"]
        },
        {
          category: "Service",
          insight: "Quick service but can be impersonal during peak hours",
          sentiment: 'neutral',
          confidence: 78,
          icon: <Users className="w-4 h-4" />,
          color: "text-yellow-600",
          examples: ["Fast service", "Staff could be friendlier", "Efficient but rushed"]
        },
        {
          category: "Ambience",
          insight: "Casual dining atmosphere, perfect for families",
          sentiment: 'positive',
          confidence: 85,
          icon: <MapPin className="w-4 h-4" />,
          color: "text-blue-600",
          examples: ["Great for families", "Comfortable seating", "Clean and well-maintained"]
        },
        {
          category: "Value",
          insight: "Excellent value for money with generous portions",
          sentiment: 'positive',
          confidence: 89,
          icon: <Star className="w-4 h-4" />,
          color: "text-purple-600",
          examples: ["Worth every penny", "Large portions", "Affordable prices"]
        },
        {
          category: "Wait Time",
          insight: "Long waits during weekends and dinner rush",
          sentiment: 'negative',
          confidence: 73,
          icon: <Clock className="w-4 h-4" />,
          color: "text-red-600",
          examples: ["Had to wait 30 minutes", "Crowded on weekends", "Book in advance"]
        }
      ],
      keyHighlights: [
        "Best for authentic South Indian breakfast",
        "Family-friendly atmosphere",
        "Excellent value for money",
        "Fresh ingredients daily"
      ],
      commonComplaints: [
        "Long wait times during peak hours",
        "Limited parking space",
        "Can get noisy during busy periods"
      ],
      bestFor: [
        "Family breakfast",
        "Quick lunch",
        "Budget-friendly dining",
        "Authentic cuisine"
      ],
      worstFor: [
        "Romantic dates",
        "Business meetings",
        "Late night dining"
      ],
      trendingTopics: [
        "Idli quality",
        "Filter coffee",
        "Weekend crowds",
        "Parking issues"
      ]
    };

    setSummary(mockSummary);
    setIsLoading(false);
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'bg-green-100 text-green-800 border-green-200';
      case 'negative': return 'bg-red-100 text-red-800 border-red-200';
      case 'neutral': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const speakInsight = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    }
  };

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardContent className="p-8 text-center">
          <div className="animate-spin w-12 h-12 mx-auto mb-4">
            <Brain className="w-12 h-12 text-blue-500" />
          </div>
          <h3 className="text-lg font-semibold mb-2">AI Analyzing Reviews...</h3>
          <p className="text-gray-600">Processing thousands of reviews to generate insights</p>
          <div className="mt-4 space-y-2">
            <div className="h-2 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-2 bg-gray-200 rounded animate-pulse w-3/4 mx-auto"></div>
            <div className="h-2 bg-gray-200 rounded animate-pulse w-1/2 mx-auto"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!summary) return null;

  return (
    <div className="space-y-6">
      {/* Summary Header */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Brain className="w-6 h-6 text-blue-500" />
              <span>AI Review Summary</span>
            </div>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              {summary.totalReviews.toLocaleString()} reviews analyzed
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Star className="w-5 h-5 text-yellow-500 mr-1" />
                <span className="text-2xl font-bold">{summary.averageRating.toFixed(1)}</span>
              </div>
              <p className="text-sm text-gray-600">Average Rating</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 mb-2">
                {summary.insights.filter(i => i.sentiment === 'positive').length}
              </div>
              <p className="text-sm text-gray-600">Positive Insights</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 mb-2">
                {summary.keyHighlights.length}
              </div>
              <p className="text-sm text-gray-600">Key Highlights</p>
            </div>
          </div>
          
          <Separator />
          
          <div className="text-center">
            <p className="text-sm text-gray-500">
              Last updated: {new Date(summary.lastUpdated).toLocaleDateString()}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Quick Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Quick Insights</span>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowDetails(!showDetails)}
            >
              {showDetails ? 'Hide Details' : 'Show Details'}
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {summary.insights.map((insight, index) => (
              <div 
                key={index} 
                className={`border rounded-lg p-4 ${getSentimentColor(insight.sentiment)}`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    {insight.icon}
                    <span className="font-semibold text-sm">{insight.category}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Badge variant="outline" className="text-xs">
                      {insight.confidence}%
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => speakInsight(insight.insight)}
                      className="p-1 h-6 w-6"
                    >
                      <Volume2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
                <p className="text-sm font-medium mb-2">{insight.insight}</p>
                
                {showDetails && (
                  <div className="space-y-2">
                    <p className="text-xs text-gray-600">Common mentions:</p>
                    <div className="flex flex-wrap gap-1">
                      {insight.examples.slice(0, 2).map((example, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          "{example}"
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Best For / Worst For */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-green-700">
              <ThumbsUp className="w-5 h-5" />
              <span>Best For</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {summary.bestFor.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-red-700">
              <ThumbsDown className="w-5 h-5" />
              <span>Not Ideal For</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {summary.worstFor.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analysis */}
      {showDetails && (
        <>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-yellow-500" />
                <span>Key Highlights</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {summary.keyHighlights.map((highlight, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium text-green-800">{highlight}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <ThumbsDown className="w-5 h-5 text-red-500" />
                <span>Common Complaints</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {summary.commonComplaints.map((complaint, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg border border-red-200">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-sm font-medium text-red-800">{complaint}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Brain className="w-5 h-5 text-purple-500" />
                <span>Trending Topics</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {summary.trendingTopics.map((topic, index) => (
                  <Badge key={index} variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                    #{topic}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {/* Action Buttons */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              AI analysis based on {summary.totalReviews.toLocaleString()} reviews
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={generateSummary}>
                <Brain className="w-4 h-4 mr-2" />
                Refresh Analysis
              </Button>
              <Button variant="outline" size="sm">
                Share Insights
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIReviewSummarizer;