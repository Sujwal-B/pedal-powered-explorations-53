
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, MapPin, Star } from "lucide-react";

// Mock bike data
const mockBikes = [
  {
    id: 1,
    name: "Urban Cruiser",
    type: "City",
    price: 25,
    image: "/placeholder.svg",
    rating: 4.8,
    location: "Downtown"
  },
  {
    id: 2,
    name: "Mountain Explorer",
    type: "Mountain",
    price: 35,
    image: "/placeholder.svg",
    rating: 4.9,
    location: "Park Area"
  },
  {
    id: 3,
    name: "Electric Glide",
    type: "Electric",
    price: 45,
    image: "/placeholder.svg",
    rating: 4.7,
    location: "City Center"
  },
  {
    id: 4,
    name: "Speed Demon",
    type: "Road",
    price: 30,
    image: "/placeholder.svg",
    rating: 4.6,
    location: "Suburbs"
  },
  {
    id: 5,
    name: "Comfort Ride",
    type: "Hybrid",
    price: 28,
    image: "/placeholder.svg",
    rating: 4.5,
    location: "Downtown"
  },
  {
    id: 6,
    name: "Trail Blazer",
    type: "Mountain",
    price: 40,
    image: "/placeholder.svg",
    rating: 4.8,
    location: "Mountain View"
  }
];

const BikeSearch = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [location, setLocation] = useState(searchParams.get("location") || "");
  const [bikeType, setBikeType] = useState("");
  const [priceRange, setPriceRange] = useState([20, 50]);
  const [filteredBikes, setFilteredBikes] = useState(mockBikes);

  useEffect(() => {
    let filtered = mockBikes;

    if (bikeType) {
      filtered = filtered.filter(bike => bike.type === bikeType);
    }

    filtered = filtered.filter(bike => 
      bike.price >= priceRange[0] && bike.price <= priceRange[1]
    );

    if (location) {
      filtered = filtered.filter(bike => 
        bike.location.toLowerCase().includes(location.toLowerCase())
      );
    }

    setFilteredBikes(filtered);
  }, [bikeType, priceRange, location]);

  const handleBikeDetails = (bikeId: number) => {
    navigate(`/bike/${bikeId}`);
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
                <span>Back</span>
              </Button>
              <h1 className="text-2xl font-bold text-gray-900">Explore Our Bikes</h1>
            </div>
            <div className="text-xl font-bold text-blue-600">BikeRental</div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-6">Filter Bikes</h2>
                
                {/* Location Filter */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pickup Location
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      type="text"
                      placeholder="Enter your pickup location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  {!location && (
                    <p className="text-sm text-red-500 mt-1">Location is required to find available bikes.</p>
                  )}
                </div>

                {/* Bike Type Filter */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bike Type
                  </label>
                  <Select value={bikeType} onValueChange={setBikeType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose bike type" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="City">City Bike</SelectItem>
                      <SelectItem value="Mountain">Mountain Bike</SelectItem>
                      <SelectItem value="Electric">Electric Bike</SelectItem>
                      <SelectItem value="Road">Road Bike</SelectItem>
                      <SelectItem value="Hybrid">Hybrid Bike</SelectItem>
                    </SelectContent>
                  </Select>
                  {!bikeType && (
                    <p className="text-sm text-red-500 mt-1">Please select a bike type.</p>
                  )}
                </div>

                {/* Price Range Filter */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price per day: ${priceRange[0]} - ${priceRange[1]}
                  </label>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={60}
                    min={10}
                    step={5}
                    className="mt-2"
                  />
                  {priceRange[0] === priceRange[1] && (
                    <p className="text-sm text-red-500 mt-1">Please select a price range.</p>
                  )}
                </div>

                <Button 
                  onClick={() => {
                    setBikeType("");
                    setPriceRange([20, 50]);
                    setLocation("");
                  }}
                  variant="outline" 
                  className="w-full"
                >
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Bike Listings */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">
                {filteredBikes.length} bikes found
              </p>
            </div>

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredBikes.map((bike) => (
                <Card 
                  key={bike.id} 
                  className="group cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                  onClick={() => handleBikeDetails(bike.id)}
                >
                  <CardContent className="p-0">
                    <div className="relative">
                      <img 
                        src={bike.image} 
                        alt={bike.name}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      <div className="absolute top-3 right-3 bg-white rounded-full px-2 py-1 text-sm font-semibold text-green-600">
                        ${bike.price}/day
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-2">{bike.name}</h3>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                          {bike.type}
                        </span>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-gray-600">{bike.rating}</span>
                        </div>
                      </div>
                      <div className="flex items-center text-sm text-gray-500 mb-4">
                        <MapPin className="h-4 w-4 mr-1" />
                        {bike.location}
                      </div>
                      
                      <Button 
                        className="w-full bg-blue-600 hover:bg-blue-700"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleBikeDetails(bike.id);
                        }}
                      >
                        See Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredBikes.length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No bikes found</h3>
                <p className="text-gray-600">Try adjusting your filters to see more options.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BikeSearch;
