import {Component, OnInit} from '@angular/core';
import {ITodo, TodosService} from './todos.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  /*создаем переменную, которая будет содержать в себе данные с сервера*/
  todos: Array<ITodo> = [];

  /*создаем переменную, которая будет хранить значение из инпута*/
  todoTitle = '';

  loading = false;

  error = '';

  /*инжектируем наш сервис по работе с сервером*/
  constructor(private todosService: TodosService) {
  }

  ngOnInit() {
    this.fetchTodos();
  }

  /*метод нажатия на кнопку 'добавить'*/
  addTodo() {
    if (!this.todoTitle.trim()) {
      return;
    }
    /*создаем переменную - request payload*/
    const newTodo: ITodo = {
      title: this.todoTitle,
      completed: false
    };

    this.todosService.addTodo(newTodo)
      /*подписываемся на выполнение запроса и после него пушим новый тудулист и
      очищаем инпут*/
      .subscribe((todo) => {
        this.todos.push(todo);
        this.todoTitle = '';
      });
  }

  /*метод загрузки тудулистов*/
  fetchTodos() {
    /*показываем прелоадер пока запрос на сервер не завершится*/
    this.loading = true;
    this.todosService.fetchTodos()
      .subscribe(response => {
        this.todos = response;
        this.loading = false;
      },
        error => {
          this.error = error.message;
        });
  }

  /*метод по удалению тудулиста*/
  removeTodo(id: number) {
    this.loading = true;
    this.todosService.removeTodo(id)
      .subscribe(() => {
        this.todos = this.todos.filter(t => t.id !== id);
        this.loading = false;
      });
  }

  /*метод по зачеркиванию завершенного тудулиста*/
  completeTodo(id: number) {
    this.loading = true;
    this.todosService.completeTodo(id)
      .subscribe(response => {
        this.todos.find(t => t.id === id).completed = true;
        this.loading = false;
      });
  }
}
