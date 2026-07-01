import { Injectable } from '@angular/core';

export interface ConfirmDialogOptions {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'danger' | 'warning' | 'info';
}

@Injectable({
  providedIn: 'root'
})
export class ConfirmDialogService {

  private resolver?: (value: boolean) => void;

  visible = false;

  options: ConfirmDialogOptions = {
    title: '',
    message: '',
    confirmText: 'Confirmar',
    cancelText: 'Cancelar',
    type: 'danger'
  };

  confirm(options: ConfirmDialogOptions): Promise<boolean> {
    this.options = {
      confirmText: 'Confirmar',
      cancelText: 'Cancelar',
      type: 'danger',
      ...options
    };

    this.visible = true;

    return new Promise<boolean>((resolve) => {
      this.resolver = resolve;
    });
  }

  accept(): void {
    this.visible = false;
    this.resolver?.(true);
  }

  cancel(): void {
    this.visible = false;
    this.resolver?.(false);
  }
}