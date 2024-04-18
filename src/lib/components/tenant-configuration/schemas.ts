import { z } from 'zod';

export const createSchema = z.object({
	primaryColor: z.string().optional(),
	secondaryColor: z.string().optional(),
	logo: z.string().optional(),
	favicon: z.string().optional(),
	contact: z
		.object({
			email: z.string().email().optional(),
			phone: z.string().optional(),
			address: z.string().optional()
		})
		.optional()
});
