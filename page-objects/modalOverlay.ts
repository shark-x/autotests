import { type Locator } from '@playwright/test';

export class ModalOverlayComponent implements IModalOverlayComponent {

   readonly modal: Locator;
   readonly header: Locator;
   readonly headerCancelButton: Locator;
   readonly body: Locator;
   readonly footerCancelButton: Locator;
   readonly footerSubmitButton: Locator;


   constructor (locator:Locator) {
      this.modal = locator;
      this.header = this.modal.locator('form > header');
      this.headerCancelButton = this.modal.locator('form > header button[aria-label=\'Cancel\']');
      this.body = this.modal.locator('form > div');
      this.footerCancelButton = this.modal.locator('form > footer [type=\'button\']');
      this.footerSubmitButton = this.modal.locator('form > footer [type=\'submit\']');
   }

   async submit (){
      await this.footerSubmitButton.click();
   }

}

interface IModalOverlayComponent {
   readonly modal: Locator;
   readonly header: Locator;
   readonly headerCancelButton: Locator;
   readonly body: Locator;
   readonly footerCancelButton: Locator;
   readonly footerSubmitButton: Locator;
}
