import type { Request } from 'express';
import type { Result, ValidationError } from 'express-validator';
import { validationResult } from 'express-validator';

export const handleValidationErrors = (req: Request) => {
	const errors: Result = validationResult(req);
	const errorMessages: ValidationError[] = errors.array();
	return errorMessages;
};
