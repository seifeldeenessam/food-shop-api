import { Endpoints } from '@/library/enums';
import { loginSchema } from '@/library/validations/auth';
import { authLogin } from '@/services/auth/login';
import { authLogout } from '@/services/auth/logout';
import type { Router } from 'express';
import { checkSchema } from 'express-validator';

export default (router: Router) => {
	router.post(Endpoints.AUTH_LOGIN, checkSchema(loginSchema), authLogin);
	router.post(Endpoints.AUTH_LOGOUT, authLogout);
};
