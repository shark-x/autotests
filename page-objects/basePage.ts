import { type Page } from '@playwright/test'
import { Sidebar } from './sidebar';

export enum PageName {
    Auth = 'Sign in to your Todoist account',
    Today = 'Today',
    Base = ''
}

export enum PagePath {
    Auth = '/auth/login',
    Today = '/app/today',
    Base = '/app',
}


export class BasePage implements IPage {

   readonly page: Page;
   readonly name: PageName;
   readonly path: PagePath;

   readonly sidebar: Sidebar;

   constructor (page:Page, name:PageName, path:PagePath=PagePath.Base) {
      this.page = page;
      this.name = name;
      this.path = path;
      this.sidebar = new Sidebar(this.page.locator('[data-testid=\'app-sidebar-container\']'))
   }

   async goto () {
      if(!await this.isOpen()){
         await this.page.goto(this.path);
      }
   }

   async isOpen () {
      return this.page.locator('.main-header', {hasText: this.name}).isVisible();
   }
}

export interface IPage {
    readonly page: Page;
    readonly name: PageName;
    readonly path: PagePath;

    goto(): Promise<void>;
    isOpen(): Promise<boolean>;
}
