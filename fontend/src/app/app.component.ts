import { DialogFormComponent } from './dialog-form/dialog-form.component';
import { Component, OnInit } from '@angular/core';
import { EmployeeService } from './services/employee.service';
import { MatDialog } from '@angular/material/dialog';
export interface Employee {
  id: number;
  name: string;
  phone: string;
  company: string;
  email: string;
  sector: string;
  role: string;
  created: string;
  updated: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public title = 'DigiBoard';
  public listEmployees = [];
  public dataEmployees = [];
  public employee: Employee;

  constructor(private apiEmployee: EmployeeService, public dialog: MatDialog) { }
  ngOnInit(): void {
    this.getEmployees();
  }
  getEmployees() {
    this.apiEmployee.getEmployees().then((resp: any) => {
      if (resp.status === 200) {
        this.listEmployees = resp.data;
        this.dataEmployees = this.listEmployees;
      } else {
        this.listEmployees = [];
        this.dataEmployees = this.listEmployees;
      }
    });
  }
  saveEmployee() {
    this.dialog.open(DialogFormComponent, {
      data: {
        employee: {
          name: '',
          phone: '',
          company: '',
          email: '',
          sector: '',
          role: '',
          created: '',
          updated: '',
        }
      }
    });
  }
  formEdit(employee) {
    this.dialog.open(DialogFormComponent, {
      data: {
        employee
      }
    });
  }
  delete(id) {
    this.apiEmployee.delete(id).then((resp: any) => {
      if (resp.status === 200) {
        this.getEmployees();
      } else {
       alert('Erro ao deletar!');
      }
    });
  }
  sortData() {

  }
}
