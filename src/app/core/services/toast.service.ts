import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ToastMessage {
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private toastSubject = new BehaviorSubject<ToastMessage | null>(null);

  toast$ = this.toastSubject.asObservable();

  show(
    message: string,
    type: 'success' | 'error' | 'warning' | 'info' = 'success'
  ): void {
    this.toastSubject.next({ message, type });

    setTimeout(() => {
      this.toastSubject.next(null);
    }, 3000);
  }

  success(message: string): void {
    this.show(message, 'success');
  }

  error(message: string): void {
    this.show(message, 'error');
  }

  warning(message: string): void {
    this.show(message, 'warning');
  }

  info(message: string): void {
    this.show(message, 'info');
  }
}