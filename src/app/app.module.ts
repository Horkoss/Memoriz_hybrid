import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';
import { ApiRequestProvider } from '../providers/api-request/api-request';
import { LoginPage } from '../pages/login/login';
import { MenuPage } from '../pages/menu/menu';
import { Toast } from '@ionic-native/toast';
import { SuperTabsModule } from 'ionic2-super-tabs';
import { AddNewContentPage } from '../pages/add-new-content/add-new-content'
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { ImagePicker } from '@ionic-native/image-picker';
import { Network } from '@ionic-native/network';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    MenuPage,
    AddNewContentPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    SuperTabsModule.forRoot(),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    MenuPage,
    AddNewContentPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ApiRequestProvider,
    Toast,
    ImagePicker,
    FileTransfer,
    FileTransferObject,
    Network,
  ]
})
export class AppModule {}
