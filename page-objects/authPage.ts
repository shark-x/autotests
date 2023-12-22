import { Locator, type Page } from '@playwright/test';
import { BasePage, IPage, PageName, PagePath } from './basePage'
import { TodayPage } from './todayPage';

export class AuthPage extends BasePage implements IAuthPage{

   readonly page: Page;
   readonly emailInput: Locator;
   readonly passwordInput: Locator;
   readonly loginButton: Locator;

   constructor (page:Page) {
      super(page, PageName.Auth, PagePath.Auth);
      this.page = page;
      this.emailInput = this.page.locator('input#element-0[type=\'email\']');
      this.passwordInput = this.page.locator('input#element-3[type=\'password\']');
      this.loginButton = this.page.locator('button[type=\'submit\']');
   }

   async login (email: string, password: string) {
      await this.emailInput.fill(email);
      await this.passwordInput.fill(password);
      await this.loginButton.click();
      await this.page.waitForURL(`**${PagePath.Today}`);
      return new TodayPage(this.page);
   }
}

interface IAuthPage extends IPage {
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;

    login(email: string, password: string): Promise<TodayPage>
}
