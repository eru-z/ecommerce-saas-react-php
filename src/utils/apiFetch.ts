export async function apiFetch<T>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(
    `http://localhost/ecommerce_saas/api${url}`,
    {
      credentials: 'include',
      ...options,
    }
  );

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || 'API request failed');
  }

  return res.json();
}
