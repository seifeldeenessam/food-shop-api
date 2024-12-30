import router from '@/router';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import { isAuthenticated } from './library/utilities/middlewares';

(async () => {
	dotenv.config();
	const app = express();
	const port = process.env.PORT || 3001;

	if (!process.env.DATABASE_URL || !process.env.COOKIES_SECRET) {
		throw new Error('🚨 [index] Runtime error, check ENVs.');
	}

	try {
		await mongoose.connect(process.env.DATABASE_URL, { dbName: 'food-shop' });
		console.log('✅ Database connected');
	} catch (error: any) {
		console.error('🚨 Failed to connect to the database', error.message);
	}

	app.use(cors({ credentials: true }));
	app.use(cookieParser(process.env.COOKIES_SECRET));
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));

	app.use('/api', isAuthenticated, router());
	app.listen(port, () => console.log(`🚀 Server is ready on port ${port}`));
})();
