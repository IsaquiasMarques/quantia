import { AfterViewInit, Directive, ElementRef, EventEmitter, HostListener, Output, signal, WritableSignal } from "@angular/core";
import { LoaderSupporter } from "./loader-supporter.class";
import { ControlledScrollControls } from "@core/interfaces/controlled-scroll-controls.interface";

@Directive()
export class ControlledScrollWithLoader extends LoaderSupporter implements ControlledScrollControls, AfterViewInit {

    private initialX: number | null = null;
    private initialY: number | null = null;
    
    protected activeIndex = 0;
    @Output() protected activeIndexEventEmitter: EventEmitter<number> = new EventEmitter<number>();
    protected itemsArray: any[] = [];

    scrollerElementRef!: ElementRef<HTMLElement>;
    limitedContainerElementRef!: ElementRef<HTMLElement>;
    
    protected paddingX: WritableSignal<any> = signal(0);

    constructor() {
        super();
    }

    ngAfterViewInit(): void {
        this.bootstrap();
        this.valueToPadding();
    }

    protected bootstrap(){}
    
    @HostListener('window:resize', ['$event']) onResize(){
        this.valueToPadding();
    }

    protected valueToPadding(){
        this.paddingX.update(val => val = this.limitedContainerElementRef.nativeElement.offsetLeft);
    }
    
    next(){
        if(this.activeIndex === this.itemsArray.length - 1){
            return;
        }else{
            this.activeIndex++;
        }
        this.scrollToActiveIndex(this.activeIndex);
    }

    prev(){
        if(this.activeIndex === 0){
            return;
        }else { 
            this.activeIndex--;
        }
        this.scrollToActiveIndex(this.activeIndex);
    }

    slideTo(index: number){
        this.activeIndex = index;
        this.scrollToActiveIndex(this.activeIndex);
    }
    
    scrollToActiveIndex(activeIndex: number){
        let TIPS_CONTAINER_INDEX = 0;
        let scrollerElementRefChildrensAsHtmlElement = this.scrollerElementRef.nativeElement.childNodes[TIPS_CONTAINER_INDEX] as HTMLElement;
        let getActiveItemByActiveIndexAsHtmlElement = scrollerElementRefChildrensAsHtmlElement.children[activeIndex] as HTMLElement;
        this.scrollerElementRef.nativeElement.scrollTo(getActiveItemByActiveIndexAsHtmlElement.offsetLeft - this.paddingX(), 0)
        
        this.activeIndexEventEmitter.emit(this.activeIndex);
    }

    @HostListener('touchstart', ['$event'])
    public captureInitialXOnTouchStart($event: any){
        this.initialX = $event.touches[0].clientX;
        this.initialY = $event.touches[0].clientY;
    }

    @HostListener('touchmove', ['$event'])
    public carouselTouchMoveEventHandler($event: any){

        if(this.initialX === null || this.initialY === null) return;
        var currentX = $event.touches[0].clientX;
        var currentY = $event.touches[0].clientY;

        var deltaX = currentX - this.initialX;
        var deltaY = currentY - this.initialY;

        if(Math.abs(deltaX) > Math.abs(deltaY)){
            // $event.preventDefault();
            if(deltaX < 0){
                this.next();
            }else{
                this.prev();
            }
        }

        this.initialX = null;
        this.initialY = null;

    }

    @HostListener('wheel', ['$event'])
    public carouselWheelEventHandler($event: any){        
        this.initialX = $event.clientX;
        this.initialY = $event.clientY;
        
        if(this.initialX === null || this.initialY === null) return;

        var deltaX = $event.deltaX;
        var deltaY = $event.deltaY;

        if(Math.abs(deltaX) > Math.abs(deltaY)){
            $event.preventDefault();
            if(deltaX > 0){
                // this.next();
            }else{
                // this.prev();
            }
        }

        this.initialX = null;
        this.initialY = null;

    }

}