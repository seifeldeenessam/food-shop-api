import { Endpoints } from '@/library/enums';
import { createSchema, updateSchema } from '@/library/validations/user';
import { userCreate } from '@/services/users/create';
import { usersDelete } from '@/services/users/delete';
import { usersRead } from '@/services/users/read';
import { userUpdate } from '@/services/users/update';
import type { Router } from 'express';
import { checkSchema } from 'express-validator';

export default (router: Router) => {
	router.post(Endpoints.USERS_ROOT, checkSchema(createSchema), userCreate);
	router.get(Endpoints.USERS_ROOT, usersRead);
	router.patch(`${Endpoints.USERS_ROOT}/:_id`, checkSchema(updateSchema), userUpdate);
	router.delete(Endpoints.USERS_ROOT, usersDelete);
};
