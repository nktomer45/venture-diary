import { TripPlan } from '@/types/trip';

export interface FilterOptions {
  search: string;
  budgetRange: 'all' | 'budget' | 'mid' | 'luxury';
  duration: 'all' | 'short' | 'medium' | 'long';
  sortBy: 'newest' | 'oldest' | 'budget-low' | 'budget-high' | 'duration-short' | 'duration-long';
}

export const defaultFilters: FilterOptions = {
  search: '',
  budgetRange: 'all',
  duration: 'all',
  sortBy: 'newest'
};

export function filterTrips(trips: TripPlan[], filters: FilterOptions): TripPlan[] {
  let filteredTrips = [...trips];

  // Search filter
  if (filters.search.trim()) {
    const searchTerm = filters.search.toLowerCase();
    filteredTrips = filteredTrips.filter(trip =>
      trip.title.toLowerCase().includes(searchTerm) ||
      trip.destination.toLowerCase().includes(searchTerm)
    );
  }

  // Budget range filter
  if (filters.budgetRange !== 'all') {
    filteredTrips = filteredTrips.filter(trip => {
      switch (filters.budgetRange) {
        case 'budget':
          return trip.budget <= 1500;
        case 'mid':
          return trip.budget > 1500 && trip.budget <= 3500;
        case 'luxury':
          return trip.budget > 3500;
        default:
          return true;
      }
    });
  }

  // Duration filter
  if (filters.duration !== 'all') {
    filteredTrips = filteredTrips.filter(trip => {
      switch (filters.duration) {
        case 'short':
          return trip.days <= 5;
        case 'medium':
          return trip.days > 5 && trip.days <= 10;
        case 'long':
          return trip.days > 10;
        default:
          return true;
      }
    });
  }

  // Sort trips
  filteredTrips.sort((a, b) => {
    switch (filters.sortBy) {
      case 'newest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'oldest':
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      case 'budget-low':
        return a.budget - b.budget;
      case 'budget-high':
        return b.budget - a.budget;
      case 'duration-short':
        return a.days - b.days;
      case 'duration-long':
        return b.days - a.days;
      default:
        return 0;
    }
  });

  return filteredTrips;
}

export function paginateTrips(trips: TripPlan[], page: number, itemsPerPage: number) {
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return {
    trips: trips.slice(startIndex, endIndex),
    totalPages: Math.ceil(trips.length / itemsPerPage),
    totalItems: trips.length
  };
}