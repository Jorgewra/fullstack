import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';

export interface Employee {
  id: 1;
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
  selector: 'app-dialog-form',
  templateUrl: './dialog-form.component.html',
  styleUrls: ['./dialog-form.component.scss']
})
export class DialogFormComponent implements OnInit {
  objetForm: Employee;
  name = new FormControl('nome', [Validators.required, Validators.maxLength(150)]);
  email = new FormControl('', [Validators.required, Validators.email]);
  phone = new FormControl('', Validators.required);
  company = new FormControl('', Validators.required);
  role = new FormControl('', Validators.required);
  sector = new FormControl('', Validators.required);
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private apiEmployee: EmployeeService) { }

  ngOnInit(): void {
    if (this.data.employee !== undefined){
      this.objetForm = this.data.employee;
    }
  }
  save(event: Event): void {
    event.preventDefault();
    this.apiEmployee.saveEmployees(this.objetForm).then(resp => {
      alert('Cadastrado com sucesso!');
    }).catch(error => {
      console.log(error);
      alert('Houve um error!');
    });
  }

}
