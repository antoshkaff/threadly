import { SignUpPage } from '@/pages_/sign-up';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign up',
};

export default function Page() {
  return <SignUpPage />;
}
