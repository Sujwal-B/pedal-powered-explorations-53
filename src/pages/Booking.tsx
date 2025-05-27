
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, CreditCard, Shield, CheckCircle, IndianRupee } from "lucide-react";
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
      alert("Booking confirmed! You will receive a confirmation email shortly.");
      navigate("/profile");
    }, 2000);
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
                onClick={() => navigate(-1)}
                className="flex items-center space-x-2 hover:bg-blue-50 transition-all duration-300"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Back</span>
              </Button>
              <h1 className="text-2xl font-bold text-gray-900">Complete Your Booking</h1>
            </div>
            <div className="text-xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              BikeRental India
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 lg:px-12 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Booking Summary */}
          <div>
            <Card className="mb-6 shadow-xl border-0 bg-gradient-to-br from-white to-green-50">
              <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 rounded-t-lg">
                <CardTitle className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                  <span className="text-xl">Booking Summary</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div className="flex items-center space-x-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                    <img 
                      src={bike.image} 
                      alt={bike.name}
                      className="w-20 h-20 object-cover rounded-xl shadow-md"
                    />
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900">{bike.name}</h3>
                      <p className="text-gray-600 font-medium">{bike.brand} • {bike.type} Bike</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-6 border border-blue-200">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700 font-medium">Pickup Date:</span>
                        <span className="font-semibold text-gray-900">{format(startDate, "PPP")}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700 font-medium">Return Date:</span>
                        <span className="font-semibold text-gray-900">{format(endDate, "PPP")}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700 font-medium">Duration:</span>
                        <span className="font-semibold text-gray-900">{days} day{days > 1 ? 's' : ''}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700 font-medium">Price per day:</span>
                        <div className="flex items-center font-semibold text-gray-900">
                          <IndianRupee className="h-4 w-4 mr-1" />
                          <span>{bike.price}</span>
                        </div>
                      </div>
                      <div className="border-t border-blue-300 pt-4 flex justify-between items-center text-xl font-bold">
                        <span className="text-gray-900">Total Price:</span>
                        <div className="flex items-center text-green-600">
                          <IndianRupee className="h-6 w-6 mr-1" />
                          <span>{totalPrice}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-2xl p-6 shadow-lg">
              <div className="flex items-start space-x-4">
                <Shield className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-blue-900 text-lg mb-2">Secure Payment</h4>
                  <p className="text-blue-700 leading-relaxed">
                    Your payment information is encrypted and secure. All bookings are subject to availability. 
                    Prices are in Indian Rupees (₹) and include applicable taxes.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div>
            <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-blue-50">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50 rounded-t-lg">
                <CardTitle className="flex items-center space-x-3">
                  <CreditCard className="h-6 w-6 text-blue-600" />
                  <span className="text-xl">Payment Details</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 p-6">
                {/* Payment Method Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Choose Payment Method
                  </label>
                  <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                    <SelectTrigger className="h-12 text-lg rounded-xl border-2">
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="credit-card">Credit/Debit Card</SelectItem>
                      <SelectItem value="upi">UPI Payment</SelectItem>
                      <SelectItem value="netbanking">Net Banking</SelectItem>
                    </SelectContent>
                  </Select>
                  {!paymentMethod && (
                    <p className="text-sm text-red-500 mt-2">Please select a payment method.</p>
                  )}
                </div>

                {/* Credit Card Form */}
                {paymentMethod === "credit-card" && (
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Cardholder Name
                      </label>
                      <Input
                        type="text"
                        placeholder="Enter full name"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        className="h-12 text-lg rounded-xl border-2"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
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
                        className="h-12 text-lg rounded-xl border-2"
                      />
                      {cardNumber && cardNumber.length < 16 && (
                        <p className="text-sm text-red-500 mt-2">Invalid credit card number.</p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
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
                          className="h-12 text-lg rounded-xl border-2"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
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
                          className="h-12 text-lg rounded-xl border-2"
                        />
                        {cvv && cvv.length < 3 && (
                          <p className="text-sm text-red-500 mt-2">Please enter a valid CVV.</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* UPI Option */}
                {paymentMethod === "upi" && (
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-2xl p-6 text-center">
                    <p className="text-green-800 font-medium">
                      You will be redirected to your UPI app to complete the payment of ₹{totalPrice}.
                    </p>
                  </div>
                )}

                {/* Net Banking Option */}
                {paymentMethod === "netbanking" && (
                  <div className="bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-2xl p-6 text-center">
                    <p className="text-blue-800 font-medium">
                      You will be redirected to your bank's website to complete the payment.
                    </p>
                  </div>
                )}

                <Button 
                  onClick={handleConfirmBooking}
                  className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 hover:from-blue-700 hover:via-purple-700 hover:to-green-700 text-white py-4 font-semibold text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                  disabled={processing}
                >
                  {processing ? "Processing Payment..." : `Pay ₹${totalPrice} & Confirm Booking`}
                </Button>

                <p className="text-xs text-gray-500 text-center leading-relaxed">
                  By confirming your booking, you agree to our Terms and Conditions and Privacy Policy. 
                  All payments are processed securely in Indian Rupees (₹).
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
