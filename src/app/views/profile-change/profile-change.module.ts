import { MatMenuModule } from '@angular/material/menu';
import { SharedModule } from './../tpls/shared-module';
import { ProfileMenuComponent } from './../tpls/profile-menu/profile-menu.component';
import { ProfileChangeComponent } from './profile-change.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [ProfileChangeComponent],
  imports: [
    RouterModule.forChild([
      {path:'',pathMatch:'full', component: ProfileChangeComponent}
    ]),
    CommonModule,
    FormsModule,
    TranslateModule,
    MatMenuModule,
    MatIconModule,
    SharedModule
  ]
})
export class ProfileChangeModule { }
