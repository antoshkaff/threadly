'use client';

import { X } from 'lucide-react';
import Image from 'next/image';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/dialog';

type PreviewableImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
};

const PreviewableImage = ({ src, alt, width, height, className }: PreviewableImageProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button type="button" className="h-fit w-fit">
          <Image src={src} alt={alt} width={width} height={height} className={className} />
        </button>
      </DialogTrigger>

      <DialogContent className="flex max-h-[95vh] !max-w-[60vw] items-center justify-center border-0 bg-transparent p-0 shadow-none">
        <DialogHeader className="visually-hidden">
          <DialogTitle>Image preview</DialogTitle>
          <DialogDescription>Image preview</DialogDescription>
        </DialogHeader>
        <DialogClose asChild>
          <button
            type="button"
            className="absolute top-4 right-4 z-50 inline-flex size-8 items-center justify-center rounded-full bg-black/70 text-white transition hover:bg-black"
            aria-label="Close"
          >
            <X className="size-5" />
          </button>
        </DialogClose>
        <div className="relative h-[95vh] w-[60vw] rounded-2xl !bg-black/50">
          <Image src={src} alt={alt} fill sizes="60vw" className="object-contain" />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PreviewableImage;
