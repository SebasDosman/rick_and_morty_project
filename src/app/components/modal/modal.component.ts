import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Character } from 'src/app/models/character.model';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent  implements OnInit {
  @Input() character: Character | undefined;

  constructor(private _modalController: ModalController) { }

  ngOnInit() { }

  dismiss() {
    this._modalController.dismiss();
  }
}
