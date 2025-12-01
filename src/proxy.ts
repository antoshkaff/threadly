import { NextRequest, NextResponse } from 'next/server';
import { ROUTES } from '@/shared/config/routes.config';
import { ACCESS_COOKIE } from '@shared/constants';
import { verifyAccess } from '@shared/jwt';

export function proxy(req: NextRequest) {
    const token = req.cookies.get(ACCESS_COOKIE)?.value;

    if (!token) {
        return NextResponse.redirect(new URL(ROUTES.SIGN_IN, req.url));
    }

    try {
        verifyAccess(token);
        return NextResponse.next();
    } catch {
        return NextResponse.redirect(new URL(ROUTES.SIGN_IN, req.url));
    }
}

export const config = {
    matcher: ['/feed'],
};
