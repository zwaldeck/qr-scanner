import {Component, Input, OnInit} from '@angular/core';
import {QR} from '../../model/qr';
import {ModalController, Platform} from '@ionic/angular';
import {Router} from '@angular/router';

@Component({
  selector: 'app-show-qrcode-modal',
  templateUrl: './show-qrcode-modal.component.html',
  styleUrls: ['./show-qrcode-modal.component.scss'],
})
export class ShowQRCodeModalComponent implements OnInit {

  @Input() qr: QR;
  @Input() id: number;

  width: number;

  constructor(private platform: Platform,
              private modalController: ModalController) { }

  ngOnInit() {
    this.width = Math.min(this.platform.width(), 500);
  }

  dismiss() {
    this.modalController.dismiss();
  }


}
