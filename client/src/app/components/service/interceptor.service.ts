import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, Observable } from 'rxjs';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(public loaderService: LoaderService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loaderService.isLoading.next(true);
    return next.handle(req).pipe(
      finalize(
        () => {
          //loaderService is added within a setTimout method to add 1500 tik delay and make loader more visable
          setTimeout(() => {
            this.loaderService.isLoading.next(false);
          }, 0)
        }
      )
    );
  }

  
  
}

