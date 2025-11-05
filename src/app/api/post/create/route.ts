import { NextRequest, NextResponse } from 'next/server';
import { PostService } from '@server/modules/post/post.service';
import { AppError } from '@server/modules/error/AppError';

export async function POST(req: NextRequest) {
    const body = req.text;

    try {
        const post = PostService.create();
    } catch (e: AppError) {
        return NextResponse.json({ code: 1 });
    }
    return NextResponse.json('test');
}
