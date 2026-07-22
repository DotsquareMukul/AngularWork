// stock-ticker.component.ts
import { Component, inject, signal, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { StockUpdate, StockUpdateService } from '../service/StockTicker';

@Component({
  selector: 'app-stock-ticker',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stock-updater.html',
  styleUrls: ['./stock-updater.css'],
})
export class StockTickerComponent {
  private stockService = inject(StockUpdateService);
  private destroyRef = inject(DestroyRef);

  quote = signal<StockUpdate | null>(null);

  constructor() {
    this.stockService
      .connect('TCS.NS') // or 'RELIANCE.NS', 'TCS.NS', etc.
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (update) => {
          this.quote.set(update);
          console.log('quote updated:', this.quote());
        },
        error: (err) => console.error('Stock SSE error:', err),
      });
  }
}
