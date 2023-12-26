import { expect, test } from '../fixtures/setup';
import { ITask, ITasksList} from '../types';
import { DataGenerator } from '../utils/dataGenerator';

let tasksList: ITasksList;

test('Delete some task', async ({ todayPage}) => {
   const task: ITask = DataGenerator.getRandomTask();
   await todayPage.addTask(task);

   tasksList = await todayPage.getTasksList();
   const lastTask = tasksList.items[tasksList.total-1];
   expect(tasksList.items).toContain(lastTask)

   await todayPage.deleteTask(lastTask);

   tasksList = await todayPage.getTasksList();
   expect(tasksList.items).not.toContainEqual(lastTask);
});
