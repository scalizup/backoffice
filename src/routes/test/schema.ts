import { z } from 'zod';

export const schemaStep1 = z.object({
	name: z.string().min(1),
	price: z.string()
});

export const schemaStep2 = schemaStep1.extend({
	tags: z.array(z.string()).nonempty()
});
