import { useState, useEffect } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin } from 'lucide-react';
import heroImage from '@/assets/hero-travel.jpg';
import mountainsImage from '@/assets/destination-mountains.jpg';
import cityImage from '@/assets/destination-city.jpg';
import templeImage from '@/assets/destination-temple.jpg';
import desertImage from '@/assets/destination-desert.jpg';

interface Destination {
  id: number;
  name: string;
  location: string;
  image: string;
  description: string;
}

const destinations: Destination[] = [
  {
    id: 1,
    name: "Tropical Paradise",
    location: "Maldives",
    image: heroImage,
    description: "Crystal clear waters and pristine beaches"
  },
  {
    id: 2,
    name: "Alpine Adventure",
    location: "Swiss Alps",
    image: mountainsImage,
    description: "Majestic peaks and serene mountain lakes"
  },
  {
    id: 3,
    name: "Urban Explorer",
    location: "Tokyo, Japan",
    image: cityImage,
    description: "Modern skylines and vibrant city life"
  },
  {
    id: 4,
    name: "Cultural Journey",
    location: "Angkor Wat",
    image: templeImage,
    description: "Ancient temples and rich heritage"
  },
  {
    id: 5,
    name: "Desert Expedition",
    location: "Sahara Desert",
    image: desertImage,
    description: "Golden dunes and endless horizons"
  }
];

export function DestinationCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-advance carousel every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % destinations.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">Discover Amazing Destinations</h2>
        <p className="text-muted-foreground">Explore the world's most beautiful places</p>
      </div>
      
      <Carousel className="w-full" opts={{ align: "start", loop: true }}>
        <CarouselContent>
          {destinations.map((destination) => (
            <CarouselItem key={destination.id} className="md:basis-1/2 lg:basis-1/3">
              <div className="p-2">
                <Card className="group overflow-hidden border-0 shadow-card hover:shadow-card-hover transition-all duration-500 transform hover:-translate-y-2">
                  <CardContent className="p-0">
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={destination.image}
                        alt={destination.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      
                      {/* Content overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <div className="flex items-center gap-2 mb-2">
                          <MapPin className="w-4 h-4 text-white/90" />
                          <span className="text-sm text-white/90 font-medium">{destination.location}</span>
                        </div>
                        <h3 className="text-xl font-bold mb-2">{destination.name}</h3>
                        <p className="text-white/90 text-sm">{destination.description}</p>
                      </div>

                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4 bg-white/80 hover:bg-white text-primary border-0 shadow-lg" />
        <CarouselNext className="right-4 bg-white/80 hover:bg-white text-primary border-0 shadow-lg" />
      </Carousel>

      {/* Dots indicator */}
      <div className="flex justify-center gap-2 mt-6">
        {destinations.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-primary w-8' 
                : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}