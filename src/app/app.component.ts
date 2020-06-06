import {Component} from '@angular/core';
import {Subscription, Subject} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  /*создаем переменную с типом из библиотеки rxjs Subscription. и теперь в данную
  переменную мы можем складыывать результат работы метода subscribe()*/
  subscription: Subscription;

  /*создаем стрим с помощью экземпляра класса Subject библиотеки rxjs. у данного
  стрима появляется метод next(), позволяющий при его вызове попадать внутрь subscribe*/
  stream$: Subject<number> = new Subject<number>()

  /*создаем переменную для счетчика, значение которого будем увеличивать при
  нажатии на кнопку и отрисовывать внутри subscribe*/
  counter = 0;

  /*в конструкторе подписываем стрим на выполнение ф-и по выводу в консоль значения счетчика*/
  constructor() {
    this.subscription = this.stream$.subscribe(value => {
      console.log('Subscribe', value);
    });
  }

  /*в данном методе мы обращаемся к переменной, отвечающей за подписку, и для того,
  чтоб не было утечки памяти, в этом методе мы производим отписку*/
  stop() {
    this.subscription.unsubscribe();
  }

  /*у стрима, созданного с помощью класса Subject есть метод next(), с помощью
  которого мы можем автоматически заходить в метод subscribe. мы хотим при нажатии
  на кнопку в шаблоне выполнять код, который находится в subscribe. то есть вручную
  эмиттить какие-то события, за которыми будет следить стрим и выполнять действия
  с теми данными которые мы в subscribe отправим*/
  myNext() {
    this.counter++;
    this.stream$.next(this.counter);
  }
}
