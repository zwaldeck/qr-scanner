import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ActionType} from '../../shared/model/action-type.enum';
import {QR} from '../../shared/model/qr';
import {FormBuilder, FormGroup, NgForm} from '@angular/forms';

@Component({
  selector: 'app-create-step2',
  templateUrl: './create-step2.component.html',
  styleUrls: ['./create-step2.component.scss'],
})
export class CreateStep2Component implements OnInit {

  public readonly ActionType = ActionType;

  @Input() type: ActionType;

  @Output() stepComplete = new EventEmitter<QR>();

  ngOnInit() {
  }

}
