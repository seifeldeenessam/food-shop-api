type BaseResponse = { message: string };

export type GoodResponse<T = null> = BaseResponse & {
	data: T;
	pagination?: {
		currentPage: number;
		totalPages: number;
		totalDocuments: number;
	};
};

export type BadResponse = BaseResponse & {
	error: string;
	code: string;
};
