import { superValidate, message } from 'sveltekit-superforms/server';
import { zod } from 'sveltekit-superforms/adapters';
import { schemaStep2 as lastStep } from './schema';
import { fail } from '@sveltejs/kit';

export const load = async () => {
	const form = await superValidate(zod(lastStep));

	return { form };
};

export const actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, zod(lastStep));

		console.log(form);

		if (!form.valid) return fail(400, { form });

		return message(form, 'Form posted successfully!');
	}
};
