import {Component} from '@angular/core'
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  /*инжектируем переменную типа Router, чтоб иметь возможность программно при клике
  на кнопку перейти на определенный роут с помощью метода данного класса navigate*/
  constructor(private router: Router) {}

  goToPostsPage() {
    this.router.navigate(['/posts']);
  }
}
