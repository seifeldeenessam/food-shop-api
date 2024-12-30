import type { Category } from '@/library/types/category';
import { Schema, model } from 'mongoose';
import { FoodModel } from './food';

export const CategoryModel = model(
	'Category',
	new Schema<Category>(
		{
			name: { type: String, required: true },
			food: [{ type: Schema.Types.ObjectId, ref: 'Food' }]
		},
		{
			timestamps: true
		}
	).pre('deleteMany', async function (next) {
		const query = this.getQuery();

		await FoodModel.updateMany({ category: query._id }, { category: null });
		next();
	})
);
