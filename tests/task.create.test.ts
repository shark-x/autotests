import {expect, test} from '@playwright/test';
import { AuthPage } from '../page-objects/authPage';
import { TodayPage } from '../page-objects/todayPage';

const taskName = 'Test task name';
const taskDescription = 'Some description';

test('Create simple task', async ({ page}) => {
   const authPage = new AuthPage(page);
   await authPage.goto();
   await authPage.login(process.env.EMAIL, process.env.PASSWORD);

   const todayPage = new TodayPage(page);
   await todayPage.addTask(taskName, taskDescription);
   expect(await todayPage.isTaskPresent(taskName)).toBeTruthy();
});
