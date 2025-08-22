import { useState, useEffect } from "react";
import { TripPlan } from "@/types/trip";

export const useTrip = (id: string | undefined) => {
  const [trip, setTrip] = useState<TripPlan | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchTrip = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`http://localhost:3000/api/trips/${id}`);
        if (!res.ok) throw new Error(`Error: ${res.status}`);

        const data: TripPlan = await res.json();
        setTrip(data);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchTrip();
  }, [id]);

  return { trip, loading, error };
};
