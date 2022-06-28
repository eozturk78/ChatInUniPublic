import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ResetPasswordComponent} from './reset-password.component';
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    ResetPasswordComponent
  ],
  imports: [
    RouterModule.forChild([{
      path: '',
      pathMatch: 'full',
      component: ResetPasswordComponent
    }]),
    CommonModule,
    FormsModule,
    TranslateModule
  ]
})
export class ResetPasswordModule {
}
