import { CategoryModel } from '@/library/models/category';
import { FoodModel } from '@/library/models/food';
import { FoodCreate } from '@/library/types/food';
import { BadResponse } from '@/library/types/response';
import { handleValidationErrors } from '@/library/utilities/errors';
import type { Request, Response } from 'express';
import { matchedData } from 'express-validator';

async function foodCreate(req: Request, res: Response) {
	// Handling payload errors
	const validationErrors = handleValidationErrors(req);
	if (validationErrors.length > 0) return res.status(403).send(validationErrors).end();

	// Assigning the type of a clean payload
	const payload = matchedData(req) as FoodCreate['payload'];

	// Checking for food existence
	const food = await FoodModel.findOne({ name: payload.name });
	if (food) {
		const response: BadResponse = { error: 'Food already exists', code: '317b97f0-d13c-5357-beb8-01fefe1a1238', message: 'Wrong credentials' };
		return res.status(403).json(response).end();
	}

	// Saving the food in the database & setting session cookie
	try {
		const newFood = await FoodModel.create({ ...payload });
		await CategoryModel.updateOne({ _id: payload.category }, { $push: { food: newFood._id } });

		// Creating response object
		const response: FoodCreate['response'] = {
			message: 'Food creation succeeded',
			data: newFood
		};

		res.status(201).json(response).end();
	} catch (error: any) {
		const response: BadResponse = { error: error.message, code: 'b9b36ce5-80fe-59e4-bb72-d54f3d4a59ce', message: 'Error creating food' };
		res.status(500).json(response).end();
	}
}

export { foodCreate };
