import { useState, useEffect } from "react";
import { TripPlan } from "@/types/trip";

export const useTrips = () => {
  const [trips, setTrips] = useState<TripPlan[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:3000/api/trips"); // adjust URL if needed
        if (!res.ok) throw new Error(`Error: ${res.status}`);
        const data: TripPlan[] = await res.json();
        setTrips(data);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, []);

  return { trips, loading, error };
};
