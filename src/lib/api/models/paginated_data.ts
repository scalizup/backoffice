export type PaginatedData<T> = {
	currentPage: number;
	pageSize: number;
	totalItems: number;
	totalPages: number;
	items: T[];
	hasPreviousPage: boolean;
	hasNextPage: boolean;
};
