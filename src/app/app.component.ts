import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { TableData, TableHead } from './data-table/data-table.component';
import { FormControlOptions, InputType } from './form/form.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  data:any = [];
  inputType = InputType;
  studentList: any = [];
  patchValues: any;
  formControls: FormControlOptions[] = [
    { inputType: this.inputType.InputHidden, controlName: 'id', labelName: 'id', value: (Math.floor(Math.random() * 1000)) },
    {
      inputType: this.inputType.InputText, controlName: 'firstName', labelName: 'First Name', value: ''
      , controlValidatros: [Validators.required], class: 'col-4'
    },
    {
      inputType: this.inputType.InputText, controlName: 'lastName', labelName: 'Last Name',
      controlValidatros: [Validators.required, Validators.maxLength(10), Validators.minLength(3)], class: 'col-4'
    },
    {
      inputType: this.inputType.InputText, controlName: 'phone', labelName: 'Phone', value: '03009477899',
      controlValidatros: [Validators.required], class: 'col-4'
    },
    {
      inputType: this.inputType.InputSelect, controlName: 'users', labelName: 'Users', controlValidatros: [Validators.required], class: 'col-4'
      , optionValues: [{ text: 'Lahore', value: '1' }, { text: 'Karachi', value: '2' }, { text: 'Peshawar', value: '3' }],
      dataUrl: 'https://jsonplaceholder.typicode.com/users', mapByKeys: { text: 'name', value: 'id' }
    },
    {
      inputType: this.inputType.InputSelect, controlName: 'posts', labelName: 'Posts', controlValidatros: [Validators.required], class: 'col-4'
      , dependsOn: 'users', dataUrl: 'https://jsonplaceholder.typicode.com/posts?userId=', mapByKeys: { text: 'title', value: 'id' }
    },
    {
      inputType: this.inputType.InputSelect, controlName: 'comments', labelName: 'Comments', controlValidatros: [Validators.required], class: 'col-4'
      , dependsOn: 'posts', dataUrl: 'https://jsonplaceholder.typicode.com/comments?postId=', mapByKeys: { text: 'name', value: 'id' }
    },
    { inputType: this.inputType.InputDate, controlName: 'startDate', labelName: 'Start Date', class: 'col-3' },
    {
      inputType: this.inputType.InputRadio, controlName: 'gender', labelName: 'Gender', controlValidatros: [Validators.required],
      optionValues: [{ text: 'Male', value: '1' }, { text: 'Female', value: '2' }], class: 'col-3'
    },
    { inputType: this.inputType.InputFile, controlName: 'fileLogo', labelName: 'Logo', class: 'col-3' },
    { inputType: this.inputType.InputCheckBox, controlName: 'isActive', labelName: 'Active', class: 'col-3' },
  ];
  tableData = {} as TableData;
  ngOnInit() {
    this.testJson();
    this.getLocalStrogeData();
    this.initTableData();
  }
  initTableData() {
    let head: TableHead[] = [
      { name: 'Id', key: 'id', sortable: true, sortValue: [2, 3,] },
      { name: 'First Name', key:'fname', sortable: true, sortValue: [4, 5] },
      { name: 'Last Name', key: 'lname', sortable: true, sortValue: [6, 7] },
      { name: 'Phone', key:'phone',sortable: true, sortValue: [8,9] }]
    this.tableData = {
      head,
      data: this.data,
    }
  }
  editData(item: any) {
    this.patchValues = item;
  }
  getActionData(eventData: any) {
    let students: any[] = [];
    let getData = JSON.parse(localStorage.getItem('_students')!);
    if (getData) {
      students = [eventData.data, ...getData];
      localStorage.setItem("_students", JSON.stringify(students))
      this.getLocalStrogeData();
    }
    else {
      students.push(eventData.data)
      localStorage.setItem("_students", JSON.stringify(students))
      this.getLocalStrogeData();
    }
  }
  getLocalStrogeData() {
    this.studentList = JSON.parse(localStorage.getItem('_students')!);
  }
  testJson() {
    this.data = [
      {
        id: 1,
        fname: "John",
        lname: "Doe",
        phone: "123-456-7890"
      },
      {
        id: 2,
        fname: { name:"Jane"},
        lname: "Smith",
        phone: "987-654-3210"
      },
      {
        id: 3,
        fname: "Alice",
        lname: "Johnson",
        phone: "555-123-4567"
      },
      {
        id: 4,
        fname: "Bob",
        lname: "Williams",
        phone: "777-888-9999"
      },
      {
        id: 5,
        fname: "Emily",
        lname: "Davis",
        phone: "444-555-6666"
      },
      {
        id: 6,
        fname: "Michael",
        lname: "Brown",
        phone: "111-222-3333"
      },
      {
        id: 7,
        fname: "Sara",
        lname: "Miller",
        phone: "999-888-7777"
      },
      {
        id: 8,
        fname: "David",
        lname: "Clark",
        phone: "333-222-1111"
      },
      {
        id: 9,
        fname: "Olivia",
        lname: "Garcia",
        phone: "666-777-8888"
      },
      {
        id: 10,
        fname: "William",
        lname: "Anderson",
        phone: "222-333-4444"
      }
    ];
  }
}
