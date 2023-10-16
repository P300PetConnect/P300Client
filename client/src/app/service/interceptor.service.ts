import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, Observable, Subscription } from 'rxjs';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(public loaderService: LoaderService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.includes('5nxguu0vhi')
      || req.url.includes('dw8reoypi6')
      || req.url.includes('kxewd44z5k')
      || req.url.includes('856hqzp4v5')
      || req.url.includes('0r68frdpq4')) { // excluded requests from loading
      return next.handle(req);
    }
    this.loaderService.isLoading.next(false);
    return next.handle(req).pipe(
      finalize(
        () => {
          this.loaderService.isLoading.next(false);
        }
      )
    );
  }
}

