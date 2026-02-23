import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, CreditCard, ArrowRight, Upload, Copy, Check } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { paymentDB, userDB } from '@/data/database';
import { cn, generateId } from '@/utils/helpers';

type PaymentMethod = 'paypal' | 'alipay' | 'wechat';

interface PaymentOption {
  id: PaymentMethod;
  name: string;
  description: string;
  icon: string;
  qrImage: string;
}

const paymentOptions: PaymentOption[] = [
  {
    id: 'paypal',
    name: 'PayPal',
    description: 'Pay securely with PayPal',
    icon: 'https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_111x69.jpg',
    qrImage: '/payment/paypal-qr.png',
  },
  {
    id: 'alipay',
    name: 'Alipay',
    description: 'Scan with Alipay app',
    icon: 'https://upload.wikimedia.org/wikipedia/en/thumb/3/3a/Alipay_logo.svg/1200px-Alipay_logo.svg.png',
    qrImage: '/payment/alipay-qr.png',
  },
  {
    id: 'wechat',
    name: 'WeChat Pay',
    description: 'Scan with WeChat app',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/WeChat_Pay_logo.png/1200px-WeChat_Pay_logo.png',
    qrImage: '/payment/wechat-qr.png',
  },
];

export const Payment: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = (location.state as any)?.email || '';
  
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);
  const [uploadedProof, setUploadedProof] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const registrationFee = 29.99;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedProof(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!selectedMethod || !uploadedProof) return;

    setIsSubmitting(true);

    // Find user by email
    const user = userDB.getByEmail(email);
    if (user) {
      // Create payment record
      const payment = {
        id: generateId('pay-'),
        userId: user.id,
        amount: registrationFee,
        currency: 'USD',
        method: selectedMethod,
        status: 'pending' as const,
        qrCodeImage: uploadedProof,
        createdAt: new Date().toISOString(),
      };

      paymentDB.create(payment);

      // Update user payment status
      userDB.update(user.id, {
        paymentStatus: 'paid',
        paymentMethod: selectedMethod,
        paymentProof: uploadedProof,
      });

      setIsComplete(true);
    }

    setIsSubmitting(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-brand-green/5 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md relative z-10">
          <Card className="border-0 shadow-xl">
            <CardContent className="p-8 text-center">
              <div className="w-20 h-20 bg-brand-green/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-brand-green" />
              </div>
              
              <h2 className="text-2xl font-poppins font-bold text-gray-900 mb-4">
                Payment Submitted!
              </h2>
              
              <p className="text-gray-600 mb-6">
                Thank you for your payment. Our team will review and activate your account within 24 hours.
                You will receive an email confirmation once your account is activated.
              </p>

              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-500 mb-1">Reference Email</p>
                <div className="flex items-center justify-center gap-2">
                  <span className="font-medium">{email}</span>
                  <button
                    onClick={copyToClipboard}
                    className="p-1 hover:bg-gray-200 rounded transition-colors"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-brand-green" />
                    ) : (
                      <Copy className="w-4 h-4 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              <Button
                onClick={() => navigate('/login')}
                className="w-full bg-brand-green hover:bg-brand-darkGreen text-white"
              >
                Go to Login
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-brand-green/5 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <Logo size="lg" className="mx-auto" />
          </Link>
          <h2 className="mt-6 text-3xl font-poppins font-bold text-gray-900">
            Complete Your Registration
          </h2>
          <p className="mt-2 text-gray-600">
            Choose a payment method to activate your account
          </p>
        </div>

        {/* Payment Summary */}
        <Card className="border-0 shadow-lg mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500">Registration Fee</p>
                <p className="text-3xl font-bold text-gray-900">${registrationFee}</p>
              </div>
              <div className="text-right">
                <p className="text-gray-500">Account</p>
                <p className="font-medium">{email}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Methods */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {paymentOptions.map((option) => (
            <Card
              key={option.id}
              className={cn(
                'cursor-pointer border-2 transition-all duration-300',
                selectedMethod === option.id
                  ? 'border-brand-green shadow-lg'
                  : 'border-transparent hover:border-gray-200'
              )}
              onClick={() => setSelectedMethod(option.id)}
            >
              <CardContent className="p-6 text-center">
                <img
                  src={option.icon}
                  alt={option.name}
                  className="h-12 mx-auto mb-4 object-contain"
                />
                <h3 className="font-semibold text-gray-900">{option.name}</h3>
                <p className="text-sm text-gray-500">{option.description}</p>
                {selectedMethod === option.id && (
                  <div className="mt-4">
                    <CheckCircle className="w-6 h-6 text-brand-green mx-auto" />
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* QR Code & Upload Section */}
        {selectedMethod && (
          <Card className="border-0 shadow-lg animate-slide-up">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                {/* QR Code */}
                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-4">
                    Scan to Pay with {paymentOptions.find(o => o.id === selectedMethod)?.name}
                  </h3>
                  <div className="bg-white p-4 rounded-xl border-2 border-dashed border-gray-300 inline-block">
                    {/* Placeholder QR Code - In production, generate real QR */}
                    <div className="w-48 h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <CreditCard className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                        <p className="text-xs text-gray-500">QR Code Placeholder</p>
                        <p className="text-xs text-gray-400 mt-1">
                          Use: {selectedMethod}
                        </p>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-4">
                    Scan this QR code with your {paymentOptions.find(o => o.id === selectedMethod)?.name} app
                  </p>
                </div>

                {/* Upload Proof */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">
                    Upload Payment Proof
                  </h3>
                  
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-brand-green transition-colors">
                    {uploadedProof ? (
                      <div className="relative">
                        <img
                          src={uploadedProof}
                          alt="Payment proof"
                          className="max-h-48 mx-auto rounded-lg"
                        />
                        <button
                          onClick={() => setUploadedProof(null)}
                          className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                        >
                          ×
                        </button>
                      </div>
                    ) : (
                      <label className="cursor-pointer block">
                        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600 mb-2">
                          Click to upload screenshot
                        </p>
                        <p className="text-sm text-gray-400">
                          JPG, PNG up to 5MB
                        </p>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>

                  <Button
                    onClick={handleSubmit}
                    disabled={!uploadedProof || isSubmitting}
                    className={cn(
                      'w-full mt-6 h-12 bg-brand-green hover:bg-brand-darkGreen text-white',
                      (!uploadedProof || isSubmitting) && 'opacity-70 cursor-not-allowed'
                    )}
                  >
                    {isSubmitting ? 'Submitting...' : 'Confirm Payment'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Instructions */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p className="mb-2">
            <strong>How it works:</strong>
          </p>
          <ol className="space-y-1">
            <li>1. Select your preferred payment method</li>
            <li>2. Scan the QR code or use the payment details</li>
            <li>3. Complete the payment of ${registrationFee}</li>
            <li>4. Upload a screenshot of your payment confirmation</li>
            <li>5. Our team will verify and activate your account within 24 hours</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default Payment;
