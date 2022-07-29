import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from './../tpls/shared-module';
import { RouterModule } from '@angular/router';
import { GoldMemberComponent } from './gold-member.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [GoldMemberComponent],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        component: GoldMemberComponent,
      },
    ]),
    CommonModule,
    FormsModule,
    SharedModule,
    MatIconModule,
    MatMenuModule,
    TranslateModule
  ],
})
export class GoldMemberModule {}
