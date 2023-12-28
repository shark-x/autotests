import { type Locator } from '@playwright/test';
import { ITask, ITasksList, PRIORITY, IProject } from '../types';

export class TasksListComponent implements ITasksListComponent {

   readonly tasksList: Locator;
   readonly tasksListItemLocator: Locator;
   readonly taskLocatorById: (task:Pick<ITask, 'id'>) => Locator;
   readonly item: (locator: Locator) => TasksListItemComponent;

   constructor (locator:Locator) {
      this.tasksList = locator;
      this.tasksListItemLocator = this.tasksList.locator('[data-item-index] li');
      this.taskLocatorById = (task:Pick<ITask, 'id'>): Locator => {
         return this.tasksList.locator(`[data-item-index] li[data-item-id='${task?.id}']`)
      };
      this.item = (locator:Locator): TasksListItemComponent => { return new TasksListItemComponent(locator) };
   }

   async get (): Promise<ITasksList> {
      const itemsLocators = await this.tasksListItemLocator.all();
      const tasksList : ITasksList = { items:[], total:0 };
      for (const itemLocator of itemsLocators) {
         const item = this.item(itemLocator);
         const task = await item.get();
         tasksList.items.push(task);
         tasksList.total++;
      }
      return tasksList
   }

   async openMoreActionsModalOfTask (task:Pick<ITask, 'id'>){
      const item = this.item(this.taskLocatorById(task));
      await item.openMoreActionsModal();
   }
}

interface ITasksListComponent {
    readonly tasksList: Locator;
    readonly tasksListItemLocator: Locator;
    readonly item: (locator: Locator) => TasksListItemComponent;
    readonly taskLocatorById: (taskId:Pick<ITask, 'id'>) => Locator;

    get(): Promise<ITasksList>
}

export class TasksListItemComponent implements ITasksListItemComponent{

   readonly task: Locator;
   readonly dragTo: Locator;
   readonly checkbox: Locator;
   readonly content: Locator;
   readonly description: Locator;
   readonly label: Locator;
   readonly dueDate: Locator;
   readonly project: Locator;
   readonly actionsPanel: Locator;
   readonly editButton: Locator;
   readonly dueDateButton: Locator;
   readonly commentLink: Locator;
   readonly moreActionsButton: Locator;

   constructor (locator:Locator) {
      this.task = locator
      this.dragTo = this.task.locator('[data-testid="task_list_item__drag_handle"]');
      this.checkbox = this.task.getByRole('checkbox');
      this.content = this.task.locator('.task_content');
      this.description = this.task.locator('.task_content');
      this.label = this.task.locator('.simple_content');
      this.dueDate = this.task.locator('span.date');
      this.project = this.task.locator('.task_list_item__project__label');
      this.actionsPanel = this.task.locator('.task_list_item__actions');
      this.editButton = this.task.locator('button[aria-label=\'Edit\']');
      this.dueDateButton = this.task.locator('button[aria-label=\'Due date\']');
      this.commentLink = this.task.locator('a[aria-label=\'Comment\']');
      // Work on Task Item Component level!
      this.moreActionsButton = this.task.locator('[aria-label=\'More task actions\']');
   }

   async get (): Promise<ITask> {
      const id = await this.task.isVisible() ? await this.task.getAttribute('data-item-id') : null;
      const content = await this.content.isVisible() ? await this.content.textContent() : null;
      const description = await this.description.isVisible() ? await this.description.textContent() : null;
      const label = await this.label.isVisible() ? await this.label.textContent(): null;
      const priority = await this.getPriority();
      const dueDate = await this.dueDateButton.isVisible() ? await this.dueDateButton.textContent(): null;
      const project : IProject = { name: await this.project.textContent() };
      // const reminders; // not available in free version
      // const location; // not available in free version
      return {
         id: id,
         name: content,
         description: description,
         label: label,
         dueDate: dueDate,
         priority: priority,
         project: project,
      }
   }

   private async getPriority (): Promise<PRIORITY> {
      const checkboxClass = await this.checkbox.isVisible() ? await this.checkbox.getAttribute('class') : '';
      const match = checkboxClass.match(/priority_\d+/);
      if(!match){ return PRIORITY.UNKNOWN}
      switch (match[0]){
      case 'priority_1':
         return PRIORITY.HIGH
      case 'priority_2':
         return PRIORITY.MEDIUM
      case 'priority_3':
         return PRIORITY.LOW
      case 'priority_4':
         return PRIORITY.LOWEST
      default:
         return PRIORITY.UNKNOWN
      }
   }

   async done(){
      await this.checkbox.click();
   }

   async openMoreActionsModal (){
      await this.actionsPanel.hover();
      await this.moreActionsButton.click();
   }
}

interface ITasksListItemComponent {
   readonly task: Locator;
   readonly dragTo: Locator;
   readonly checkbox: Locator;
   readonly content: Locator;
   readonly description: Locator;
   readonly label: Locator;
   readonly dueDate: Locator;
   readonly project: Locator;
   readonly actionsPanel: Locator;
   readonly editButton: Locator;
   readonly dueDateButton: Locator;
   readonly commentLink: Locator;
   readonly moreActionsButton: Locator;

   get(): Promise<ITask>;
   done(): Promise<void>;
   openMoreActionsModal (): Promise<void>;
}
