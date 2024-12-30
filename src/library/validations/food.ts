import type { Schema } from 'express-validator';

const createSchema: Schema = {
	name: {
		isString: true,
		notEmpty: { errorMessage: 'Name is required' }
	},
	price: {
		isNumeric: true,
		notEmpty: { errorMessage: 'Price is required' }
	},
	image: {
		isString: true,
		notEmpty: { errorMessage: 'Image is required' }
	},
	category: {
		isString: true,
		optional: true
	}
};

const updateSchema: Schema = {
	name: {
		isString: true,
		notEmpty: { errorMessage: 'Name is required' }
	},
	price: {
		isNumeric: true,
		notEmpty: { errorMessage: 'Price is required' }
	},
	image: {
		isString: true,
		notEmpty: { errorMessage: 'Image is required' }
	},
	category: {
		isString: true,
		optional: true
	}
};

export { createSchema, updateSchema };
