import {Component} from '@angular/core';
import {interval, Subscription} from 'rxjs';
import {filter, map} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  /*создаем переменную с типом из библиотеки rxjs Subscription. и теперь в данную
  переменную мы можем складыывать результат работы метода subscribe()*/
  subscription: Subscription;

  constructor() {

    /*с помощью ф-и interval() из библиотеки rxjs мы создали новый RxJS-стрим, который
    запускается каждую секунду. мы в результате получили объект у которого есть метод
    subscribe(), который выдает нам какой-то результат в случае, если что-то произошло*/
    const intervalStream$ = interval(1000);

    /*эта переменная отвечает за подписку. у нее есть метод pipe(), который принимает
    в себя операторы библиотеки rxjs. каждый оператор - ф-я, которая принимает ф-ю, где
    на каждой итерации мы получаем некоторое значение value, и в теле этой ф-и можем
    это value изменять. операторы можно чейнить. далее после вызова метода pipe() мы
    вызываем метод subscribe()*/
    this.subscription = intervalStream$
      .pipe(
        filter(value => value % 2 === 0),
        map(value => `Mapped value ${value}`)
      )
      .subscribe((value) => {
      console.log(value);
    });
  }

  /*в данном методе мы обращаемся к переменной, отвечающей за подписку, и для того,
  чтоб не было утечки памяти, в этом методе мы производим отписку*/
  stop() {
    this.subscription.unsubscribe();
  }
}
