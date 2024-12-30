import type { Schema } from 'express-validator';

const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&_])[A-Za-z\d$@$!%*?&_]{8,32}$/;
const USER_ROLE = /\b(?:ADMIN|CUSTOMER)\b/;

const createSchema: Schema = {
	name: {
		isString: true,
		notEmpty: { errorMessage: 'Name is required' }
	},
	email: {
		isString: true,
		isEmail: true,
		notEmpty: { errorMessage: 'Email is required' }
	},
	password: {
		notEmpty: { errorMessage: 'Password is required' },
		matches: { options: PASSWORD_REGEX, errorMessage: 'Week password' }
	},
	role: {
		isString: true,
		notEmpty: { errorMessage: 'Role is required' },
		matches: { options: USER_ROLE, errorMessage: 'Invalid role' }
	}
};

const updateSchema: Schema = {
	name: {
		isString: true,
		notEmpty: { errorMessage: 'Name is required' }
	},
	email: {
		isString: true,
		isEmail: true,
		notEmpty: { errorMessage: 'Email is required' }
	},
	role: {
		isString: true,
		notEmpty: { errorMessage: 'Role is required' },
		matches: { options: USER_ROLE, errorMessage: 'Invalid role' }
	}
};

export { createSchema, updateSchema };
