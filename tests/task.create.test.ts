import { expect, test } from '../fixtures/setup';
import { ITask } from '../types';
import { DataGenerator } from '../utils/dataGenerator';

test('Create simple task', async ({ todayPage}) => {
   const tasksListBefore = await todayPage.getTasksList();

   const task: ITask = DataGenerator.getRandomTask();
   await todayPage.addTask(task);

   const tasksListAfter = await todayPage.getTasksList();
   expect(tasksListAfter.total).toBe(tasksListBefore.total+1);

   const lastTask = tasksListAfter.items[tasksListAfter.total-1];
   expect(lastTask.name).toBe(task.name);
});
