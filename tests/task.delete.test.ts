import { expect, test } from '@playwright/test';
import { AuthPage } from '../page-objects/authPage';
import { TodayPage } from '../page-objects/todayPage';
import { IUser, ITask, ITasksList} from '../types';

const user: IUser = {
   email: process.env.EMAIL,
   password: process.env.PASSWORD
};

const task: ITask = {
   name: 'Test task name - delete',
   description: 'Some description'
};

let tasksList: ITasksList;

test('Delete some task', async ({ page}) => {
   const authPage = new AuthPage(page);
   await authPage.goto();
   await authPage.login(user);

   const todayPage = new TodayPage(page);
   await todayPage.addTask(task);

   tasksList = await todayPage.getTasksList();
   const lastTask = tasksList.items[tasksList.total-1];
   expect(tasksList.items).toContain(lastTask)

   await todayPage.deleteTask(lastTask);
   await todayPage.page.reload();
   tasksList = await todayPage.getTasksList();
   expect(tasksList.items).not.toContainEqual(lastTask);
});
