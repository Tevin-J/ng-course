import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';

export interface IPost {
  title: string;
  text: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  /*создаем промис, который через 4 секунды будет резолвисться строкой*/
  p: Promise<string> = new Promise<string>(resolve => {
    setTimeout(() => {
      resolve('promise resolved');
    }, 4000);
  });

  date$: Observable<Date> = new Observable(obs => {
    setInterval(() => {
      /*в Observable эмиттим новые данные*/
      obs.next(new Date());
    }, 1000);
  });

  /*переменная, которая будет хранить то значение, на которое мы подписались
  в ngOnInit у Observable*/
  date: Date

  /*при каждом subscribe получаем новую date и присваиваем ее переменной date. date$
  пометили символом доллара, так как это стрим, стримы обрабатываются методом subscribe.
  это сделано для реализации показа Observable без пайпа async*/
  ngOnInit(): void {
    this.date$.subscribe(date => {
      this.date = date;
    });
  }
}
