import { test as base } from '@playwright/test';
import { TodayPage } from '../page-objects/todayPage';
import { AuthPage } from '../page-objects/authPage';
import { IUser } from '../types';
//import { InboxPage } from '';

type MyFixture = {
    authPage: AuthPage
    todayPage: TodayPage;
    //inboxPage: InboxPage;
};

export const test = base.extend<MyFixture>({

    authPage: async ({page}, use) => {
        const authPage = new AuthPage(page);
        await authPage.goto();
        await use(authPage)
    },

    todayPage: async ({authPage}, use)=> {
        const user: IUser = {
            name: process.env.USER_NAME,
            email: process.env.EMAIL,
            password: process.env.PASSWORD
        }
        const todayPage = await authPage.login(user);
        await use(todayPage);
    }
});

export { expect } from '@playwright/test';
