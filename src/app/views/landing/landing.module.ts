import {NgModule} from "@angular/core";
import {LandingComponent} from "./landing.component";
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {FormsModule} from "@angular/forms";

@NgModule({
    declarations:[
      LandingComponent
    ],
  imports:[
    RouterModule.forChild([{
        path:'',
        pathMatch:'',
        component: LandingComponent
      }]
    ),
    CommonModule,
    FormsModule,
    TranslateModule
  ]
})

export class LandingModule {}
