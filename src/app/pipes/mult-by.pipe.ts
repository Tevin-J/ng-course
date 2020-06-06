import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'mult'
})
/*класс пайпа должен имплементиться от типа PipeTransform, в котором есть обязательный
метод transform. этот метод принимает начальное значение данных и в этом методе они
трансформируются*/
export class MultByPipe implements PipeTransform {

  transform(num: number, pow: number = 2): number {
    return num * pow;
  }
}
