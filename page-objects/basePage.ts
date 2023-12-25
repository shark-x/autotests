import { type Locator, type Page } from '@playwright/test'
import { Sidebar } from './sidebar';

export enum PageName {
    Auth = 'Sign in to your Todoist account',
    Today = 'Today – Todoist',
    Base = '',
};

export enum PagePath {
    Auth = '/auth/login',
    Today = '/app/today',
    Base = '/app',
}

export class BasePage implements IPage {

   readonly page: Page;
   readonly name: PageName;
   readonly path: PagePath;
   readonly header: Locator;
   readonly sidebar: Sidebar;

   constructor (page:Page, name:PageName, path:PagePath=PagePath.Base) {
      this.page = page;
      this.name = name;
      this.path = path;
      this.header = this.page.locator('[data-testid=\'view_header\']');
      this.sidebar = new Sidebar(this.page.locator('[data-testid=\'app-sidebar-container\']'));
   }

   async goto () {
      if(!await this.isOpen()){
         await this.page.goto(this.path);
      }
   }

   async isOpen () {
      return this.name === await this.page.title()
   }
}

export interface IPage {
    readonly page: Page;
    readonly name: PageName;
    readonly path: PagePath;

    goto(): Promise<void>;
    isOpen(): Promise<boolean>;
}
