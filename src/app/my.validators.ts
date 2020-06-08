import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';

/*создаем класс своих валидаторов*/
export class MyValidators {
  /*валидатор - статическая ф-я внутри данного класса, принимает переменную control типа FormControl
  и возвращает {} у которого ключ - строка и значение булево*/
  static restrictedEmail(control: FormControl): { [key: string]: boolean } {
    /*если то значение, которое пришло в this.restrictedEmail() содержит один из запрещенных емеилов,
    возвращаем ошибку, которую обработаем в шаблоне*/
    if (['b@mail.ru', 'test@mail.com'].includes(control.value)) {
      return {restrictedEmail: true};
    }
    /*если ошибки нет, то возвращаем null*/
    return null;
  }

  /*создаем асинхронный валидатор, который не просто возвращает ошибку в виде объекта с парой
  ключ-строка, значение-булево, а промис или обсервабл с таким типом*/
  static uniqEmail(control: FormControl): Promise<{ [key: string]: boolean }> | Observable<{ [key: string]: boolean }> {
    return new Promise(resolve => {
      setTimeout(() => {
        if (control.value === 'async@mail.ru') {
          resolve({uniqEmail: true});
        } else {
          resolve(null);
        }
      }, 2000);
    });
  }
}
