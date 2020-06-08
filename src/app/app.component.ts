import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MyValidators} from './my.validators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
/*создаем переменную для формы и в ngOnInit ее инициализируем*/
export class AppComponent implements OnInit {
  form: FormGroup;

  /*при инициализации формы можем внутри нее заинициализировать контролы,
  в контроы передаем 2 параметра: начальное значение инпута и массив валидаторов.
  так же добавили наш собственный валидатор из класса MyValidators*/
  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required, MyValidators.restrictedEmail], [MyValidators.uniqEmail]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),

      /*контролы country и city мы хотим сгруппировать в объект address. для этого создадим
      экземпляр класса FormGroup, в который поместим данные контролы*/
      address: new FormGroup({
        country: new FormControl('ru'),
        city: new FormControl('', Validators.required)
      })
    });
  }

  /*метод для сабмита формы*/
  submit() {
    if (!this.form.invalid) {
      console.log(this.form);
      const formData = this.form.value;
      console.log('Form Data: ', formData);

      /*очищаем форму после сабмита*/
      this.form.reset();
    }
  }

  /*метод для динамического обновления поля "город" при нажатии на кнопку "выбрать столицу"
  в зависимости от того, что указано в поле "страна". создаем карту с ключами, являющимися
  значениями контрола "страна"*/
  selectCapital() {
    const cityMap = {
      ru: 'Москва',
      ua: 'Киев',
      by: 'Минск'
    };

    /*получаем значение контрола, которое будет соответствовать ключу карты*/
    const cityKey = this.form.get('address').get('country').value;
    const city = cityMap[cityKey];

    /*с помощью метода формы patchValue() создаем динамическое обновление формы. мы залезаем
    в свойство address формы и в его свойстве city присваиваем значение city, полученное из
    значения карты с соответствующим ключом*/
    this.form.patchValue({address: {city}});
  }
}
