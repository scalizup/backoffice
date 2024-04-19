import { z } from 'zod';

export const upsertMenuSortSchema = z.object({
	tagGroupId: z.number(),
	orderOfTagIds: z.array(z.number())
});
