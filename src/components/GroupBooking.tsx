import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Users, Share2, Calculator, Check, Copy, Plus, Minus, DollarSign } from "lucide-react";

interface GroupMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  joinedAt: string;
  confirmed: boolean;
  shareAmount: number;
  customItems?: string[];
}

interface GroupBooking {
  id: string;
  restaurantName: string;
  date: string;
  time: string;
  totalGuests: number;
  organizer: string;
  members: GroupMember[];
  estimatedBill: number;
  splitMethod: 'equal' | 'custom' | 'itemwise';
  bookingLink: string;
  status: 'pending' | 'confirmed' | 'completed';
}

const GroupBookingComponent = ({ restaurantId, restaurantName }: { restaurantId: string; restaurantName: string }) => {
  const [groupBooking, setGroupBooking] = useState<GroupBooking | null>(null);
  const [newMemberEmail, setNewMemberEmail] = useState("");
  const [splitMethod, setSplitMethod] = useState<'equal' | 'custom' | 'itemwise'>('equal');
  const [estimatedBill, setEstimatedBill] = useState(2000);
  const [showBillSplit, setShowBillSplit] = useState(false);

  useEffect(() => {
    // Check if there's an existing group booking for this restaurant
    const existingBooking = localStorage.getItem(`groupBooking_${restaurantId}`);
    if (existingBooking) {
      setGroupBooking(JSON.parse(existingBooking));
      setShowBillSplit(true);
    }
  }, [restaurantId]);

  const createGroupBooking = () => {
    const bookingId = Date.now().toString();
    const bookingLink = `${window.location.origin}/group-booking/${bookingId}`;
    
    const newBooking: GroupBooking = {
      id: bookingId,
      restaurantName,
      date: new Date().toISOString().split('T')[0],
      time: "19:30",
      totalGuests: 1,
      organizer: "You",
      members: [{
        id: "organizer",
        name: "You (Organizer)",
        email: "organizer@example.com",
        phone: "+91 98765 43210",
        joinedAt: new Date().toISOString(),
        confirmed: true,
        shareAmount: estimatedBill,
        customItems: []
      }],
      estimatedBill,
      splitMethod,
      bookingLink,
      status: 'pending'
    };

    setGroupBooking(newBooking);
    localStorage.setItem(`groupBooking_${restaurantId}`, JSON.stringify(newBooking));
    setShowBillSplit(true);
  };

  const addMember = () => {
    if (!newMemberEmail || !groupBooking) return;

    const newMember: GroupMember = {
      id: Date.now().toString(),
      name: newMemberEmail.split('@')[0],
      email: newMemberEmail,
      phone: "",
      joinedAt: new Date().toISOString(),
      confirmed: false,
      shareAmount: 0,
      customItems: []
    };

    const updatedBooking = {
      ...groupBooking,
      members: [...groupBooking.members, newMember],
      totalGuests: groupBooking.totalGuests + 1
    };

    // Recalculate split amounts
    if (splitMethod === 'equal') {
      const sharePerPerson = estimatedBill / updatedBooking.members.length;
      updatedBooking.members = updatedBooking.members.map(member => ({
        ...member,
        shareAmount: sharePerPerson
      }));
    }

    setGroupBooking(updatedBooking);
    localStorage.setItem(`groupBooking_${restaurantId}`, JSON.stringify(updatedBooking));
    setNewMemberEmail("");
  };

  const updateMemberShare = (memberId: string, amount: number) => {
    if (!groupBooking) return;

    const updatedBooking = {
      ...groupBooking,
      members: groupBooking.members.map(member =>
        member.id === memberId ? { ...member, shareAmount: amount } : member
      )
    };

    setGroupBooking(updatedBooking);
    localStorage.setItem(`groupBooking_${restaurantId}`, JSON.stringify(updatedBooking));
  };

  const copyBookingLink = () => {
    if (groupBooking) {
      navigator.clipboard.writeText(groupBooking.bookingLink);
      alert("Booking link copied to clipboard!");
    }
  };

  const calculateTotalSplit = () => {
    if (!groupBooking) return 0;
    return groupBooking.members.reduce((total, member) => total + member.shareAmount, 0);
  };

  const confirmBooking = () => {
    if (!groupBooking) return;

    const updatedBooking = {
      ...groupBooking,
      status: 'confirmed' as const
    };

    setGroupBooking(updatedBooking);
    localStorage.setItem(`groupBooking_${restaurantId}`, JSON.stringify(updatedBooking));
    
    alert(`Group booking confirmed for ${restaurantName}! 
    Total guests: ${groupBooking.totalGuests}
    Estimated bill: ₹${estimatedBill}
    Split method: ${splitMethod}`);
  };

  if (!showBillSplit) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="w-5 h-5 text-blue-500" />
            <span>Group Booking & Bill Split</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600">
            Create a group booking and split the bill digitally with your friends!
          </p>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Estimated Bill Amount</label>
              <Input
                type="number"
                value={estimatedBill}
                onChange={(e) => setEstimatedBill(Number(e.target.value))}
                placeholder="Enter estimated bill amount"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Split Method</label>
              <div className="flex space-x-2">
                <Button
                  variant={splitMethod === 'equal' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSplitMethod('equal')}
                >
                  Equal Split
                </Button>
                <Button
                  variant={splitMethod === 'custom' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSplitMethod('custom')}
                >
                  Custom Amount
                </Button>
              </div>
            </div>
          </div>

          <Button onClick={createGroupBooking} className="w-full bg-blue-500 hover:bg-blue-600">
            <Users className="w-4 h-4 mr-2" />
            Create Group Booking
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (!groupBooking) return null;

  return (
    <div className="space-y-6">
      {/* Group Booking Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-blue-500" />
              <span>Group Booking</span>
            </div>
            <Badge variant={groupBooking.status === 'confirmed' ? 'default' : 'secondary'}>
              {groupBooking.status}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            <div>
              <p className="text-sm text-gray-600">Restaurant</p>
              <p className="font-semibold">{groupBooking.restaurantName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Date & Time</p>
              <p className="font-semibold">{groupBooking.date} at {groupBooking.time}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Guests</p>
              <p className="font-semibold">{groupBooking.totalGuests} people</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Estimated Bill</p>
              <p className="font-semibold">₹{groupBooking.estimatedBill}</p>
            </div>
          </div>

          <Separator />

          <div className="flex items-center space-x-2">
            <Input
              value={groupBooking.bookingLink}
              readOnly
              className="flex-1"
            />
            <Button variant="outline" onClick={copyBookingLink}>
              <Copy className="w-4 h-4" />
            </Button>
            <Button variant="outline">
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Add Members */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Plus className="w-5 h-5 text-green-500" />
            <span>Invite Members</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2">
            <Input
              placeholder="Enter email address"
              value={newMemberEmail}
              onChange={(e) => setNewMemberEmail(e.target.value)}
              className="flex-1"
            />
            <Button onClick={addMember} disabled={!newMemberEmail}>
              <Plus className="w-4 h-4 mr-2" />
              Invite
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Bill Split Calculator */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calculator className="w-5 h-5 text-purple-500" />
            <span>Bill Split Calculator</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <span className="font-semibold">Split Method:</span>
            <Badge variant="outline">{splitMethod === 'equal' ? 'Equal Split' : 'Custom Amount'}</Badge>
          </div>

          <div className="space-y-3">
            {groupBooking.members.map((member) => (
              <div key={member.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${member.confirmed ? 'bg-green-500' : 'bg-gray-300'}`} />
                  <div>
                    <p className="font-medium">{member.name}</p>
                    <p className="text-sm text-gray-600">{member.email}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {splitMethod === 'custom' && member.id !== 'organizer' ? (
                    <div className="flex items-center space-x-1">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateMemberShare(member.id, Math.max(0, member.shareAmount - 100))}
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      <Input
                        type="number"
                        value={member.shareAmount}
                        onChange={(e) => updateMemberShare(member.id, Number(e.target.value))}
                        className="w-20 text-center"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateMemberShare(member.id, member.shareAmount + 100)}
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>
                  ) : (
                    <Badge variant="secondary">
                      ₹{member.shareAmount.toFixed(0)}
                    </Badge>
                  )}
                  
                  {member.confirmed && (
                    <Check className="w-4 h-4 text-green-500" />
                  )}
                </div>
              </div>
            ))}
          </div>

          <Separator />

          <div className="flex items-center justify-between text-lg font-semibold">
            <span>Total Split Amount:</span>
            <div className="flex items-center space-x-2">
              <DollarSign className="w-5 h-5 text-green-500" />
              <span>₹{calculateTotalSplit().toFixed(0)}</span>
            </div>
          </div>

          {Math.abs(calculateTotalSplit() - groupBooking.estimatedBill) > 1 && (
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                ⚠️ Split total (₹{calculateTotalSplit().toFixed(0)}) doesn't match estimated bill (₹{groupBooking.estimatedBill})
              </p>
            </div>
          )}

          {groupBooking.status === 'pending' && (
            <Button 
              onClick={confirmBooking} 
              className="w-full bg-green-500 hover:bg-green-600"
              disabled={Math.abs(calculateTotalSplit() - groupBooking.estimatedBill) > 1}
            >
              <Check className="w-4 h-4 mr-2" />
              Confirm Group Booking
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Payment Status */}
      {groupBooking.status === 'confirmed' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <DollarSign className="w-5 h-5 text-green-500" />
              <span>Payment Status</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {groupBooking.members.map((member) => (
                <div key={member.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${member.confirmed ? 'bg-green-500' : 'bg-yellow-500'}`} />
                    <span className="font-medium">{member.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={member.confirmed ? 'default' : 'secondary'}>
                      ₹{member.shareAmount.toFixed(0)}
                    </Badge>
                    <Badge variant={member.confirmed ? 'default' : 'outline'}>
                      {member.confirmed ? 'Paid' : 'Pending'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default GroupBookingComponent;