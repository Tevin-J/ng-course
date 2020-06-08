import {Component, forwardRef, Provider} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

/*превращаем компонент в ngModel. спец тип в angular для провайда определенных сервисов
и других сущностей.*/
const VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SwitchComponent),
  multi: true
};

/*регистрируем VALUE_ACCESSOR в данной компоненте*/
@Component({
  selector: 'app-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss'],
  providers: [VALUE_ACCESSOR]
})
/*имплементируемся от класса ControlValueAccessor, в котором нужно прописать 4 метода.
эти методы показывают что наша компонента - ngModel*/
export class SwitchComponent implements ControlValueAccessor {

  /*заводим переменную, значением которой будем манипулировать в нашей ngForm*/
  state = 'off';

  /*создаем приватный метод onChange(). эту ф-ю мы должны зарегистрировать как
  метод registerOnChange и теперь при вызове ф-и onChange Angular будет
  самостоятельно аутпутить те изменения в данном компоненте наверх*/
  private onChange = (value: any) => {};

  /*метод клика на кнопку, изменяющий state. в этом методе мы можем писать любую логику
  по изменению данных. но когда мы завершим трансформацию данных, мы вызовем метод
  onChange(), чтоб сообщить что наша модель изменилась*/
  setState(state: string) {
    this.state = state;

    this.onChange(this.state);
  }

  /*метод, принимающий ф-ю, которая следит за изменениями*/
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  /*то же что и registerOnChange, но для мобильных устройств*/
  registerOnTouched(fn: any): void {
  }

  /*метод блокировки модели*/
  setDisabledState(isDisabled: boolean): void {
  }

  /*позволяет принимать значение из ngModel и записать ее в локальную переменную.
  здесь мы синхронизируем состояние в модели и в App компоненте*/
  writeValue(state: string): void {
    this.state = state;
  }
}
