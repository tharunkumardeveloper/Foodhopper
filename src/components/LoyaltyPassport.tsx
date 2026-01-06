import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Award, Star, Gift, MapPin, Calendar, Trophy, Crown, Zap, Check } from "lucide-react";

interface PassportStamp {
  id: string;
  restaurantId: string;
  restaurantName: string;
  restaurantImage: string;
  visitDate: string;
  stampType: 'visit' | 'review' | 'photo' | 'special';
  points: number;
  specialNote?: string;
}

interface LoyaltyReward {
  id: string;
  title: string;
  description: string;
  pointsRequired: number;
  type: 'discount' | 'freeItem' | 'upgrade' | 'experience';
  value: string;
  icon: React.ReactNode;
  expiryDays: number;
  claimed: boolean;
  claimedDate?: string;
}

interface LoyaltyBadge {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  requirement: string;
  earned: boolean;
  earnedDate?: string;
  progress?: number;
  maxProgress?: number;
}

const LoyaltyPassport = () => {
  const [stamps, setStamps] = useState<PassportStamp[]>([]);
  const [totalPoints, setTotalPoints] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [badges, setBadges] = useState<LoyaltyBadge[]>([]);
  const [rewards, setRewards] = useState<LoyaltyReward[]>([]);
  const [showRewards, setShowRewards] = useState(false);

  const loyaltyLevels = [
    { level: 1, name: "Food Explorer", minPoints: 0, color: "bg-gray-500", benefits: ["Basic rewards", "Birthday discount"] },
    { level: 2, name: "Taste Adventurer", minPoints: 500, color: "bg-blue-500", benefits: ["5% extra discount", "Priority booking"] },
    { level: 3, name: "Culinary Connoisseur", minPoints: 1500, color: "bg-purple-500", benefits: ["10% extra discount", "Free appetizer monthly"] },
    { level: 4, name: "Gourmet Master", minPoints: 3000, color: "bg-orange-500", benefits: ["15% extra discount", "VIP events access"] },
    { level: 5, name: "Food Legend", minPoints: 5000, color: "bg-red-500", benefits: ["20% extra discount", "Personal chef consultation"] }
  ];

  useEffect(() => {
    // Load passport data from localStorage
    const savedStamps = localStorage.getItem('loyaltyStamps');
    const savedPoints = localStorage.getItem('loyaltyPoints');
    const savedBadges = localStorage.getItem('loyaltyBadges');
    const savedRewards = localStorage.getItem('loyaltyRewards');

    if (savedStamps) {
      setStamps(JSON.parse(savedStamps));
    } else {
      // Mock data for demonstration
      const mockStamps: PassportStamp[] = [
        {
          id: "1",
          restaurantId: "murugan-idli-shop",
          restaurantName: "Murugan Idli Shop",
          restaurantImage: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
          visitDate: "2024-01-15",
          stampType: "visit",
          points: 50,
          specialNote: "First visit bonus!"
        },
        {
          id: "2",
          restaurantId: "buhari-hotel",
          restaurantName: "Buhari Hotel",
          restaurantImage: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
          visitDate: "2024-01-20",
          stampType: "review",
          points: 75,
          specialNote: "5-star review bonus"
        }
      ];
      setStamps(mockStamps);
      localStorage.setItem('loyaltyStamps', JSON.stringify(mockStamps));
    }

    if (savedPoints) {
      setTotalPoints(parseInt(savedPoints));
    } else {
      setTotalPoints(125);
      localStorage.setItem('loyaltyPoints', '125');
    }

    // Initialize badges
    initializeBadges();
    
    // Initialize rewards
    initializeRewards();
  }, []);

  useEffect(() => {
    // Calculate current level based on points
    const level = loyaltyLevels.reduce((acc, curr) => 
      totalPoints >= curr.minPoints ? curr : acc
    );
    setCurrentLevel(level.level);
  }, [totalPoints]);

  const initializeBadges = () => {
    const allBadges: LoyaltyBadge[] = [
      {
        id: "first_visit",
        name: "First Steps",
        description: "Made your first restaurant visit",
        icon: <MapPin className="w-6 h-6" />,
        color: "bg-green-500",
        requirement: "Visit 1 restaurant",
        earned: stamps.length >= 1,
        earnedDate: stamps.length >= 1 ? stamps[0].visitDate : undefined,
        progress: stamps.length,
        maxProgress: 1
      },
      {
        id: "explorer",
        name: "City Explorer",
        description: "Visited 5 different restaurants",
        icon: <MapPin className="w-6 h-6" />,
        color: "bg-blue-500",
        requirement: "Visit 5 restaurants",
        earned: new Set(stamps.map(s => s.restaurantId)).size >= 5,
        progress: new Set(stamps.map(s => s.restaurantId)).size,
        maxProgress: 5
      },
      {
        id: "reviewer",
        name: "Food Critic",
        description: "Left 10 helpful reviews",
        icon: <Star className="w-6 h-6" />,
        color: "bg-yellow-500",
        requirement: "Write 10 reviews",
        earned: stamps.filter(s => s.stampType === 'review').length >= 10,
        progress: stamps.filter(s => s.stampType === 'review').length,
        maxProgress: 10
      },
      {
        id: "photographer",
        name: "Food Photographer",
        description: "Shared 20 food photos",
        icon: <Award className="w-6 h-6" />,
        color: "bg-purple-500",
        requirement: "Share 20 photos",
        earned: stamps.filter(s => s.stampType === 'photo').length >= 20,
        progress: stamps.filter(s => s.stampType === 'photo').length,
        maxProgress: 20
      },
      {
        id: "loyal_customer",
        name: "Loyal Patron",
        description: "Visited the same restaurant 5 times",
        icon: <Crown className="w-6 h-6" />,
        color: "bg-red-500",
        requirement: "5 visits to same restaurant",
        earned: false, // Calculate based on restaurant visit frequency
        progress: 0,
        maxProgress: 5
      }
    ];

    setBadges(allBadges);
  };

  const initializeRewards = () => {
    const allRewards: LoyaltyReward[] = [
      {
        id: "discount_10",
        title: "10% Off Next Meal",
        description: "Get 10% discount on your next restaurant booking",
        pointsRequired: 100,
        type: "discount",
        value: "10%",
        icon: <Gift className="w-5 h-5" />,
        expiryDays: 30,
        claimed: false
      },
      {
        id: "free_appetizer",
        title: "Free Appetizer",
        description: "Complimentary appetizer at participating restaurants",
        pointsRequired: 200,
        type: "freeItem",
        value: "Free appetizer",
        icon: <Award className="w-5 h-5" />,
        expiryDays: 15,
        claimed: false
      },
      {
        id: "priority_booking",
        title: "Priority Booking",
        description: "Skip the queue with priority table booking",
        pointsRequired: 300,
        type: "upgrade",
        value: "Priority access",
        icon: <Zap className="w-5 h-5" />,
        expiryDays: 7,
        claimed: false
      },
      {
        id: "chef_special",
        title: "Chef's Special Experience",
        description: "Exclusive chef's table experience for two",
        pointsRequired: 1000,
        type: "experience",
        value: "Chef's table",
        icon: <Crown className="w-5 h-5" />,
        expiryDays: 60,
        claimed: false
      }
    ];

    setRewards(allRewards);
  };

  const addStamp = (restaurantId: string, restaurantName: string, stampType: PassportStamp['stampType'] = 'visit') => {
    const pointsMap = {
      visit: 50,
      review: 75,
      photo: 25,
      special: 100
    };

    const newStamp: PassportStamp = {
      id: Date.now().toString(),
      restaurantId,
      restaurantName,
      restaurantImage: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      visitDate: new Date().toISOString().split('T')[0],
      stampType,
      points: pointsMap[stampType]
    };

    const updatedStamps = [...stamps, newStamp];
    const updatedPoints = totalPoints + newStamp.points;

    setStamps(updatedStamps);
    setTotalPoints(updatedPoints);

    localStorage.setItem('loyaltyStamps', JSON.stringify(updatedStamps));
    localStorage.setItem('loyaltyPoints', updatedPoints.toString());

    // Check for new badges
    initializeBadges();
  };

  const claimReward = (rewardId: string) => {
    const reward = rewards.find(r => r.id === rewardId);
    if (!reward || reward.claimed || totalPoints < reward.pointsRequired) {
      return;
    }

    const updatedRewards = rewards.map(r => 
      r.id === rewardId 
        ? { ...r, claimed: true, claimedDate: new Date().toISOString() }
        : r
    );

    const updatedPoints = totalPoints - reward.pointsRequired;

    setRewards(updatedRewards);
    setTotalPoints(updatedPoints);

    localStorage.setItem('loyaltyRewards', JSON.stringify(updatedRewards));
    localStorage.setItem('loyaltyPoints', updatedPoints.toString());

    alert(`🎉 Reward Claimed!
    
${reward.title}
${reward.description}

Your reward code: FOOD${rewardId.toUpperCase()}
Valid for ${reward.expiryDays} days.`);
  };

  const getCurrentLevelInfo = () => {
    return loyaltyLevels.find(l => l.level === currentLevel) || loyaltyLevels[0];
  };

  const getNextLevelInfo = () => {
    return loyaltyLevels.find(l => l.level === currentLevel + 1);
  };

  const getProgressToNextLevel = () => {
    const nextLevel = getNextLevelInfo();
    if (!nextLevel) return 100;
    
    const currentLevelInfo = getCurrentLevelInfo();
    const progress = ((totalPoints - currentLevelInfo.minPoints) / (nextLevel.minPoints - currentLevelInfo.minPoints)) * 100;
    return Math.min(100, Math.max(0, progress));
  };

  const currentLevelInfo = getCurrentLevelInfo();
  const nextLevelInfo = getNextLevelInfo();

  return (
    <div className="space-y-6">
      {/* Passport Header */}
      <Card className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className={`p-3 rounded-full ${currentLevelInfo.color}`}>
                <Award className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Food Passport</h2>
                <p className="text-orange-100">{currentLevelInfo.name}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">{totalPoints}</div>
              <p className="text-orange-100">Points</p>
            </div>
          </div>

          {nextLevelInfo && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress to {nextLevelInfo.name}</span>
                <span>{nextLevelInfo.minPoints - totalPoints} points to go</span>
              </div>
              <Progress value={getProgressToNextLevel()} className="bg-orange-400" />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <Card>
          <CardContent className="p-3 md:p-4 text-center">
            <MapPin className="w-6 h-6 md:w-8 md:h-8 mx-auto text-blue-500 mb-2" />
            <div className="text-xl md:text-2xl font-bold">{new Set(stamps.map(s => s.restaurantId)).size}</div>
            <p className="text-xs md:text-sm text-gray-600">Restaurants Visited</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-3 md:p-4 text-center">
            <Calendar className="w-6 h-6 md:w-8 md:h-8 mx-auto text-green-500 mb-2" />
            <div className="text-xl md:text-2xl font-bold">{stamps.length}</div>
            <p className="text-xs md:text-sm text-gray-600">Total Visits</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-3 md:p-4 text-center">
            <Trophy className="w-6 h-6 md:w-8 md:h-8 mx-auto text-yellow-500 mb-2" />
            <div className="text-xl md:text-2xl font-bold">{badges.filter(b => b.earned).length}</div>
            <p className="text-xs md:text-sm text-gray-600">Badges Earned</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-3 md:p-4 text-center">
            <Gift className="w-6 h-6 md:w-8 md:h-8 mx-auto text-purple-500 mb-2" />
            <div className="text-xl md:text-2xl font-bold">{rewards.filter(r => r.claimed).length}</div>
            <p className="text-xs md:text-sm text-gray-600">Rewards Claimed</p>
          </CardContent>
        </Card>
      </div>

      {/* Navigation */}
      <div className="flex space-x-2">
        <Button 
          variant={!showRewards ? "default" : "outline"}
          onClick={() => setShowRewards(false)}
        >
          Passport & Badges
        </Button>
        <Button 
          variant={showRewards ? "default" : "outline"}
          onClick={() => setShowRewards(true)}
        >
          Rewards Store
        </Button>
      </div>

      {!showRewards ? (
        <>
          {/* Recent Stamps */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-orange-500" />
                <span>Recent Stamps</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {stamps.length === 0 ? (
                <div className="text-center py-8">
                  <MapPin className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Stamps Yet</h3>
                  <p className="text-gray-600 mb-4">Visit restaurants to start collecting stamps!</p>
                  <Button onClick={() => addStamp('demo', 'Demo Restaurant')}>
                    Add Demo Stamp
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {stamps.slice(-6).reverse().map((stamp) => (
                    <div key={stamp.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center space-x-3 mb-3">
                        <div 
                          className="w-12 h-12 rounded-lg bg-cover bg-center"
                          style={{ backgroundImage: `url(${stamp.restaurantImage})` }}
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm">{stamp.restaurantName}</h4>
                          <p className="text-xs text-gray-600">{new Date(stamp.visitDate).toLocaleDateString()}</p>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          +{stamp.points}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-xs">
                          {stamp.stampType}
                        </Badge>
                        {stamp.specialNote && (
                          <span className="text-xs text-orange-600">{stamp.specialNote}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Badges */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Trophy className="w-5 h-5 text-yellow-500" />
                <span>Achievement Badges</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {badges.map((badge) => (
                  <div 
                    key={badge.id} 
                    className={`border rounded-lg p-4 ${badge.earned ? 'bg-yellow-50 border-yellow-200' : 'bg-gray-50 border-gray-200'}`}
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <div className={`p-2 rounded-lg ${badge.earned ? badge.color : 'bg-gray-400'} text-white`}>
                        {badge.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm">{badge.name}</h4>
                        <p className="text-xs text-gray-600">{badge.description}</p>
                      </div>
                      {badge.earned && (
                        <Check className="w-5 h-5 text-green-500" />
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-xs text-gray-500">{badge.requirement}</p>
                      {badge.maxProgress && (
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span>Progress</span>
                            <span>{badge.progress}/{badge.maxProgress}</span>
                          </div>
                          <Progress value={(badge.progress! / badge.maxProgress) * 100} className="h-2" />
                        </div>
                      )}
                      {badge.earned && badge.earnedDate && (
                        <p className="text-xs text-green-600">
                          Earned on {new Date(badge.earnedDate).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      ) : (
        /* Rewards Store */
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Gift className="w-5 h-5 text-purple-500" />
                <span>Rewards Store</span>
              </div>
              <Badge variant="secondary">
                {totalPoints} points available
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {rewards.map((reward) => (
                <div 
                  key={reward.id} 
                  className={`border rounded-lg p-6 ${reward.claimed ? 'bg-gray-50 border-gray-200' : 'hover:shadow-md transition-shadow'}`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`p-3 rounded-lg ${reward.claimed ? 'bg-gray-400' : 'bg-purple-500'} text-white`}>
                        {reward.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold">{reward.title}</h3>
                        <p className="text-sm text-gray-600">{reward.description}</p>
                      </div>
                    </div>
                    {reward.claimed && (
                      <Badge className="bg-green-100 text-green-800">
                        <Check className="w-3 h-3 mr-1" />
                        Claimed
                      </Badge>
                    )}
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Points Required:</span>
                      <span className="font-semibold">{reward.pointsRequired}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Value:</span>
                      <span className="font-semibold text-purple-600">{reward.value}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Valid for:</span>
                      <span className="font-semibold">{reward.expiryDays} days</span>
                    </div>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  {reward.claimed ? (
                    <div className="text-center text-sm text-gray-600">
                      Claimed on {reward.claimedDate ? new Date(reward.claimedDate).toLocaleDateString() : 'Unknown'}
                    </div>
                  ) : (
                    <Button 
                      onClick={() => claimReward(reward.id)}
                      disabled={totalPoints < reward.pointsRequired}
                      className="w-full"
                      variant={totalPoints >= reward.pointsRequired ? "default" : "outline"}
                    >
                      {totalPoints >= reward.pointsRequired ? (
                        <>
                          <Gift className="w-4 h-4 mr-2" />
                          Claim Reward
                        </>
                      ) : (
                        `Need ${reward.pointsRequired - totalPoints} more points`
                      )}
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default LoyaltyPassport;