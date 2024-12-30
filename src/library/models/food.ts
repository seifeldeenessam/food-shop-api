import type { Food } from '@/library/types/food';
import { Schema, model } from 'mongoose';

export const FoodModel = model(
	'Food',
	new Schema<Food>(
		{
			name: { type: String, required: true },
			price: { type: Number, required: true },
			image: { type: String, required: true },
			category: { type: Schema.Types.ObjectId, ref: 'Category', required: false, default: null }
		},
		{
			timestamps: true
		}
	)
);
