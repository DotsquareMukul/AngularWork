import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { DataTable, TableColumn, TableAction } from './data-table';

describe('DataTable', () => {
  let component: DataTable;
  let fixture: ComponentFixture<DataTable>;

  const mockColumns: TableColumn[] = [
    { key: 'firstName', label: 'First Name', sortable: true },
    { key: 'email', label: 'Email', sortable: false },
  ];

  const mockActions: TableAction[] = [
    { label: 'Edit', icon: 'edit', type: 'edit' },
    { label: 'Delete', icon: 'delete', type: 'delete' },
  ];

  const mockData = [
    { id: 1, firstName: 'Charlie', email: 'charlie@test.com' },
    { id: 2, firstName: 'Alice', email: 'alice@test.com' },
    { id: 3, firstName: 'Bob', email: 'bob@test.com' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataTable, NoopAnimationsModule], // Material needs animations module
    }).compileComponents();

    fixture = TestBed.createComponent(DataTable);
    component = fixture.componentInstance;

    component.columns = mockColumns;
    component.data = [...mockData]; // spread to avoid mutation across tests
    component.actions = mockActions;
    component.pageSize = 2;

    fixture.detectChanges();
  });

  // ── Creation ────────────────────────────────────────────────────────────────

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // ── Column headers ──────────────────────────────────────────────────────────

  it('should render column headers including Actions', () => {
    const headers = fixture.debugElement.queryAll(By.css('th.mat-header-cell'));
    // 2 data columns + 1 actions column
    expect(headers.length).toBe(3);
    expect(headers[0].nativeElement.textContent).toContain('First Name');
    expect(headers[1].nativeElement.textContent).toContain('Email');
    expect(headers[2].nativeElement.textContent).toContain('Actions');
  });

  // ── Pagination ──────────────────────────────────────────────────────────────

  it('should paginate data according to pageSize', () => {
    expect(component.pagedData.length).toBe(2);
    expect(component.totalItems).toBe(3);
  });

  it('should show correct rows on page 0 (first page) by default', () => {
    expect(component.currentPage).toBe(0); // mat-paginator is 0-indexed
    expect(component.pagedData[0].firstName).toBe('Charlie');
    expect(component.pagedData[1].firstName).toBe('Alice');
  });

  it('should navigate to next page via onPage()', () => {
    const pageEvent: PageEvent = {
      pageIndex: 1,
      pageSize: 2,
      length: 3,
      previousPageIndex: 0,
    };

    component.onPage(pageEvent);
    fixture.detectChanges();

    expect(component.currentPage).toBe(1);
    expect(component.pagedData.length).toBe(1);
    expect(component.pagedData[0].firstName).toBe('Bob');
  });

  // ── Sorting ─────────────────────────────────────────────────────────────────

  it('should sort ascending when direction is "asc"', () => {
    const sortEvent: Sort = { active: 'firstName', direction: 'asc' };

    component.onSort(sortEvent);
    fixture.detectChanges();

    expect(component.sortKey).toBe('firstName');
    expect(component.sortDirection).toBe('asc');
    expect(component.data[0].firstName).toBe('Alice');
    expect(component.data[1].firstName).toBe('Bob');
    expect(component.data[2].firstName).toBe('Charlie');
  });

  it('should sort descending when direction is "desc"', () => {
    const sortEvent: Sort = { active: 'firstName', direction: 'desc' };

    component.onSort(sortEvent);
    fixture.detectChanges();

    expect(component.sortDirection).toBe('desc');
    expect(component.data[0].firstName).toBe('Charlie');
    expect(component.data[1].firstName).toBe('Bob');
    expect(component.data[2].firstName).toBe('Alice');
  });

  it('should clear sort when direction is empty string', () => {
    // First sort ascending
    component.onSort({ active: 'firstName', direction: 'asc' });

    // Then clear sort (user clicks a third time in Material)
    component.onSort({ active: 'firstName', direction: '' });
    fixture.detectChanges();

    expect(component.sortKey).toBeNull();
  });

  it('should reset to page 0 after sorting', () => {
    // Navigate to page 1 first
    component.onPage({ pageIndex: 1, pageSize: 2, length: 3, previousPageIndex: 0 });
    expect(component.currentPage).toBe(1);

    component.onSort({ active: 'firstName', direction: 'asc' });

    expect(component.currentPage).toBe(0);
  });

  // ── Actions ─────────────────────────────────────────────────────────────────

  it('should emit actionClick with correct type and row', () => {
    vi.spyOn(component.actionClick, 'emit');

    const row = mockData[0];
    component.onAction('edit', row);

    expect(component.actionClick.emit).toHaveBeenCalledWith({ type: 'edit', row });
  });

  it('should render mat-icon-button actions for each visible row', () => {
    // pageSize=2, 2 actions each → 4 icon buttons
    const actionButtons = fixture.debugElement.queryAll(By.css('button[mat-icon-button]'));
    expect(actionButtons.length).toBe(4);
  });

  it('should return "action-delete" class for delete action', () => {
    expect(component.getActionClass('delete')).toBe('action-delete');
  });

  it('should return "action-edit" class for edit action', () => {
    expect(component.getActionClass('edit')).toBe('action-edit');
  });

  it('should return "action-view" class for view action', () => {
    expect(component.getActionClass('view')).toBe('action-view');
  });

  it('should return "action-default" class for unknown action type', () => {
    expect(component.getActionClass('unknown')).toBe('action-default');
  });

  // ── Empty state ─────────────────────────────────────────────────────────────

  it('should show empty state when data is empty', () => {
    component.data = [];
    component.ngOnChanges({
      data: {
        currentValue: [],
        previousValue: mockData,
        firstChange: false,
        isFirstChange: () => false,
      },
    });
    fixture.detectChanges();

    const emptyState = fixture.debugElement.query(By.css('.empty-state'));
    expect(emptyState).toBeTruthy();
    expect(emptyState.nativeElement.textContent).toContain('No data available');
  });

  // ── ngOnChanges ─────────────────────────────────────────────────────────────

  it('should recalculate pagedData when data input changes', () => {
    const newData = [{ id: 4, firstName: 'Dave', email: 'dave@test.com' }];

    component.data = newData;
    component.ngOnChanges({
      data: {
        currentValue: newData,
        previousValue: mockData,
        firstChange: false,
        isFirstChange: () => false,
      },
    });

    expect(component.currentPage).toBe(0); // resets to 0, not 1
    expect(component.totalItems).toBe(1);
    expect(component.pagedData.length).toBe(1);
    expect(component.pagedData[0].firstName).toBe('Dave');
  });

  // ── displayedColumns ────────────────────────────────────────────────────────

  it('should include __actions__ column when actions are provided', () => {
    expect(component.displayedColumns).toContain('__actions__');
    expect(component.displayedColumns).toEqual(['firstName', 'email', '__actions__']);
  });

  it('should omit __actions__ column when no actions are provided', () => {
    component.actions = [];
    expect(component.displayedColumns).toEqual(['firstName', 'email']);
  });
});
