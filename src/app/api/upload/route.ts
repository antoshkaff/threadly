import { NextRequest, NextResponse } from 'next/server';
import { put } from '@vercel/blob';

export async function POST(req: NextRequest) {
    const form = await req.formData();
    const files = form.getAll('files') as File[];

    const kind = req.nextUrl.searchParams.get('kind');
    const folder = kind === 'avatars' ? 'avatars' : 'posts';

    if (!files.length) {
        return NextResponse.json({ error: 'no_files' }, { status: 400 });
    }

    const urls: string[] = [];

    for (const file of files) {
        if (!file.type.startsWith('image/')) {
            return NextResponse.json({ error: 'only_images' }, { status: 400 });
        }

        const key = `${folder}/${crypto.randomUUID()}-${file.name}`;

        const blob = await put(key, file, {
            access: 'public',
            addRandomSuffix: false,
        });

        urls.push(blob.url);
    }

    return NextResponse.json({ urls });
}
