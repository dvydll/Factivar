import { Component, Output } from '@angular/core';
import { LockCheckboxComponent } from '../lock-checkbox/lock-checkbox.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-password-input',
  standalone: true,
  imports: [FormsModule, LockCheckboxComponent],
  templateUrl: './password-input.component.html',
  styleUrl: './password-input.component.css'
})
export class PasswordInputComponent {
  @Output() password = '';
  showPassword: boolean = false;

  showHidePassword(checked: boolean) {
    this.showPassword = checked;
  }
}
