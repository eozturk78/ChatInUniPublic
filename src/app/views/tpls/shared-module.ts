import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { ProfileMenuComponent } from './profile-menu/profile-menu.component';
import {NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    ProfileMenuComponent
  ],
  imports:[
    FormsModule,
    RouterModule,
    TranslateModule
  ],
  exports:[
    ProfileMenuComponent
  ]
})
export class SharedModule {
}
