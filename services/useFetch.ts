import { useEffect, useState } from "react";

export default function useFetch<T>({
  fetchFunction,
  autoFetch = true,
}: {
  fetchFunction: () => Promise<T>;
  autoFetch?: boolean;
}) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const newData = await fetchFunction();
      setData(newData);
    } catch (error) {
      setError(error instanceof Error ? error : new Error("An error"));
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setLoading(false);
    setError(null);
    setData(null);
  };

  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, [autoFetch]);

  return { data, loading, setLoading, error, fetchData, reset };
}
