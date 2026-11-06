import { UserPen } from 'lucide-react';
import React from 'react';

import { Button } from '@/shared/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/dialog';

import EditProfileForm, { EDIT_PROFILE_FORM_ID } from '../EditProfileForm';

import type { PublicUser } from '@shared/types/user';

type Props = {
  user: PublicUser;
  className?: string;
};
const EditProfileModal = ({ user, className }: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className={className} variant={'outline'}>
          <UserPen /> <span>Edit</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Update your name, bio, and photo. Save changes when you are ready.
          </DialogDescription>
        </DialogHeader>

        <EditProfileForm user={user} />

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit" form={EDIT_PROFILE_FORM_ID}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileModal;
