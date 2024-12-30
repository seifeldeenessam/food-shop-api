import { Endpoints } from '@/library/enums';
import { createSchema, updateSchema } from '@/library/validations/category';
import { categoryCreate } from '@/services/categories/create';
import { categoriesDelete } from '@/services/categories/delete';
import { categoriesRead } from '@/services/categories/read';
import { categoryUpdate } from '@/services/categories/update';
import type { Router } from 'express';
import { checkSchema } from 'express-validator';

export default (router: Router) => {
	router.post(Endpoints.CATEGORIES_ROOT, checkSchema(createSchema), categoryCreate);
	router.get(Endpoints.CATEGORIES_ROOT, categoriesRead);
	router.patch(`${Endpoints.CATEGORIES_ROOT}/:_id`, checkSchema(updateSchema), categoryUpdate);
	router.delete(Endpoints.CATEGORIES_ROOT, categoriesDelete);
};
