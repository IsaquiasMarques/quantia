import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-toggle',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './toggle.component.html',
  styleUrl: './toggle.component.css'
})
export class ToggleComponent {
  enabled = signal(true);
  @Output() status: EventEmitter<boolean> = new EventEmitter<boolean>();

  changeState(){
    this.enabled.update(val => val = !val);
    this.status.emit(this.enabled());
  }

}
