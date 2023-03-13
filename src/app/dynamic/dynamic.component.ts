import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-dynamic',
  templateUrl: './dynamic.component.html',
  styleUrls: ['./dynamic.component.css'],
})
export class DynamicComponent {
  @Input() name: string;
  @Output() deleteName = new EventEmitter<string>();
  constructor() {}
  delete() {
    this.deleteName.emit(this.name);
  }
}
