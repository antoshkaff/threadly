'use client';

import React from 'react';
import { LogOut } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import { Spinner } from '@/shared/ui/spinner';
import { useLogoutMutation } from '@/entities/user/api/hooks';
import { useUser } from '@/entities/user/model/store';

const LogOutButton = () => {
    const { mutate, isPending } = useLogoutMutation();

    return (
        <Button variant="ghost" size={'icon-lg'} onClick={() => mutate()}>
            {isPending ? <Spinner /> : <LogOut className="size-5" />}
        </Button>
    );
};

export default LogOutButton;
