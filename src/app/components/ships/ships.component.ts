import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ships',
  templateUrl: './ships.component.html',
  styleUrls: ['./ships.component.scss']
})
export class ShipsComponent {

  @Input()
  ships: any[];

  constructor() {}

  @Output() shipSelected = new EventEmitter<any>();

  select(ship) {
    this.shipSelected.emit(ship);
  }
}
