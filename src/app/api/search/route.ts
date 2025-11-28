import { NextRequest, NextResponse } from 'next/server';
import { SearchService } from '@server/modules/search/search.service';
import { AppError } from '@server/modules/error/AppError';

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const q = searchParams.get('q') ?? '';
        const typeParam = searchParams.get('type');
        const limitParam = searchParams.get('limit');
        const limit = limitParam ? Number(limitParam) : undefined;

        type SearchType = 'posts' | 'comments' | 'users';

        const allTypes: SearchType[] = ['posts', 'comments', 'users'];

        let types: SearchType[];

        if (!typeParam || typeParam === 'all') {
            types = allTypes;
        } else {
            const raw = typeParam.split(',').map((t) => t.trim());
            const set = new Set<SearchType>();

            raw.forEach((t) => {
                if (t === 'posts' || t === 'comments' || t === 'users') {
                    set.add(t);
                }
            });

            types = set.size ? Array.from(set) : allTypes;
        }

        const result = await SearchService.search({ q, types, limit });

        return NextResponse.json(result, { status: 200 });
    } catch (e) {
        if (e instanceof AppError) {
            return NextResponse.json(
                { error: e.code, message: e.message },
                { status: e.status },
            );
        }

        console.error(e);
        return NextResponse.json(
            { error: 'internal', message: 'Server error' },
            { status: 500 },
        );
    }
}
