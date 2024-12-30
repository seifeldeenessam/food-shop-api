import type { BadResponse } from '@/library/types/response';
import type { NextFunction, Request, Response } from 'express';
import { verifyJWT } from './jwt';

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
	if (req.url === '/auth/login' || (req.url === '/users' && req.method === 'POST') || (process.env.MODE === 'DEV' && req.headers.authorization === 'pass')) {
		next();
		return;
	}

	const bearer = req.headers.authorization;
	if (!bearer) return res.status(403).send({ error: 'Unauthorized', code: '19ae8460-d8fd-568b-aaef-0bba8321161b', message: 'Action refused' } as BadResponse);

	const splittedToken = bearer.split(' ');
	if (splittedToken[0] !== 'Bearer') return res.status(403).send({ error: 'Invalid token', code: '52ecdd03-c2d1-5de9-881b-fdca1cfb784d', message: 'Action refused' } as BadResponse);

	const isTokenValid = verifyJWT(splittedToken[1]);
	if (!isTokenValid) return res.status(403).send({ error: 'Invalid token', code: '11fd894e-3afd-5c0f-860f-be5ad395ea86', message: 'Action refused' } as BadResponse);

	next();
};
