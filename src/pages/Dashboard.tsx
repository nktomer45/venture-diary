import { useNavigate } from 'react-router-dom';
import { TripPlan } from '@/types/trip';
import { TripCard } from '@/components/TripCard';
import { Button } from '@/components/ui/button';
import { SearchAndFilters } from '@/components/SearchAndFilters';
import { Pagination } from '@/components/Pagination';
import { useTripsFilter } from '@/hooks/useTripsFilter';
import { Plus, MapPin, Plane } from 'lucide-react';
import heroImage from '@/assets/hero-travel.jpg';
import { DestinationCarousel } from '@/components/DestinationCarousel';
import { useTrips } from '@/hooks/useTrips';

export default function Dashboard() {
  const navigate = useNavigate();
  const { trips: fetchedTrips, loading, error } = useTrips();
  const allTrips = fetchedTrips?.trips || [];
  

  
  const {
    trips,
    totalPages,
    totalItems,
    filteredCount,
    filters,
    currentPage,
    updateFilter,
    updateSearch,
    clearFilters,
    goToPage,
    hasFilters
  } = useTripsFilter(allTrips);

  const handleEdit = (trip: TripPlan) => {
    navigate(`/edit/${trip.id}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-muted-foreground">Loading trips...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen text-center">
        <p className="text-red-500 text-lg font-semibold">Failed to load trips</p>
        <Button onClick={() => window.location.reload()} className="ml-3">
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-sky">
      
      <div 
        className="relative h-96 bg-cover bg-center bg-no-repeat flex items-center justify-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative text-center text-white z-10 max-w-4xl mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4 drop-shadow-lg">
            Your Travel Adventures
          </h1>
          <p className="text-xl mb-8 text-white/90">
            Discover, plan, and organize your perfect trips
          </p>
          <Button 
            onClick={() => navigate('/submit')}
            size="lg"
            className="bg-gradient-sunset hover:opacity-90 text-white font-semibold px-8 py-3 text-lg shadow-lg"
          >
            <Plus className="w-5 h-5 mr-2" />
            Plan New Adventure
          </Button>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="container mx-auto px-4 py-12">
        
        {/* Trip Management Section */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Plane className="w-8 h-8 text-primary" />
            <div>
              <h2 className="text-3xl font-bold text-foreground">Trip Dashboard</h2>
              <p className="text-muted-foreground">Manage all your travel plans</p>
            </div>
          </div>
          <Button 
            onClick={() => navigate('/submit')}
            className="bg-gradient-ocean hover:bg-primary-hover text-white font-medium"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Trip
          </Button>
        </div>

        {/* Search and Filters */}
        <SearchAndFilters
          filters={filters}
          onUpdateFilter={updateFilter}
          onUpdateSearch={updateSearch}
          onClearFilters={clearFilters}
          hasFilters={hasFilters}
          totalItems={totalItems}
          filteredCount={filteredCount}
        />

        {/* Trip Cards Grid */}
        {trips.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
              {trips.map((trip) => (
                <TripCard key={trip.id} trip={trip} onEdit={handleEdit} />
              ))}
            </div>
            
            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={goToPage}
              totalItems={filteredCount}
              itemsPerPage={6}
            />
          </>
        ) : (
          <div className="text-center py-16">
            <MapPin className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-foreground mb-2">
              {hasFilters ? 'No trips match your filters' : 'No trips planned yet'}
            </h3>
            <p className="text-muted-foreground mb-6">
              {hasFilters 
                ? 'Try adjusting your search criteria or clear filters to see all trips.' 
                : 'Start planning your next adventure!'
              }
            </p>
            {hasFilters ? (
              <Button 
                onClick={clearFilters}
                variant="outline"
                className="mr-3"
              >
                Clear Filters
              </Button>
            ) : null}
            <Button 
              onClick={() => navigate('/submit')}
              size="lg"
              className="bg-gradient-ocean hover:bg-primary-hover text-white font-medium"
            >
              <Plus className="w-5 h-5 mr-2" />
              {hasFilters ? 'Plan New Trip' : 'Plan Your First Trip'}
            </Button>
          </div>
        )}
        {/* Destination Carousel Section */}
        <div className="mt-16 animate-fade-in">
          <DestinationCarousel />
        </div>
      </div>
    </div>
  );
}