import {Component, OnInit} from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';
import {ErrorManagementService} from '../../../services/error/error-management.service';
import {BaseMethodsService} from "../../../services/base/base-methods.service";

@Component({
  selector: 'app-alert-component',
  templateUrl: './alert-component.component.html',
  styleUrls: ['./alert-component.component.css'],
  animations: [
    trigger('inOutPaneAnimation', [
      transition(':enter', [
        style({opacity: 0}),
        animate(
          '750ms ease-in-out',
          style({opacity: 1})
        )
      ]),
      transition(':leave', [
        style({opacity: 1}),
        animate(
          '600ms ease-in-out',
          style({opacity: 0})
        )
      ])
    ])
  ]
})
export class AlertComponentComponent implements OnInit {

  constructor(public baseCtrl: BaseMethodsService,
              private errorMessage: ErrorManagementService) {
  }

  ngOnInit(): void {
  }


  onCheckExistError() {
    return this.errorMessage.isExistError == true;
  }

  onGetError() {
    return this.errorMessage.errorText;
  }

  onCloseError() {
    this.errorMessage.clearError();
  }
}
