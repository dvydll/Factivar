import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-lock-checkbox',
  standalone: true,
  imports: [],
  templateUrl: './lock-checkbox.component.html',
  styleUrl: './lock-checkbox.component.css'
})
export class LockCheckboxComponent {
  @Output() lockCheckboxChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  onChange(event: any) {
    this.lockCheckboxChange.emit(!event.target.checked);
  }
}
