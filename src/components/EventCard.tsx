import { Link } from 'react-router-dom';
import { Event } from '../types';
import { formatPrice, formatDate } from '../lib/utils';

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  return (
    <Link
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
        <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>{formatDate(event.date)}</span>
          <span>{event.location.city}</span>
        </div>
      </div>
    </Link>
  );
}