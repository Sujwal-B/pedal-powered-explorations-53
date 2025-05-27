
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ArrowLeft, MapPin, Star, Calendar as CalendarIcon, Clock } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

// Mock bike data - in real app this would come from API
const mockBike = {
  id: 1,
  name: "Urban Cruiser",
  brand: "CityRide",
  type: "City",
  price: 25,
  image: "/placeholder.svg",
  rating: 4.8,
  location: "Downtown",
  availability: "Available",
  description: "Perfect for city commuting with comfortable seating and smooth ride quality. Features include basket, lights, and lock.",
  features: ["Comfortable seat", "Built-in basket", "LED lights", "Chain lock included", "7-speed transmission"]
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                onClick={() => navigate("/search")}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Back to Search</span>
              </Button>
              <h1 className="text-2xl font-bold text-gray-900">Bike Details</h1>
            </div>
            <div className="text-xl font-bold text-blue-600">BikeRental</div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Bike Image and Info */}
          <div>
            <Card className="mb-6">
              <CardContent className="p-0">
                <img 
                  src={mockBike.image} 
                  alt={mockBike.name}
                  className="w-full h-96 object-cover rounded-lg"
                />
              </CardContent>
            </Card>

            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{mockBike.name}</h1>
                <div className="flex items-center space-x-4 mb-4">
                  <span className="text-lg text-gray-600">Brand: {mockBike.brand}</span>
                  <div className="flex items-center space-x-1">
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <span className="text-gray-600">{mockBike.rating}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-6 mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                      {mockBike.type} Bike
                    </span>
                  </div>
                  <div className="flex items-center space-x-1 text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span>{mockBike.location}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-4 mb-6">
                  <div className="text-2xl font-bold text-green-600">
                    ${mockBike.price}/day
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                    mockBike.availability === "Available" 
                      ? "bg-green-100 text-green-800" 
                      : "bg-red-100 text-red-800"
                  }`}>
                    {mockBike.availability}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Description</h3>
                <p className="text-gray-600 leading-relaxed">{mockBike.description}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Features</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {mockBike.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2 text-gray-600">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div>
            <Card className="sticky top-8">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-6">Book Your Ride</h2>
                
                {/* Date Selection */}
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Start Date
                    </label>
                    <Popover open={showStartCalendar} onOpenChange={setShowStartCalendar}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !startDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {startDate ? format(startDate, "PPP") : <span>Pick a start date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
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
                      <p className="text-sm text-red-500 mt-1">Please select a rental start date.</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select End Date
                    </label>
                    <Popover open={showEndCalendar} onOpenChange={setShowEndCalendar}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !endDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {endDate ? format(endDate, "PPP") : <span>Pick an end date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
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
                      <p className="text-sm text-red-500 mt-1">Please select a rental end date.</p>
                    )}
                  </div>
                </div>

                {/* Booking Summary */}
                {startDate && endDate && (
                  <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <h3 className="font-semibold mb-3">Booking Summary</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Bike:</span>
                        <span>{mockBike.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Duration:</span>
                        <span>{calculateDays()} day{calculateDays() > 1 ? 's' : ''}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Price per day:</span>
                        <span>${mockBike.price}</span>
                      </div>
                      <div className="border-t pt-2 flex justify-between font-semibold">
                        <span>Total Price:</span>
                        <span className="text-green-600">${totalPrice}</span>
                      </div>
                    </div>
                  </div>
                )}

                <Button 
                  onClick={handleRentNow}
                  className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white py-3 font-semibold rounded-lg"
                  disabled={mockBike.availability !== "Available"}
                >
                  {mockBike.availability === "Available" ? "Rent Now" : "Currently Unavailable"}
                </Button>

                <p className="text-xs text-gray-500 mt-4 text-center">
                  By proceeding, you agree to our Terms and Conditions.
                </p>
              </CardContent>
            </Card>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Looking for something else?{" "}
                <button 
                  onClick={() => navigate("/search")} 
                  className="text-blue-600 hover:underline"
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
