import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActionType} from '../../shared/model/action-type.enum';
import {QrService} from '../../shared/services/qr.service';

@Component({
  selector: 'app-create-step1',
  templateUrl: './create-step1.component.html',
  styleUrls: ['./create-step1.component.scss'],
})
export class CreateStep1Component implements OnInit {

  public readonly ActionType = ActionType;

  @Output() stepComplete = new EventEmitter<ActionType>();

  types: string[] = [];

  constructor(private qrService: QrService) { }

  ngOnInit() {
    for (const key of Object.keys(ActionType)) {
      this.types.push(ActionType[key] as string);
    }
  }

  getIcon(actionType: ActionType|string) {
    return this.qrService.getIconFromActionType(actionType as ActionType);
  }

  select(type: string): void {
    this.stepComplete.emit(type as ActionType);
  }

}
