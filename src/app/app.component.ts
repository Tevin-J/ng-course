import { Component } from '@angular/core';
export interface IPost {
  title: string
  text: string
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  /*текст инпута*/
  search: ''

  /*свойство по которому делаем фильтрацию*/
  searchField = 'title'

  /*массив постов*/
  posts: Array<IPost> = [
    {title: 'beer', text: 'the best beer'},
    {title: 'bread', text: 'the best bread'},
    {title: 'javascript', text: 'the best language'},
  ];

  addPost() {
    this.posts.unshift({
      title: 'new post',
      text: 'text of new post'
    });
  }
}
