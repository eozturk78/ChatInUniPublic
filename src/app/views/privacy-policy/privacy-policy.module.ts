import {NgModule} from "@angular/core";
import {PrivacyPolicyComponent} from "./privacy-policy.component";
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
      PrivacyPolicyComponent
  ],
  imports: [
    RouterModule.forChild([{
      path: '',
      pathMatch: 'full',
      component: PrivacyPolicyComponent
    }]),
    CommonModule,
    FormsModule,
    TranslateModule
  ]
})

export class PrivacyPolicyModule { }
