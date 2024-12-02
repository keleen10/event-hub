import { useState } from 'react';
import { useStore } from '../store/useStore';
import { Button } from '../components/ui/Button';
import { EventForm } from '../components/EventForm';
import { formatPrice, formatDate } from '../lib/utils';
import type { Event } from '../types';

export function AdminDashboard() {
  const user = useStore((state) => state.user);
  const events = useStore((state) => state.events);
  const bookings = useStore((state) => state.bookings);
  const [isCreating, setIsCreating] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);

  if (!user || user.role !== 'admin') {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-900">Access Denied</h1>
        <p className="text-gray-600 mt-2">You must be an admin to view this page.</p>
      </div>
    );
  }

  const handleCreateEvent = (data: Partial<Event>) => {
    // In a real app, this would be an API call
    const newEvent = {
      ...data,
      id: Date.now().toString(),
      availableTickets: data.capacity || 0,
    } as Event;
    
    useStore.setState({ events: [...events, newEvent] });
    setIsCreating(false);
  };

  const handleUpdateEvent = (data: Partial<Event>) => {
    if (!editingEvent) return;
    
    const updatedEvents = events.map(event =>
      event.id === editingEvent.id ? { ...event, ...data } : event
    );
    
    useStore.setState({ events: updatedEvents });
    setEditingEvent(null);
  };

  if (isCreating || editingEvent) {
    return (
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">
          {isCreating ? 'Create New Event' : 'Edit Event'}
        </h1>
        <EventForm
          event={editingEvent || undefined}
          onSubmit={isCreating ? handleCreateEvent : handleUpdateEvent}
          onCancel={() => {
            setIsCreating(false);
            setEditingEvent(null);
          }}
        />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <Button onClick={() => setIsCreating(true)}>Create New Event</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Total Events</h3>
          <p className="text-3xl font-bold text-blue-600">{events.length}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Total Bookings</h3>
          <p className="text-3xl font-bold text-blue-600">{bookings.length}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Revenue</h3>
          <p className="text-3xl font-bold text-blue-600">
            {formatPrice(bookings.reduce((sum, booking) => sum + booking.totalPrice, 0))}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-bold p-6 border-b">Manage Events</h2>
        <div className="divide-y">
          {events.map(event => (
            <div key={event.id} className="p-6 flex items-center justify-between">
              <div>
                <h3 className="font-semibold">{event.title}</h3>
                <p className="text-sm text-gray-500">{formatDate(event.date)}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm">
                  {event.availableTickets} tickets left
                </span>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setEditingEvent(event)}
                >
                  Edit
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}