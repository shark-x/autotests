import { type Locator, type Page } from '@playwright/test';
import { BasePage, IPage, PAGE_NAME, PAGE_PATH } from './basePage'
import { TodayPage } from './todayPage';
import { IUser } from '../types';

export class AuthPage extends BasePage implements IAuthPage{

   readonly page: Page;
   readonly emailInput: Locator;
   readonly passwordInput: Locator;
   readonly loginButton: Locator;

   constructor (page:Page) {
      super(page, PAGE_NAME.AUTH, PAGE_PATH.AUTH);
      this.page = page;
      this.emailInput = this.page.locator('input#element-0[type=\'email\']');
      this.passwordInput = this.page.locator('input#element-3[type=\'password\']');
      this.loginButton = this.page.locator('button[type=\'submit\']');
   }

   async login (user:IUser) {
      await this.emailInput.fill(user.email);
      await this.passwordInput.fill(user.password);
      await this.loginButton.click();
      await this.page.waitForURL(`**${PAGE_PATH.TODAY}`);
      return new TodayPage(this.page);
   }
}

interface IAuthPage extends IPage {
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;

    login (user:IUser): Promise<TodayPage>
}
