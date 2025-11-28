import { getServerUser } from '@shared/getServerUser';
import { NextRequest, NextResponse } from 'next/server';
import { ROUTES } from '@/shared/config/routes.config';

export const proxy = async (req: NextRequest) => {
    const isAuth = await getServerUser();

    if (!isAuth) {
        return NextResponse.redirect(new URL(ROUTES.SIGN_IN, req.url));
    }

    return NextResponse.next();
};

export const config = {
    matcher: ['/feed'],
};
