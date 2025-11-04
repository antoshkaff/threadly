import { SignInPage } from '@/pages-ui/sign-in';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Sign in',
};

export default function Page() {
    return <SignInPage />;
}
