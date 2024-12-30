import type { Schema } from 'express-validator';

const createSchema: Schema = {
	name: {
		isString: true,
		notEmpty: { errorMessage: 'Name is required' }
	}
};

const updateSchema: Schema = {
	name: {
		isString: true,
		notEmpty: { errorMessage: 'Name is required' }
	}
};

export { createSchema, updateSchema };
