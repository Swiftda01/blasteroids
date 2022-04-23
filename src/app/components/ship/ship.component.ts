import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-ship',
  templateUrl: './ship.component.html',
  styleUrls: ['./ship.component.scss']
})
export class ShipComponent {

  @Input()
  metadata: any;
  selected: boolean = false;
  isSelectedClass: 'selected' | 'unselected' = 'unselected';

  constructor() { }

  @Output() shipSelected = new EventEmitter<any>();

  toggleSelected() {
    this.selected = !this.selected;
    this.isSelectedClass = this.selected ? 'selected' : 'unselected';
    this.shipSelected.emit(this.selected ? this : null);
  }

}
