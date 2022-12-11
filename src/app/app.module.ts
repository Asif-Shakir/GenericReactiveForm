import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import { AddStudentComponent } from './student/add-student/add-student.component';
import { StudentListComponent } from './student/student-list/student-list.component';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  { path: 'addstudent', component: AddStudentComponent },
  { path: 'studentlist', component: StudentListComponent },
]
@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    AddStudentComponent,
    StudentListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
