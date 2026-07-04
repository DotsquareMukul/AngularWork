import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface TableColumn {
  key: string; // property name in row data
  label: string; // header text
  sortable?: boolean;
}

export interface TableAction {
  label: string;
  icon?: string;
  type: 'edit' | 'delete' | 'view' | string; // identifies which action was clicked
}

@Component({
  selector: 'app-data-table',
  imports: [CommonModule],
  templateUrl: './data-table.html',
  styleUrl: './data-table.css',
})
export class DataTable implements OnChanges {
  @Input() columns: TableColumn[] = [];
  @Input() data: any[] = [];
  @Input() actions: TableAction[] = [];
  @Input() pageSize = 5;

  @Output() actionClick = new EventEmitter<{ type: string; row: any }>();

  pagedData: any[] = [];
  currentPage = 1;
  totalPages = 1;

  sortKey: string | null = null;
  sortDirection: 'asc' | 'desc' = 'asc';

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data']) {
      this.currentPage = 1;
      this.updatePagedData();
    }
  }

  sort(column: TableColumn) {
    if (!column.sortable) return;

    if (this.sortKey === column.key) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortKey = column.key;
      this.sortDirection = 'asc';
    }

    this.data = [...this.data].sort((a, b) => {
      const valA = a[this.sortKey!];
      const valB = b[this.sortKey!];
      if (valA < valB) return this.sortDirection === 'asc' ? -1 : 1;
      if (valA > valB) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    this.updatePagedData();
  }
  updatePagedData() {
    this.totalPages = Math.max(1, Math.ceil(this.data.length / this.pageSize));
    const start = (this.currentPage - 1) * this.pageSize;
    this.pagedData = this.data.slice(start, start + this.pageSize);
  }

  goToPage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.updatePagedData();
  }

  onAction(type: string, row: any) {
    this.actionClick.emit({ type, row });
  }
}
