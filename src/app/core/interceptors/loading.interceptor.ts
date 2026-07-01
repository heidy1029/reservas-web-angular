import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { finalize } from 'rxjs/operators';
import { LoadingService } from '../services/loading.service';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);

  // Solo mostrar el loading de pantalla completa para peticiones GET
  const isGet = req.method === 'GET';

  if (isGet) {
    loadingService.show('Cargando datos...');
  }

  return next(req).pipe(
    finalize(() => {
      if (isGet) {
        loadingService.hide();
      }
    })
  );
};
