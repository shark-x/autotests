import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
const environment = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';
switch (environment){
case 'development':
   dotenv.config({path:path.resolve(__dirname,'.','.env')});
   break
case 'production':
   dotenv.config({path:path.resolve(__dirname,'.','.env.prod')});
   break
default:
   throw new Error('You use incorrect NODE_ENV environment. Available to use: development, production');
}

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
   use: {
      /* Base URL to use in actions like `await page.goto('/')`. */
      baseURL: process.env.BASE_URL ? process.env.BASE_URL : 'https://demoqa.com/',
   },
});
