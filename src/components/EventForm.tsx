import { useState } from 'react';
import { Event } from '../types';
import { Input } from './ui/Input';
import { Button } from './ui/Button';

interface EventFormProps {
  event?: Event;
  onSubmit: (data: Partial<Event>) => void;
  onCancel: () => void;
}

export function EventForm({ event, onSubmit, onCancel }: EventFormProps) {
  const [formData, setFormData] = useState({
    title: event?.title || '',
    description: event?.description || '',
    date: event?.date || '',
    time: event?.time || '',
    location: {
      name: event?.location.name || '',
      address: event?.location.address || '',
      city: event?.location.city || '',
      coordinates: {
        lat: event?.location.coordinates.lat || 0,
        lng: event?.location.coordinates.lng || 0
      }
    },
    category: event?.category || '',
    price: event?.price || 0,
    capacity: event?.capacity || 0,
    imageUrl: event?.imageUrl || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="Event Title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        required
      />

      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Date"
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />

        <Input
          label="Time"
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          required
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Location Details</h3>
        <Input
          label="Venue Name"
          name="location.name"
          value={formData.location.name}
          onChange={handleChange}
          required
        />
        <Input
          label="Address"
          name="location.address"
          value={formData.location.address}
          onChange={handleChange}
          required
        />
        <Input
          label="City"
          name="location.city"
          value={formData.location.city}
          onChange={handleChange}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Price (KSH)"
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          min="0"
          required
        />

        <Input
          label="Capacity"
          type="number"
          name="capacity"
          value={formData.capacity}
          onChange={handleChange}
          min="1"
          required
        />
      </div>

      <Input
        label="Image URL"
        name="imageUrl"
        value={formData.imageUrl}
        onChange={handleChange}
        placeholder="https://example.com/image.jpg"
        required
      />

      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {event ? 'Update Event' : 'Create Event'}
        </Button>
      </div>
    </form>
  );
}