import { DialogFormComponent } from './dialog-form/dialog-form.component';
import { Component, OnInit, ViewChild } from '@angular/core';
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
declare var google: any;
var list_graf = [];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild("piechart") element;
  public title = 'DigiBoard';
  public listEmployees = [];
  public employee: Employee;
  public searchText = '';
  public fieldName = '';

  constructor(private apiEmployee: EmployeeService, public dialog: MatDialog) { }
  ngOnInit(): void {
    this.getEmployees();
  }
  getDataGraf() {
    let list_aux = [['Cargo', ""]];
    let count = 0;
    let nameRole = '';
    this.listEmployees.forEach(el => {
      if (el.role !== nameRole) {
        count = 0;
        nameRole = el.role;
        this.listEmployees.forEach(element => {
          if (element.role === el.role) {
            count++;
          }
        });
        list_aux.push([nameRole, count]);
      }
    });
    list_graf = list_aux;
    google.charts.load('current', { 'packages': ['corechart'] });
    google.charts.setOnLoadCallback(this.drawChart);
  }
  drawChart() {
    let data = google.visualization.arrayToDataTable(list_graf);

    let options = {
      title: 'Cargos'
    };

    let chart = new google.visualization.PieChart(document.getElementById('piechart'));

    chart.draw(data, options);
  }
  getEmployees() {
    this.apiEmployee.getEmployees().then((resp: any) => {
      if (resp.status === 200) {
        this.listEmployees = resp.data;
        this.getDataGraf();
      } else {
        this.listEmployees = [];
      }
    });
  }
  searchEmployees() {
    this.apiEmployee.searchEmployees(this.searchText, this.fieldName).then((resp: any) => {
      if (resp.status === 200) {
        this.listEmployees = resp.data;
        this.getDataGraf();
      } else {
        this.listEmployees = [];
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
