import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[appIfnot]'
})
export class IfnotDirective {

  /*получаем свойство-сеттер, которое получает какое-то булево значение, на основании
  которого будут происходить изменения с отрисовкой блока в ViewContainerRef*/
  @Input('appIfnot') set ifNot(condition: boolean) {
    if (!condition) {
      /*показать элемент*/
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      /*скрыть*/
      this.viewContainer.clear();
    }
  }

  /*для создания своей собственной структурной директивы, необходимо инжектировать
  2 сущности: TemplateRef, дающая доступ до шаблона внутри тега ng-template и
  ViewContainerRef, дающая доступ к самому тегу ng-template. ng-template оборачивает
  разметку, которую мы хотим поместить в собственную структурную директиву*/
  constructor(private templateRef: TemplateRef<any>,
              private viewContainer: ViewContainerRef) { }

}
