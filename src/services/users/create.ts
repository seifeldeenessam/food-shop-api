import { UserModel } from '@/library/models/user';
import { BadResponse } from '@/library/types/response';
import { UserCreate } from '@/library/types/user';
import { handleValidationErrors } from '@/library/utilities/errors';
import { generateJWT } from '@/library/utilities/jwt';
import { hashPassword } from '@/library/utilities/passwords';
import type { Request, Response } from 'express';
import { matchedData } from 'express-validator';

async function userCreate(req: Request, res: Response) {
	// Handling payload errors
	const validationErrors = handleValidationErrors(req);
	if (validationErrors.length > 0) return res.status(403).send(validationErrors).end();

	// Assigning the type of a clean payload
	const payload = matchedData(req) as UserCreate['payload'];

	// Checking for user existence
	const user = await UserModel.findOne({ email: payload.email });
	if (user) {
		const response: BadResponse = { error: 'User already exists', code: '317b97f0-d13c-5357-beb8-01fefe1a1238', message: 'Wrong credentials' };
		return res.status(403).json(response).end();
	}

	// Hashing incoming password
	const hashedPassword = await hashPassword(payload.password);

	// Saving the user in the database & setting session cookie
	try {
		const newUser = await UserModel.create({ ...payload, password: hashedPassword });

		// Generating JWT
		const JWT = generateJWT(newUser._id.toString());

		// Setting access and refresh cookie
		res.cookie('refresh', JWT.refresh, {
			httpOnly: true,
			secure: process.env.MODE === 'PROD',
			sameSite: 'lax',
			path: '/',
			domain: process.env.MODE === 'PROD' ? process.env.DOMAIN : '',
			maxAge: 1000 * 60 * 60 * 24 * 365 * 10 // 10 years
		});

		// Creating response object
		const response: UserCreate['response'] = {
			message: 'User creation succeeded',
			data: {
				access: JWT.access,
				user: {
					_id: newUser._id.toString(),
					name: newUser.name,
					email: newUser.email,
					role: newUser.role
				}
			}
		};

		res.status(201).json(response).end();
	} catch (error: any) {
		const response: BadResponse = { error: error.message, code: 'b9b36ce5-80fe-59e4-bb72-d54f3d4a59ce', message: 'Error creating user' };
		res.status(500).json(response).end();
	}
}

export { userCreate };
