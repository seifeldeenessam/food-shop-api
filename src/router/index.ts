import { Router } from 'express';
import authRouter from './auth';
import categoriesRouter from './categories';
import foodRouter from './food';
import usersRouter from './users';

const router = Router();

export default (): Router => {
	authRouter(router);
	usersRouter(router);
	foodRouter(router);
	categoriesRouter(router);

	return router;
};
