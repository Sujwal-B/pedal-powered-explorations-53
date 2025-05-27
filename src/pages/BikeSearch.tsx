
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, MapPin, Star, IndianRupee, Search, Filter } from "lucide-react";

// Mock bike data with Indian pricing
const mockBikes = [
  {
    id: 1,
    name: "Hero Splendor Plus",
    type: "City",
    price: 199,
    image: "/placeholder.svg",
    rating: 4.8,
    location: "Delhi NCR"
  },
  {
    id: 2,
    name: "Royal Enfield Himalayan",
    type: "Mountain",
    price: 899,
    image: "/placeholder.svg",
    rating: 4.9,
    location: "Manali"
  },
  {
    id: 3,
    name: "Ather 450X",
    type: "Electric",
    price: 399,
    image: "/placeholder.svg",
    rating: 4.7,
    location: "Bangalore"
  },
  {
    id: 4,
    name: "KTM RC 200",
    type: "Sports",
    price: 799,
    image: "/placeholder.svg",
    rating: 4.6,
    location: "Mumbai"
  },
  {
    id: 5,
    name: "Honda Activa 6G",
    type: "Scooter",
    price: 299,
    image: "/placeholder.svg",
    rating: 4.5,
    location: "Pune"
  },
  {
    id: 6,
    name: "Royal Enfield Classic 350",
    type: "Cruiser",
    price: 699,
    image: "/placeholder.svg",
    rating: 4.8,
    location: "Goa"
  }
];

const BikeSearch = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [location, setLocation] = useState(searchParams.get("location") || "");
  const [bikeType, setBikeType] = useState("");
  const [priceRange, setPriceRange] = useState([150, 1000]);
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Enhanced Header */}
      <header className="bg-white/90 backdrop-blur-sm shadow-xl border-b border-white/20 sticky top-0 z-50">
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
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">Explore Our Bikes</h1>
            </div>
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">BikeRental India</div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        <div className="grid lg:grid-cols-4 gap-10">
          {/* Enhanced Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24 shadow-2xl border-0 bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden">
              <CardContent className="p-8">
                <div className="flex items-center space-x-3 mb-8">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center">
                    <Filter className="h-5 w-5 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Filter Bikes</h2>
                </div>
                
                {/* Location Filter */}
                <div className="mb-8">
                  <label className="block text-sm font-semibold text-gray-700 mb-4">
                    Pickup Location
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <Input
                      type="text"
                      placeholder="Enter your city (Delhi, Mumbai...)"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="pl-12 py-4 rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-lg"
                    />
                  </div>
                </div>

                {/* Bike Type Filter */}
                <div className="mb-8">
                  <label className="block text-sm font-semibold text-gray-700 mb-4">
                    Bike Type
                  </label>
                  <Select value={bikeType} onValueChange={setBikeType}>
                    <SelectTrigger className="h-14 text-lg rounded-2xl border-2 border-gray-200 focus:border-blue-500">
                      <SelectValue placeholder="Choose bike type" />
                    </SelectTrigger>
                    <SelectContent className="bg-white rounded-2xl shadow-2xl border-0">
                      <SelectItem value="City">City Bike</SelectItem>
                      <SelectItem value="Mountain">Mountain Bike</SelectItem>
                      <SelectItem value="Electric">Electric Bike</SelectItem>
                      <SelectItem value="Sports">Sports Bike</SelectItem>
                      <SelectItem value="Scooter">Scooter</SelectItem>
                      <SelectItem value="Cruiser">Cruiser Bike</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Price Range Filter */}
                <div className="mb-8">
                  <label className="block text-sm font-semibold text-gray-700 mb-4">
                    Price per day: ₹{priceRange[0]} - ₹{priceRange[1]}
                  </label>
                  <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-6 border border-blue-200">
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      max={1200}
                      min={100}
                      step={50}
                      className="mt-2"
                    />
                  </div>
                </div>

                <Button 
                  onClick={() => {
                    setBikeType("");
                    setPriceRange([150, 1000]);
                    setLocation("");
                  }}
                  variant="outline" 
                  className="w-full rounded-2xl py-4 font-semibold text-lg border-2 border-gray-300 hover:bg-gray-50 hover:shadow-lg transition-all duration-300"
                >
                  Clear All Filters
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Bike Listings */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl flex items-center justify-center">
                  <Search className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {filteredBikes.length} bikes found
                  </p>
                  <p className="text-gray-600 text-lg">Choose your perfect ride across India</p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 xl:grid-cols-2 gap-8">
              {filteredBikes.map((bike) => (
                <Card 
                  key={bike.id} 
                  className="group cursor-pointer hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border-0 rounded-3xl overflow-hidden bg-white/80 backdrop-blur-sm"
                  onClick={() => handleBikeDetails(bike.id)}
                >
                  <CardContent className="p-0">
                    <div className="relative">
                      <img 
                        src={bike.image} 
                        alt={bike.name}
                        className="w-full h-64 object-cover"
                      />
                      <div className="absolute top-4 right-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-2xl px-4 py-2 font-bold text-lg shadow-xl">
                        ₹{bike.price}/day
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    
                    <div className="p-8">
                      <h3 className="font-bold text-2xl mb-4 text-gray-900">{bike.name}</h3>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-lg text-gray-600 bg-gradient-to-r from-blue-100 to-green-100 px-4 py-2 rounded-2xl font-semibold border border-blue-200">
                          {bike.type}
                        </span>
                        <div className="flex items-center space-x-2 bg-gradient-to-r from-yellow-50 to-orange-50 px-4 py-2 rounded-2xl border border-yellow-200">
                          <Star className="h-5 w-5 text-yellow-500 fill-current" />
                          <span className="font-semibold text-gray-700">{bike.rating}</span>
                        </div>
                      </div>
                      <div className="flex items-center text-lg text-gray-600 mb-6 bg-gradient-to-r from-gray-50 to-blue-50 p-4 rounded-2xl border border-gray-200">
                        <MapPin className="h-5 w-5 mr-3 text-blue-600" />
                        <span className="font-medium">{bike.location}</span>
                      </div>
                      
                      <Button 
                        className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 hover:from-blue-700 hover:via-purple-700 hover:to-green-700 text-white py-4 font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleBikeDetails(bike.id);
                        }}
                      >
                        <IndianRupee className="mr-2 h-5 w-5" />
                        View Details & Book
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredBikes.length === 0 && (
              <div className="text-center py-20">
                <div className="w-32 h-32 bg-gradient-to-r from-gray-300 to-gray-400 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
                  <Search className="h-16 w-16 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">No bikes found</h3>
                <p className="text-gray-600 mb-8 text-xl">Try adjusting your filters to discover more amazing bikes.</p>
                <Button 
                  onClick={() => {
                    setBikeType("");
                    setPriceRange([150, 1000]);
                    setLocation("");
                  }}
                  className="bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 hover:from-blue-700 hover:via-purple-700 hover:to-green-700 rounded-2xl px-10 py-4 font-semibold text-lg shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BikeSearch;
