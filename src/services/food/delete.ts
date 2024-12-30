import { FoodModel } from '@/library/models/food';
import { BadResponse, GoodResponse } from '@/library/types/response';
import type { Request, Response } from 'express';

async function foodDelete(req: Request, res: Response) {
	if (!req.query.food) return res.sendStatus(403).end();

	const food = (req.query.food as string).split('__');

	try {
		await FoodModel.deleteMany({ _id: { $in: food } });

		// Creating response object
		const response: GoodResponse = {
			message: 'Food/s deleted',
			data: null
		};

		return res.status(200).json(response).end();
	} catch (error: any) {
		const response: BadResponse = { error: error.message, code: '90fccd73-af83-578c-a939-1007d32c6123', message: 'Error deleting food/s' };
		res.status(500).json(response).end();
	}
}

export { foodDelete };
