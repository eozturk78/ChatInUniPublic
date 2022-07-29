import { MatMenuModule } from '@angular/material/menu';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";
import {ProfileComponent} from "./profile.component";
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    RouterModule.forChild([{
      path: '',
      pathMatch: 'full',
      component: ProfileComponent
    }]),
    CommonModule,
    FormsModule,
    TranslateModule,
    MatMenuModule,
    MatIconModule
  ]
})
export class ProfileModule {
}
