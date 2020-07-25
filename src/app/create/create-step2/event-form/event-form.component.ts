import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {QR} from '../../../shared/model/qr';
import {FormBuilder, FormGroup} from '@angular/forms';
import {createEvent, SEND_CREATE_QR_FORM} from '../../../shared/utils/constants';
import {QrType} from '../../../shared/model/qr-type.enum';
import {ActionType} from '../../../shared/model/action-type.enum';
import {DataType} from '../../../shared/model/data.type';
import {GlobalEmitter} from '../../../shared/utils/global-emitter';
import {takeUntil} from 'rxjs/operators';
import {BaseComponent} from '../../../base.component';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss'],
})
export class EventFormComponent extends BaseComponent implements OnInit {

  @Output() result = new EventEmitter<QR>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    super();
  }

  ngOnInit() {
    GlobalEmitter.of(SEND_CREATE_QR_FORM)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(() => this.submitForm());

    this.form = this.fb.group({
      summary: ['', []],
      description: ['', []],
      location: ['', []],
      start: ['', []],
      end: ['', []],
    });
  }

  public submitForm(): void {
    const event = createEvent([{
      start: this.form.value.start ? new Date(this.form.value.start) : new Date(),
      end: this.form.value.start ? new Date(this.form.value.start) : null,
      summary: this.form.value.summary || '',
      description: this.form.value.description || '',
      location: this.form.value.location || '',
    }]);

    const qr = new QR(
        QrType.CREATED,
        ActionType.EVENT,
        DataType.VEVENT,
        event,
        new Date());

    this.result.emit(qr);
  }
}
