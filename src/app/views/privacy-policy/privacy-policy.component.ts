import { BaseMethodsService } from './../../services/base/base-methods.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss']
})
export class PrivacyPolicyComponent implements OnInit {

  constructor(public base: BaseMethodsService) { }

  ngOnInit(): void {
  }

}
