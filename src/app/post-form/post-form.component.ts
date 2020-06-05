import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import { IPost } from '../app.component';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {

  /*чтоб данные передать из дочерней компоненты в родительскую, нужно их
  передать через переменную, которая будет иметь декоратор @Output(), также
  эта переменная должна быть создана от класса EventEmitter, в котором
  мы в дженерике указываем, какого типа данные принимает эта переменная*/
  @Output() onAdd: EventEmitter<IPost> = new EventEmitter<IPost>();

  /*с помощью ViewChild получаем в переменной inputRef доступ до указанного
  DOM-элемента. titleInput мы пометили в шаблоне с помощью #titleInput.*/
  @ViewChild('titleInput') inputRef: ElementRef;
  title = '';
  text = '';

  constructor() { }

  ngOnInit(): void {
  }

  /*с помощью 2-way-binding для title и text, у нас при вводе в инпут будут
  обновляться свойства title и text. когда мы нажимаем на кнопку добавить -
  вызыватся метод addPost, который проверяет заполнены ли инпуты и создает
  пост, затем обнуляя инпуты*/
  addPost() {
    if (this.title.trim() && this.text.trim()) {
      const post: IPost = {
        title: this.title,
        text: this.text
      };

      /*с помощью метода emit переменной, созданной от класса EventEmitter,
      дочерняя компонента передаст в родительскую указанные данные*/
      this.onAdd.emit(post);

      this.title = this.text = '';
    }
  }

  /*при клике на кнопку вызываем этот метод, который обращается к переменной,
  хранящей указанный DOM-элемент, и обращаемся к его свойство nativeElement и
  его методу focus(). поэтому при клике на кнопку у нас происходит фокус на инпут*/
  focusTitle() {
    this.inputRef.nativeElement.focus();
  }

}
