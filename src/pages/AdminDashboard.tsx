
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ArrowLeft, Plus, Users, Bike, TrendingUp, MapPin } from "lucide-react";

// Mock data
const mockStats = {
  totalRentals: 156,
  activeRentals: 23,
  totalBikes: 45,
  availableBikes: 22
};

const mockBikes = [
  { id: 1, name: "Urban Cruiser", type: "City", price: 25, status: "available" },
  { id: 2, name: "Mountain Explorer", type: "Mountain", price: 35, status: "rented" },
  { id: 3, name: "Electric Glide", type: "Electric", price: 45, status: "maintenance" },
];

const mockUsers = [
  { id: 1, name: "John Doe", email: "john@email.com", rentals: 3, status: "active" },
  { id: 2, name: "Jane Smith", email: "jane@email.com", rentals: 1, status: "active" },
  { id: 3, name: "Bob Johnson", email: "bob@email.com", rentals: 5, status: "inactive" },
];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [showAddBike, setShowAddBike] = useState(false);
  const [newBike, setNewBike] = useState({
    name: "",
    type: "",
    price: "",
    image: ""
  });

  const handleAddBike = () => {
    // In real app, this would save to backend
    console.log("Adding new bike:", newBike);
    setShowAddBike(false);
    setNewBike({ name: "", type: "", price: "", image: "" });
    alert("Bike added successfully!");
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "available":
        return <Badge className="bg-green-100 text-green-800">Available</Badge>;
      case "rented":
        return <Badge className="bg-blue-100 text-blue-800">Rented</Badge>;
      case "maintenance":
        return <Badge className="bg-yellow-100 text-yellow-800">Maintenance</Badge>;
      case "active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case "inactive":
        return <Badge variant="secondary">Inactive</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                onClick={() => navigate("/")}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Home</span>
              </Button>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            </div>
            <div className="text-xl font-bold text-blue-600">BikeRental</div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8">
        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Rentals</p>
                  <p className="text-2xl font-bold">{mockStats.totalRentals}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Rentals</p>
                  <p className="text-2xl font-bold">{mockStats.activeRentals}</p>
                </div>
                <MapPin className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Bikes</p>
                  <p className="text-2xl font-bold">{mockStats.totalBikes}</p>
                </div>
                <Bike className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Available Bikes</p>
                  <p className="text-2xl font-bold">{mockStats.availableBikes}</p>
                </div>
                <Bike className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Bike Management */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Bike Management</CardTitle>
              <Dialog open={showAddBike} onOpenChange={setShowAddBike}>
                <DialogTrigger asChild>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Bike
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-white">
                  <DialogHeader>
                    <DialogTitle>Add New Bike</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Bike Name</label>
                      <Input
                        placeholder="Enter bike name"
                        value={newBike.name}
                        onChange={(e) => setNewBike({...newBike, name: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Bike Type</label>
                      <Select value={newBike.type} onValueChange={(value) => setNewBike({...newBike, type: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select bike type" />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          <SelectItem value="Mountain">Mountain</SelectItem>
                          <SelectItem value="Electric">Electric</SelectItem>
                          <SelectItem value="City">City</SelectItem>
                          <SelectItem value="Road">Road</SelectItem>
                          <SelectItem value="Hybrid">Hybrid</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Price per Day</label>
                      <Input
                        type="number"
                        placeholder="Enter price"
                        value={newBike.price}
                        onChange={(e) => setNewBike({...newBike, price: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                      <Input
                        placeholder="Enter image URL"
                        value={newBike.image}
                        onChange={(e) => setNewBike({...newBike, image: e.target.value})}
                      />
                    </div>
                    <Button onClick={handleAddBike} className="w-full">
                      Add Bike
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockBikes.map((bike) => (
                  <div key={bike.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                    <div>
                      <h3 className="font-medium">{bike.name}</h3>
                      <p className="text-sm text-gray-600">{bike.type} • ${bike.price}/day</p>
                    </div>
                    {getStatusBadge(bike.status)}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* User Management */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>User Management</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockUsers.map((user) => (
                  <div key={user.id} className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">{user.name}</h3>
                      {getStatusBadge(user.status)}
                    </div>
                    <div className="text-sm text-gray-600">
                      <p>Email: {user.email}</p>
                      <p>Total Rentals: {user.rentals}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Rental Overview */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Recent Rental Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-gray-500">
              <TrendingUp className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <p>Rental activity chart would be displayed here</p>
              <p className="text-sm">Connect to analytics service for detailed insights</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
