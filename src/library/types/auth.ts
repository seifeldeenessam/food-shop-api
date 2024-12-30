import { GoodResponse } from './response';
import { User } from './user';

export type Session = {
	access: string;
	user: Omit<User, 'password' | 'createdAt' | 'updatedAt'>;
};

export type AuthLogin = {
	payload: { email: string; password: string };
	response: GoodResponse<Session>;
};

export type DecodedAuthToken = {
	id: string;
	iat: number;
	exp: number;
};
