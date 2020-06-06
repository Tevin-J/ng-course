import { Pipe, PipeTransform } from '@angular/core';
import {IPost} from '../app.component';

/*изначально пайп pure - метод transform вызывается только в том случае если
инпут-данные метода изменились, но в той ситуации когда мы например с одной
стороны ищем пост среди списка постов, и в этот момент добавляем пост, который
соответствует значению в поиске, то если pure=true, мы не увидим этого нового поста,
а если pure=true - увидим. то есть мы меняем стратегию поведения пайпа. используется
только при необходимости, так как нарушается оптимизация пайпов*/
@Pipe({
  name: 'filter',
  pure: false
})
/*создаем пайп для фильтрации постов по значению свойств title или text*/
export class FilterPipe implements PipeTransform {

  /*на вход пайпа получаем массив постов, значение из инпута и значение свойства по
  которому необходимо будет производить фильтрацию постов*/
  transform(posts: Array<IPost>, search: string = '', field: string = 'title'): Array<IPost> {
    /*если строка в инпуте пустая, возвращаем все посты, иначе фильтруем массив из тех свойств
    которые указаны в field по тому значению, которое указано в инпуте*/
    if (!search.trim()) {
      return posts;
    } else {
      return posts.filter(p => p[field].toLowerCase().includes(search.toLowerCase()));
    }
  }

}
