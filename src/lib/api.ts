import axios from 'axios';
import type { Event } from '../types';

const api = axios.create({
  baseURL: 'https://api.example.com/v1', // Replace with your actual API endpoint
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function fetchEvents(): Promise<Event[]> {
  const response = await api.get('/events');
  return response.data;
}

export async function fetchEventById(id: string): Promise<Event> {
  const response = await api.get(`/events/${id}`);
  return response.data;
}

export async function createBooking(data: {
  eventId: string;
  quantity: number;
  userId: string;
}) {
  const response = await api.post('/bookings', data);
  return response.data;
}

export async function fetchUserBookings(userId: string) {
  const response = await api.get(`/bookings/user/${userId}`);
  return response.data;
}