import React from 'react';
import { Button } from '@/shared/ui/button';
import { Menu } from 'lucide-react';
import SideBarContent from '@/widgets/side-bar/ui/elements/SideBarContent';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/shared/ui/sheet';

const SideBarMobile = () => {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button
                    variant={'ghost'}
                    size={'icon-lg'}
                    className={'lg:hidden'}
                >
                    <Menu className="size-5" />
                </Button>
            </SheetTrigger>
            <SheetContent side="left">
                <SheetHeader className="visually-hidden">
                    <SheetTitle>Navigation</SheetTitle>
                </SheetHeader>
                <div className="py-8 px-8 h-full">
                    <SideBarContent isMobile={true} />
                </div>
            </SheetContent>
        </Sheet>
    );
};

export default SideBarMobile;
