import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { ChangePasswordComponent } from './change-password.component';
import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../tpls/shared-module';

@NgModule({
  declarations:[ChangePasswordComponent],
  imports:[
    RouterModule.forChild([{
      path: '',
      pathMatch: 'full',
      component: ChangePasswordComponent
    }]),
    CommonModule,
    FormsModule,
    TranslateModule,
    MatIconModule,
    MatMenuModule,
    SharedModule
  ]
})

export class ChangePasswordModule{

}
