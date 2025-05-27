
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, CreditCard, Shield, CheckCircle } from "lucide-react";
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                onClick={() => navigate(-1)}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Back</span>
              </Button>
              <h1 className="text-2xl font-bold text-gray-900">Complete Your Booking</h1>
            </div>
            <div className="text-xl font-bold text-blue-600">BikeRental</div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 lg:px-12 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Booking Summary */}
          <div>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span>Booking Summary</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <img 
                      src={bike.image} 
                      alt={bike.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div>
                      <h3 className="font-semibold">{bike.name}</h3>
                      <p className="text-gray-600">{bike.brand} • {bike.type} Bike</p>
                    </div>
                  </div>

                  <div className="border-t pt-4 space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Pickup Date:</span>
                      <span className="font-medium">{format(startDate, "PPP")}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Return Date:</span>
                      <span className="font-medium">{format(endDate, "PPP")}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Duration:</span>
                      <span className="font-medium">{days} day{days > 1 ? 's' : ''}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Price per day:</span>
                      <span className="font-medium">${bike.price}</span>
                    </div>
                    <div className="flex justify-between border-t pt-3 text-lg font-semibold">
                      <span>Total Price:</span>
                      <span className="text-green-600">${totalPrice}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-900">Secure Payment</h4>
                  <p className="text-sm text-blue-700">
                    Your payment information is encrypted and secure. All bookings are subject to availability.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CreditCard className="h-5 w-5" />
                  <span>Payment Details</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Payment Method Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Choose Payment Method
                  </label>
                  <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="credit-card">Credit Card</SelectItem>
                      <SelectItem value="paypal">PayPal</SelectItem>
                    </SelectContent>
                  </Select>
                  {!paymentMethod && (
                    <p className="text-sm text-red-500 mt-1">Please select a payment method.</p>
                  )}
                </div>

                {/* Credit Card Form */}
                {paymentMethod === "credit-card" && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Cardholder Name
                      </label>
                      <Input
                        type="text"
                        placeholder="Enter full name"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
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
                      />
                      {cardNumber && cardNumber.length < 16 && (
                        <p className="text-sm text-red-500 mt-1">Invalid credit card number.</p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
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
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
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
                        />
                        {cvv && cvv.length < 3 && (
                          <p className="text-sm text-red-500 mt-1">Please enter a valid CVV.</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* PayPal Option */}
                {paymentMethod === "paypal" && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
                    <p className="text-yellow-800">
                      You will be redirected to PayPal to complete your payment.
                    </p>
                  </div>
                )}

                <Button 
                  onClick={handleConfirmBooking}
                  className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white py-3 font-semibold"
                  disabled={processing}
                >
                  {processing ? "Processing..." : "Confirm Booking"}
                </Button>

                <p className="text-xs text-gray-500 text-center">
                  By confirming your booking, you agree to our Terms and Conditions and Privacy Policy.
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
