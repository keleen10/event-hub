import { useQuery } from '@tanstack/react-query';
import { fetchEvents, fetchEventById } from '../lib/api';

export function useEvents() {
  return useQuery({
    queryKey: ['events'],
    queryFn: fetchEvents,
  });
}

export function useEvent(id: string) {
  return useQuery({
    queryKey: ['events', id],
    queryFn: () => fetchEventById(id),
    enabled: !!id,
  });
}