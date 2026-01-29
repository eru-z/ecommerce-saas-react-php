const API_BASE =
  import.meta.env.VITE_API_URL || 'http://localhost/backend/api';

export async function apiFetch<T>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(`${API_BASE}${url}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  });

  let data: any = null;

  try {
    data = await res.json();
  } catch {
    // response has no body
  }

  if (!res.ok) {
    throw new Error(
      data?.error ||
      data?.message ||
      'Request failed'
    );
  }

  return data as T;
}
