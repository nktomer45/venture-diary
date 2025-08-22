import { useState } from 'react';
import { TripPlan } from '@/types/trip';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MapPin, Calendar, DollarSign, Plane } from 'lucide-react';

interface TripFormProps {
  trip?: TripPlan;
  onSubmit: (trip: Omit<TripPlan, 'id' | 'createdAt'>) => void;
  onCancel?: () => void;
  submitLabel?: string;
}

export function TripForm({ trip, onSubmit, onCancel, submitLabel = "Create Trip" }: TripFormProps) {
  const [formData, setFormData] = useState({
    title: trip?.title || '',
    destination: trip?.destination || '',
    days: trip?.days || 1,
    budget: trip?.budget || 0,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.destination.trim()) newErrors.destination = 'Destination is required';
    if (formData.days < 1) newErrors.days = 'Days must be at least 1';
    if (formData.budget < 0) newErrors.budget = 'Budget cannot be negative';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleChange = (field: keyof typeof formData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <Card className="shadow-card-hover border-0">
      <CardHeader className="bg-gradient-ocean text-white rounded-t-lg">
        <CardTitle className="flex items-center gap-2">
          <Plane className="w-5 h-5" />
          {trip ? 'Edit Trip Plan' : 'Plan Your Next Adventure'}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="flex items-center gap-2 font-medium">
              <Plane className="w-4 h-4 text-primary" />
              Trip Title
            </Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="My Amazing Adventure"
              className={errors.title ? 'border-destructive' : ''}
            />
            {errors.title && <p className="text-sm text-destructive">{errors.title}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="destination" className="flex items-center gap-2 font-medium">
              <MapPin className="w-4 h-4 text-primary" />
              Destination
            </Label>
            <Input
              id="destination"
              value={formData.destination}
              onChange={(e) => handleChange('destination', e.target.value)}
              placeholder="Paris, France"
              className={errors.destination ? 'border-destructive' : ''}
            />
            {errors.destination && <p className="text-sm text-destructive">{errors.destination}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="days" className="flex items-center gap-2 font-medium">
                <Calendar className="w-4 h-4 text-primary" />
                Duration (Days)
              </Label>
              <Input
                id="days"
                type="number"
                min="1"
                value={formData.days}
                onChange={(e) => handleChange('days', parseInt(e.target.value) || 1)}
                className={errors.days ? 'border-destructive' : ''}
              />
              {errors.days && <p className="text-sm text-destructive">{errors.days}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="budget" className="flex items-center gap-2 font-medium">
                <DollarSign className="w-4 h-4 text-primary" />
                Budget ($)
              </Label>
              <Input
                id="budget"
                type="number"
                min="0"
                step="0.01"
                value={formData.budget}
                onChange={(e) => handleChange('budget', parseFloat(e.target.value) || 0)}
                className={errors.budget ? 'border-destructive' : ''}
              />
              {errors.budget && <p className="text-sm text-destructive">{errors.budget}</p>}
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button 
              type="submit" 
              className="flex-1 bg-gradient-ocean hover:bg-primary-hover text-white font-medium"
            >
              {submitLabel}
            </Button>
            {onCancel && (
              <Button 
                type="button" 
                variant="outline" 
                onClick={onCancel}
                className="px-6"
              >
                Cancel
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}