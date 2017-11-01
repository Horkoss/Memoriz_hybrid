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

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    MenuPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    MenuPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ApiRequestProvider,
    Toast
  ]
})
export class AppModule {}
