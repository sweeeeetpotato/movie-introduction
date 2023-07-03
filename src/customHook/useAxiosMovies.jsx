import { useEffect, useState } from "react";
import axios from "axios";

export const useAxiosMovies = (API_URL) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(API_URL);
        if (response.status === 200) {
          setData(response.data.data);
        } else {
          setError(response.data.error || "Failed to fetch movies");
        }
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch movies: " + error.message);
        setLoading(false);
      }
    };

    fetchMovies();
  }, [API_URL]);

  return { data, loading, error };
};
