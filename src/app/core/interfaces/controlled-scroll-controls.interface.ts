import { ElementRef } from "@angular/core";

export interface ControlledScrollControls{
    limitedContainerElementRef: ElementRef<HTMLElement>;
    scrollerElementRef: ElementRef<HTMLElement>;
    prev(): void;
    next(): void;
    slideTo(index: number): void;
    scrollToActiveIndex(activeIndex: number): void;
}