import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';
import { SuperTabsModule } from 'ionic2-super-tabs';

@NgModule({
  declarations: [
    HomePage,
  ],
  imports: [
  	SuperTabsModule,
    IonicPageModule.forChild(HomePage),
  ],
})
export class HomePageModule {}
