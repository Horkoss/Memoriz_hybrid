import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserContentPage } from './user-content';

@NgModule({
  declarations: [
    UserContentPage,
  ],
  imports: [
    IonicPageModule.forChild(UserContentPage),
  ],
})
export class UserContentPageModule {}
