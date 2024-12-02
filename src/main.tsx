import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import './index.css';
import { QueryProvider } from './providers/QueryProvider';
import { useStore } from './store/useStore';
import { mockEvents } from './data/mockData';

// Initialize store with mock data
useStore.getState().setEvents(mockEvents);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryProvider>
      <App />
    </QueryProvider>
  </StrictMode>
);