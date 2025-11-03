'use client';

import React from 'react';
import { Button } from '@/shared/ui/button';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';

const ToggleThemeButton = () => {
    const { theme, setTheme } = useTheme();

    return (
        <Button
            variant={'outline'}
            size={'icon-lg'}
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="rounded-full"
        >
            <Sun className="absolute size-5 opacity-0 scale-0 transition-opacity transition-transform dark:opacity-100 dark:scale-100" />
            <Moon className="absolute size-5 scale-100 transition-opacity transition-transform dark:opacity-0 dark:scale-0" />
        </Button>
    );
};

export default ToggleThemeButton;
