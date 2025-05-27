
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, User, Calendar, MapPin, Edit } from "lucide-react";
import { format } from "date-fns";

// Mock user data
const mockUser = {
  name: "John Doe",
  email: "john.doe@email.com",
  phone: "+1 (555) 123-4567",
  joinDate: new Date("2023-01-15")
};

// Mock rental history
const mockRentals = [
  {
    id: 1,
    bikeName: "Urban Cruiser",
    startDate: new Date("2024-01-20"),
    endDate: new Date("2024-01-22"),
    status: "completed",
    price: 50
  },
  {
    id: 2,
    bikeName: "Mountain Explorer",
    startDate: new Date("2024-01-25"),
    endDate: new Date("2024-01-27"),
    status: "active",
    price: 70
  },
  {
    id: 3,
    bikeName: "Electric Glide",
    startDate: new Date("2023-12-10"),
    endDate: new Date("2023-12-12"),
    status: "completed",
    price: 90
  }
];

const Profile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(mockUser);

  const handleSaveProfile = () => {
    // In real app, this would save to backend
    setIsEditing(false);
    alert("Profile updated successfully!");
  };

  const handleReturnBike = (rentalId: number) => {
    alert(`Bike returned successfully! Rental ID: ${rentalId}`);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case "completed":
        return <Badge variant="secondary">Completed</Badge>;
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
              <h1 className="text-2xl font-bold text-gray-900">Your Profile</h1>
            </div>
            <div className="text-xl font-bold text-blue-600">BikeRental</div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 lg:px-12 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Information */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="text-center">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="h-12 w-12 text-white" />
                </div>
                <CardTitle className="flex items-center justify-center space-x-2">
                  <span>{mockUser.name}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </CardTitle>
                <p className="text-gray-600">Member since {format(mockUser.joinDate, "MMMM yyyy")}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                {isEditing ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                      <Input
                        value={editedUser.name}
                        onChange={(e) => setEditedUser({...editedUser, name: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <Input
                        value={editedUser.email}
                        onChange={(e) => setEditedUser({...editedUser, email: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                      <Input
                        value={editedUser.phone}
                        onChange={(e) => setEditedUser({...editedUser, phone: e.target.value})}
                      />
                    </div>
                    <div className="flex space-x-2">
                      <Button onClick={handleSaveProfile} className="flex-1">Save</Button>
                      <Button variant="outline" onClick={() => setIsEditing(false)} className="flex-1">Cancel</Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="font-medium">{mockUser.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Phone</p>
                      <p className="font-medium">{mockUser.phone}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  onClick={() => navigate("/search")} 
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  Rent a New Bike
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => alert("Support contacted!")}
                >
                  Contact Support
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Rental History */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Your Rentals</CardTitle>
                <p className="text-gray-600">Track your current and past bike rentals</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockRentals.map((rental) => (
                    <div key={rental.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-lg">{rental.bikeName}</h3>
                        {getStatusBadge(rental.status)}
                      </div>
                      
                      <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600 mb-4">
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4" />
                          <span>Start: {format(rental.startDate, "MMM dd, yyyy")}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4" />
                          <span>End: {format(rental.endDate, "MMM dd, yyyy")}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-green-600">${rental.price}</span>
                        </div>
                      </div>
                      
                      {rental.status === "active" && (
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-blue-600">Currently rented</p>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleReturnBike(rental.id)}
                            className="hover:bg-red-50 hover:text-red-600 hover:border-red-300"
                          >
                            Return Bike
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {mockRentals.length === 0 && (
                  <div className="text-center py-12">
                    <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No rentals yet</h3>
                    <p className="text-gray-600 mb-6">Start your first bike adventure today!</p>
                    <Button onClick={() => navigate("/search")}>Browse Bikes</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
