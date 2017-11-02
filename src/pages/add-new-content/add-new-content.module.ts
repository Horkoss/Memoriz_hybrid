import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddNewContentPage } from './add-new-content';

@NgModule({
  declarations: [
    AddNewContentPage,
  ],
  imports: [
    IonicPageModule.forChild(AddNewContentPage),
  ],
})
export class AddNewContentPageModule {}
