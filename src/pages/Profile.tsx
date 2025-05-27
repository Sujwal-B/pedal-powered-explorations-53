
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, User, Calendar, MapPin, Edit, IndianRupee, Phone, Mail } from "lucide-react";
import { format } from "date-fns";

// Mock user data
const mockUser = {
  name: "Rajesh Kumar",
  email: "rajesh.kumar@email.com",
  phone: "+91 98765 43210",
  joinDate: new Date("2023-01-15")
};

// Mock rental history with Indian pricing
const mockRentals = [
  {
    id: 1,
    bikeName: "City Cruiser Hero",
    startDate: new Date("2024-01-20"),
    endDate: new Date("2024-01-22"),
    status: "completed",
    price: 398
  },
  {
    id: 2,
    bikeName: "Royal Enfield Classic",
    startDate: new Date("2024-01-25"),
    endDate: new Date("2024-01-27"),
    status: "active",
    price: 1299
  },
  {
    id: 3,
    bikeName: "TVS Apache RTR",
    startDate: new Date("2023-12-10"),
    endDate: new Date("2023-12-12"),
    status: "completed",
    price: 799
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
        return <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 shadow-lg">Active</Badge>;
      case "completed":
        return <Badge className="bg-gradient-to-r from-gray-500 to-slate-500 text-white border-0 shadow-lg">Completed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-xl border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <Button 
                variant="ghost" 
                onClick={() => navigate("/")}
                className="flex items-center space-x-2 hover:bg-white/50 transition-all duration-300 rounded-2xl px-6 py-3"
              >
                <ArrowLeft className="h-5 w-5" />
                <span className="font-medium">Home</span>
              </Button>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">Your Profile</h1>
            </div>
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">BikeRental India</div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 lg:px-12 py-12">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Profile Information */}
          <div className="lg:col-span-1">
            <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden">
              <CardHeader className="text-center bg-gradient-to-br from-blue-50 to-purple-50 pb-8">
                <div className="w-32 h-32 bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
                  <User className="h-16 w-16 text-white" />
                </div>
                <CardTitle className="flex items-center justify-center space-x-3 text-2xl">
                  <span className="text-gray-900">{mockUser.name}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsEditing(!isEditing)}
                    className="hover:bg-white/50 rounded-xl p-2"
                  >
                    <Edit className="h-5 w-5 text-blue-600" />
                  </Button>
                </CardTitle>
                <p className="text-gray-600 text-lg font-medium">Member since {format(mockUser.joinDate, "MMMM yyyy")}</p>
              </CardHeader>
              <CardContent className="space-y-6 p-8">
                {isEditing ? (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">Name</label>
                      <Input
                        value={editedUser.name}
                        onChange={(e) => setEditedUser({...editedUser, name: e.target.value})}
                        className="rounded-2xl border-gray-200 focus:ring-2 focus:ring-blue-500 py-3"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">Email</label>
                      <Input
                        value={editedUser.email}
                        onChange={(e) => setEditedUser({...editedUser, email: e.target.value})}
                        className="rounded-2xl border-gray-200 focus:ring-2 focus:ring-blue-500 py-3"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">Phone</label>
                      <Input
                        value={editedUser.phone}
                        onChange={(e) => setEditedUser({...editedUser, phone: e.target.value})}
                        className="rounded-2xl border-gray-200 focus:ring-2 focus:ring-blue-500 py-3"
                      />
                    </div>
                    <div className="flex space-x-3 pt-4">
                      <Button 
                        onClick={handleSaveProfile} 
                        className="flex-1 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 rounded-2xl py-3 font-semibold shadow-xl"
                      >
                        Save Changes
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => setIsEditing(false)} 
                        className="flex-1 rounded-2xl py-3 font-semibold border-gray-300 hover:bg-gray-50"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl">
                      <Mail className="h-6 w-6 text-blue-600" />
                      <div>
                        <p className="text-sm text-gray-600 font-medium">Email</p>
                        <p className="font-semibold text-gray-900 text-lg">{mockUser.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl">
                      <Phone className="h-6 w-6 text-green-600" />
                      <div>
                        <p className="text-sm text-gray-600 font-medium">Phone</p>
                        <p className="font-semibold text-gray-900 text-lg">{mockUser.phone}</p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="mt-8 shadow-2xl border-0 bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden">
              <CardHeader className="bg-gradient-to-br from-green-50 to-blue-50">
                <CardTitle className="text-xl text-gray-900">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 p-8">
                <Button 
                  onClick={() => navigate("/search")} 
                  className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 hover:from-blue-700 hover:via-purple-700 hover:to-green-700 rounded-2xl py-4 font-semibold text-lg shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  <IndianRupee className="mr-2 h-5 w-5" />
                  Rent a New Bike
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full rounded-2xl py-4 font-semibold text-lg border-gray-300 hover:bg-gray-50 hover:shadow-lg transition-all duration-300"
                  onClick={() => alert("Support contacted!")}
                >
                  Contact Support
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Rental History */}
          <div className="lg:col-span-2">
            <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden">
              <CardHeader className="bg-gradient-to-br from-purple-50 to-green-50 pb-8">
                <CardTitle className="text-3xl text-gray-900 mb-2">Your Rentals</CardTitle>
                <p className="text-gray-600 text-lg">Track your current and past bike rentals across India</p>
              </CardHeader>
              <CardContent className="p-8">
                <div className="space-y-6">
                  {mockRentals.map((rental) => (
                    <div key={rental.id} className="border-0 rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-white to-gray-50 shadow-lg">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold text-2xl text-gray-900">{rental.bikeName}</h3>
                        {getStatusBadge(rental.status)}
                      </div>
                      
                      <div className="grid md:grid-cols-3 gap-6 text-gray-600 mb-6">
                        <div className="flex items-center space-x-3 bg-blue-50 p-4 rounded-2xl">
                          <Calendar className="h-6 w-6 text-blue-600" />
                          <div>
                            <p className="text-sm font-medium text-gray-600">Start Date</p>
                            <p className="font-semibold text-gray-900">{format(rental.startDate, "MMM dd, yyyy")}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3 bg-green-50 p-4 rounded-2xl">
                          <Calendar className="h-6 w-6 text-green-600" />
                          <div>
                            <p className="text-sm font-medium text-gray-600">End Date</p>
                            <p className="font-semibold text-gray-900">{format(rental.endDate, "MMM dd, yyyy")}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3 bg-purple-50 p-4 rounded-2xl">
                          <IndianRupee className="h-6 w-6 text-purple-600" />
                          <div>
                            <p className="text-sm font-medium text-gray-600">Total Cost</p>
                            <p className="font-bold text-2xl text-purple-600">₹{rental.price}</p>
                          </div>
                        </div>
                      </div>
                      
                      {rental.status === "active" && (
                        <div className="flex items-center justify-between bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-2xl">
                          <div>
                            <p className="text-lg font-semibold text-green-700">Currently Active Rental</p>
                            <p className="text-green-600">Your bike is ready for adventure!</p>
                          </div>
                          <Button 
                            size="lg" 
                            variant="outline"
                            onClick={() => handleReturnBike(rental.id)}
                            className="hover:bg-red-50 hover:text-red-600 hover:border-red-300 rounded-2xl px-8 py-3 font-semibold transition-all duration-300 transform hover:scale-105"
                          >
                            Return Bike
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {mockRentals.length === 0 && (
                  <div className="text-center py-20">
                    <div className="w-24 h-24 bg-gradient-to-r from-gray-300 to-gray-400 rounded-full flex items-center justify-center mx-auto mb-8">
                      <MapPin className="h-12 w-12 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">No rentals yet</h3>
                    <p className="text-gray-600 mb-8 text-lg">Start your first bike adventure across India today!</p>
                    <Button 
                      onClick={() => navigate("/search")}
                      className="bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 hover:from-blue-700 hover:via-purple-700 hover:to-green-700 rounded-2xl px-10 py-4 font-semibold text-lg shadow-xl transform hover:scale-105 transition-all duration-300"
                    >
                      <IndianRupee className="mr-2 h-5 w-5" />
                      Browse Bikes
                    </Button>
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
