import { useMutation } from '@tanstack/react-query';
import { uploadImages } from '@/features/post/add-post/api/api';

export function useUploadImages() {
    return useMutation({
        mutationFn: uploadImages,
    });
}
