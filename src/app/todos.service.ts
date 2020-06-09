import {Injectable} from '@angular/core';
import {HttpClient, HttpEventType, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, delay, map, tap} from 'rxjs/operators';

/*прописываем интерфейс для сущности, которую будем получать с сервера*/
export interface ITodo {
  completed: boolean;
  title: string;
  id?: number;
}
@Injectable({providedIn: 'root'})
export class TodosService {
  /*в конструкторе инжектируем пакет HttpClient, это дает переменной-наследнику
  этого класса методы для запросов на сервер*/
  constructor(private http: HttpClient) {}

  addTodo(todo: ITodo): Observable<ITodo> {
    /*делаем post-запрос. указываем тип данных, которые отправляем на сервер.
    1парам - url, 2-request payload, 3-headers, в том числе и withCredentials, чтоб
    не было ошибки cors*/
    return this.http.post<ITodo>('https://jsonplaceholder.typicode.com/todos', todo, {
      headers: new HttpHeaders({
        MyCustomHeader: Math.random().toString()
      }),
      withCredentials: true
    });
  }

  fetchTodos(): Observable<Array<ITodo>> {

    /*создаем переменную в которой будем хранить query-параметры для запроса. Через let!!*/
    let params = new HttpParams();
    /*добавляем в это свойство параметры по одному и в методе запроса в параметре options
    в свойстве params указываем значение этой переменной с параметрами запроса*/
    params = params.set('_limit', '5');
    /*если мы не указываем какой-то конкретний тип, который будет возвращать нам стрим,
    он считает, что это будет объект. поэтому нам нужно явно указать что данный стрим
    вернет нам данные типа Array<ITodo>*/
    return this.http.get<Array<ITodo>>('https://jsonplaceholder.typicode.com/todos', {
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      params,
      /*по умолчанию observe = 'body', но мы можем это изменить, получив доступ к большему
      количеству данных о запросе при необходимости*/
      observe: 'response',
      withCredentials: true
    })
      /*пока мы работаем со стримом и пока мы не подписались, мы можем модифицировать
      данные с помощью метода pipe(). здесь мы вызываем задержку перед подпиской*/
      .pipe(
        map(response => {
          return response.body;
        }),
        delay(1500),
        /*у pipe есть метод catchError() для обработки ошибок*/
        catchError(error => {
          console.log('Error: ', error.message);
          /*throwError() позволяет создать новый Observable и закинуть туда эту ошибку
          и вернуть новый Observable из этого метода*/
          return throwError(error);
        })
        );
  }

  removeTodo(id: number): Observable<any> {
    return this.http.delete<void>(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      /*прописывая observe: events мы получаем доступ до всех событий которые происходят
      с асинхронными запросами*/
      observe: 'events'
    }).pipe(
      /*оператор tap() перехватывает промежуточно данные, ничего с ними не делает, но
      внутри этого оператора мы можем как-то с этими данными взаимодекйствовать*/
      tap(event => {
        /*у event есть свойство type, которое соответствует одному из состояний HttpEventType,
        и это говорит нам о статусе запроса*/
        if (event.type === HttpEventType.Sent) {
          console.log('Sent', event);
        }
        if (event.type === HttpEventType.Response) {
          console.log('Response', event);
        }
      })
    );
  }

  completeTodo(id: number): Observable<ITodo> {
    return this.http.put<ITodo>(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      completed: true
    }, {
      /*по умолчанию клиент и сервер обмениваются данными в строковом формате, за
      кадром происходит json.stringify(), когда отправляет данные на сервер, а когда
      данные приходят с сервера, Angular парсит эту строку в json. поэтому responseType
      по умолчанию json.*/
      responseType: 'json'
    });
  }
}
