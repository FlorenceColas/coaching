import { HttpHandler, HttpInterceptor, HttpEvent, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class AuthInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let token = localStorage.getItem('jwt');
        let authReq = req;

        if (token) {
            authReq = req.clone({
                headers: req.headers.set('authorization', 'Bearer ' + token)
            });
        }

        return next.handle(authReq).pipe(
            map((event:HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    return event.clone({body: this.parseResponse(event.body)});
                }
            })
        );
    }

    private parseResponse(eventBody): any {
        if (eventBody && eventBody._embedded) {
            const key = Object.keys(eventBody._embedded);
            return eventBody._embedded[key[0]];
        } else {
            return eventBody;
        }
    }
}
