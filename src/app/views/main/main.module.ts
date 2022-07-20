import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainComponent} from './main.component';
import {RouterModule} from "@angular/router";
import {NgbTooltipModule} from "@ng-bootstrap/ng-bootstrap";
import {TranslateModule} from "@ngx-translate/core";

import {MatIconModule} from "@angular/material/icon";

@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    RouterModule.forChild([{
      path: '',
      pathMatch: 'full',
      component: MainComponent
    }]),
    CommonModule,
    NgbTooltipModule,
    TranslateModule,
    MatIconModule
  ]
})
export class MainModule {
}
