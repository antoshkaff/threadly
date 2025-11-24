'use client';

import React from 'react';
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
import { X } from 'lucide-react';
import { Button } from '@/shared/ui/button';

type PreviewableImageProps = {
    src: string;
    alt: string;
    width: number;
    height: number;
    className?: string;
};

const PreviewableImage = ({
    src,
    alt,
    width,
    height,
    className,
}: PreviewableImageProps) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <button type="button" className="h-fit w-fit">
                    <Image
                        src={src}
                        alt={alt}
                        width={width}
                        height={height}
                        className={className}
                    />
                </button>
            </DialogTrigger>

            <DialogContent
                className="
                    p-0
                    border-0
                    bg-transparent
                    shadow-none
                    !max-w-[60vw]
                    max-h-[95vh]
                    flex
                    items-center
                    justify-center
                "
            >
                <DialogHeader className="visually-hidden">
                    <DialogTitle>Image preview</DialogTitle>
                    <DialogDescription>Image preview</DialogDescription>
                </DialogHeader>
                <DialogClose asChild>
                    <button
                        type="button"
                        className="
                            absolute right-4 top-4
                            inline-flex items-center justify-center
                            rounded-full
                            bg-black/70
                            text-white
                            hover:bg-black
                            transition
                            size-8
                            z-50
                        "
                        aria-label="Close"
                    >
                        <X className="size-5" />
                    </button>
                </DialogClose>
                <div className="relative w-[60vw] h-[95vh] !bg-black/50 rounded-2xl">
                    <Image
                        src={src}
                        alt={alt}
                        fill
                        sizes="60vw"
                        className="object-contain"
                    />
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default PreviewableImage;
