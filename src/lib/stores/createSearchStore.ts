import { writable } from 'svelte/store';

export interface SearchStoreModel<T> {
	data: T[];
	filtered: T[];
	search: string;
	selectedData: T[];
}

export const createSearchStore = <T>(data: T[]) => {
	const { subscribe, set, update } = writable<SearchStoreModel<T>>({
		data: data.items,
		filtered: data.items,
		search: '',
		selectedData: []
	});

	return {
		subscribe,
		set,
		update
	};
};
