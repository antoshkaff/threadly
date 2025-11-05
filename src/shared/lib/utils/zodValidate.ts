import { type ZodObject } from 'zod';

export function zodValidate<S extends ZodObject>(schema: S) {
    return (values: unknown) => {
        const res = schema.safeParse(values);
        if (res.success) return {};

        const errors: Record<string, string> = {};
        for (const issue of res.error.issues) {
            const key = issue.path.length ? issue.path.join('.') : '_';
            if (!errors[key]) errors[key] = issue.message;
        }
        return errors;
    };
}
