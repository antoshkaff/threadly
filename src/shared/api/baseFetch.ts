const baseUrl = '/api/';

export async function baseFetch<T>(url: string, init?: RequestInit) {
    const res = await fetch(`${baseUrl}/${url}`, {
        ...init,
        headers: {
            'Content-Type': 'application/json',
            ...(init?.headers || {}),
        },
        credentials: 'include',
    });
    const data = await res.json().catch(() => ({}));

    if (!res.ok) throw data;
    return data as T;
}
