import { type Locator } from '@playwright/test';
import { ITask } from '../types';

export class TaskEditor implements ITaskEditor {

   readonly taskEditor: Locator;
   readonly taskNameInput: Locator;
   readonly descriptionInput: Locator;
   readonly dueDate: Locator;
   readonly priority: Locator;
   readonly reminders: Locator;
   readonly moreActionsButton: Locator;
   readonly selectProject: Locator;
   readonly cancelButton: Locator;
   readonly addTaskButton: Locator;
   readonly saveButton: Locator;

   constructor (locator:Locator) {
      this.taskEditor = locator
      this.taskNameInput = this.taskEditor.locator('[aria-label=\'Task name\']');
      this.descriptionInput = this.taskEditor.locator('[aria-label=\'Description\']');
      this.dueDate = this.taskEditor.locator('[aria-label=\'Set due date\']');
      this.priority = this.taskEditor.locator('[aria-label=\'Set priority\']');
      this.reminders = this.taskEditor.locator('[aria-label=\'Add reminders\']');
      this.moreActionsButton = this.taskEditor.locator('[aria-label=\'More actions\']');
      this.selectProject = this.taskEditor.locator('[aria-label=\'Select a project\']')
      this.cancelButton = this.taskEditor.locator('[aria-label=\'Cancel\']')
      this.addTaskButton = this.taskEditor.locator('[data-testid=\'task-editor-submit-button\']');
      this.saveButton = this.addTaskButton;
   }

   async fillFields(task:ITask) {
       await this.taskNameInput.fill(task.name);
       await this.descriptionInput.fill(task.description);
   }

   async addTask (task:ITask) {
      await this.fillFields(task);
      await this.addTaskButton.click();
      await this.cancelButton.click();
      await this.taskEditor.waitFor({state: 'hidden'})
   }

    async editTask (task:ITask) {
        await this.fillFields(task);
        await this.saveButton.click();
        await this.taskEditor.waitFor({state: 'hidden'})
    }
}

interface ITaskEditor {
    readonly taskEditor: Locator;
    readonly taskNameInput: Locator;
    readonly descriptionInput: Locator;
    readonly dueDate: Locator;
    readonly priority: Locator;
    readonly reminders: Locator;
    readonly moreActionsButton: Locator;
    readonly selectProject: Locator;
    readonly cancelButton: Locator;
    readonly addTaskButton: Locator;

    addTask(task:ITask): Promise<void>;
}
