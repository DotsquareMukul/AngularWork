import { Component, EventEmitter, Input, output, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatStepperModule } from '@angular/material/stepper';
import { Type } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

export interface StepItem {
  label: string;
  component: Type<unknown>;
  completed?: boolean;
  editable?: boolean;
}

@Component({
  selector: 'app-stepper',
  standalone: true,
  imports: [CommonModule, MatStepperModule, MatButtonModule],
  templateUrl: './stepper.html',
  styleUrls: ['./stepper.scss'],
})
export class StepperComponent {
  @Input() steps: StepItem[] = [];

  @Input() selectedIndex = 0;

  @Input() linear = false;

  @Output() selectedIndexChange = new EventEmitter<number>();

  @Output() onNext = new EventEmitter<void>();
  @Output() onPrevious = new EventEmitter<void>();

  handleNext() {
    this.onNext.emit();
  }
  handlePrevious() {
    this.onPrevious.emit();
  }
  onSelectionChange(index: number) {
    this.selectedIndex = index;
    this.selectedIndexChange.emit(index);
  }
}
