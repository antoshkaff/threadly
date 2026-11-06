'use client';

import { Menu } from 'lucide-react';

import { Button } from '@/shared/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/shared/ui/sheet';

import type { ReactNode } from 'react';

const MobileNavigationSheet = ({ children }: { children: ReactNode }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon-lg" className="lg:hidden" aria-label="Open navigation">
          <Menu className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader className="visually-hidden">
          <SheetTitle>Navigation</SheetTitle>
        </SheetHeader>
        <div className="h-full px-8 pt-8 pb-5">{children}</div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavigationSheet;
