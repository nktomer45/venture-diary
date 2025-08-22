import { TripPlan } from '@/types/trip';

export const mockTrips: TripPlan[] = [
  {
    id: '1',
    title: 'Tropical Paradise Getaway',
    destination: 'Maldives',
    days: 7,
    budget: 3500,
    createdAt: new Date('2024-01-15')
  },
  {
    id: '2',
    title: 'European Adventure',
    destination: 'Paris, France',
    days: 10,
    budget: 2800,
    createdAt: new Date('2024-02-20')
  },
  {
    id: '3',
    title: 'Mountain Hiking Expedition',
    destination: 'Swiss Alps, Switzerland',
    days: 5,
    budget: 1200,
    createdAt: new Date('2024-03-10')
  },
  {
    id: '4',
    title: 'Cultural Discovery Tour',
    destination: 'Tokyo, Japan',
    days: 14,
    budget: 4200,
    createdAt: new Date('2024-01-28')
  }
];