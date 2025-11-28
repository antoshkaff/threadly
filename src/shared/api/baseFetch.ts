const getBaseUrl = () => {
    return process.env.NEXT_PUBLIC_APP_URL
        ? `${process.env.NEXT_PUBLIC_APP_URL}/api`
        : 'http://localhost:3000/api';
};

export async function baseFetch<T>(url: string, init?: RequestInit) {
    const baseUrl = getBaseUrl();

    const body = init?.body;
    const isFormData =
        typeof FormData !== 'undefined' && body instanceof FormData;

    const headers = {
        ...(init?.headers || {}),
        ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
    };

    const res = await fetch(`${baseUrl}/${url}`, {
        ...init,
        headers,
        credentials: 'include',
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) throw data;
    return data as T;
}
