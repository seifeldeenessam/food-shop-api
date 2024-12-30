import { CategoryModel } from '@/library/models/category';
import { BadResponse, GoodResponse } from '@/library/types/response';
import type { Request, Response } from 'express';

async function categoriesDelete(req: Request, res: Response) {
	if (!req.query.categories) return res.sendStatus(403).end();

	const categories = (req.query.categories as string).split('__');

	try {
		await CategoryModel.deleteMany({ _id: { $in: categories } });

		// Creating response object
		const response: GoodResponse = {
			message: 'Category/s deleted',
			data: null
		};

		return res.status(200).json(response).end();
	} catch (error: any) {
		const response: BadResponse = { error: error.message, code: '90fccd73-af83-578c-a939-1007d32c6123', message: 'Error deleting category/s' };
		res.status(500).json(response).end();
	}
}

export { categoriesDelete };
