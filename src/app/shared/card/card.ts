import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './card.html',
  styleUrls: ['./card.css'],
})
export class CardComponent {
  @Input() title = '';
  @Input() subtitle = '';
}
