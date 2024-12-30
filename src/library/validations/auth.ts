import { Schema } from 'express-validator';

const loginSchema: Schema = {
	email: {
		isString: true,
		isEmail: true,
		notEmpty: { errorMessage: 'Email is required' }
	},
	password: {
		isString: true,
		notEmpty: { errorMessage: 'Password is required' }
	}
};

export { loginSchema };
