import { type Locator, type Page } from '@playwright/test';
import { BasePage, IPage, PAGE_NAME, PAGE_PATH, ALERT_MESSAGE } from './basePage'
import { TaskEditor } from './taskEditor';
import {ITask, ITasksList, VIEW} from '../types';
import { TasksListComponent } from './tasksList';
import { MoreActionsComponent } from './moreActions';

export class TodayPage extends BasePage implements ITodayPage {

   readonly page: Page;
   readonly view: VIEW;
   readonly title: Locator;
   readonly emptyState: Locator;
   readonly addTaskButton: Locator;
   readonly taskEditorLocator: Locator;
   readonly taskEditor: TaskEditor;
   readonly tasksListLocator : Locator;
   readonly tasksList: TasksListComponent;
   readonly moreActionsComponentLocator: Locator;
   readonly moreActionsComponent: MoreActionsComponent

   constructor (page:Page) {
      super(page, PAGE_NAME.TODAY, PAGE_PATH.TODAY);
      this.page = page;
      this.view = VIEW.LIST
      this.title = this.page.locator('#agenda_view h1');
      this.emptyState = this.page.locator('.empty-state-header');
      this.addTaskButton = this.page.locator('.icon_add');
      this.taskEditorLocator = this.page.locator('form.task_editor');
      this.taskEditor = new TaskEditor(this.taskEditorLocator);
      this.tasksListLocator = this.page.locator('[data-test-id="virtuoso-item-list"]')
      this.tasksList = new TasksListComponent(this.tasksListLocator)

      // Work on Page Level, not on Task Item Component level!
      this.moreActionsComponentLocator = this.page.locator('[aria-label=\'task edit menu\']');
      this.moreActionsComponent = new MoreActionsComponent(this.moreActionsComponentLocator);
   }

   async goto (){
      await super.goto();
   }

   async isOpen (){
      return await super.isOpen();
   }

   async addTask (task:ITask){
      await this.goto();
      await this.addTaskButton.click();
      await this.taskEditorLocator.waitFor();
      await this.taskEditor.addTask(task);
   }

   async editTask (task:ITask) {
      await this.goto();
      const taskElement =  this.tasksList.getTaskElement(task);
      await taskElement.edit();
      await this.taskEditorLocator.waitFor();
      await this.taskEditor.editTask(task);
   }

   async getTask(task:Pick<ITask, 'id'>): Promise<ITask> {
      await this.goto();
      const taskElement =  this.tasksList.getTaskElement(task);
      return await taskElement.get();
   }

   async doneTask(task:Pick<ITask, 'id'>): Promise<void> {
      await this.goto();
      const taskElement =  this.tasksList.getTaskElement(task);
      await taskElement.done();
      await this.alert(ALERT_MESSAGE.TASK_COMPLETED).waitFor();
   }

   async deleteTask (task:Pick<ITask, 'id'>) {
      await this.goto();
      if(await this.moreActionsComponentLocator.isVisible()){
         await this.header.click();
      }
      await this.tasksList.openMoreActionsModalOfTask(task);
      await this.moreActionsComponent.delete();
      await this.modalOverlay.submit();
   }

   async getTasksList () {
      await this.goto();
      if (await this.emptyState.isVisible()) {
         return {items:[], total:0}
      }
      return await this.tasksList.get();
   }
}

interface ITodayPage extends IPage {
   readonly page: Page;
   readonly view: VIEW;
   readonly title: Locator;
   readonly emptyState: Locator;
   readonly addTaskButton: Locator;
   readonly taskEditorLocator: Locator;
   readonly taskEditor: TaskEditor;
   readonly tasksListLocator : Locator;
   readonly tasksList: TasksListComponent;
   readonly moreActionsComponentLocator: Locator;
   readonly moreActionsComponent: MoreActionsComponent

   addTask(task:ITask):  Promise<void>;
   editTask (task:ITask): Promise<void>;
   getTask (task:Pick<ITask, 'id'>): Promise<ITask>;
   doneTask(task:Pick<ITask, 'id'>): Promise<void>;
   deleteTask (task:Pick<ITask, 'id'>): Promise<void>;

   getTasksList () : Promise<ITasksList>;
}
