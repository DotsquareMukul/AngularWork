import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DataTable, TableColumn, TableAction } from './data-table';

describe('DataTable', () => {
  let component: DataTable;
  let fixture: ComponentFixture<DataTable>;

  const mockColumns: TableColumn[] = [
    { key: 'firstName', label: 'First Name', sortable: true },
    { key: 'email', label: 'Email', sortable: false },
  ];

  const mockActions: TableAction[] = [
    { label: 'Edit', type: 'edit' },
    { label: 'Delete', type: 'delete' },
  ];

  const mockData = [
    { id: 1, firstName: 'Charlie', email: 'charlie@test.com' },
    { id: 2, firstName: 'Alice', email: 'alice@test.com' },
    { id: 3, firstName: 'Bob', email: 'bob@test.com' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataTable],
    }).compileComponents();

    fixture = TestBed.createComponent(DataTable);
    component = fixture.componentInstance;

    component.columns = mockColumns;
    component.data = mockData;
    component.actions = mockActions;
    component.pageSize = 2;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render column headers', () => {
    const headers = fixture.debugElement.queryAll(By.css('th'));
    // 2 data columns + 1 actions column
    expect(headers.length).toBe(3);
    expect(headers[0].nativeElement.textContent).toContain('First Name');
    expect(headers[1].nativeElement.textContent).toContain('Email');
  });

  it('should paginate data according to pageSize', () => {
    // pageSize = 2, 3 total rows → page 1 shows 2 rows
    expect(component.pagedData.length).toBe(2);
    expect(component.totalPages).toBe(2);
  });

  it('should show correct rows on page 1 by default', () => {
    expect(component.currentPage).toBe(1);
    expect(component.pagedData[0].firstName).toBe('Charlie');
    expect(component.pagedData[1].firstName).toBe('Alice');
  });

  it('should navigate to next page', () => {
    component.goToPage(2);
    fixture.detectChanges();

    expect(component.currentPage).toBe(2);
    expect(component.pagedData.length).toBe(1);
    expect(component.pagedData[0].firstName).toBe('Bob');
  });

  it('should not navigate to invalid page numbers', () => {
    component.goToPage(0);
    expect(component.currentPage).toBe(1);

    component.goToPage(99);
    expect(component.currentPage).toBe(1);
  });

  it('should sort ascending on first click of a sortable column', () => {
    const nameColumn = mockColumns[0]; // firstName, sortable: true
    component.sort(nameColumn);
    fixture.detectChanges();

    expect(component.sortKey).toBe('firstName');
    expect(component.sortDirection).toBe('asc');
    expect(component.data[0].firstName).toBe('Alice');
    expect(component.data[1].firstName).toBe('Bob');
    expect(component.data[2].firstName).toBe('Charlie');
  });

  it('should toggle to descending on second click of the same column', () => {
    const nameColumn = mockColumns[0];
    component.sort(nameColumn);
    component.sort(nameColumn);
    fixture.detectChanges();

    expect(component.sortDirection).toBe('desc');
    expect(component.data[0].firstName).toBe('Charlie');
  });

  it('should not sort when column is not sortable', () => {
    const emailColumn = mockColumns[1]; // sortable: false
    const originalOrder = [...component.data];

    component.sort(emailColumn);

    expect(component.sortKey).toBeNull();
    expect(component.data).toEqual(originalOrder);
  });

  it('should emit actionClick with correct type and row when action button is clicked', () => {
    vi.spyOn(component.actionClick, 'emit');

    const row = mockData[0];
    component.onAction('edit', row);

    expect(component.actionClick.emit).toHaveBeenCalledWith({ type: 'edit', row });
  });

  it('should render action buttons for each row', () => {
    const actionButtons = fixture.debugElement.queryAll(By.css('.action-btn'));
    // 2 actions × 2 rows shown on current page (pageSize = 2)
    expect(actionButtons.length).toBe(4);
  });

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

    const emptyRow = fixture.debugElement.query(By.css('.empty-row'));
    expect(emptyRow).toBeTruthy();
    expect(emptyRow.nativeElement.textContent).toContain('No data available');
  });

  it('should recalculate pagedData when data input changes via ngOnChanges', () => {
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

    expect(component.currentPage).toBe(1);
    expect(component.pagedData.length).toBe(1);
    expect(component.pagedData[0].firstName).toBe('Dave');
  });
});
