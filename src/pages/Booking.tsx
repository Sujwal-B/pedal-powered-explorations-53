
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, CreditCard, Shield, CheckCircle, IndianRupee, Smartphone, Building, Lock } from "lucide-react";
import { format } from "date-fns";

const Booking = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const bookingData = location.state;
  
  const [paymentMethod, setPaymentMethod] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCvv] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cardName, setCardName] = useState("");
  const [processing, setProcessing] = useState(false);

  if (!bookingData) {
    navigate("/search");
    return null;
  }

  const { bike, startDate, endDate, totalPrice, days } = bookingData;

  const validateForm = () => {
    if (!paymentMethod) {
      alert("Please select a payment method.");
      return false;
    }
    if (paymentMethod === "credit-card") {
      if (!cardNumber || cardNumber.length < 16) {
        alert("Invalid credit card number.");
        return false;
      }
      if (!cvv || cvv.length < 3) {
        alert("Please enter a valid CVV.");
        return false;
      }
      if (!expiryDate) {
        alert("Please enter the expiry date.");
        return false;
      }
      if (!cardName.trim()) {
        alert("Please enter the cardholder name.");
        return false;
      }
    }
    return true;
  };

  const handleConfirmBooking = async () => {
    if (!validateForm()) return;

    setProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setProcessing(false);
      alert("🎉 Booking confirmed! You will receive a confirmation email shortly with pickup details.");
      navigate("/profile");
    }, 2000);
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
                onClick={() => navigate(-1)}
                className="flex items-center space-x-2 hover:bg-white/50 transition-all duration-300 rounded-2xl px-6 py-3"
              >
                <ArrowLeft className="h-5 w-5" />
                <span className="font-medium">Back</span>
              </Button>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">Complete Your Booking</h1>
            </div>
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              BikeRental India
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 lg:px-12 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Enhanced Booking Summary */}
          <div>
            <Card className="mb-8 shadow-2xl border-0 bg-gradient-to-br from-white to-green-50 rounded-3xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50">
                <CardTitle className="flex items-center space-x-4 text-2xl">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-gray-900">Booking Summary</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="space-y-8">
                  <div className="flex items-center space-x-6 p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
                    <img 
                      src={bike.image} 
                      alt={bike.name}
                      className="w-24 h-24 object-cover rounded-2xl shadow-md"
                    />
                    <div>
                      <h3 className="font-bold text-2xl text-gray-900">{bike.name}</h3>
                      <p className="text-gray-600 font-semibold text-lg">{bike.brand} • {bike.type} Bike</p>
                      <div className="flex items-center mt-2 text-green-600 font-bold">
                        <IndianRupee className="h-4 w-4 mr-1" />
                        <span>{bike.price}/day</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl p-8 border-2 border-blue-200 shadow-lg">
                    <div className="space-y-6">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700 font-bold text-lg">Pickup Date:</span>
                        <span className="font-bold text-gray-900 text-lg">{format(startDate, "PPP")}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700 font-bold text-lg">Return Date:</span>
                        <span className="font-bold text-gray-900 text-lg">{format(endDate, "PPP")}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700 font-bold text-lg">Duration:</span>
                        <span className="font-bold text-gray-900 text-lg">{days} day{days > 1 ? 's' : ''}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700 font-bold text-lg">Price per day:</span>
                        <div className="flex items-center font-bold text-gray-900 text-lg">
                          <IndianRupee className="h-5 w-5 mr-1" />
                          <span>{bike.price}</span>
                        </div>
                      </div>
                      <div className="border-t-2 border-blue-300 pt-6 flex justify-between items-center text-2xl font-bold">
                        <span className="text-gray-900">Total Amount:</span>
                        <div className="flex items-center text-green-600">
                          <IndianRupee className="h-8 w-8 mr-1" />
                          <span>{totalPrice}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="bg-gradient-to-br from-blue-50 to-green-50 border-2 border-blue-200 rounded-3xl p-8 shadow-xl">
              <div className="flex items-start space-x-4">
                <Shield className="h-8 w-8 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-blue-900 text-xl mb-3">🔒 Secure & Protected Payment</h4>
                  <p className="text-blue-700 leading-relaxed text-lg">
                    Your payment information is encrypted with bank-level security. All bookings include insurance coverage. 
                    Prices include GST and are displayed in Indian Rupees (₹).
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Payment Form */}
          <div>
            <Card className="shadow-2xl border-0 bg-gradient-to-br from-white to-blue-50 rounded-3xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50">
                <CardTitle className="flex items-center space-x-4 text-2xl">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center">
                    <CreditCard className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-gray-900">Payment Details</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-8 p-8">
                {/* Enhanced Payment Method Selection */}
                <div>
                  <label className="block text-lg font-bold text-gray-700 mb-4">
                    Choose Payment Method
                  </label>
                  <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                    <SelectTrigger className="h-16 text-xl rounded-2xl border-2 border-gray-200 focus:border-blue-500">
                      <SelectValue placeholder="Select your preferred payment method" />
                    </SelectTrigger>
                    <SelectContent className="bg-white rounded-2xl shadow-2xl">
                      <SelectItem value="credit-card" className="text-lg p-4">
                        <div className="flex items-center space-x-3">
                          <CreditCard className="h-5 w-5" />
                          <span>Credit/Debit Card</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="upi" className="text-lg p-4">
                        <div className="flex items-center space-x-3">
                          <Smartphone className="h-5 w-5" />
                          <span>UPI Payment</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="netbanking" className="text-lg p-4">
                        <div className="flex items-center space-x-3">
                          <Building className="h-5 w-5" />
                          <span>Net Banking</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Enhanced Credit Card Form */}
                {paymentMethod === "credit-card" && (
                  <div className="space-y-6 bg-gradient-to-r from-gray-50 to-blue-50 p-6 rounded-2xl border border-gray-200">
                    <div>
                      <label className="block text-lg font-bold text-gray-700 mb-3">
                        Cardholder Name
                      </label>
                      <Input
                        type="text"
                        placeholder="Enter full name as on card"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        className="h-14 text-lg rounded-2xl border-2 border-gray-200 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-lg font-bold text-gray-700 mb-3">
                        Card Number
                      </label>
                      <Input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        value={cardNumber}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, '');
                          setCardNumber(value);
                        }}
                        maxLength={16}
                        className="h-14 text-lg rounded-2xl border-2 border-gray-200 focus:border-blue-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-lg font-bold text-gray-700 mb-3">
                          Expiry Date
                        </label>
                        <Input
                          type="text"
                          placeholder="MM/YY"
                          value={expiryDate}
                          onChange={(e) => {
                            let value = e.target.value.replace(/\D/g, '');
                            if (value.length >= 2) {
                              value = value.substring(0, 2) + '/' + value.substring(2, 4);
                            }
                            setExpiryDate(value);
                          }}
                          maxLength={5}
                          className="h-14 text-lg rounded-2xl border-2 border-gray-200 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-lg font-bold text-gray-700 mb-3">
                          CVV
                        </label>
                        <Input
                          type="text"
                          placeholder="123"
                          value={cvv}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, '');
                            setCvv(value);
                          }}
                          maxLength={4}
                          className="h-14 text-lg rounded-2xl border-2 border-gray-200 focus:border-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Enhanced UPI Option */}
                {paymentMethod === "upi" && (
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200 rounded-2xl p-8 text-center shadow-lg">
                    <Smartphone className="h-16 w-16 text-green-600 mx-auto mb-4" />
                    <h3 className="font-bold text-xl text-green-800 mb-2">UPI Payment</h3>
                    <p className="text-green-700 font-semibold text-lg">
                      You will be redirected to your UPI app to complete the secure payment of ₹{totalPrice}.
                    </p>
                  </div>
                )}

                {/* Enhanced Net Banking Option */}
                {paymentMethod === "netbanking" && (
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-2xl p-8 text-center shadow-lg">
                    <Building className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                    <h3 className="font-bold text-xl text-blue-800 mb-2">Net Banking</h3>
                    <p className="text-blue-700 font-semibold text-lg">
                      You will be securely redirected to your bank's website to complete the payment.
                    </p>
                  </div>
                )}

                <Button 
                  onClick={handleConfirmBooking}
                  className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 hover:from-blue-700 hover:via-purple-700 hover:to-green-700 text-white py-6 font-bold text-xl rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105"
                  disabled={processing}
                >
                  {processing ? (
                    <div className="flex items-center space-x-3">
                      <Lock className="h-6 w-6 animate-spin" />
                      <span>Processing Secure Payment...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-3">
                      <IndianRupee className="h-6 w-6" />
                      <span>Pay ₹{totalPrice} & Confirm Booking</span>
                    </div>
                  )}
                </Button>

                <p className="text-sm text-gray-500 text-center leading-relaxed bg-gray-50 p-4 rounded-2xl">
                  🔐 By confirming your booking, you agree to our Terms and Conditions and Privacy Policy. 
                  All payments are processed securely with 256-bit encryption in Indian Rupees (₹).
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
