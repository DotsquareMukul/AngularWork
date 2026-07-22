import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

export interface StockQuote {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  marketState: string;
  isMarketOpen: boolean;
}

export interface StockUpdate {
  value: StockQuote;
  timestamp: string;
}

@Injectable({ providedIn: 'root' })
export class StockUpdateService {
  private readonly baseUrl = `${environment.baseUrl}sse/live-updates`;

  connect(symbol: string = '^NSEI'): Observable<StockUpdate> {
    return new Observable<StockUpdate>((subscriber) => {
      const eventSource = new EventSource(`${this.baseUrl}?symbol=${encodeURIComponent(symbol)}`);

      eventSource.onmessage = (event) => {
        const data = JSON.parse(event.data) as StockUpdate;
        console.log(data);
        subscriber.next(data);
      };

      eventSource.onerror = (err) => {
        subscriber.error(err);
        eventSource.close();
      };

      // cleanup on unsubscribe (component destroyed)
      return () => eventSource.close();
    });
  }
}
