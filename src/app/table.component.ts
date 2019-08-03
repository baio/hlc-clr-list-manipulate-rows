import { Component, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Table, TableDescription, HlcClrTableComponent } from '@ng-holistic/clr-list';
import { Subject, timer } from 'rxjs';
import { mapTo } from 'rxjs/operators';

// Provide table UI definition in js object
const definition: Table.Definition = {
  cols: [
    {
      id: 'title',
      title: 'Title'
    },
    {
      id: 'amount',
      title: 'Amount'
    }
  ],
  rowActions: [{ id: 'edit', title: 'Edit' }, { id: 'remove', title: 'Remove' }]
};

// Provide data for the table
const rows: Table.Row[] = [
  {
    id: '1',
    title: 'aaaa',
    amount: 200000,
    createdDate: new Date().setMonth(1)
  },
  {
    id: '2',
    title: 'bbb',
    amount: 300000,
    createdDate: new Date().setMonth(2)
  }
];

const dataProvider: Table.Data.DataProvider = {
  load(state) {
    console.log(state);
    return timer(0).pipe(mapTo({ rows }));
  }
};

@Component({
  selector: 'my-table',
  template: `
    <button class="btn" (click)="onAdd()">Add Row</button>
    <hlc-clr-table [definition]="definition" [dataProvider]="dataProvider" (rowAction)="onRowAction($event)"></hlc-clr-table>
  `,
  styleUrls: ['./table.component.scss'],
  providers: [DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent {

  @ViewChild(HlcClrTableComponent, { static: false }) hlcTable: HlcClrTableComponent;

  readonly definition = definition;
  dataProvider = dataProvider;
  constructor(datePipe: DatePipe) {
  }

  onAdd() {
    this.hlcTable.addRow({
      id: new Date().toISOString(), title: 'new',
      amount: 7000,
      createdDate: new Date()
    })
  }

  onRowAction(evt: Table.RowActionEvent) {
    if (evt.action.id === 'edit') {
      const row = this.hlcTable.rows.find(f => f.id === evt.row.id);
      const updRow = { ...row, title: 'updated' };
      this.hlcTable.upadteRow(updRow);
    } else if (evt.action.id === 'remove') {
      this.hlcTable.removeRow(evt.row);
    }
  }
}
