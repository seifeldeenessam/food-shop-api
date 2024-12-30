import { UserModel } from '@/library/models/user';
import { BadResponse } from '@/library/types/response';
import { UserUpdate } from '@/library/types/user';
import { handleValidationErrors } from '@/library/utilities/errors';
import type { Request, Response } from 'express';
import { matchedData } from 'express-validator';

async function userUpdate(req: Request, res: Response) {
	// Handling payload errors
	const validationErrors = handleValidationErrors(req);
	if (validationErrors.length > 0) return res.status(403).send(validationErrors).end();

	// Getting user id from request params
	if (!req.params._id) return res.sendStatus(403).end();
	const _id = req.params._id as string;

	// Assigning the type of a clean payload
	const payload = matchedData(req) as UserUpdate['payload'];

	// Updating users assigned user
	try {
		await UserModel.updateOne({ _id }, { $set: { ...payload } });

		// Creating response object
		const response: UserUpdate['response'] = {
			message: 'User updated',
			data: null
		};

		res.status(200).json(response).end();
	} catch (error: any) {
		const response: BadResponse = { error: error.message, code: '6efaf5ae-845c-55a7-b61f-2e7911ae57d2', message: 'Error updating user' };
		res.status(500).json(response).end();
	}
}

export { userUpdate };
