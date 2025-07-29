import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Zap, Shield, Rocket, Users, ArrowRight, CheckCircle } from 'lucide-react';

export default function TechStartup() {
  const features = [
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Lightning Fast",
      description: "Built with performance in mind. Experience blazing fast load times and seamless interactions."
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Secure by Default",
      description: "Enterprise-grade security with end-to-end encryption and advanced threat protection."
    },
    {
      icon: <Rocket className="h-8 w-8" />,
      title: "Scale Effortlessly",
      description: "From startup to enterprise, our platform grows with your business needs automatically."
    }
  ];

  const pricing = [
    {
      name: "Starter",
      price: 29,
      description: "Perfect for small teams",
      features: ["Up to 5 users", "10GB storage", "Basic support", "Core features"]
    },
    {
      name: "Pro",
      price: 99,
      description: "For growing businesses",
      features: ["Up to 50 users", "100GB storage", "Priority support", "Advanced features", "Analytics"],
      popular: true
    },
    {
      name: "Enterprise",
      price: 299,
      description: "For large organizations",
      features: ["Unlimited users", "1TB storage", "24/7 support", "Custom integrations", "White-label"]
    }
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <header className="bg-slate-900/95 backdrop-blur-sm border-b border-slate-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg"></div>
              <h1 className="text-xl font-bold">NexusAI</h1>
            </div>
            
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="hover:text-blue-400 transition-colors">Product</a>
              <a href="#features" className="hover:text-blue-400 transition-colors">Features</a>
              <a href="#pricing" className="hover:text-blue-400 transition-colors">Pricing</a>
              <a href="#" className="hover:text-blue-400 transition-colors">About</a>
            </nav>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" className="text-white hover:text-blue-400">
                Sign In
              </Button>
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="mb-8">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 text-blue-300">
                <Rocket className="h-4 w-4 mr-2" />
                Now in Public Beta
              </span>
            </div>
            
            <h2 className="text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
              The Future of
              <br />
              AI-Powered Automation
            </h2>
            
            <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
              Transform your workflow with intelligent automation that learns, adapts, and scales with your business. 
              Join thousands of companies already using NexusAI.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-lg px-8">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-slate-600 text-white hover:bg-slate-800 text-lg px-8">
                Watch Demo
              </Button>
            </div>
            
            <div className="mt-12 flex items-center justify-center space-x-8 text-slate-400">
              <div className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                <span>10,000+ users</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2" />
                <span>99.9% uptime</span>
              </div>
              <div className="flex items-center">
                <Shield className="h-5 w-5 mr-2" />
                <span>SOC 2 compliant</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold mb-4">Built for Performance</h3>
            <p className="text-xl text-slate-300">Everything you need to automate and scale your business</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-slate-800 border-slate-700 p-8 hover:bg-slate-750 transition-colors">
                <div className="text-blue-400 mb-4">
                  {feature.icon}
                </div>
                <h4 className="text-xl font-semibold mb-3 text-white">{feature.title}</h4>
                <p className="text-slate-300">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-blue-900/20 to-purple-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-400 mb-2">99.9%</div>
              <div className="text-slate-300">Uptime</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-400 mb-2">10K+</div>
              <div className="text-slate-300">Active Users</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-400 mb-2">500M+</div>
              <div className="text-slate-300">API Calls</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-yellow-400 mb-2">150+</div>
              <div className="text-slate-300">Integrations</div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h3>
            <p className="text-xl text-slate-300">Choose the plan that fits your team size and needs</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricing.map((plan, index) => (
              <Card key={index} className={`relative p-8 ${
                plan.popular 
                  ? 'bg-gradient-to-b from-blue-900/50 to-purple-900/50 border-blue-500' 
                  : 'bg-slate-800 border-slate-700'
              }`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center">
                  <h4 className="text-2xl font-bold text-white mb-2">{plan.name}</h4>
                  <p className="text-slate-300 mb-6">{plan.description}</p>
                  
                  <div className="mb-8">
                    <span className="text-5xl font-bold text-white">${plan.price}</span>
                    <span className="text-slate-300">/month</span>
                  </div>
                  
                  <Button className={`w-full mb-8 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700'
                      : 'bg-slate-700 hover:bg-slate-600 text-white'
                  }`}>
                    Get Started
                  </Button>
                  
                  <div className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <div key={i} className="flex items-center text-slate-300">
                        <CheckCircle className="h-5 w-5 text-green-400 mr-3" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-900 to-purple-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-4xl font-bold mb-6">Ready to Transform Your Workflow?</h3>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of companies already using NexusAI to automate their processes and scale their business.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-900 hover:bg-blue-50 text-lg px-8">
              Start Free Trial
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 text-lg px-8">
              Contact Sales
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded"></div>
                <h4 className="text-lg font-bold">NexusAI</h4>
              </div>
              <p className="text-slate-400">
                The future of AI-powered automation for modern businesses.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <div className="space-y-2 text-slate-400">
                <a href="#" className="block hover:text-white transition-colors">Features</a>
                <a href="#" className="block hover:text-white transition-colors">Pricing</a>
                <a href="#" className="block hover:text-white transition-colors">API Docs</a>
                <a href="#" className="block hover:text-white transition-colors">Integrations</a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <div className="space-y-2 text-slate-400">
                <a href="#" className="block hover:text-white transition-colors">About</a>
                <a href="#" className="block hover:text-white transition-colors">Blog</a>
                <a href="#" className="block hover:text-white transition-colors">Careers</a>
                <a href="#" className="block hover:text-white transition-colors">Contact</a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <div className="space-y-2 text-slate-400">
                <a href="#" className="block hover:text-white transition-colors">Help Center</a>
                <a href="#" className="block hover:text-white transition-colors">Status</a>
                <a href="#" className="block hover:text-white transition-colors">Security</a>
                <a href="#" className="block hover:text-white transition-colors">Privacy</a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
            <p>&copy; 2025 NexusAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
