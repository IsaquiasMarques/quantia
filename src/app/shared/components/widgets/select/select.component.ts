import { AfterViewInit, Component, ElementRef, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { LoaderSupporter } from '@core/classes/abstracts/loader-supporter.class';
import { LoaderActionEnum } from '@core/enums/loader/loader.enum';
import { Loader } from '@core/services/loader/loader.service';
import { executeWhenReady } from '@shared/helpers/execute-when-ready.func';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrl: './select.component.css'
})
export class SelectComponent extends LoaderSupporter implements OnInit, OnChanges, AfterViewInit {

  @Input() label: string = 'Label';
  @Input() name: string = 'label';
  @Input({ required: true }) items!: any[];
  @Input({ required: true }) option!: { value: string, name: string, searchByAttribute?: string };
  @Input() optionRenderization: { render: boolean, type: 'svg' | 'img', attribute: string } = { render: false, type: 'svg', attribute: '' }
  @Input({ required: true }) placeholder!: string;
  @Input() multi: boolean = false;
  @Input() clearSelection: boolean = false;
  @Input({ required: true }) override loaderActionEnum!: LoaderActionEnum;

  // states
  touched: boolean = false;
  isInvalid: boolean = false;
  @Input() required: boolean = false;

  @Output() selectedItemsEventEmitter: EventEmitter<any[]> = new EventEmitter<any[]>();

  @Input() selectedItems: any[] = [];
  selectedItemsAlreadyFromParent: any[] = [];
  filteredItems: any[] = [];

  placeholderDisplay: string = '';

  selectSearchTerm: string = '';

  isSelectExpanded: boolean = false;
  maxHeightOfDropdown: number = 0;

  staticSearchInputHeight: number = 0;

  contentInitiated: boolean = false;

  @ViewChild('selectDropdownReference') selectDropdownReference!: ElementRef<HTMLElement>;

  ngOnInit(): void {
    
  }

  ngOnChanges(changes: SimpleChanges): void {

    this.placeholderDisplay = this.placeholder;

    if(this.loader$()){
      this.countItemsWhileLoading();
      return;
    }
    
    if(this.selectedItems.length > 0){
      this.inputPlaceholderContentChange();
      this.selectedItemsEventEmitter.emit(this.selectedItems);
    }

    this.filteredItems = this.items;
    this.countItemsAfterLoading();
    
    if(this.clearSelection){
      this.selectedItems = [];
    }
  }
  
  ngAfterViewInit(): void {
    if(this.loader$()){
      this.countItemsWhileLoading();
    } else {
      this.countItemsAfterLoading();
    }
  }

  countItemsAfterLoading(){
    if(!(this.items.length > 0)) return;
    const selectDropdownReference = document.querySelector(`.dropdown-${ this.name }`) as HTMLElement;
    if(!selectDropdownReference) return;
    const searchInputElementReferenceIndex = 0;
    const itemsListElementReferenceIndex = 1;

    this.staticSearchInputHeight = selectDropdownReference.children[searchInputElementReferenceIndex].clientHeight;

    executeWhenReady(
      selectDropdownReference.children[itemsListElementReferenceIndex].children,
      () => {
        for (let index = 0; index < selectDropdownReference.children[itemsListElementReferenceIndex].children.length; index++) {
          this.maxHeightOfDropdown += selectDropdownReference.children[itemsListElementReferenceIndex].children[index].clientHeight;
        }
      }
    )
  }

  countItemsWhileLoading(): void{
    const selectDropdownReference = document.querySelector(`.dropdown-${ this.name }`) as HTMLElement;
    if(!selectDropdownReference) return;
    if(this.loader$()){
      for (let index = 0; index < selectDropdownReference.children.length; index++) {
        this.maxHeightOfDropdown += selectDropdownReference.children[index].clientHeight;
      }
      return;
    }
  }

  toggleSelectVisibility(){
    if(this.isSelectExpanded){
      this.collapse();
    } else {
      this.expand();
    }
  }

  clearFiltering(): void{
    this.selectSearchTerm = '';
    this.searchItem();
  }

  collapse(){
    this.isSelectExpanded = false;
    this.clearFiltering();
    if(this.touched && !(this.selectedItems.length > 0) && this.required){
      this.isInvalid = true;
    } else {
      this.isInvalid = false;
    }
  }

  expand(){
    this.isSelectExpanded = true;
    this.touched = true;
  }

  selectItem(item: any){
    let itemIndex = this.itemIndex(item[this.option.value]);
    if(itemIndex === -1){
      if(this.multi){
        this.selectedItems.push(item);
      }else{
        this.selectedItems = [item];
        this.collapse();
      }
    }else{ 
      this.selectedItems.splice(itemIndex, 1);
    }

    this.inputPlaceholderContentChange();
    this.selectedItemsEventEmitter.emit(this.selectedItems);
  }

  itemIndex(itemValue: any): number{
    return this.selectedItems.findIndex(item => item[this.option.value] === itemValue);
  }

  searchItem(): void{
    if(this.selectSearchTerm.length !== 0){
      this.filteredItems = this.items.filter(item => ((this.option.searchByAttribute) ? item[this.option.searchByAttribute] : item[this.option.name]).toLowerCase().includes(this.selectSearchTerm.toLocaleLowerCase()));
    }else{
      this.filteredItems = this.items;
    }
  }

  inputPlaceholderContentChange(){
    let getItemsNames: string[] = [];
    this.selectedItems.forEach(item => {
      getItemsNames.push(item[this.option.name]);
    });
    let joined = getItemsNames.join(', ');
    if(getItemsNames.length > 0){
      this.placeholderDisplay = joined;
    }else {
      this.placeholderDisplay = this.placeholder;
    }
  }

}