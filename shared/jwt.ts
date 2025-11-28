import * as jose from 'jose';

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'dev_secret');

type Payload = { sub: string; email: string; username: string };

export async function signAccess(payload: Payload, exp = '7d') {
    return await new jose.SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
        .setExpirationTime(exp)
        .sign(SECRET);
}

export async function verifyAccess<Payload>(token: string) {
    const { payload } = await jose.jwtVerify(token, SECRET);
    return payload;
}
