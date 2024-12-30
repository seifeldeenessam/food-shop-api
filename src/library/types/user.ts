import { Session } from './auth';
import { GoodResponse } from './response';

export type User = {
	_id: string;
	name: string;
	email: string;
	password: string;
	role: 'ADMIN' | 'CUSTOMER';
	createdAt: Date;
	updatedAt: Date;
};

export type UserCreate = {
	payload: Omit<User, '_id' | 'createdAt' | 'updatedAt'>;
	response: GoodResponse<Session>;
};

export type UserUpdate = {
	payload: Omit<User, '_id' | 'password' | 'createdAt' | 'updatedAt'>;
	response: GoodResponse;
};

export type UsersDelete = {
	payload: { users: string[] };
	response: GoodResponse;
};
