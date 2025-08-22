import { TripPlan } from '@/types/trip';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Calendar, DollarSign, Edit } from 'lucide-react';

interface TripCardProps {
  trip: TripPlan;
  onEdit: (trip: TripPlan) => void;
}

export function TripCard({ trip, onEdit }: TripCardProps) {
  return (
    <Card className="group hover:shadow-card-hover transition-all duration-300 transform hover:-translate-y-1 bg-card border-0 shadow-card">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
            {trip.title}
          </CardTitle>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => onEdit(trip)}
            className="opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary/10 hover:text-primary"
          >
            <Edit className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-muted-foreground">
          <MapPin className="w-4 h-4 text-primary" />
          <span className="font-medium">{trip.destination}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="w-4 h-4 text-primary" />
            <span>{trip.days} days</span>
          </div>
          
          <div className="flex items-center gap-1 text-accent font-semibold">
            <DollarSign className="w-4 h-4" />
            <span>${trip.budget.toLocaleString()}</span>
          </div>
        </div>
        
        <div className="text-xs text-muted-foreground pt-2 border-t border-border/50">
          Created At: {trip.createdAt ? new Date(trip.createdAt).toLocaleDateString() : "N/A"}
        </div>
      </CardContent>
    </Card>
  );
}