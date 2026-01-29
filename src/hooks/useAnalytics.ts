import { useEffect, useState } from 'react';

export const useAnalytics = (userId: number) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    fetch(`http://localhost/ecommerce_saas/api/dashboard/analytics.php?userId=${userId}`)
      .then(res => res.json())
      .then(setData)
      .finally(() => setLoading(false));
  }, [userId]);

  return { data, loading };
};
