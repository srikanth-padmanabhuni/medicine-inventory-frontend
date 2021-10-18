import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { staticData } from 'src/staticData';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  regex = staticData.replaceRegex;
  baseUrl = staticData.baseUrl;

  constructor(private http: HttpClient) { }

  getUrlByReplcaingWithId(url: string, id: string) {
    console.log(url, id);
    let newUrl = url.replace(this.regex, id);
    console.log(newUrl);
    return newUrl;
  }

  getAllMedicines() {
    const actualUrl = this.baseUrl + staticData.getAllMedicinesUrl;
    console.log(actualUrl);
    return this.http.get(actualUrl);
  }

  getMedicineById(medicineId: string) {
    let url = staticData.getMedicineById;
    url = this.getUrlByReplcaingWithId(url, medicineId);
    const actualUrl = this.baseUrl + url;
    return this.http.get(actualUrl);
  }

  deleteMedicine(medicineId: string) {
    let url = staticData.deleteMedicine;
    url = this.getUrlByReplcaingWithId(url, medicineId);
    const actualUrl = this.baseUrl + url;
    return this.http.delete(actualUrl);
  }

  updateMedicine(medicineId: string, medicineData: any) {
    let url = staticData.deleteMedicine;
    url = this.getUrlByReplcaingWithId(url, medicineId);
    const actualUrl = this.baseUrl + url;
    return this.http.put(actualUrl, medicineData);
  }

  createMedicine(medicineData: any) {
    const actualUrl = this.baseUrl + staticData.createMedicine;
    return this.http.post(actualUrl, medicineData);
  }
}
