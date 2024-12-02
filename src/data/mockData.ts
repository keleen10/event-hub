import { Event } from '../types';

export const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Nairobi Music Festival',
    description: 'A three-day music festival featuring top Kenyan and African artists.',
    date: '2024-07-15',
    time: '16:00',
    location: {
      name: 'Uhuru Gardens',
      address: 'Langata Road',
      city: 'Nairobi',
      coordinates: {
        lat: -1.3206,
        lng: 36.8220
      }
    },
    category: 'Concerts',
    price: 5000,
    capacity: 5000,
    availableTickets: 2500,
    imageUrl: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3',
    organizer: 'EventHub Kenya'
  },
  {
    id: '2',
    title: 'Tech Summit Kenya',
    description: 'Join tech leaders and innovators from across East Africa.',
    date: '2024-09-20',
    time: '09:00',
    location: {
      name: 'KICC',
      address: 'City Hall Way',
      city: 'Nairobi',
      coordinates: {
        lat: -1.2921,
        lng: 36.8219
      }
    },
    category: 'Workshops',
    price: 7500,
    capacity: 1000,
    availableTickets: 450,
    imageUrl: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678',
    organizer: 'TechEvents Kenya'
  },
  {
    id: '3',
    title: 'Mashemeji Derby',
    description: 'The biggest football derby in Kenya: Gor Mahia vs AFC Leopards',
    date: '2024-06-30',
    time: '15:00',
    location: {
      name: 'Kasarani Stadium',
      address: 'Thika Road',
      city: 'Nairobi',
      coordinates: {
        lat: -1.2219,
        lng: 36.8851
      }
    },
    category: 'Sports',
    price: 2000,
    capacity: 15000,
    availableTickets: 3000,
    imageUrl: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a',
    organizer: 'Kenya Premier League'
  }
];