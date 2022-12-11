import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FormControlOptions, InputType } from '../../form/form.component';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {
  formControls: FormControlOptions[] = [];
  inputType = InputType;
  patchValues: any;
  constructor(private _activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this._activeRoute.queryParams.subscribe(params => {
      let id = params['studentId'];
      let student = this.findById(id);
      this.patchValues = student;
    })
    this.initControls();
  }
  initControls() {
    this.formControls = [
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
      //{ inputType: this.inputType.InputFile, controlName: 'fileLogo', labelName: 'Logo', class: 'col-3' },
      { inputType: this.inputType.InputCheckBox, controlName: 'isActive', labelName: 'Active', class: 'col-3' },
    ];
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
    }
    else {
      students.push(eventData.data)
      localStorage.setItem("_students", JSON.stringify(students))
    }
  }
  findById(id: any) {
    let getData: any[] = JSON.parse(localStorage.getItem('_students')!);
    return getData.find(x => x.id == id);
  }
}
