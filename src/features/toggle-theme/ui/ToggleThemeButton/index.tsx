'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import React from 'react';

import { Button } from '@/shared/ui/button';

const ToggleThemeButton = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant={'outline'}
      size={'icon-lg'}
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="rounded-full"
    >
      <Sun className="absolute size-5 scale-0 opacity-0 transition-opacity transition-transform dark:scale-100 dark:opacity-100" />
      <Moon className="absolute size-5 scale-100 transition-opacity transition-transform dark:scale-0 dark:opacity-0" />
    </Button>
  );
};

export default ToggleThemeButton;
