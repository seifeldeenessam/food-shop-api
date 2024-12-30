import { CategoryModel } from '@/library/models/category';
import { Category } from '@/library/types/category';
import { GoodResponse } from '@/library/types/response';
import type { Request, Response } from 'express';

async function categoriesRead(req: Request, res: Response) {
	const search = (req.query.search as string) || '';
	const page = req.query.page ? Number.parseInt(req.query.page as string) : 1;
	const limit = req.query.limit ? Number.parseInt(req.query.limit as string) : 12;

	const skip = (page - 1) * limit;
	const fieldQuery = { $regex: search, $options: 'i' };
	const options = {
		...(search && { name: fieldQuery })
	};

	try {
		const categories = await CategoryModel.find().skip(skip).limit(limit).populate('food');
		const totalDocuments = await CategoryModel.countDocuments({ ...options });

		// Creating response object
		const response: GoodResponse<Category[]> = {
			message: 'Categories fetched',
			data: categories,
			pagination: {
				currentPage: page,
				totalPages: Math.ceil(totalDocuments / limit),
				totalDocuments
			}
		};
		return res.status(200).json(response).end();
	} catch (error) {
		return res.sendStatus(404).end();
	}
}

export { categoriesRead };
