import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  studentList: any = [];
  constructor(private _router :Router) { }
  ngOnInit(): void {
    this.getLocalStrogeData();
  }
  editData(item: any) {
    this._router.navigate(['/addstudent'], { queryParams: { studentId: item.id } });
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
}
