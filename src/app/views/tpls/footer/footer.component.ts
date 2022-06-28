import { Component, OnInit } from '@angular/core';
import {BaseMethodsService} from "../../../services/base/base-methods.service";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(public baseMethod: BaseMethodsService) { }

  ngOnInit(): void {
  }

}
