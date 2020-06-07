import {Injectable} from '@angular/core';
import {LogService} from './log.service';

/*хоть сервисы и можно создавать без указания декоратора, все же лучше указывать
декоратор @Injectable(), это позволяет инжектировать в сервис другие сервисы.
так же указав внутри декоратора свойство providedIn: 'root', мы можем не импортировать
данный сервис в корневой модуль - это сделает Angular за нас*/
@Injectable({
  providedIn: 'root'
})

/*сервис - единственная сущность в Angular, которая может идти без декоратора*/
export class AppCounterService {
  counter = 0;

  /*в конструкторе сервиса мы инжектировали другой сервис и пользуемся его
  методом для вывода сообщений в консоль*/
  constructor(private logService: LogService) {}

  increase() {
    this.logService.log('value has been increased')
    this.counter++;
  }

  decrease() {
    this.logService.log('value has been decreased')
    this.counter--;
  }
}
