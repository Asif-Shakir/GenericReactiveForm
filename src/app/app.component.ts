import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormControlOptions, InputType } from './form/form.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  inputType = InputType;
  studentList: any = [];
  patchValues: any;
  formControls: FormControlOptions[] = [
    { inputType: this.inputType.InputHidden, controlName: 'id', labelName: 'id', value: (Math.floor(Math.random() * 1000)) },
    { inputType: this.inputType.InputText, controlName: 'firstName', labelName: 'First Name', value:'', controlValidatros: [Validators.required] },
    {
      inputType: this.inputType.InputText, controlName: 'lastName', labelName: 'Last Name',
      controlValidatros: [Validators.required, Validators.maxLength(10), Validators.minLength(3)]
    },
    { inputType: this.inputType.InputText, controlName: 'phone', labelName: 'Phone', value: '03009477899', controlValidatros: [Validators.required]},
    {
      inputType: this.inputType.InputSelect, controlName: 'users', labelName: 'Users', controlValidatros: [Validators.required],
      optionValues: [{ text: 'Lahore', value: '1' }, { text: 'Karachi', value: '2' }, { text: 'Peshawar', value: '3' }],
      dataUrl: 'https://jsonplaceholder.typicode.com/users', mapByKeys: { text: 'name', value:'id'}
    },
    {
      inputType: this.inputType.InputSelect, controlName: 'posts', labelName: 'Posts', controlValidatros: [Validators.required]
      , dependsOn: 'users', dataUrl: 'https://jsonplaceholder.typicode.com/posts?userId=', mapByKeys: { text: 'title', value: 'id' }
    },
    {
      inputType: this.inputType.InputSelect, controlName: 'comments', labelName: 'Comments', controlValidatros: [Validators.required]
      , dependsOn: 'posts', dataUrl: 'https://jsonplaceholder.typicode.com/comments?postId=', mapByKeys: { text: 'name', value: 'id' }
    },
    { inputType: this.inputType.InputDate, controlName: 'startDate', labelName: 'Start Date'},
    { inputType: this.inputType.InputCheckBox, controlName: 'isActive', labelName: 'Active' },
    {
      inputType: this.inputType.InputRadio, controlName: 'gender', labelName: 'Gender', controlValidatros: [Validators.required],
      optionValues: [{ text: 'Male', value: '1' }, { text: 'Female', value: '2' }],
    },
    { inputType: this.inputType.InputFile, controlName: 'fileLogo', labelName: 'Logo' },
  ];
  ngOnInit() {
    this.getLocalStrogeData();
  }
  editData(item: any) {
    this.patchValues = item;
  }
  getActionData(eventData: any) {
    let students:any[] = [];
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
}
