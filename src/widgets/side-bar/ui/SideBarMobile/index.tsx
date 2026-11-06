import { Menu } from 'lucide-react';
import React from 'react';

import { Button } from '@/shared/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/shared/ui/sheet';
import SideBarContent from '@/widgets/side-bar/ui/elements/SideBarContent';

const SideBarMobile = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={'ghost'} size={'icon-lg'} className={'lg:hidden'}>
          <Menu className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader className="visually-hidden">
          <SheetTitle>Navigation</SheetTitle>
        </SheetHeader>
        <div className="h-full px-8 pt-8 pb-5">
          <SideBarContent />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SideBarMobile;
