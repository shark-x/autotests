import { expect, test } from '@playwright/test';
import { AuthPage } from '../page-objects/authPage';
import { TodayPage } from '../page-objects/todayPage';
import { IUser, ITask } from '../types';

const user: IUser = {
   email: process.env.EMAIL,
   password: process.env.PASSWORD
};

const task: ITask = {
   name: 'Test task name - create',
   description: 'Some description'
};

test('Create simple task', async ({ page}) => {
   const authPage = new AuthPage(page);
   await authPage.goto();
   await authPage.login(user);

   const todayPage = new TodayPage(page);
   const tasksListBefore = await todayPage.getTasksList();

   await todayPage.addTask(task);

   const tasksListAfter = await todayPage.getTasksList();
   expect(tasksListAfter.total).toBe(tasksListBefore.total+1);

   const lastTask = tasksListAfter.items[tasksListAfter.total-1];
   expect(lastTask.name).toBe(task.name);
});
