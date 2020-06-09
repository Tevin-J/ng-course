import {HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

/*Создаем интерсептор, имплементируясь от класса HttpInterceptor. интерсептор - класс,
который позволяет перехватывать http-запросы и что-то с ними делать*/
export class AuthInterceptor implements HttpInterceptor{
  /*intercept - метод*/
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(req);

    /*мы не можем модифицировать существующий req, а должны сделать клон*/
    const cloned = req.clone({
      headers: req.headers.append('Auth', 'Some Random Token')
    });

    /*передаем в метод handle клонированный {}. данная конструкция является стримом*/
    return next.handle(cloned).pipe(
      tap(event => {
        if (event.type === HttpEventType.Response) {
          console.log('Interceptor response', event);
        }
      })
    );
  }
}
