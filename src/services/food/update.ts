import { FoodModel } from '@/library/models/food';
import { FoodUpdate } from '@/library/types/food';
import { BadResponse } from '@/library/types/response';
import { handleValidationErrors } from '@/library/utilities/errors';
import type { Request, Response } from 'express';
import { matchedData } from 'express-validator';

async function foodUpdate(req: Request, res: Response) {
	// Handling payload errors
	const validationErrors = handleValidationErrors(req);
	if (validationErrors.length > 0) return res.status(403).send(validationErrors).end();

	// Getting food id from request params
	if (!req.params._id) return res.sendStatus(403).end();
	const _id = req.params._id as string;

	// Assigning the type of a clean payload
	const payload = matchedData(req) as FoodUpdate['payload'];

	// Updating categories assigned food
	try {
		await FoodModel.updateOne({ _id }, { $set: { ...payload } });

		// Creating response object
		const response: FoodUpdate['response'] = {
			message: 'Food updated',
			data: null
		};

		res.status(200).json(response).end();
	} catch (error: any) {
		const response: BadResponse = { error: error.message, code: '6efaf5ae-845c-55a7-b61f-2e7911ae57d2', message: 'Error updating food' };
		res.status(500).json(response).end();
	}
}

export { foodUpdate };
