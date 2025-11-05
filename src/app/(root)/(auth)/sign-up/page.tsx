import { SignUpPage } from '@/pages-ui/sign-up';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Sign up',
};

export default function Page() {
    return <SignUpPage />;
}
