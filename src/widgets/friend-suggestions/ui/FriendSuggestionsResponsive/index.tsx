'use client';

import dynamic from 'next/dynamic';
import React from 'react';
import { useMedia } from 'react-use';

import type { Props as FriendSuggestionsProps } from '@/widgets/friend-suggestions/ui/FriendSuggestions';

const FriendSuggestions = dynamic(
  () => import('@/widgets/friend-suggestions').then((m) => m.FriendSuggestions),
  { ssr: false, loading: () => null },
);

const FriendSuggestionsResponsive = ({ ...props }: FriendSuggestionsProps) => {
  const isMobile = useMedia('(max-width: 768px)', false);
  if (isMobile) return;

  return <FriendSuggestions {...props} />;
};

export default FriendSuggestionsResponsive;
