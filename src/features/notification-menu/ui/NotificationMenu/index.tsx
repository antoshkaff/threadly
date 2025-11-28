import React from 'react';
import { Button } from '@/shared/ui/button';
import { Bell } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover';

const NotificationMenu = () => {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    aria-label={'open notifications list'}
                    variant={'outline'}
                    size={'icon-lg'}
                    className="rounded-full"
                >
                    <Bell className="size-5" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-90" align={'end'} sideOffset={8}>
                test
            </PopoverContent>
        </Popover>
    );
};

export default NotificationMenu;
