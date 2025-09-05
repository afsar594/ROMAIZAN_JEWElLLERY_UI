import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
// Application Components
import { AppComponent } from './app.component';
import { AppMenuComponent } from './layout/menu/component/app.menu.component';
import { AppMenuitemComponent } from './layout/menu/component/app.menuitem.component';
import { AppTopBarComponent } from './layout/topbar/app.topbar.component';
import { AppFooterComponent } from './layout/footer/app.footer.component';
import { MenuService } from './layout/menu/service/app.menu.service';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { RoutesModule } from './routes/routes.module';
import { RouterModule } from '@angular/router';
import { DefaultInterceptor } from './core/interceptors/default.interceptor';
import { TranslaterComponent } from './layout/topbar/translate/translate.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MessageService } from 'primeng/api';
// import { MessageService } from 'primeng';


// Application services

export function TranslateHttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  imports: [
    BrowserModule,
    SharedModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CoreModule,
    RouterModule,
    RoutesModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: TranslateHttpLoaderFactory,
        deps: [HttpClient],
      },
      isolate: false
    }),
  ],
  declarations: [
    AppComponent,
    AppMenuComponent,
    AppMenuitemComponent,
    AppTopBarComponent,
    AppFooterComponent,
    TranslaterComponent,
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    MenuService, TranslaterComponent,
    MessageService
  ],
  exports: [TranslateModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
