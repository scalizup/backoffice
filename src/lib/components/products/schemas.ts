import { z } from 'zod';

export const createSchemaStep1 = z.object({
	name: z
		.string()
		.min(2, {
			message: 'Name must be at least 2 characters long'
		})
		.max(50, {
			message: 'Name must be at most 50 characters long'
		}),
	price: z.coerce
		.number()
		.min(0.01, {
			message: 'Price must be at least 0.01'
		})
		.multipleOf(0.01)
		.optional()
		.nullish()
		.or(z.literal('').transform(() => null)),
	description: z.coerce
		.string()
		.min(2, {
			message: 'Description must be at least 2 characters long'
		})
		.max(1000, {
			message: 'Description must be at most 1000 characters long'
		})
		.optional()
		.nullish()
		.or(z.literal('').transform(() => null)),
	image: z
		.instanceof(File, { message: 'Please upload a file.' })
		.refine((f) => f.size < 10_000_000, 'Max 10 MB upload size.')
		.optional()
});

export type CreateSchemaStep1 = typeof createSchemaStep1;

export const createSchemaStep2 = createSchemaStep1.extend({
	tagIds: z.number().array().nonempty({
		message: 'Product must have at least one tag'
	})
});

export type CreateSchemaStep2 = typeof createSchemaStep2;

export const deleteSchema = z.object({
	id: z.number().min(1)
});

export const updateSchema = createSchemaStep1.extend({
	id: z.number().min(1)
});

export const updateSchemaStep2 = createSchemaStep2.extend({
	id: z.number().min(1)
});
