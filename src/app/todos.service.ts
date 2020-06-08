import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, delay} from 'rxjs/operators';

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
      params
    })
      /*пока мы работаем со стримом и пока мы не подписались, мы можем модифицировать
      данные с помощью метода pipe(). здесь мы вызываем задержку перед подпиской*/
      .pipe(
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

  removeTodo(id: number): Observable<void> {
    return this.http.delete<void>(`https://jsonplaceholder.typicode.com/todos/${id}`);
  }

  completeTodo(id: number): Observable<ITodo> {
    return this.http.put<ITodo>(`https://jsonplaceholder.typicode.com/todos/${id}`, {completed: true});
  }
}
