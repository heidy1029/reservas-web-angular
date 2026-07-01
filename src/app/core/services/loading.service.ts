import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface LoadingState {
  visible: boolean;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private loadingSubject = new BehaviorSubject<LoadingState>({
    visible: false,
    message: 'Cargando...'
  });

  loading$ = this.loadingSubject.asObservable();

  show(message: string = 'Cargando...'): void {
    this.loadingSubject.next({
      visible: true,
      message
    });
  }

  hide(): void {
    this.loadingSubject.next({
      visible: false,
      message: 'Cargando...'
    });
  }
}