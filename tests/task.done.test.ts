import { expect, test } from '../fixtures/setup';
import { ITask } from '../types';
import { DataGenerator } from '../utils/dataGenerator';

test('Done a task', async ({ todayPage}) => {
   const task: ITask = DataGenerator.getRandomTask();
   await todayPage.addTask(task);

   const tasksListBefore = await todayPage.getTasksList();
   const lastTask = tasksListBefore.items[tasksListBefore.total-1];
   expect(tasksListBefore.items).toContain(lastTask);

   await todayPage.doneTask(lastTask);

   const tasksListAfter = await todayPage.getTasksList();
   expect(tasksListAfter.total).toBe(tasksListBefore.total-1);
   expect(tasksListAfter.items).not.toContainEqual(lastTask);
});
