import { useParams, useNavigate } from 'react-router-dom';
import { TripPlan } from '@/types/trip';
import { TripForm } from '@/components/TripForm';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Edit, AlertCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useTrip } from '@/hooks/useGetById';

export default function EditTrip() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { trip, loading, error } = useTrip(id);

  const handleSubmit = async (tripData: Omit<TripPlan, 'id' | 'createdAt'>) => {
    try {
      const res = await fetch(`http://localhost:3000/api/trips/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tripData),
      });

      if (!res.ok) throw new Error("Failed to update trip");

      toast({
        title: "Trip Updated Successfully! ✨",
        description: `Your "${tripData.title}" trip has been updated!`,
      });

      navigate('/');
    } catch (err: any) {
      toast({
        title: "Error updating trip",
        description: err.message,
        variant: "destructive",
      });
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  if (!trip) {
    return (
      <div className="min-h-screen bg-gradient-sky">
        {/* ... same Not Found UI as you had */}
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
