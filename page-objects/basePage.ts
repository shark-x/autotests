import { type Locator, type Page } from '@playwright/test'
import { Sidebar } from './sidebar';

export enum PAGE_NAME {
    AUTH = 'Sign in to your Todoist account',
    TODAY = 'Today – Todoist',
    BASE = '',
}

export enum PAGE_PATH {
    AUTH = '/auth/login',
    TODAY = '/app/today',
    BASE = '/app',
}

export enum ALERT_MESSAGE {
    TASK_COMPLETED = 'task completed',
}

export class BasePage implements IPage {

   readonly page: Page;
   readonly name: PAGE_NAME;
   readonly path: PAGE_PATH;
   readonly header: Locator;
   readonly sidebar: Sidebar;
   readonly alert: (text:string) => Locator;

   constructor (page:Page, name:PAGE_NAME, path:PAGE_PATH=PAGE_PATH.BASE) {
        this.page = page;
        this.name = name;
        this.path = path;
        this.header = this.page.locator('[data-testid=\'view_header\']');
        this.sidebar = new Sidebar(this.page.locator('[data-testid=\'app-sidebar-container\']'));
        this.alert = (text:string): Locator => { return this.page.getByText(`${text}`); };
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
    readonly name: PAGE_NAME;
    readonly path: PAGE_PATH;

    goto(): Promise<void>;
    isOpen(): Promise<boolean>;
}
