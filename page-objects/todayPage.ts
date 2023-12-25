import { type Locator, type Page } from '@playwright/test';
import { BasePage, IPage, PageName, PagePath } from './basePage'
import { TaskEditor } from './taskEditor';
import {ITask, ITasksList, VIEW} from '../types';
import { TasksListComponent } from './tasksList';
import { MoreActionsComponent } from './moreActions';
import { ModalOverlayComponent } from './modalOverlay';

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
   readonly modalOverlayLocator: Locator;
   readonly modalOverlay: ModalOverlayComponent;

   constructor (page:Page) {
      super(page, PageName.Today, PagePath.Today);
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
      this.modalOverlayLocator = this.page.locator('[data-testid=\'modal-overlay\']');
      this.modalOverlay = new ModalOverlayComponent(this.modalOverlayLocator);
   }

   async goto (){
      await super.goto();
   }

   async isOpen (){
      return await super.isOpen();
   }

   async addTask (task:ITask, breakNextTaskCreation:boolean=true){
      await this.goto();
      await this.addTaskButton.click();
      await this.taskEditorLocator.waitFor();
      await this.taskEditor.addTask(task, breakNextTaskCreation);
   }

   async getTasksList () {
      await this.goto();
      if (await this.emptyState.isVisible()) {
         return {items:[], total:0}
      }
      return await this.tasksList.get();
   }

   async deleteTask (task:Pick<ITask, 'id'>) {
      await this.goto();
      if(await this.moreActionsComponentLocator.isVisible()){
         await this.header.click();
      }
      await this.tasksList.openMoreActionsModalOfTask(task);
      await this.moreActionsComponent.delete();
      //await this.modalOverlay.submit();
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
   readonly modalOverlayLocator: Locator;
   readonly modalOverlay: ModalOverlayComponent;

   addTask(task:ITask) : Promise<void>;
   getTasksList () : Promise<ITasksList>;
   deleteTask (task:Pick<ITask, 'id'>) : Promise<void>;
}
