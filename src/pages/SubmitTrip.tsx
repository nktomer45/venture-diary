import { useNavigate } from 'react-router-dom';
import { TripPlan } from '@/types/trip';
import { TripForm } from '@/components/TripForm';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Compass } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export default function SubmitTrip() {
  const navigate = useNavigate();

  const handleSubmit = (tripData: Omit<TripPlan, 'id' | 'createdAt'>) => {
    // In a real app, this would make an API call
    console.log('Creating new trip:', tripData);
    
    toast({
      title: "Trip Created Successfully! ✈️",
      description: `Your "${tripData.title}" trip has been planned!`,
    });

    // Navigate back to dashboard
    navigate('/');
  };

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
            <Compass className="w-12 h-12 text-primary mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-foreground mb-2">Plan New Adventure</h1>
            <p className="text-lg text-muted-foreground">
              Create your perfect trip itinerary with all the details
            </p>
          </div>

          <TripForm 
            onSubmit={handleSubmit}
            onCancel={() => navigate('/')}
            submitLabel="Create Trip Plan"
          />
        </div>
      </div>
    </div>
  );
}