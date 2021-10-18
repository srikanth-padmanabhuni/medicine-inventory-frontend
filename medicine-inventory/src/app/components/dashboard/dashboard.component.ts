import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  allMedicinesList: any = [];

  medicineName: string = "";
  companyName: string = "";
  isInjection: boolean = false;
  cost: number = 0;
  availableDiscount: number = 0;
  availableStock: number = 0;
  expiryDate: Date = new Date();

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.listAllMedicines();
  }

  listAllMedicines() {
    console.log("List All medicines is called");
    this.dashboardService.getAllMedicines().subscribe(
      (allMedicinesData) => {
        this.allMedicinesList = allMedicinesData;
      }, 
      (error) => {
        this.handleError(error);
      }
    );
  }

  createMedicine() {
    let medicineData = {
      "medicineName": this.medicineName,
      "companyName": this.companyName,
      "isInjection": this.isInjection,
      "cost": this.cost,
      "availableDiscount": this.availableDiscount,
      "availableStock": this.availableStock,
      "expiryDate": this.expiryDate
    }
    this.dashboardService.createMedicine(medicineData).subscribe(
      (createdMedicine) => {
        this.allMedicinesList.add(createdMedicine);
      },
      (error) => {
        this.handleError(error);
      }
    )
  }

  updateMedicine(medicineId: string) {
    let medicineData = {
      "medicineName": this.medicineName,
      "companyName": this.companyName,
      "isInjection": this.isInjection,
      "cost": this.cost,
      "availableDiscount": this.availableDiscount,
      "availableStock": this.availableStock,
      "expiryDate": this.expiryDate
    }

    this.dashboardService.updateMedicine(medicineId, medicineData).subscribe(
      (updatedMedicineData) => {
        let newMedicinesList:any = [];
        this.allMedicinesList.forEach((medicine: any) => {
          if (medicine.uuid === medicineId) {
            medicine = updatedMedicineData;
          }
          newMedicinesList.add(medicine);
        });
        this.allMedicinesList = newMedicinesList;
      }, 
      (error) => {
        this.handleError(error);
      }
    )
  }

  deleteMedicine(medicineId: string) {
    this.dashboardService.deleteMedicine(medicineId).subscribe(
      (deletedMedicine) => {
        let newMedicinesList:any = [];
        this.allMedicinesList.forEach((medicine: any) => {
          if (medicine.uuid !== medicineId) {
            newMedicinesList.add(medicine);
          }
        });
        this.allMedicinesList = newMedicinesList;
      },
      (error) => {
        this.handleError(error);
      }
    )
  }

  getMedicineById(medicineId: string) {
    this.dashboardService.getMedicineById(medicineId).subscribe(
      (medicineData) => {
        console.log(medicineData);
      },
      (error) => {
        this.handleError(error);
      }
    )
  }

  handleError(err: any) {
    console.log(err.statusCode, err.message);
  }
}
