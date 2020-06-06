import {Directive, ElementRef, HostListener, Input, Renderer2} from '@angular/core';

/*создаем свою собственную директиву, отвечающую за стили, помечаем данный
класс декоратором @Directive, и в метаданных прописываем свойство selector,
которое является строкой, значение которой взято в квадратные скобки*/
@Directive({
  selector: '[appStyle]'
})

export class StyleDirective {

  /*получаем параметры из шаблона в директиву и используем эту переменную
  для изменения стилей, должны в скобках указать ее имя из шаблона*/
  @Input('appStyle') color = 'blue';
  @Input('fontWeight') fontWeight = 'normal';

  /*в конструкторе делаем dependency injection, создаем приватную переменную, в
  которую инжектируем объект типа ElementRef, у этого объекта есть свойство
  nativeElement, в котором мы получаем доступ к текущему html-элементу. также мы
  инжектируем в директиву еще один объект типа Renderer2. у этого объекта есть
  методы по изменению стилей для того html-элемента, который мы укажем*/
  constructor(
    private renderer2: Renderer2,
    private elementRef: ElementRef
  ) {
    this.renderer2.setStyle(this.elementRef.nativeElement, 'color', 'orange');
  }

  /*декоратор @HostListener служит для добавления событий в директиву. принимает
  название события и массив с событием. далее добавляем директиве метод, в котором
  будем изменять стили для выбранного html-элемента когда выполнится событие*/
  @HostListener('click', ['$event.target']) onClick(event: Event) {
    console.log(event);
  }

  @HostListener('mouseenter') onEnter() {
    this.renderer2.setStyle(this.elementRef.nativeElement, 'color', this.color);
    this.renderer2.setStyle(this.elementRef.nativeElement, 'fontWeight', this.fontWeight);
  }

  @HostListener('mouseleave') onLeave() {
    this.renderer2.setStyle(this.elementRef.nativeElement, 'color', null);
    this.renderer2.setStyle(this.elementRef.nativeElement, 'fontWeight', null);
  }
}
