import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileDetailComponent } from './user-profile-detail.component';
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    UserProfileDetailComponent
  ],
  imports: [
    RouterModule.forChild([{
      path: '',
      pathMatch: 'full',
      component: UserProfileDetailComponent
    }]),
    CommonModule,
    FormsModule,
    TranslateModule
  ]
})
export class UserProfileDetailModule { }
