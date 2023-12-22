import {type Locator} from '@playwright/test';

export class Sidebar implements ISidebar{

   readonly sidebar: Locator;
   readonly sidebarButton: Locator;
   readonly settings: Locator;
   readonly notifications: Locator;
   readonly addTask: Locator;
   readonly search: Locator;
   readonly inbox: Locator;
   readonly today: Locator;
   readonly upcoming: Locator;
   readonly filtersLabels: Locator;
   readonly myProject: Locator;
   readonly addTeam: Locator;

   constructor (locator:Locator) {
      this.sidebar = locator
      this.sidebarButton = this.sidebar.locator('button[aria-controls=\'sidebar\']');
      this.settings = this.sidebar.locator('[aria-label=\'Settings\']');
      this.notifications = this.sidebar.locator('a[aria-label=\'Notifications\']');
      this.addTask = this.sidebar.locator('span', { hasText: 'Add task' })
      this.search = this.sidebar.locator('span', { hasText: 'Search' });
      this.inbox = this.sidebar.locator('#filter_inbox');
      this.today = this.sidebar.locator('#filter_today');
      this.upcoming = this.sidebar.locator('#filter_upcoming');
      this.filtersLabels = this.sidebar.locator('#filters_labels');
      this.myProject = this.sidebar.locator('div[data-expansion-panel-header]');
      this.addTeam = this.sidebar.locator('span', { hasText: 'Add Team' });
   }

   async expand () {
      if(!await this.sidebarButton.getAttribute('aria-expanded')) {
         await this.sidebarButton.click()
      }
   }

   async collapse (){
      if(await this.sidebarButton.getAttribute('aria-expanded')) {
         await this.sidebarButton.click()
      }
   }

   async getAccountName (): Promise<string>{
      await this.expand();
      return await this.settings.textContent();
   }
}

interface ISidebar {
    readonly sidebar: Locator;
    readonly sidebarButton: Locator;
    readonly settings: Locator;
    readonly notifications: Locator;
    readonly addTask: Locator;
    readonly search: Locator;
    readonly inbox: Locator;
    readonly today: Locator;
    readonly upcoming: Locator;
    readonly filtersLabels: Locator;
    readonly myProject: Locator;
    readonly addTeam: Locator;

    expand(): Promise<void>;
    collapse(): Promise<void>;
    getAccountName(): Promise<string>;
}
