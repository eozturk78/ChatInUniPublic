import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MenuComponent } from './views/menu/menu.component';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalModule } from 'ngb-modal';
import { MdlForgotPasswordComponent } from './views/modal/mdl-forgot-password/mdl-forgot-password.component';
import { AlertComponentComponent } from './views/tpls/alert-component/alert-component.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Consts } from './models/consts/consts';
import { FooterComponent } from './views/tpls/footer/footer.component';
import { MdlComplaintUserComponent } from './views/modal/mdl-complaint-user/mdl-complaint-user.component';
import { MdlProfilePhotoComponent } from './views/modal/mdl-profile-photo/mdl-profile-photo.component';
import { MatMenuModule } from '@angular/material/menu';
@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    AlertComponentComponent,
    MdlForgotPasswordComponent,
    FooterComponent,
    MdlComplaintUserComponent,
    MdlProfilePhotoComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      isolate: true,
    }),
    NgbModule,
    ModalModule.forRoot(),
    BrowserAnimationsModule,
    MatIconModule,
    MatMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {}

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(
    http,
    Consts.protocol + Consts.apiPath + Consts.resourcesFolder,
    '.json'
  );
}
