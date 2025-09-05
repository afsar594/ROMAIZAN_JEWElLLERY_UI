import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { mergeMap, catchError } from 'rxjs/operators';
import { LoadingService, LoadingOverlayRef } from 'src/app/shared/service/loading.service';
import { MessageService } from 'primeng';
/** Pass untouched request through to the next request handler. */
@Injectable()
export class DefaultInterceptor implements HttpInterceptor {
  constructor(private loadingService: LoadingService, private messageService: MessageService) {
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let loadingRef: LoadingOverlayRef;
    Promise.resolve(null).then(() => loadingRef = this.loadingService.open());
    return next.handle(req).pipe(
      mergeMap((event: any) => {
        if (event instanceof HttpResponse && loadingRef) {
          // this.messageService.add({ severity: 'Success', summary: 'Success!', detail: 'Saved Successflly!' });
          loadingRef.close();
        }
        return of(event);
      }),
      catchError((err: HttpErrorResponse) => {
        if (loadingRef) {
          // this.messageService.add({ severity: 'error', summary: 'Api response error', detail: err.error });
          // alert(err.error)
          loadingRef.close();
        }
        return of(err);
      })
    );


  }
}
