
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ArrowLeft, MapPin, Star, Calendar as CalendarIcon, IndianRupee, Shield, Clock, CheckCircle } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

// Mock bike data with Indian pricing
const mockBike = {
  id: 1,
  name: "Hero Splendor Plus",
  brand: "Hero MotoCorp",
  type: "City",
  price: 299,
  image: "/placeholder.svg",
  rating: 4.8,
  location: "Delhi NCR",
  availability: "Available",
  description: "Perfect for city commuting with comfortable seating and excellent fuel efficiency. Features include electric start, alloy wheels, and integrated braking system. Ideal for navigating through Indian traffic conditions with ease and comfort.",
  features: ["Electric Start", "Alloy Wheels", "LED Headlight", "Digital Console", "Comfortable Seat", "Fuel Efficient Engine"]
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
      {/* Enhanced Header */}
      <header className="bg-white/90 backdrop-blur-sm shadow-xl border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <Button 
                variant="ghost" 
                onClick={() => navigate("/search")}
                className="flex items-center space-x-2 hover:bg-white/50 transition-all duration-300 rounded-2xl px-6 py-3"
              >
                <ArrowLeft className="h-5 w-5" />
                <span className="font-medium">Back to Search</span>
              </Button>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">Bike Details</h1>
            </div>
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">BikeRental India</div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Enhanced Bike Image and Info */}
          <div>
            <Card className="mb-8 overflow-hidden shadow-2xl border-0 rounded-3xl">
              <CardContent className="p-0">
                <div className="relative">
                  <img 
                    src={mockBike.image} 
                    alt={mockBike.name}
                    className="w-full h-96 object-cover"
                  />
                  <div className="absolute top-6 right-6">
                    <div className={`px-6 py-3 rounded-2xl text-lg font-bold shadow-xl ${
                      mockBike.availability === "Available" 
                        ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white" 
                        : "bg-gradient-to-r from-red-500 to-pink-500 text-white"
                    }`}>
                      {mockBike.availability}
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-8">
              <div className="bg-white rounded-3xl p-8 shadow-xl border-0">
                <h1 className="text-4xl font-bold text-gray-900 mb-6">{mockBike.name}</h1>
                <div className="flex items-center space-x-8 mb-6">
                  <div className="flex items-center space-x-3 bg-gradient-to-r from-blue-50 to-purple-50 px-6 py-3 rounded-2xl border border-blue-200">
                    <span className="text-xl text-gray-700 font-bold">Brand:</span>
                    <span className="text-xl text-blue-600 font-bold">{mockBike.brand}</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-gradient-to-r from-yellow-50 to-orange-50 px-6 py-3 rounded-2xl border border-yellow-200">
                    <Star className="h-6 w-6 text-yellow-500 fill-current" />
                    <span className="text-gray-700 text-xl font-bold">{mockBike.rating}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-8 mb-8">
                  <div className="flex items-center space-x-3 bg-gradient-to-r from-green-50 to-blue-50 px-6 py-3 rounded-2xl border border-green-200">
                    <span className="text-lg text-gray-600 font-semibold">{mockBike.type} Bike</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-600 bg-gradient-to-r from-gray-50 to-blue-50 px-6 py-3 rounded-2xl border border-gray-200">
                    <MapPin className="h-5 w-5 text-blue-600" />
                    <span className="font-semibold text-lg">{mockBike.location}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-6 mb-8">
                  <div className="flex items-center bg-gradient-to-r from-green-100 to-emerald-100 rounded-3xl px-8 py-6 border-2 border-green-300 shadow-lg">
                    <IndianRupee className="h-10 w-10 text-green-600 mr-3" />
                    <span className="text-4xl font-bold text-green-600">{mockBike.price}</span>
                    <span className="text-gray-600 ml-3 text-xl font-semibold">/day</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-xl border-0">
                <h3 className="text-2xl font-bold mb-6 text-gray-900 flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mr-3">
                    <Clock className="h-4 w-4 text-white" />
                  </div>
                  Description
                </h3>
                <p className="text-gray-600 leading-relaxed text-lg bg-gradient-to-r from-gray-50 to-blue-50 p-6 rounded-2xl border border-gray-200">{mockBike.description}</p>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-xl border-0">
                <h3 className="text-2xl font-bold mb-6 text-gray-900 flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-blue-600 rounded-xl flex items-center justify-center mr-3">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  Features & Amenities
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {mockBike.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-4 text-gray-700 bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-4 border border-blue-100 hover:shadow-lg transition-shadow duration-300">
                      <div className="w-4 h-4 bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex-shrink-0"></div>
                      <span className="font-semibold text-lg">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Booking Form */}
          <div>
            <Card className="sticky top-24 shadow-2xl border-0 bg-gradient-to-br from-white to-blue-50 rounded-3xl overflow-hidden">
              <CardContent className="p-8">
                <div className="flex items-center space-x-4 mb-8">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl flex items-center justify-center">
                    <CalendarIcon className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">Book Your Ride</h2>
                </div>
                
                {/* Enhanced Date Selection */}
                <div className="space-y-8 mb-8">
                  <div>
                    <label className="block text-lg font-bold text-gray-700 mb-4">
                      Select Start Date
                    </label>
                    <Popover open={showStartCalendar} onOpenChange={setShowStartCalendar}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-semibold h-14 text-lg rounded-2xl border-2 border-gray-200 hover:border-blue-500 bg-white",
                            !startDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-4 h-6 w-6" />
                          {startDate ? format(startDate, "PPP") : <span>Pick a start date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 bg-white rounded-2xl shadow-2xl" align="start">
                        <Calendar
                          mode="single"
                          selected={startDate}
                          onSelect={(date) => {
                            setStartDate(date);
                            setShowStartCalendar(false);
                          }}
                          disabled={(date) => date < new Date()}
                          initialFocus
                          className="pointer-events-auto p-4"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div>
                    <label className="block text-lg font-bold text-gray-700 mb-4">
                      Select End Date
                    </label>
                    <Popover open={showEndCalendar} onOpenChange={setShowEndCalendar}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-semibold h-14 text-lg rounded-2xl border-2 border-gray-200 hover:border-blue-500 bg-white",
                            !endDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-4 h-6 w-6" />
                          {endDate ? format(endDate, "PPP") : <span>Pick an end date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 bg-white rounded-2xl shadow-2xl" align="start">
                        <Calendar
                          mode="single"
                          selected={endDate}
                          onSelect={(date) => {
                            setEndDate(date);
                            setShowEndCalendar(false);
                          }}
                          disabled={(date) => date < new Date() || (startDate && date <= startDate)}
                          initialFocus
                          className="pointer-events-auto p-4"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                {/* Enhanced Booking Summary */}
                {startDate && endDate && (
                  <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-3xl p-8 mb-8 border-2 border-green-200 shadow-lg">
                    <h3 className="font-bold mb-6 text-2xl text-gray-900 flex items-center">
                      <Shield className="h-6 w-6 text-green-600 mr-3" />
                      Booking Summary
                    </h3>
                    <div className="space-y-4 text-lg">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700 font-semibold">Bike:</span>
                        <span className="font-bold text-gray-900">{mockBike.name}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700 font-semibold">Duration:</span>
                        <span className="font-bold text-gray-900">{calculateDays()} day{calculateDays() > 1 ? 's' : ''}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700 font-semibold">Price per day:</span>
                        <div className="flex items-center font-bold text-gray-900">
                          <IndianRupee className="h-5 w-5 mr-1" />
                          <span>{mockBike.price}</span>
                        </div>
                      </div>
                      <div className="border-t-2 border-green-300 pt-4 flex justify-between items-center font-bold text-2xl">
                        <span className="text-gray-900">Total Price:</span>
                        <div className="flex items-center text-green-600">
                          <IndianRupee className="h-7 w-7 mr-1" />
                          <span>{totalPrice}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <Button 
                  onClick={handleRentNow}
                  className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 hover:from-blue-700 hover:via-purple-700 hover:to-green-700 text-white py-6 font-bold rounded-3xl text-xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105"
                  disabled={mockBike.availability !== "Available"}
                >
                  {mockBike.availability === "Available" ? 
                    <>
                      <IndianRupee className="mr-2 h-6 w-6" />
                      Rent Now - ₹{totalPrice}
                    </> : 
                    "Currently Unavailable"
                  }
                </Button>

                <p className="text-sm text-gray-500 mt-6 text-center leading-relaxed bg-gray-50 p-4 rounded-2xl">
                  By proceeding, you agree to our Terms and Conditions. All prices are in Indian Rupees (₹). Secure payment guaranteed.
                </p>
              </CardContent>
            </Card>

            <div className="mt-8 text-center">
              <p className="text-gray-600 text-xl leading-relaxed">
                Looking for something else?{" "}
                <button 
                  onClick={() => navigate("/search")} 
                  className="text-blue-600 hover:underline font-bold hover:text-blue-700 transition-colors"
                >
                  Explore our complete bike collection
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
