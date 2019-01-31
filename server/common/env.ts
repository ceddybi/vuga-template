import dotenv from 'dotenv';
dotenv.config();

// Defaultify default env here
// So that we can run tests without errors
// All env imports come from here

export const NODE_ENV = process.env.NODE_ENV || 'develop';
export const APP_ID = process.env.APP_ID || 'cache';
export const PORT = process.env.PORT || 3001;
export const HOST_URL = process.env.HOST_URL || 'http://localhost:3001';
export const LOG_LEVEL = process.env.LOG_LEVEL || 'debug';
export const REQUEST_LIMIT = process.env.REQUEST_LIMIT || '100kb';
export const SESSION_SECRET = process.env.SESSION_SECRET || 'mySecret';

// Swagger
export const SWAGGER_API_SPEC = process.env.SWAGGER_API_SPEC || '/spec';

// Redis server
export const REDIS_IP = process.env.REDIS_IP || 'localhost';
export const REDIS_PASS = process.env.REDIS_PASS || '';

// Mongo
export const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27021/typescript_mongoose";
