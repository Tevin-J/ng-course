import {Component} from '@angular/core';
import {Subscription, Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  /*создаем переменную с типом из библиотеки rxjs Subscription. и теперь в данную
  переменную мы можем складыывать результат работы метода subscribe()*/
  subscription: Subscription;

  /*чтоб создать свой собственный стрим, мы создаем переменную и помещаем в нее
  наследника класса Observable библиотеки rxjs. Observable это аналог промиса,
  и вместо метода resolve у Observable есть аналогичный метод next(). тем самым
  мы выбрасываем из стрима значение 1, и при подписке это значение выводим в консоль.
  аналогично методу reject у промисов, у Observable есть метод error, который остановит
  стрим. эту ошибку мы можем обработать внутри метода subscribe, так как для этого метода
  второмы необязательным параметром является функция обработки ошибок. третьим
  необязательным параметром метода subscribe является функция обработки метода complete
  у экземпляра класса Observable. этот метод завершит стрим. метод complete вызывается
  только в том случае, если перед моментом его выполнения не произошло никакой ошибки*/
  constructor() {
    const stream$ = new Observable(observer => {
      setTimeout(() => {
        observer.next(1);
      }, 1000);
      setTimeout(() => {
        observer.complete();
      }, 1900);
      setTimeout(() => {
        observer.error('Smthn is wrong');
      }, 2000);
      setTimeout(() => {
        observer.next(2);
      }, 3000);
    });
    this.subscription = stream$
      .subscribe(
        value => console.log('Next: ', value),
        error => console.log('Error: ', error),
        () => console.log('complete')
      );
  }

  /*в данном методе мы обращаемся к переменной, отвечающей за подписку, и для того,
  чтоб не было утечки памяти, в этом методе мы производим отписку*/
  stop() {
    this.subscription.unsubscribe();
  }
}
