import type { PaginatedData } from '$lib/api/contracts/common/paginated_data';
import { writable } from 'svelte/store';

export interface SearchStoreModel<T> {
	data: T[];
	filtered: T[];
	search: string;
	selectedData: T[];
}

// add generic
export const createSearchStore = <T>(data: { items: T[] }) => {
	const { subscribe, set, update } = writable<SearchStoreModel<T>>({
		data: data.items,
		filtered: data.items,
		search: '',
		selectedData: []
	});

	// add types to

	return {
		subscribe,
		set,
		update
	};
};
