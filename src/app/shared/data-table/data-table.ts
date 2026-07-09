import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

export interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
}

export interface TableAction {
  label: string;
  icon?: string;
  type: 'edit' | 'delete' | 'view' | string;
}
const ACTION_ICON_MAP: Record<string, string> = {
  edit: 'edit',
  delete: 'delete',
  view: 'visibility',
};
@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
  ],
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
  currentPage = 0; // mat-paginator is 0-indexed
  totalItems = 0;

  sortKey: string | null = null;
  sortDirection: 'asc' | 'desc' = 'asc';

  get displayedColumns(): string[] {
    const cols = this.columns.map((c) => c.key);
    return this.actions.length ? [...cols, '__actions__'] : cols;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data']) {
      this.currentPage = 0;
      this.totalItems = this.data.length;
      this.updatePagedData();
    }
  }

  onSort(sort: Sort) {
    if (!sort.active || sort.direction === '') {
      this.sortKey = null;
    } else {
      this.sortKey = sort.active;
      this.sortDirection = sort.direction as 'asc' | 'desc';
    }

    const sorted = [...this.data].sort((a, b) => {
      if (!this.sortKey) return 0;
      const valA = a[this.sortKey];
      const valB = b[this.sortKey];
      if (valA < valB) return this.sortDirection === 'asc' ? -1 : 1;
      if (valA > valB) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    this.data = sorted;
    this.currentPage = 0;
    this.updatePagedData();
  }

  onPage(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize; // ← add this line
    this.updatePagedData();
  }

  updatePagedData() {
    const start = this.currentPage * this.pageSize;
    this.pagedData = this.data.slice(start, start + this.pageSize);
  }

  onAction(type: string, row: any) {
    this.actionClick.emit({ type, row });
  }
  getActionIcon(action: TableAction): string {
    return action.icon ?? ACTION_ICON_MAP[action.type] ?? 'more_horiz';
  }
  getActionClass(type: string): string {
    switch (type) {
      case 'delete':
        return 'action-delete';
      case 'edit':
        return 'action-edit';
      case 'view':
        return 'action-view';
      default:
        return 'action-default';
    }
  }
}
