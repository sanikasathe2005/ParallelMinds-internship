
import { useState, useEffect,useDebugValue} from "react";


function useFetch<T>(fetchFunction: () => Promise<T>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useDebugValue(loading ? "Loading products" : "Products loaded");

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await fetchFunction();
        setData(result);
      } catch {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return { data, loading, error };
}

export default useFetch;
