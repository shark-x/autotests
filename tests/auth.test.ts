import { expect, test } from '@playwright/test';
import { AuthPage } from '../page-objects/authPage';
import { IUser } from '../types';

const user: IUser = {
   name: process.env.USER_NAME,
   email: process.env.EMAIL,
   password: process.env.PASSWORD
}

test('Success login', async ({ page}) => {
   const authPage = new AuthPage(page);
   await authPage.goto();
   const todayPage = await authPage.login(user);
   expect(await todayPage.sidebar.getAccountName()).toBe(user.name)
});
