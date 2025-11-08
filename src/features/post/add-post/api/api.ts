export const uploadImages = async (files: File[]) => {
    const fd = new FormData();
    files.forEach((f) => fd.append('files', f));

    const res = await fetch('/api/upload', {
        method: 'POST',
        body: fd,
        credentials: 'include',
    });
    if (!res.ok) throw await res.json().catch(() => new Error('upload failed'));
    return res.json() as Promise<{ urls: string[] }>;
};
