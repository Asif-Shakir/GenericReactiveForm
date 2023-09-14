import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {
  @Input() data = {} as TableData;
  sort = 1;
  constructor() { }

  ngOnInit(): void {
  }
  handleSort(sort: number) {
    this.sort = sort;
    console.log(sort);
  }
}
export type OnlyTwoNumbersArray = [number, number];
export interface TableHead {
  name: string,
  key: string,
  sortable?: boolean,
  sortValue: OnlyTwoNumbersArray,
  component?:any,
}
export interface TableData {
  head: TableHead[],
  data:[],
}
