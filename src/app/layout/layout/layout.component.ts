import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { AuthService } from '../../core/services/auth.service';
import { ToastComponent } from '../../shared/toast/toast.component';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { LoadingComponent } from '../../shared/loading/loading.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterModule, ToastComponent, ConfirmDialogComponent, LoadingComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
sidebarOpen = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  toggleSidebar(): void {
  this.sidebarOpen = !this.sidebarOpen;
}
closeSidebar(): void {
  this.sidebarOpen = false;
}
}