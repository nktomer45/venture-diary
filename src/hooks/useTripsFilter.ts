import { useState, useMemo } from 'react';
import { TripPlan } from '@/types/trip';
import { FilterOptions, defaultFilters, filterTrips, paginateTrips } from '@/utils/tripFilters';

export function useTripsFilter(trips: TripPlan[], itemsPerPage: number = 6) {
  const [filters, setFilters] = useState<FilterOptions>(defaultFilters);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredTrips = useMemo(() => {
    return filterTrips(trips, filters);
  }, [trips, filters]);

  const paginatedData = useMemo(() => {
    return paginateTrips(filteredTrips, currentPage, itemsPerPage);
  }, [filteredTrips, currentPage, itemsPerPage]);

  const updateFilter = (key: keyof FilterOptions, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1); // Reset to first page when filters change
  };

  const updateSearch = (search: string) => {
    updateFilter('search', search);
  };

  const clearFilters = () => {
    setFilters(defaultFilters);
    setCurrentPage(1);
  };

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, paginatedData.totalPages)));
  };

  return {
    // Data
    trips: paginatedData.trips,
    totalPages: paginatedData.totalPages,
    totalItems: paginatedData.totalItems,
    filteredCount: filteredTrips.length,
    
    // State
    filters,
    currentPage,
    
    // Actions
    updateFilter,
    updateSearch,
    clearFilters,
    goToPage,
    
    // Helpers
    hasFilters: JSON.stringify(filters) !== JSON.stringify(defaultFilters)
  };
}