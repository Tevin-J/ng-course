import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {FormsModule} from '@angular/forms';
import { CounterComponent } from './counter/counter.component';

@NgModule({
  declarations: [
    AppComponent,
    CounterComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  /*регистрация сервисов происходит в модуле в свойстве providers,
  однако их можно здесь не прописывать, для этого у сервиса должен быть
  декоратор @Injectable({providedIn: 'root'})*/
  providers: [
    /*AppCounterService*/
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
