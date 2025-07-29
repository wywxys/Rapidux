import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Clock, MapPin, Phone, Star, Utensils } from 'lucide-react';

export default function RestaurantWebsite() {
  const menuItems = [
    {
      name: "Grilled Salmon",
      description: "Fresh Atlantic salmon with herbs and lemon butter",
      price: 28,
      category: "Main Course",
      image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400"
    },
    {
      name: "Truffle Pasta",
      description: "Handmade pasta with black truffle and parmesan",
      price: 24,
      category: "Main Course", 
      image: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=400"
    },
    {
      name: "Chocolate Soufflé",
      description: "Warm chocolate soufflé with vanilla ice cream",
      price: 12,
      category: "Dessert",
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400"
    }
  ];

  const reviews = [
    {
      name: "Sarah Johnson",
      rating: 5,
      comment: "Absolutely amazing food and service! The salmon was cooked to perfection.",
      date: "2 days ago"
    },
    {
      name: "Mike Chen",
      rating: 5,
      comment: "Best Italian restaurant in the city. The truffle pasta is incredible!",
      date: "1 week ago"
    }
  ];

  return (
    <div className="min-h-screen bg-amber-50">
      {/* Header */}
      <header className="bg-amber-900 text-amber-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Utensils className="h-8 w-8 text-amber-300" />
              <h1 className="text-2xl font-bold">Bella Vista</h1>
            </div>
            
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="hover:text-amber-300 transition-colors">Home</a>
              <a href="#menu" className="hover:text-amber-300 transition-colors">Menu</a>
              <a href="#about" className="hover:text-amber-300 transition-colors">About</a>
              <a href="#contact" className="hover:text-amber-300 transition-colors">Contact</a>
            </nav>
            
            <Button className="bg-amber-600 hover:bg-amber-700">
              Make Reservation
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-to-r from-amber-800 to-orange-800">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="text-white">
            <h2 className="text-5xl font-bold mb-4">Authentic Italian Cuisine</h2>
            <p className="text-xl mb-8 text-amber-100">Experience the taste of Italy in the heart of the city</p>
            <div className="flex space-x-4">
              <Button size="lg" className="bg-amber-600 hover:bg-amber-700">
                View Menu
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-amber-900">
                Book Table
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Restaurant Info */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6 text-center border-amber-200">
              <Clock className="h-12 w-12 text-amber-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Opening Hours</h3>
              <p className="text-gray-600">Mon-Thu: 5:00 PM - 10:00 PM</p>
              <p className="text-gray-600">Fri-Sat: 5:00 PM - 11:00 PM</p>
              <p className="text-gray-600">Sun: 4:00 PM - 9:00 PM</p>
            </Card>
            
            <Card className="p-6 text-center border-amber-200">
              <MapPin className="h-12 w-12 text-amber-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Location</h3>
              <p className="text-gray-600">123 Italian Street</p>
              <p className="text-gray-600">Downtown, City 12345</p>
              <Button variant="outline" className="mt-2 border-amber-600 text-amber-600">
                Get Directions
              </Button>
            </Card>
            
            <Card className="p-6 text-center border-amber-200">
              <Phone className="h-12 w-12 text-amber-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Reservations</h3>
              <p className="text-gray-600">(555) 123-4567</p>
              <p className="text-gray-600">reservations@bellavista.com</p>
              <Button className="mt-2 bg-amber-600 hover:bg-amber-700">
                Call Now
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-16 bg-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold text-amber-900 mb-4">Our Signature Dishes</h3>
            <p className="text-lg text-amber-700">Handcrafted with love using the finest ingredients</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {menuItems.map((item, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-xl transition-shadow border-amber-200">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-xl font-semibold text-amber-900">{item.name}</h4>
                    <span className="text-2xl font-bold text-amber-600">${item.price}</span>
                  </div>
                  <p className="text-amber-700 mb-4">{item.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-amber-600 bg-amber-100 px-2 py-1 rounded">
                      {item.category}
                    </span>
                    <Button size="sm" className="bg-amber-600 hover:bg-amber-700">
                      Order Now
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-center text-amber-900 mb-12">What Our Guests Say</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {reviews.map((review, index) => (
              <Card key={index} className="p-6 border-amber-200">
                <div className="flex items-center mb-4">
                  <div className="flex">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-600">{review.date}</span>
                </div>
                
                <p className="text-gray-700 mb-4 italic">"{review.comment}"</p>
                
                <div className="font-semibold text-amber-900">- {review.name}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-amber-900 text-amber-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Utensils className="h-6 w-6 text-amber-300" />
                <h4 className="text-xl font-bold">Bella Vista</h4>
              </div>
              <p className="text-amber-200">
                Bringing you authentic Italian flavors since 1995. 
                A family tradition of exceptional dining.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <a href="#" className="block hover:text-amber-300 transition-colors">Menu</a>
                <a href="#" className="block hover:text-amber-300 transition-colors">Reservations</a>
                <a href="#" className="block hover:text-amber-300 transition-colors">Private Events</a>
                <a href="#" className="block hover:text-amber-300 transition-colors">Gift Cards</a>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
              <div className="space-y-2 text-amber-200">
                <p>123 Italian Street, Downtown</p>
                <p>(555) 123-4567</p>
                <p>info@bellavista.com</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-amber-800 mt-8 pt-8 text-center text-amber-200">
            <p>&copy; 2025 Bella Vista Restaurant. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
