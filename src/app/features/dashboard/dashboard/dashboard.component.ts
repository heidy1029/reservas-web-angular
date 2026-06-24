import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardService } from '../../../core/services/dashboard.service';
import { DashboardResumen } from '../../../models/dashboard-resumen';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  resumen: DashboardResumen = {
    totalSitios: 0,
    totalAlojamientos: 0,
    totalReservas: 0
  };

  constructor(
    private dashboardService: DashboardService
  ) {}

  ngOnInit(): void {
    this.dashboardService.getResumen().subscribe({
      next: (response) => {
        this.resumen = response;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
}