import {type Locator} from '@playwright/test';

export class TaskEditor implements ITaskEditor {

   readonly taskEditor: Locator;
   readonly taskNameInput: Locator;
   readonly descriptionInput: Locator;
   readonly dueDate: Locator;
   readonly priority: Locator;
   readonly reminders: Locator;
   readonly moreActionsButton: Locator;
   readonly selectProject: Locator;
   readonly cancel: Locator;
   readonly addTaskButton: Locator;

   constructor (locator:Locator) {
      this.taskEditor = locator
      this.taskNameInput = this.taskEditor.locator('[aria-label=\'Task name\']');
      this.descriptionInput = this.taskEditor.locator('[aria-label=\'Description\']');
      this.dueDate = this.taskEditor.locator('[aria-label=\'Set due date\']');
      this.priority = this.taskEditor.locator('[aria-label=\'Set priority\']');
      this.reminders = this.taskEditor.locator('[aria-label=\'Add reminders\']');
      this.moreActionsButton = this.taskEditor.locator('[aria-label=\'More actions\']');
      this.selectProject = this.taskEditor.locator('[aria-label=\'Select a project\']')
      this.cancel = this.taskEditor.locator('[aria-label=\'Cancel\']')
      this.addTaskButton = this.taskEditor.locator('[data-testid=\'task-editor-submit-button\']');
   }

   async addTask (name:string, description:string) {
      await this.taskNameInput.fill(name);
      await this.descriptionInput.fill(description);
      await this.addTaskButton.click();

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
    readonly cancel: Locator;
    readonly addTaskButton: Locator;

    addTask(name:string, description:string): Promise<void>;
}
