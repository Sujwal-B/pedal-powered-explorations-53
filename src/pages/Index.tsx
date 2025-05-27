
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Search, IndianRupee, Shield, Clock } from "lucide-react";

const Index = () => {
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/search?location=${encodeURIComponent(location)}`);
  };

  const handleRentBike = () => {
    navigate("/search");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-purple-50">
      {/* Navigation Header */}
      <nav className="flex items-center justify-between p-6 lg:px-12 backdrop-blur-sm bg-white/70 sticky top-0 z-50 border-b border-white/20">
        <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
          BikeRental India
        </div>
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/profile")}
            className="hover:bg-white/50 transition-all duration-300"
          >
            Profile
          </Button>
          <Button 
            variant="ghost" 
            onClick={() => navigate("/admin")}
            className="hover:bg-white/50 transition-all duration-300"
          >
            Admin
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center px-6 lg:px-12 pt-20 pb-32">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6 animate-fade-in">
            Find Your Perfect{" "}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent">
              Ride
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Discover amazing bikes across India. From mountain adventures to city commutes, 
            we have the perfect bike waiting for you at affordable prices.
          </p>

          {/* CTA Button */}
          <Button 
            onClick={handleRentBike}
            size="lg"
            className="bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 hover:from-blue-700 hover:via-purple-700 hover:to-green-700 text-white px-10 py-6 text-lg font-semibold rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 mb-16 border-0"
          >
            <IndianRupee className="mr-2 h-5 w-5" />
            Rent a Bike Now
          </Button>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-6 border border-white/20">
            <div className="flex items-center space-x-4">
              <div className="flex-1 relative">
                <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Enter your city (Delhi, Mumbai, Bangalore...)"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="pl-12 py-4 text-lg border-0 focus:ring-2 focus:ring-blue-500 bg-transparent placeholder:text-gray-500"
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
              <Button 
                onClick={handleSearch}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Search className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <p className="text-gray-600 mt-8 text-lg">
            Not sure where to start? Browse our bike collection and find your best match.
          </p>
        </div>
      </main>

      {/* Features Section */}
      <section className="bg-white/80 backdrop-blur-sm py-24 border-y border-gray-100">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">
            Why Choose BikeRental India?
          </h2>
          <p className="text-center text-gray-600 mb-16 text-lg">Experience the best bike rental service across India</p>
          
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center group p-8 rounded-3xl bg-gradient-to-br from-blue-50 to-purple-50 hover:shadow-2xl transition-all duration-500 border border-white/50">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Search className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">Easy Search</h3>
              <p className="text-gray-600 leading-relaxed">Find bikes near you with our smart location-based search across major Indian cities.</p>
            </div>
            
            <div className="text-center group p-8 rounded-3xl bg-gradient-to-br from-green-50 to-blue-50 hover:shadow-2xl transition-all duration-500 border border-white/50">
              <div className="w-20 h-20 bg-gradient-to-r from-green-600 to-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <MapPin className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">Pan-India Network</h3>
              <p className="text-gray-600 leading-relaxed">Pick up and drop off at convenient locations across all major cities in India.</p>
            </div>
            
            <div className="text-center group p-8 rounded-3xl bg-gradient-to-br from-purple-50 to-green-50 hover:shadow-2xl transition-all duration-500 border border-white/50">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-green-600 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Shield className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">Quality Assurance</h3>
              <p className="text-gray-600 leading-relaxed">All bikes are regularly maintained, safety-checked and insured for your peace of mind.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Affordable Pricing</h2>
            <p className="text-xl text-gray-600">Starting from just ₹199 per day</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">City Bikes</h3>
                <div className="flex items-center justify-center mb-4">
                  <IndianRupee className="h-8 w-8 text-green-600" />
                  <span className="text-4xl font-bold text-green-600">199</span>
                  <span className="text-gray-600 ml-2">/day</span>
                </div>
                <p className="text-gray-600">Perfect for city commuting</p>
              </div>
            </div>
            
            <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Sports Bikes</h3>
                <div className="flex items-center justify-center mb-4">
                  <IndianRupee className="h-8 w-8 text-blue-600" />
                  <span className="text-4xl font-bold text-blue-600">499</span>
                  <span className="text-gray-600 ml-2">/day</span>
                </div>
                <p className="text-gray-600">For adventure enthusiasts</p>
              </div>
            </div>
            
            <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Premium Bikes</h3>
                <div className="flex items-center justify-center mb-4">
                  <IndianRupee className="h-8 w-8 text-purple-600" />
                  <span className="text-4xl font-bold text-purple-600">999</span>
                  <span className="text-gray-600 ml-2">/day</span>
                </div>
                <p className="text-gray-600">Luxury riding experience</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                BikeRental India
              </div>
              <p className="text-gray-300 leading-relaxed">Find your perfect ride, anywhere across India, anytime.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-lg">Quick Links</h4>
              <ul className="space-y-3 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors hover:underline">Terms & Conditions</a></li>
                <li><a href="#" className="hover:text-white transition-colors hover:underline">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors hover:underline">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-lg">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">Instagram</a>
                <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">Facebook</a>
                <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">Twitter</a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-lg">Contact</h4>
              <p className="text-gray-300 leading-relaxed">All bookings are subject to availability. We will notify you in case of any issues.</p>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-12 pt-8 text-center">
            <p className="text-gray-400">© 2024 BikeRental India. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
