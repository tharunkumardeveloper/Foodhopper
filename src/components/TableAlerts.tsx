import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bell, Clock, Users, MapPin, Check, X, AlertCircle } from "lucide-react";

interface TableAlert {
  id: string;
  restaurantId: string;
  restaurantName: string;
  restaurantImage: string;
  preferredDate: string;
  preferredTime: string;
  partySize: number;
  alertType: 'specific' | 'flexible';
  flexibleTimeRange?: string[];
  status: 'active' | 'triggered' | 'expired';
  createdAt: string;
  notificationMethod: 'push' | 'email' | 'sms';
  priority: 'high' | 'medium' | 'low';
}

interface AvailableSlot {
  restaurantId: string;
  restaurantName: string;
  date: string;
  time: string;
  availableSeats: number;
  tableType: string;
  expiresIn: number; // minutes
}

const TableAlertsComponent = ({ restaurantId, restaurantName }: { restaurantId?: string; restaurantName?: string }) => {
  const [alerts, setAlerts] = useState<TableAlert[]>([]);
  const [availableSlots, setAvailableSlots] = useState<AvailableSlot[]>([]);
  const [showCreateAlert, setShowCreateAlert] = useState(false);
  const [newAlert, setNewAlert] = useState({
    restaurantId: restaurantId || '',
    restaurantName: restaurantName || '',
    preferredDate: '',
    preferredTime: '',
    partySize: 2,
    alertType: 'specific' as 'specific' | 'flexible',
    flexibleTimeRange: [] as string[],
    notificationMethod: 'push' as 'push' | 'email' | 'sms',
    priority: 'medium' as 'high' | 'medium' | 'low'
  });

  useEffect(() => {
    // Load existing alerts
    const savedAlerts = localStorage.getItem('tableAlerts');
    if (savedAlerts) {
      setAlerts(JSON.parse(savedAlerts));
    }

    // Simulate real-time availability updates
    const interval = setInterval(() => {
      checkAvailability();
    }, 30000); // Check every 30 seconds

    // Initial check
    checkAvailability();

    return () => clearInterval(interval);
  }, []);

  const checkAvailability = () => {
    // Simulate checking availability for active alerts
    const mockAvailableSlots: AvailableSlot[] = [
      {
        restaurantId: 'murugan-idli-shop',
        restaurantName: 'Murugan Idli Shop',
        date: new Date().toISOString().split('T')[0],
        time: '19:30',
        availableSeats: 4,
        tableType: 'Window seat',
        expiresIn: 15
      },
      {
        restaurantId: 'buhari-hotel',
        restaurantName: 'Buhari Hotel',
        date: new Date().toISOString().split('T')[0],
        time: '20:00',
        availableSeats: 6,
        tableType: 'Private booth',
        expiresIn: 10
      }
    ];

    setAvailableSlots(mockAvailableSlots);

    // Check if any alerts should be triggered
    alerts.forEach(alert => {
      if (alert.status === 'active') {
        const matchingSlot = mockAvailableSlots.find(slot => 
          slot.restaurantId === alert.restaurantId &&
          slot.date === alert.preferredDate &&
          (alert.alertType === 'specific' ? 
            slot.time === alert.preferredTime : 
            alert.flexibleTimeRange?.includes(slot.time)) &&
          slot.availableSeats >= alert.partySize
        );

        if (matchingSlot) {
          triggerAlert(alert, matchingSlot);
        }
      }
    });
  };

  const triggerAlert = (tableAlert: TableAlert, slot: AvailableSlot) => {
    // Update alert status
    const updatedAlerts = alerts.map(a => 
      a.id === tableAlert.id ? { ...a, status: 'triggered' as const } : a
    );
    setAlerts(updatedAlerts);
    localStorage.setItem('tableAlerts', JSON.stringify(updatedAlerts));

    // Show notification
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(`Table Available at ${tableAlert.restaurantName}!`, {
        body: `${slot.time} for ${tableAlert.partySize} people - Book now!`,
        icon: '/favicon.ico'
      });
    }

    // Show browser alert as fallback
    window.alert(`🎉 Table Available!
    
Restaurant: ${tableAlert.restaurantName}
Date: ${slot.date}
Time: ${slot.time}
Party Size: ${tableAlert.partySize} people
Available Seats: ${slot.availableSeats}

This slot expires in ${slot.expiresIn} minutes!`);
  };

  const createAlert = () => {
    if (!newAlert.restaurantName || !newAlert.preferredDate || !newAlert.preferredTime) {
      window.alert('Please fill in all required fields');
      return;
    }

    const alert: TableAlert = {
      id: Date.now().toString(),
      restaurantId: newAlert.restaurantId,
      restaurantName: newAlert.restaurantName,
      restaurantImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      preferredDate: newAlert.preferredDate,
      preferredTime: newAlert.preferredTime,
      partySize: newAlert.partySize,
      alertType: newAlert.alertType,
      flexibleTimeRange: newAlert.alertType === 'flexible' ? ['19:00', '19:30', '20:00', '20:30'] : undefined,
      status: 'active',
      createdAt: new Date().toISOString(),
      notificationMethod: newAlert.notificationMethod,
      priority: newAlert.priority
    };

    const updatedAlerts = [...alerts, alert];
    setAlerts(updatedAlerts);
    localStorage.setItem('tableAlerts', JSON.stringify(updatedAlerts));

    // Request notification permission
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }

    setShowCreateAlert(false);
    setNewAlert({
      restaurantId: restaurantId || '',
      restaurantName: restaurantName || '',
      preferredDate: '',
      preferredTime: '',
      partySize: 2,
      alertType: 'specific',
      flexibleTimeRange: [],
      notificationMethod: 'push',
      priority: 'medium'
    });
  };

  const cancelAlert = (alertId: string) => {
    const updatedAlerts = alerts.filter(alert => alert.id !== alertId);
    setAlerts(updatedAlerts);
    localStorage.setItem('tableAlerts', JSON.stringify(updatedAlerts));
  };

  const bookAvailableSlot = (slot: AvailableSlot) => {
    window.alert(`Booking confirmed for ${slot.restaurantName}!
    
Date: ${slot.date}
Time: ${slot.time}
Party Size: ${slot.availableSeats} seats available
Table Type: ${slot.tableType}

You'll receive a confirmation shortly.`);
    
    // Remove the slot from available slots
    setAvailableSlots(prev => prev.filter(s => s !== slot));
  };

  const getAlertStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-blue-100 text-blue-800';
      case 'triggered': return 'bg-green-100 text-green-800';
      case 'expired': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Available Slots Alert */}
      {availableSlots.length > 0 && (
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-green-800">
              <AlertCircle className="w-5 h-5" />
              <span>Tables Available Now!</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {availableSlots.map((slot, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-white rounded-lg border border-green-200">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center text-white">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{slot.restaurantName}</h4>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{slot.time}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{slot.availableSeats} seats</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>{slot.tableType}</span>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge variant="outline" className="text-red-600">
                    Expires in {slot.expiresIn}m
                  </Badge>
                  <Button 
                    onClick={() => bookAvailableSlot(slot)}
                    className="bg-green-500 hover:bg-green-600"
                  >
                    Book Now
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Create Alert */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bell className="w-5 h-5 text-blue-500" />
              <span>Table Availability Alerts</span>
            </div>
            <Button 
              onClick={() => setShowCreateAlert(!showCreateAlert)}
              variant={showCreateAlert ? "outline" : "default"}
            >
              {showCreateAlert ? 'Cancel' : 'Create Alert'}
            </Button>
          </CardTitle>
        </CardHeader>
        
        {showCreateAlert && (
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Restaurant Name</label>
                <Input
                  value={newAlert.restaurantName}
                  onChange={(e) => setNewAlert({...newAlert, restaurantName: e.target.value})}
                  placeholder="Enter restaurant name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Party Size</label>
                <Select value={newAlert.partySize.toString()} onValueChange={(value) => setNewAlert({...newAlert, partySize: parseInt(value)})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[1,2,3,4,5,6,7,8].map(size => (
                      <SelectItem key={size} value={size.toString()}>{size} {size === 1 ? 'person' : 'people'}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Preferred Date</label>
                <Input
                  type="date"
                  value={newAlert.preferredDate}
                  onChange={(e) => setNewAlert({...newAlert, preferredDate: e.target.value})}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Preferred Time</label>
                <Select value={newAlert.preferredTime} onValueChange={(value) => setNewAlert({...newAlert, preferredTime: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    {['18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30'].map(time => (
                      <SelectItem key={time} value={time}>{time}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Alert Type</label>
                <Select value={newAlert.alertType} onValueChange={(value: 'specific' | 'flexible') => setNewAlert({...newAlert, alertType: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="specific">Specific Time Only</SelectItem>
                    <SelectItem value="flexible">Flexible Time Range</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Priority</label>
                <Select value={newAlert.priority} onValueChange={(value: 'high' | 'medium' | 'low') => setNewAlert({...newAlert, priority: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High Priority</SelectItem>
                    <SelectItem value="medium">Medium Priority</SelectItem>
                    <SelectItem value="low">Low Priority</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <Button onClick={createAlert} className="w-full bg-blue-500 hover:bg-blue-600">
              <Bell className="w-4 h-4 mr-2" />
              Create Alert
            </Button>
          </CardContent>
        )}
      </Card>

      {/* Active Alerts */}
      {alerts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Your Table Alerts</span>
              <Badge variant="secondary">{alerts.filter(a => a.status === 'active').length} active</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {alerts.map((alert) => (
              <div key={alert.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center text-white">
                      <Bell className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{alert.restaurantName}</h4>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{alert.preferredDate} at {alert.preferredTime}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Users className="w-4 h-4" />
                          <span>{alert.partySize} people</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Badge className={getAlertStatusColor(alert.status)}>
                      {alert.status}
                    </Badge>
                    <Badge className={getPriorityColor(alert.priority)}>
                      {alert.priority}
                    </Badge>
                    {alert.status === 'active' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => cancelAlert(alert.id)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-4 text-gray-600">
                    <span>Alert Type: {alert.alertType}</span>
                    <span>•</span>
                    <span>Notifications: {alert.notificationMethod}</span>
                    <span>•</span>
                    <span>Created: {new Date(alert.createdAt).toLocaleDateString()}</span>
                  </div>
                  
                  {alert.status === 'triggered' && (
                    <Badge className="bg-green-100 text-green-800">
                      <Check className="w-3 h-3 mr-1" />
                      Table Found!
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* No Alerts State */}
      {alerts.length === 0 && !showCreateAlert && (
        <Card>
          <CardContent className="p-8 text-center">
            <Bell className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Table Alerts</h3>
            <p className="text-gray-600 mb-4">
              Create an alert to get notified when tables become available at your preferred restaurants.
            </p>
            <Button onClick={() => setShowCreateAlert(true)} className="bg-blue-500 hover:bg-blue-600">
              <Bell className="w-4 h-4 mr-2" />
              Create Your First Alert
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TableAlertsComponent;