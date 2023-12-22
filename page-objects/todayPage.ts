import { Locator, type Page } from '@playwright/test';
import { BasePage, IPage, PageName, PagePath } from './basePage'
import { TaskEditor } from './taskEditor';

export class TodayPage extends BasePage implements ITodayPage {

   readonly page: Page;
   readonly title: Locator;
   readonly emptyState: Locator;
   readonly addTaskButton: Locator;
   readonly taskEditorLocator: Locator;
   readonly taskEditor: TaskEditor;
   public isTaskPresent: (taskName:string) => Promise<boolean>;

   constructor (page:Page) {
      super(page, PageName.Today, PagePath.Today);
      this.page = page;
      this.title = this.page.locator('#agenda_view h1');
      this.emptyState = this.page.locator('.empty-state-header');
      this.addTaskButton = this.page.locator('.icon_add');
      this.taskEditorLocator = this.page.locator('form.task_editor');
      this.taskEditor = new TaskEditor(this.taskEditorLocator);
      this.isTaskPresent = (taskName:string): Promise<boolean> => {
         return this.page.locator('.task_content', { hasText: taskName }).isVisible()
      };
   }

   async goto (){
      await super.goto();
   }

   async isOpen (){
      return await super.isOpen();
   }

   async addTask (name:string, description:string){
      await this.goto();
      await this.addTaskButton.click();
      await this.taskEditorLocator.waitFor();
      await this.taskEditor.addTask(name, description);
   }

}

interface ITodayPage extends IPage {
    readonly page: Page;
    readonly title: Locator;
    readonly emptyState: Locator;
    readonly addTaskButton: Locator;
    readonly taskEditorLocator: Locator;
    readonly taskEditor: TaskEditor;
    isTaskPresent: (taskName:string) => Promise<boolean>;

    addTask(name:string, description:string) : Promise<void>;
}
