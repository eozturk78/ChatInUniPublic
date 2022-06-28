import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MessageInboxComponent} from "./message-inbox.component";
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";


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
    TranslateModule
  ]
})
export class MessageInboxModule {
}
