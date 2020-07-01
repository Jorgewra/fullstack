import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private headers = new HttpHeaders();
  private apiREST = 'http://localhost:3000';
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'https://*/*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT'
    });
  }

  async getEmployees() {
    return await this.http
      .get(this.apiREST, { headers: this.headers }).toPromise();
  }
  async searchEmployees(searchText = '', fieldName = '' ) {
    return await this.http
      .get(`${this.apiREST}/search?search=${searchText}&fieldName=${fieldName}`, { headers: this.headers }).toPromise();
  }
  async saveEmployees(body) {
    const object = {
      name: body.name,
      phone: body.phone,
      company: body.company,
      email: body.email,
      sector: body.sector,
      role: body.role,
      created: '',
      updated: '',
    };
    console.log(body);
    const dateToday = new Date().toISOString().
    replace(/T/, ' ').      // replace T with a space
    replace(/\..+/, '');     // delete the dot and everything after

    if (body.id){
      object.updated = dateToday;
      return await this.http
      .put(`${this.apiREST}/update?id=${body.id}`, JSON.stringify(object), { headers: this.headers }).toPromise();
    }else{
      object.updated = dateToday;
      object.created = dateToday;
      return await this.http
      .post(`${this.apiREST}/save`, JSON.stringify(object), { headers: this.headers }).toPromise();
    }

  }
  async delete(id: number) {
    return await this.http
    .delete(`${this.apiREST}?id=${id}`, { headers: this.headers }).toPromise();
  }
}
