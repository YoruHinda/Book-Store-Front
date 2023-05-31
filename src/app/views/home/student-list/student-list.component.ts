import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Student } from 'src/app/shared/models/student.model';
import { BookstoreService } from 'src/app/shared/service/bookstore.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {

  students: Student[]

  constructor(public bookstoreService: BookstoreService) {

  }

  ngOnInit(): void {
    this.getStudents()
  }

  refundBook(student: Student) {
    student.devolution = true
    this.bookstoreService.updateStudent(student).subscribe()
  }

  getStudents() {
    this.bookstoreService.getStudent().subscribe(data => {
      this.students = data
    })
  }
}
