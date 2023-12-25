import { type Locator } from '@playwright/test';

export class MoreActionsComponent implements IMoreActionsComponent {
   readonly moreActions:Locator;
   readonly editButton: Locator;
   readonly goToProject: Locator;
   readonly moveToButton: Locator;
   readonly duplicate: Locator;
   readonly copyToLinkTask: Locator;
   // readonly addExtensions: Locator;
   readonly deleteButton: Locator;

   constructor (locator:Locator) {
      this.moreActions = locator;
      this.editButton = this.moreActions.getByRole('menuitem', {name: 'Edit'});
      this.goToProject = this.moreActions.getByRole('menuitem', {name: 'Go to project'});
      // this.dueDateSetting = new DueDateSetting();
      // this.prioritySetting = new PrioritySetting();
      // this.remindersSetting = new RemindersSetting();
      this.moveToButton = this.moreActions.getByRole('menuitem', {name: 'Move to'});
      this.duplicate = this.moreActions.getByRole('menuitem', {name: 'Duplicate'});
      this.copyToLinkTask = this.moreActions.getByRole('menuitem', {name: 'Copy to link task'});
      // this.addExtensions = this.moreActions.getByRole('menuitem', {name: 'Add extensions'} );
      this.deleteButton = this.moreActions.getByRole('menuitem', {name: 'Delete'})
   }

   async delete () {
      await this.deleteButton.click();
   }
}

interface IMoreActionsComponent {
   readonly moreActions:Locator;
   readonly editButton: Locator;
   readonly goToProject: Locator;
   readonly moveToButton: Locator;
   readonly duplicate: Locator;
   readonly copyToLinkTask: Locator;
   // readonly addExtensions: Locator;
   readonly deleteButton: Locator;
}
