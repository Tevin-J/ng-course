import { Component } from '@angular/core';

export interface IPost {
  title: string;
  text: string;
  id?: number;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  posts: Array<IPost> = [
    {title: 'Хочу выучить Angular компоненты', text: 'еще учу компоненты', id: 1},
    {title: 'Следующий блок', text: 'Будет про директивы', id: 2},
  ];

  updatePosts(post) {
    this.posts.unshift(post);
  }
}
