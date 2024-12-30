import { UserModel } from '@/library/models/user';
import { BadResponse, GoodResponse } from '@/library/types/response';
import type { Request, Response } from 'express';

async function usersDelete(req: Request, res: Response) {
	if (!req.query.users) return res.sendStatus(403).end();

	const users = (req.query.users as string).split('__');

	try {
		await UserModel.deleteMany({ _id: { $in: users } });

		// Creating response object
		const response: GoodResponse = {
			message: 'User/s deleted',
			data: null
		};

		return res.status(200).json(response).end();
	} catch (error: any) {
		const response: BadResponse = { error: error.message, code: '90fccd73-af83-578c-a939-1007d32c6123', message: 'Error deleting user/s' };
		res.status(500).json(response).end();
	}
}

export { usersDelete };
