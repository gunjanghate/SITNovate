import React from 'react';
import { Book, Crown, Zap, Check, Coins, Star, Sparkles, ArrowRight } from 'lucide-react';

interface PricingCardProps {
  title: string;
  price: number;
  period?: string;
  features: string[];
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  popular?: boolean;
  tokenBased?: boolean;
  tokens?: number;
}

function PricingCard({ 
  title, 
  price, 
  period, 
  features, 
  icon: Icon, 
  popular = false,
  tokenBased = false,
  tokens = 0
}: PricingCardProps) {
  return (
    <div className={`relative rounded-2xl ${
      popular 
        ? 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-xl scale-105' 
        : 'bg-gray-800 border-gray-700'
    } p-8 transition-all duration-300 hover:scale-[1.02] border hover:border-blue-500/30`}>
      {popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-cyan-400 to-blue-400 text-gray-900 px-6 py-1 rounded-full text-sm font-semibold shadow-lg">
          Most Popular
        </div>
      )}
      <div className="flex items-center gap-3 mb-4">
        <div className={`p-3 rounded-xl ${popular ? 'bg-white/20' : 'bg-gray-900'}`}>
          <Icon className={`w-6 h-6 ${popular ? 'text-white' : 'text-blue-400'}`} />
        </div>
        <h3 className={`text-xl font-bold ${!popular && 'text-white'}`}>{title}</h3>
      </div>
      
      <div className="mt-6">
        <div className="flex items-baseline">
          <span className={`text-4xl font-bold ${!popular && 'text-white'}`}>${price}</span>
          {!tokenBased && <span className="ml-2 text-sm opacity-80">/{period}</span>}
        </div>
        {tokenBased && (
          <div className="mt-2 flex items-center gap-2 text-sm text-gray-300">
            <Coins className="w-4 h-4" />
            <span>{tokens} tokens included</span>
          </div>
        )}
      </div>

      <ul className="mt-8 space-y-4">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <Check className={`w-5 h-5 flex-shrink-0 mt-0.5 ${popular ? 'text-white' : 'text-blue-400'}`} />
            <span className={`text-sm ${popular ? 'text-white/90' : 'text-gray-300'}`}>{feature}</span>
          </li>
        ))}
      </ul>

      <button 
        className={`mt-8 w-full py-3 px-6 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 ${
          popular 
            ? 'bg-white text-blue-600 hover:bg-opacity-90' 
            : 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700'
        }`}
      >
        Get Started
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}

function PriceCompo() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-block mb-4">
            <div className="flex items-center gap-2 text-sm font-semibold px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Star className="w-4 h-4" />
              <span>Choose Your Learning Journey</span>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
            Simple, Flexible Pricing
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Choose the perfect plan for your learning journey. Whether you prefer a subscription or pay-as-you-go, we've got you covered.
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {/* Basic Subscription */}
          <PricingCard
            title="Basic"
            price={29}
            period="month"
            icon={Book}
            features={[
              "Access to basic courses",
              "Learning path guidance",
              "Basic progress tracking",
              "Email support",
              "Mobile app access"
            ]}
          />

          {/* Pro Subscription */}
          <PricingCard
            title="Pro"
            price={79}
            period="month"
            icon={Crown}
            popular={true}
            features={[
              "Everything in Basic",
              "Advanced courses & workshops",
              "Priority support",
              "Offline downloads",
              "Certificate of completion",
              "1-on-1 mentoring sessions"
            ]}
          />

          {/* Starter Token Pack */}
          <PricingCard
            title="Token Starter"
            price={49}
            icon={Zap}
            tokenBased={true}
            tokens={50}
            features={[
              "50 learning tokens",
              "Access all courses",
              "No monthly commitment",
              "Tokens never expire",
              "Basic support"
            ]}
          />

          {/* Premium Token Pack */}
          <PricingCard
            title="Token Premium"
            price={99}
            icon={Sparkles}
            tokenBased={true}
            tokens={120}
            features={[
              "120 learning tokens",
              "20% bonus tokens",
              "Access all courses",
              "Priority support",
              "Exclusive workshops access",
              "Tokens never expire"
            ]}
          />
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <div className="text-center p-6 rounded-2xl bg-gray-800/50 backdrop-blur-sm border border-gray-700">
            <div className="bg-gray-900 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-white">Quality Content</h3>
            <p className="text-gray-400">Expert-curated courses and materials to ensure the best learning experience.</p>
          </div>
          <div className="text-center p-6 rounded-2xl bg-gray-800/50 backdrop-blur-sm border border-gray-700">
            <div className="bg-gray-900 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-white">Flexible Learning</h3>
            <p className="text-gray-400">Learn at your own pace with our flexible subscription and token options.</p>
          </div>
          <div className="text-center p-6 rounded-2xl bg-gray-800/50 backdrop-blur-sm border border-gray-700">
            <div className="bg-gray-900 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <Crown className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-white">Premium Support</h3>
            <p className="text-gray-400">Get the help you need with our dedicated support team.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PriceCompo