import { expect, test } from '../fixtures/setup';
import { IUser } from '../types';

const user: IUser = {
   name: process.env.USER_NAME,
   email: process.env.EMAIL,
   password: process.env.PASSWORD
}

test('Success login', async ({ authPage}) => {
   const todayPage = await authPage.login(user);
   expect(await todayPage.sidebar.getAccountName()).toBe(user.name)
});
