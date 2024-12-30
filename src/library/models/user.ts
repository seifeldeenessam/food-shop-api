import type { User } from '@/library/types/user';
import { Schema, model } from 'mongoose';

export const UserModel = model(
	'User',
	new Schema<User>(
		{
			name: { type: String, required: true },
			email: { type: String, required: true, unique: true },
			password: { type: String, required: true },
			role: { type: String, enum: ['ADMIN', 'CUSTOMER'], required: true }
		},
		{
			timestamps: true
		}
	)
);

// .pre('deleteMany', async function (next) {
// 	const user = this.getQuery()['_id'];

// 	await TicketModel.updateMany({ user }, { user: null });
// 	next();
// })
