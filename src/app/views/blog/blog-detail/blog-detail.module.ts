import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";
import {BlogDetailComponent} from "./blog-detail.component";

@NgModule({
  declarations: [
    BlogDetailComponent
  ],
  imports: [
    RouterModule.forChild([{
      path: '',
      pathMatch: 'full',
      component: BlogDetailComponent
    }]),
    CommonModule,
    FormsModule,
    TranslateModule
  ]
})
export class BlogDetailModule {

}
