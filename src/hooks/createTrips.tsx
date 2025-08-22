import React, { useEffect, useState } from "react";

const useCreateTrips = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const createTrip = async (tripData: any) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

     const response = await fetch("http://localhost:3000/api/trips", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(tripData),
});


      if (!response.ok) {
        throw new Error("Failed to create trip");
      }
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return { createTrip, loading, error, success };
};

export default useCreateTrips;
