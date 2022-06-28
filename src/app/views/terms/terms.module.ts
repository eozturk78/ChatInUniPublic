import {NgModule} from "@angular/core";
import {TermsComponent} from "./terms.component";
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [TermsComponent],
  imports: [
    RouterModule.forChild([{
      path: '',
      pathMatch: 'full',
      component: TermsComponent
    }]),
    CommonModule,
    FormsModule,
    TranslateModule
  ],
  providers: [],
})

export class TermsModule {
}
