import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MessageInboxComponent} from "./message-inbox.component";
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatMenuModule} from "@angular/material/menu";
import {MatIconModule} from "@angular/material/icon";


@NgModule({
  declarations: [
    MessageInboxComponent
  ],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        component: MessageInboxComponent
      }
    ]),
    CommonModule,
    FormsModule,
    TranslateModule,
    MatMenuModule,
    MatIconModule
  ]
})
export class MessageInboxModule {
}
