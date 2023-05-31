import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import * as moment from 'moment';
import { BookstoreService } from 'src/app/shared/service/bookstore.service';

@Component({
  selector: 'app-student-form-dialog',
  templateUrl: './student-form-dialog.component.html',
  styleUrls: ['./student-form-dialog.component.css']
})
export class StudentFormDialogComponent implements OnInit {
  public studentForm: FormGroup
  constructor(private fb: FormBuilder, private rest: BookstoreService, public dialogRef: MatDialogRef<StudentFormDialogComponent>) {

  }

  ngOnInit(): void {
    this.studentForm = this.fb.group({
      student_name: ['', Validators.required],
      book: ['', Validators.required],
      devolution_date: ['', Validators.required],
      loan_date: ['', Validators.required],
    })
  }

  createStudent() {
    let newDevolution_date: moment.Moment = moment.utc(this.studentForm.value.devolution_date).local()
    let newLoanDate: moment.Moment = moment.utc(this.studentForm.value.loan_date).local()
    this.studentForm.value.devolution_date = newDevolution_date.format("YYYY-MM-DD")
    this.studentForm.value.loan_date = newLoanDate.format("YYYY-MM-DD")
    this.rest.postStudent(this.studentForm.value).subscribe(result => {
      this.dialogRef.close()
      this.studentForm.reset()
      window.location.reload()
    })
  }

  cencel(): void {
    this.dialogRef.close();
    this.studentForm.reset()
  }
}
