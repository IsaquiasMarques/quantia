import { AfterViewInit, Directive, ElementRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appColorInputDefaultValue]'
})
export class ColorInputDefaultValueDirective implements OnInit, OnChanges, AfterViewInit {

  @Input() inputName: string = 'color';
  @Input({ required: true }) defaultValue: string = '';
 
  constructor(private el: ElementRef<HTMLElement>) { }

  ngOnInit(): void {
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    
  }

  ngAfterViewInit(): void {
    let element = document.getElementById(this.inputName) as any;
    element.value = this.defaultValue;
  }

}
