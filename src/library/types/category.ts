import { Food } from './food';
import { GoodResponse } from './response';

export type Category = {
	_id: string;
	name: string;
	food: Food[];
	createdAt: Date;
	updatedAt: Date;
};

export type CategoryCreate = {
	payload: Omit<Category, '_id' | 'createdAt' | 'updatedAt'>;
	response: GoodResponse<Category>;
};

export type CategoryUpdate = {
	payload: Omit<Category, '_id' | 'password' | 'createdAt' | 'updatedAt'>;
	response: GoodResponse;
};

export type CategorysDelete = {
	payload: { categorys: string[] };
	response: GoodResponse;
};
