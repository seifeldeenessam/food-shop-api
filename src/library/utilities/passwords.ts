import { compare, genSalt, hash } from 'bcrypt';

export const hashPassword = async (password: string): Promise<string> => {
	const saltRounds = 10;
	const salt = await genSalt(saltRounds);
	const hashed = await hash(password, salt);

	return hashed;
};

export const comparePasswords = async (payloadPassword: string, hashedPassword: string): Promise<boolean> => {
	const isValid = await compare(payloadPassword, hashedPassword);

	return isValid;
};
