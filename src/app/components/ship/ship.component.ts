import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ship',
  templateUrl: './ship.component.html',
  styleUrls: ['./ship.component.scss']
})
export class ShipComponent {

  @Input()
  metadata: any;

  constructor() { }

  @Output() shipSelected = new EventEmitter<any>();

  select() {
    this.shipSelected.emit(this);
  }

}
