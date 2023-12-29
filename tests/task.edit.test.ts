import { expect, test } from '../fixtures/setup';
import { ITask } from '../types';
import { DataGenerator } from '../utils/dataGenerator';

test('Edit the task', async ({ todayPage }) => {
   const task: ITask = DataGenerator.getRandomTask();
   await todayPage.addTask(task);

   const tasksListBefore = await todayPage.getTasksList();
   const lastTask = tasksListBefore.items[tasksListBefore.total-1];
   expect(tasksListBefore.items).toContain(lastTask);

   const newTask: ITask = DataGenerator.getRandomTask();
   newTask.id = lastTask.id;
   await todayPage.editTask(newTask);

   const taskInfo = await todayPage.getTask(lastTask);
   expect(taskInfo.id).toBe(lastTask.id);
   expect(taskInfo.name).toBe(newTask.name);
   expect(taskInfo.description).toBe(newTask.description);
});
