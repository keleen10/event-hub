import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useStore } from '../store/useStore';
import { formatPrice, formatDate } from '../lib/utils';

export function HomePage() {
  const events = useStore((state) => state.events);
  const featuredEvents = events.slice(0, 3);

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative h-[500px] -mt-8 mb-12">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30"
            alt="Hero background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50" />
        </div>
        
        <div className="relative max-w-4xl mx-auto pt-32 px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Discover Amazing Events Near You
          </h1>
          <p className="text-xl text-gray-200 mb-8">
            Book tickets for concerts, workshops, sports events, and more
          </p>
          
          <div className="max-w-2xl mx-auto">
            <div className="flex gap-2 bg-white p-2 rounded-lg shadow-lg">
              <input
                type="text"
                placeholder="Search events..."
                className="flex-1 px-4 py-2 border-none focus:outline-none"
              />
              <Button className="flex items-center gap-2">
                <Search size={20} />
                Search
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Events */}
      <section>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Featured Events</h2>
          <Link to="/events">
            <Button variant="outline">View All Events</Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredEvents.map((event) => (
            <Link
              key={event.id}
              to={`/events/${event.id}`}
              className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="aspect-video relative">
                <img
                  src={event.imageUrl}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-medium">
                  {formatPrice(event.price)}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600">
                  {event.title}
                </h3>
                <p className="text-gray-600 mb-4">{event.description}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{formatDate(event.date)}</span>
                  <span>{event.location.city}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section>
        <h2 className="text-3xl font-bold mb-8">Browse by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {['Concerts', 'Sports', 'Theater', 'Workshops'].map((category) => (
            <Link
              key={category}
              to={`/events?category=${category.toLowerCase()}`}
              className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold">{category}</h3>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}