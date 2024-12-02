import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useStore } from '../store/useStore';
import { Button } from '../components/ui/Button';
import { formatPrice, formatDate } from '../lib/utils';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';

export function EventDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const events = useStore((state) => state.events);
  const event = events.find(e => e.id === id);
  const [ticketQuantity, setTicketQuantity] = useState(1);

  if (!event) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-900">Event not found</h1>
      </div>
    );
  }

  const totalPrice = event.price * ticketQuantity;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="relative aspect-[2/1] rounded-xl overflow-hidden">
        <img
          src={event.imageUrl}
          alt={event.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{event.title}</h1>
            <p className="text-gray-600">{event.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="text-blue-600" />
              <span>{formatDate(event.date)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="text-blue-600" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="text-blue-600" />
              <span>{event.location.name}, {event.location.city}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="text-blue-600" />
              <span>{event.availableTickets} tickets left</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">{formatPrice(event.price)}</p>
            <p className="text-gray-500">per ticket</p>
          </div>

          <div>
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
              Number of Tickets
            </label>
            <select
              id="quantity"
              value={ticketQuantity}
              onChange={(e) => setTicketQuantity(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {Array.from({ length: Math.min(10, event.availableTickets) }, (_, i) => i + 1).map(num => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <div className="flex justify-between mb-2">
              <span>Total Price:</span>
              <span className="font-bold">{formatPrice(totalPrice)}</span>
            </div>
            <Button className="w-full">Book Now</Button>
          </div>
        </div>
      </div>
    </div>
  );
}