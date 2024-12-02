import { create } from 'zustand';
import type { Event, User, Booking } from '../types';

interface Store {
  user: User | null;
  events: Event[];
  bookings: Booking[];
  setUser: (user: User | null) => void;
  setEvents: (events: Event[]) => void;
  addBooking: (booking: Booking) => void;
}

export const useStore = create<Store>((set) => ({
  user: null,
  events: [],
  bookings: [],
  setUser: (user) => set({ user }),
  setEvents: (events) => set({ events }),
  addBooking: (booking) => set((state) => ({ 
    bookings: [...state.bookings, booking] 
  })),
}));