import { UserModel } from '@/library/models/user';
import { GoodResponse } from '@/library/types/response';
import { User } from '@/library/types/user';
import type { Request, Response } from 'express';

async function usersRead(_: Request, res: Response) {
	try {
		const users = await UserModel.find();

		// Creating response object
		const response: GoodResponse<User[]> = {
			message: 'Users fetched',
			data: users
		};

		return res.status(200).json(response).end();
	} catch (error) {
		return res.sendStatus(404).end();
	}
}

export { usersRead };
