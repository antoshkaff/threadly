import { SignUpPage } from '@/pages_/sign-up';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Sign up',
};

export default function Page() {
    return <SignUpPage />;
}
