import { Component } from '@angular/core';
import {AppCounterService} from '../services/app-counter.service';
import {LocalCounterService} from '../services/local-counter.service';

/*на каком этапе мы регистрируем сервис, у всех детей данной сущности будет доступ к
этому сервису. то есть если мы регистрируем сервис в корневом модуле - он будет
синглтоном для всех детей этого модуля и любые изменения данных из этого сервиса в
одной компоненте приведет к таким же изменениям таких же данных другой компоненты,
которая использует этот сервис. если же мы регистрируем сервис локально для конкретной
компоненты, то для нее создается экземпляр данного сервиса, и изменение данных этого
экземпляра сервиса никак не повлияет на аналогичные данных в другом экземпляре этого
сервиса, который локально использует другая компонента*/
@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss'],
  providers: [LocalCounterService]
})
export class CounterComponent {

  constructor(
    private appCounterService: AppCounterService,
    private localCounterService: LocalCounterService
  ) { }

}
