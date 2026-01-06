import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Flame, Heart, Leaf, Compass, Sparkles } from "lucide-react";

interface QuizQuestion {
  id: string;
  question: string;
  options: {
    text: string;
    value: string;
    icon: React.ReactNode;
  }[];
}

interface FoodPersonality {
  type: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  recommendations: string[];
}

const FoodMoodQuiz = ({ onComplete }: { onComplete: (personality: FoodPersonality) => void }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isComplete, setIsComplete] = useState(false);

  const questions: QuizQuestion[] = [
    {
      id: "spice_level",
      question: "How do you feel about spicy food?",
      options: [
        { text: "Bring the heat! 🔥", value: "spicy", icon: <Flame className="w-5 h-5" /> },
        { text: "Mild spice is nice", value: "mild", icon: <Heart className="w-5 h-5" /> },
        { text: "No spice, please", value: "none", icon: <Leaf className="w-5 h-5" /> }
      ]
    },
    {
      id: "food_mood",
      question: "What's your ideal dining mood?",
      options: [
        { text: "Comfort & Cozy", value: "comfort", icon: <Heart className="w-5 h-5" /> },
        { text: "Healthy & Fresh", value: "healthy", icon: <Leaf className="w-5 h-5" /> },
        { text: "Adventurous & Bold", value: "adventurous", icon: <Compass className="w-5 h-5" /> }
      ]
    },
    {
      id: "dining_style",
      question: "How do you prefer to dine?",
      options: [
        { text: "Quick & Casual", value: "casual", icon: <Sparkles className="w-5 h-5" /> },
        { text: "Fine & Elegant", value: "fine", icon: <Heart className="w-5 h-5" /> },
        { text: "Street Food Vibes", value: "street", icon: <Flame className="w-5 h-5" /> }
      ]
    },
    {
      id: "cuisine_preference",
      question: "Which cuisine excites you most?",
      options: [
        { text: "Traditional Indian", value: "indian", icon: <Heart className="w-5 h-5" /> },
        { text: "International Fusion", value: "fusion", icon: <Compass className="w-5 h-5" /> },
        { text: "Regional Specialties", value: "regional", icon: <Leaf className="w-5 h-5" /> }
      ]
    },
    {
      id: "price_preference",
      question: "What's your budget preference?",
      options: [
        { text: "Budget-Friendly", value: "budget", icon: <Leaf className="w-5 h-5" /> },
        { text: "Mid-Range", value: "mid", icon: <Heart className="w-5 h-5" /> },
        { text: "Premium Experience", value: "premium", icon: <Sparkles className="w-5 h-5" /> }
      ]
    }
  ];

  const personalities: Record<string, FoodPersonality> = {
    "spicy_adventurous": {
      type: "spicy_adventurous",
      title: "The Fire Explorer 🔥",
      description: "You love bold flavors and aren't afraid to try new, spicy cuisines!",
      icon: <Flame className="w-8 h-8" />,
      color: "from-red-500 to-orange-500",
      recommendations: ["Chettinad", "Andhra", "Street Food", "Spicy"]
    },
    "comfort_lover": {
      type: "comfort_lover",
      title: "The Comfort Connoisseur 💝",
      description: "You appreciate familiar, hearty meals that warm the soul.",
      icon: <Heart className="w-8 h-8" />,
      color: "from-pink-500 to-rose-500",
      recommendations: ["Traditional Indian", "Family Restaurants", "Comfort Food"]
    },
    "health_conscious": {
      type: "health_conscious",
      title: "The Wellness Warrior 🌱",
      description: "You prioritize fresh, healthy ingredients and balanced nutrition.",
      icon: <Leaf className="w-8 h-8" />,
      color: "from-green-500 to-emerald-500",
      recommendations: ["Vegetarian", "Healthy", "Fresh", "Organic"]
    },
    "culinary_adventurer": {
      type: "culinary_adventurer",
      title: "The Flavor Pioneer 🧭",
      description: "You're always seeking new culinary experiences and unique flavors.",
      icon: <Compass className="w-8 h-8" />,
      color: "from-blue-500 to-purple-500",
      recommendations: ["Fusion", "International", "Unique", "Experimental"]
    },
    "fine_diner": {
      type: "fine_diner",
      title: "The Elegance Enthusiast ✨",
      description: "You appreciate refined dining experiences and premium quality.",
      icon: <Sparkles className="w-8 h-8" />,
      color: "from-purple-500 to-indigo-500",
      recommendations: ["Fine Dining", "Premium", "Elegant", "Upscale"]
    }
  };

  const calculatePersonality = (): FoodPersonality => {
    const { spice_level, food_mood, dining_style, cuisine_preference, price_preference } = answers;

    // Logic to determine personality based on answers
    if (spice_level === "spicy" && food_mood === "adventurous") {
      return personalities.spicy_adventurous;
    }
    if (food_mood === "comfort" || dining_style === "casual") {
      return personalities.comfort_lover;
    }
    if (food_mood === "healthy" || cuisine_preference === "regional") {
      return personalities.health_conscious;
    }
    if (food_mood === "adventurous" || cuisine_preference === "fusion") {
      return personalities.culinary_adventurer;
    }
    if (dining_style === "fine" || price_preference === "premium") {
      return personalities.fine_diner;
    }

    // Default fallback
    return personalities.comfort_lover;
  };

  const handleAnswer = (value: string) => {
    const newAnswers = { ...answers, [questions[currentQuestion].id]: value };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setIsComplete(true);
      const personality = calculatePersonality();
      
      // Save to localStorage
      localStorage.setItem('foodMoodDNA', JSON.stringify(personality));
      
      setTimeout(() => {
        onComplete(personality);
      }, 1000);
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (isComplete) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="p-8 text-center">
          <div className="animate-pulse">
            <Sparkles className="w-16 h-16 mx-auto text-orange-500 mb-4" />
            <h3 className="text-xl font-bold mb-2">Analyzing Your Food DNA...</h3>
            <p className="text-gray-600">Creating your personalized profile</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const question = questions[currentQuestion];

  return (
    <Card className="w-full max-w-sm md:max-w-md mx-auto">
      <CardHeader className="p-4 md:p-6">
        <div className="flex items-center justify-between mb-2">
          <CardTitle className="text-base md:text-lg">Food Mood DNA</CardTitle>
          <span className="text-xs md:text-sm text-gray-500">
            {currentQuestion + 1}/{questions.length}
          </span>
        </div>
        <Progress value={progress} className="w-full" />
      </CardHeader>
      <CardContent className="p-4 md:p-6">
        <h3 className="text-lg md:text-xl font-semibold mb-4 md:mb-6 text-center">
          {question.question}
        </h3>
        <div className="space-y-2 md:space-y-3">
          {question.options.map((option) => (
            <Button
              key={option.value}
              variant="outline"
              className="w-full h-auto p-3 md:p-4 justify-start hover:bg-orange-50 hover:border-orange-300 text-left"
              onClick={() => handleAnswer(option.value)}
            >
              <div className="flex items-center space-x-2 md:space-x-3">
                {option.icon}
                <span className="text-sm md:text-base">{option.text}</span>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default FoodMoodQuiz;