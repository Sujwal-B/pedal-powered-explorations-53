
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ArrowLeft, MapPin, Star, Calendar as CalendarIcon, IndianRupee } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

// Mock bike data - in real app this would come from API
const mockBike = {
  id: 1,
  name: "Urban Cruiser",
  brand: "Hero",
  type: "City",
  price: 299,
  image: "/placeholder.svg",
  rating: 4.8,
  location: "Delhi NCR",
  availability: "Available",
  description: "Perfect for city commuting with comfortable seating and smooth ride quality. Features include basket, lights, and lock. Ideal for navigating through Indian traffic conditions.",
  features: ["Comfortable seat", "Built-in basket", "LED lights", "Chain lock included", "7-speed transmission", "Puncture-resistant tires"]
};

const BikeDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [showStartCalendar, setShowStartCalendar] = useState(false);
  const [showEndCalendar, setShowEndCalendar] = useState(false);

  const calculateDays = () => {
    if (startDate && endDate) {
      const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays || 1;
    }
    return 1;
  };

  const totalPrice = mockBike.price * calculateDays();

  const handleRentNow = () => {
    if (!startDate) {
      alert("Please select a rental start date.");
      return;
    }
    if (!endDate) {
      alert("Please select a rental end date.");
      return;
    }
    if (startDate >= endDate) {
      alert("Start date must be before the end date.");
      return;
    }
    
    navigate("/booking", { 
      state: { 
        bike: mockBike, 
        startDate, 
        endDate, 
        totalPrice,
        days: calculateDays()
      } 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm shadow-lg border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                onClick={() => navigate("/search")}
                className="flex items-center space-x-2 hover:bg-blue-50 transition-all duration-300"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Back to Search</span>
              </Button>
              <h1 className="text-2xl font-bold text-gray-900">Bike Details</h1>
            </div>
            <div className="text-xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              BikeRental India
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Bike Image and Info */}
          <div>
            <Card className="mb-6 overflow-hidden shadow-xl border-0">
              <CardContent className="p-0">
                <div className="relative">
                  <img 
                    src={mockBike.image} 
                    alt={mockBike.name}
                    className="w-full h-96 object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <div className={`px-4 py-2 rounded-full text-sm font-medium shadow-lg ${
                      mockBike.availability === "Available" 
                        ? "bg-green-500 text-white" 
                        : "bg-red-500 text-white"
                    }`}>
                      {mockBike.availability}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-8">
              <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">{mockBike.name}</h1>
                <div className="flex items-center space-x-6 mb-6">
                  <span className="text-xl text-gray-600 font-medium">Brand: {mockBike.brand}</span>
                  <div className="flex items-center space-x-2">
                    <Star className="h-6 w-6 text-yellow-400 fill-current" />
                    <span className="text-gray-600 text-lg font-medium">{mockBike.rating}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-8 mb-6">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600 bg-gradient-to-r from-blue-100 to-green-100 px-4 py-2 rounded-full font-medium border border-blue-200">
                      {mockBike.type} Bike
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <MapPin className="h-5 w-5 text-blue-600" />
                    <span className="font-medium">{mockBike.location}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-6 mb-8">
                  <div className="flex items-center bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl px-6 py-4 border border-green-200">
                    <IndianRupee className="h-8 w-8 text-green-600 mr-2" />
                    <span className="text-3xl font-bold text-green-600">{mockBike.price}</span>
                    <span className="text-gray-600 ml-2 text-lg">/day</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
                <h3 className="text-2xl font-semibold mb-4 text-gray-900">Description</h3>
                <p className="text-gray-600 leading-relaxed text-lg">{mockBike.description}</p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
                <h3 className="text-2xl font-semibold mb-6 text-gray-900">Features</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {mockBike.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-3 text-gray-600 bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-3 border border-blue-100">
                      <div className="w-3 h-3 bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex-shrink-0"></div>
                      <span className="font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div>
            <Card className="sticky top-24 shadow-2xl border-0 bg-gradient-to-br from-white to-blue-50">
              <CardContent className="p-8">
                <h2 className="text-2xl font-semibold mb-8 text-gray-900">Book Your Ride</h2>
                
                {/* Date Selection */}
                <div className="space-y-6 mb-8">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Select Start Date
                    </label>
                    <Popover open={showStartCalendar} onOpenChange={setShowStartCalendar}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal h-12 text-lg rounded-xl border-2",
                            !startDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-3 h-5 w-5" />
                          {startDate ? format(startDate, "PPP") : <span>Pick a start date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 bg-white" align="start">
                        <Calendar
                          mode="single"
                          selected={startDate}
                          onSelect={(date) => {
                            setStartDate(date);
                            setShowStartCalendar(false);
                          }}
                          disabled={(date) => date < new Date()}
                          initialFocus
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                    {!startDate && (
                      <p className="text-sm text-red-500 mt-2">Please select a rental start date.</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Select End Date
                    </label>
                    <Popover open={showEndCalendar} onOpenChange={setShowEndCalendar}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal h-12 text-lg rounded-xl border-2",
                            !endDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-3 h-5 w-5" />
                          {endDate ? format(endDate, "PPP") : <span>Pick an end date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 bg-white" align="start">
                        <Calendar
                          mode="single"
                          selected={endDate}
                          onSelect={(date) => {
                            setEndDate(date);
                            setShowEndCalendar(false);
                          }}
                          disabled={(date) => date < new Date() || (startDate && date <= startDate)}
                          initialFocus
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                    {!endDate && (
                      <p className="text-sm text-red-500 mt-2">Please select a rental end date.</p>
                    )}
                  </div>
                </div>

                {/* Booking Summary */}
                {startDate && endDate && (
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 mb-8 border border-green-200">
                    <h3 className="font-semibold mb-4 text-lg text-gray-900">Booking Summary</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Bike:</span>
                        <span className="font-medium text-gray-900">{mockBike.name}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Duration:</span>
                        <span className="font-medium text-gray-900">{calculateDays()} day{calculateDays() > 1 ? 's' : ''}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Price per day:</span>
                        <div className="flex items-center font-medium text-gray-900">
                          <IndianRupee className="h-4 w-4 mr-1" />
                          <span>{mockBike.price}</span>
                        </div>
                      </div>
                      <div className="border-t border-green-300 pt-3 flex justify-between items-center font-semibold text-lg">
                        <span className="text-gray-900">Total Price:</span>
                        <div className="flex items-center text-green-600">
                          <IndianRupee className="h-5 w-5 mr-1" />
                          <span>{totalPrice}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <Button 
                  onClick={handleRentNow}
                  className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 hover:from-blue-700 hover:via-purple-700 hover:to-green-700 text-white py-4 font-semibold rounded-2xl text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                  disabled={mockBike.availability !== "Available"}
                >
                  {mockBike.availability === "Available" ? "Rent Now" : "Currently Unavailable"}
                </Button>

                <p className="text-xs text-gray-500 mt-6 text-center leading-relaxed">
                  By proceeding, you agree to our Terms and Conditions. All prices are in Indian Rupees (₹).
                </p>
              </CardContent>
            </Card>

            <div className="mt-8 text-center">
              <p className="text-gray-600 text-lg">
                Looking for something else?{" "}
                <button 
                  onClick={() => navigate("/search")} 
                  className="text-blue-600 hover:underline font-medium hover:text-blue-700 transition-colors"
                >
                  Check our other bike types in the search section.
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BikeDetail;
