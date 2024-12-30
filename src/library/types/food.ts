import { Category } from './category';
import { GoodResponse } from './response';

export type Food = {
	_id: string;
	name: string;
	price: number;
	image: string;
	category: Category;
	createdAt: Date;
	updatedAt: Date;
};

export type FoodCreate = {
	payload: Omit<Food, '_id' | 'createdAt' | 'updatedAt'>;
	response: GoodResponse<Food>;
};

export type FoodUpdate = {
	payload: Omit<Food, '_id' | 'password' | 'createdAt' | 'updatedAt'>;
	response: GoodResponse;
};

export type FoodsDelete = {
	payload: { foods: string[] };
	response: GoodResponse;
};
