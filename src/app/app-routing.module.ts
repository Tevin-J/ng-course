import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {AboutComponent} from './about/about.component';
import {PostsComponent} from './posts/posts.component';
import {PostComponent} from './post/post.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'about', component: AboutComponent},
  {path: 'posts', component: PostsComponent},
  {path: 'posts/:id', component: PostComponent},
];
@NgModule({
  /*регистрация входящих величин для данного модуля*/
  imports: [RouterModule.forRoot(routes)],
  /*открвает публичный api для доступа к тем данным которые мы в этот модуль передаем*/
  exports: [RouterModule]
})
export class AppRoutingModule {

}
