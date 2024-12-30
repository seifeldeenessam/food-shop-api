import { UserModel } from '@/library/models/user';
import { AuthLogin } from '@/library/types/auth';
import { BadResponse } from '@/library/types/response';
import { handleValidationErrors } from '@/library/utilities/errors';
import { generateJWT } from '@/library/utilities/jwt';
import { comparePasswords } from '@/library/utilities/passwords';
import type { Request, Response } from 'express';
import { matchedData } from 'express-validator';

async function authLogin(req: Request, res: Response) {
	// Handling payload errors
	const validationErrors = handleValidationErrors(req);
	if (validationErrors.length > 0) return res.status(403).send(validationErrors).end();

	// Assigning the type of a clean payload
	const payload = matchedData(req) as AuthLogin['payload'];

	// Checking for user existence
	const user = await UserModel.findOne({ email: payload.email }).select(['name', 'email', 'role', 'password']);
	if (!user) {
		const response: BadResponse = { error: 'User not found', code: 'fb3aec16-405d-5c08-ab40-abbf9eba5e8a', message: 'Wrong credentials' };
		return res.status(403).json(response).end();
	}

	// Comparing incoming password with user's stored password
	const isPasswordCorrect = await comparePasswords(payload.password, user.password);
	if (!isPasswordCorrect) {
		const response: BadResponse = { error: 'Wrong password', code: '81e38a66-99a2-5c4b-a77b-a777122c8704', message: 'Wrong credentials' };
		return res.status(403).json(response).end();
	}

	// Generating JWT
	const JWT = generateJWT(user._id.toString());

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
	const response: AuthLogin['response'] = {
		message: 'Login succeeded',
		data: {
			access: JWT.access,
			user: {
				_id: user._id.toString(),
				name: user.name,
				email: user.email,
				role: user.role
			}
		}
	};

	res.status(200).json(response).end();
}

export { authLogin };
