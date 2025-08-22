import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TripPlan } from '@/types/trip';
import { mockTrips } from '@/data/mockTrips';
import { TripForm } from '@/components/TripForm';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Edit, AlertCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export default function EditTrip() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [trip, setTrip] = useState<TripPlan | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would fetch from API
    const foundTrip = mockTrips.find(t => t.id === id);
    setTrip(foundTrip || null);
    setLoading(false);
  }, [id]);

  const handleSubmit = (tripData: Omit<TripPlan, 'id' | 'createdAt'>) => {
    // In a real app, this would make an API call
    console.log('Updating trip:', { id, ...tripData });
    
    toast({
      title: "Trip Updated Successfully! ✨",
      description: `Your "${tripData.title}" trip has been updated!`,
    });

    // Navigate back to dashboard
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-sky flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading trip details...</p>
        </div>
      </div>
    );
  }

  if (!trip) {
    return (
      <div className="min-h-screen bg-gradient-sky">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-4 mb-8">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
              className="hover:bg-white/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </div>

          <div className="max-w-2xl mx-auto text-center py-16">
            <AlertCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-foreground mb-2">Trip Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The trip you're looking for doesn't exist or may have been deleted.
            </p>
            <Button 
              onClick={() => navigate('/')}
              className="bg-gradient-ocean hover:bg-primary-hover text-white"
            >
              Return to Dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-sky">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="hover:bg-white/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <Edit className="w-12 h-12 text-primary mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-foreground mb-2">Edit Trip Plan</h1>
            <p className="text-lg text-muted-foreground">
              Update your adventure details
            </p>
          </div>

          <TripForm 
            trip={trip}
            onSubmit={handleSubmit}
            onCancel={() => navigate('/')}
            submitLabel="Update Trip Plan"
          />
        </div>
      </div>
    </div>
  );
}