import {z} from 'zod';

export const schema = z.object({
    name: z.string().min(2).max(50),
    email: z.string().email().min(5),
    age: z.number().nullable(),
    address: z.string().optional()
}).strict();
