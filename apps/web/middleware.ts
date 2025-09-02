import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

const PUBLIC_PATHS = [
'/', // LP
'/contact',
'/pricing',
'/api/public',
'/_next', // assets
];

const COOKIE_LIMIT = 3;
const FREE_IA_LIMIT = 20;
const COOKIE_KEY = 'guest_calls';

export async function middleware(req) {
    const { pathname } = req.nextUrl;

    if (PUBLIC_PATHS.some(p => pathname.startsWith(p))) {
        return NextResponse.next();
    }

    // 1. Récupération session
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const plan = token?.plan || null;
    const isPremium = plan === 'starter' || plan === 'pro';

    // 2. Gestion invité par cookie
    let guestCalls = Number(req.cookies.get(COOKIE_KEY)?.value || 0);

    // 3. Freemium gating
    if (!isPremium) {
        if (token) {
            // utilisateur connecté en mode FREE
            if (token.iaCalls >= FREE_IA_LIMIT) {
                return NextResponse.redirect(new URL('/paywall', req.nextUrl));
            }
        } else {
            // visiteur anonyme
            guestCalls++;
            const res = NextResponse.next();
            res.cookies.set(COOKIE_KEY, String(guestCalls), { maxAge: 86400 });
            if (guestCalls > COOKIE_LIMIT) {
                return NextResponse.redirect(new URL('/signup', req.nextUrl));
            }
            return res;
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*', '/api/secure/:path*'],
};
