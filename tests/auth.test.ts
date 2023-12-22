import { expect, test } from '@playwright/test';
import { AuthPage } from '../page-objects/authPage';

const user = {
   email: process.env.EMAIL,
   password: process.env.PASSWORD,
   username: process.env.USER_NAME
}

test('Success login', async ({ page}) => {
   const authPage = new AuthPage(page);
   await authPage.goto();
   const todayPage = await authPage.login(user.email, user.password);
   expect(await todayPage.sidebar.getAccountName()).toBe(user.username)
});
