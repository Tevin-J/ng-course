import {Component, ContentChild, ElementRef, Input, OnInit} from '@angular/core';
import {IPost} from '../app.component';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  /*чтоб получить данные, которые нам отдала родительская компонента,
  нужно их обернуть декоратором @Input*/
  @Input() post: IPost;

  /*получаем html-элемент из родительской компоненты через декоратор @ContentChild()*/
  @ContentChild('info', {static: true}) infoRef: ElementRef
  constructor() { }

  ngOnInit(): void {
    console.log(this.infoRef.nativeElement);
  }

}
