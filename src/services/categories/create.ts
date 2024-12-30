import { CategoryModel } from '@/library/models/category';
import { CategoryCreate } from '@/library/types/category';
import { BadResponse } from '@/library/types/response';
import { handleValidationErrors } from '@/library/utilities/errors';
import type { Request, Response } from 'express';
import { matchedData } from 'express-validator';

async function categoryCreate(req: Request, res: Response) {
	// Handling payload errors
	const validationErrors = handleValidationErrors(req);
	if (validationErrors.length > 0) return res.status(403).send(validationErrors).end();

	// Assigning the type of a clean payload
	const payload = matchedData(req) as CategoryCreate['payload'];

	// Checking for category existence
	const category = await CategoryModel.findOne({ name: payload.name });
	if (category) {
		const response: BadResponse = { error: 'Category already exists', code: '317b97f0-d13c-5357-beb8-01fefe1a1238', message: 'Wrong credentials' };
		return res.status(403).json(response).end();
	}

	// Saving the category in the database & setting session cookie
	try {
		const newCategory = await CategoryModel.create({ ...payload });

		// Creating response object
		const response: CategoryCreate['response'] = {
			message: 'Category creation succeeded',
			data: newCategory
		};

		res.status(201).json(response).end();
	} catch (error: any) {
		const response: BadResponse = { error: error.message, code: 'b9b36ce5-80fe-59e4-bb72-d54f3d4a59ce', message: 'Error creating category' };
		res.status(500).json(response).end();
	}
}

export { categoryCreate };
