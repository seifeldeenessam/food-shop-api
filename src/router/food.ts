import { Endpoints } from '@/library/enums';
import { createSchema, updateSchema } from '@/library/validations/food';
import { foodCreate } from '@/services/food/create';
import { foodDelete } from '@/services/food/delete';
import { foodsRead } from '@/services/food/read';
import { foodUpdate } from '@/services/food/update';
import type { Router } from 'express';
import { checkSchema } from 'express-validator';

export default (router: Router) => {
	router.post(Endpoints.FOOD_ROOT, checkSchema(createSchema), foodCreate);
	router.get(Endpoints.FOOD_ROOT, foodsRead);
	router.patch(`${Endpoints.FOOD_ROOT}/:_id`, checkSchema(updateSchema), foodUpdate);
	router.delete(Endpoints.FOOD_ROOT, foodDelete);
};
