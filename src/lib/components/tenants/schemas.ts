import { z } from 'zod';

export const createSchema = z.object({
	name: z.string().min(2).max(50)
});

export type CreateSchema = typeof createSchema;

export const updateSchema = z.object({
	id: z.number().int().gt(0),
	name: z.string().min(2).max(50),
	isActive: z.boolean()
});

export type UpdateSchema = typeof updateSchema;

export const deleteSchema = z.object({
	id: z.number().int().gt(0)
});

export type DeleteSchema = typeof deleteSchema;
