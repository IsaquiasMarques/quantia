import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { executeWhenReady } from '@shared/helpers/execute-when-ready.func';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrl: './select.component.css'
})
export class SelectComponent implements OnInit, OnChanges, AfterViewInit {

  @Input() label: string = 'Label';
  @Input() name: string = 'label';
  @Input() items!: any[];
  @Input() optionValue!: string;
  @Input() optionName!: string;
  @Input() placeholder!: string;
  @Input() multi: boolean = false;
  @Input() clearSelection: boolean = false;

  // states
  touched: boolean = false;
  isInvalid: boolean = false;
  @Input() required: boolean = false;

  @Output() selectedItemsEventEmitter: EventEmitter<any[]> = new EventEmitter<any[]>();

  selectedItems: any[] = [];
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
    this.filteredItems = this.items;
    this.countItems();

    if(this.clearSelection){
      this.selectedItems = [];
    }
  }
  
  ngAfterViewInit(): void {
    this.countItems();
  }

  countItems(){
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
    let itemIndex = this.itemIndex(item[this.optionValue]);
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
    return this.selectedItems.findIndex(item => item[this.optionValue] === itemValue);
  }

  searchItem(): void{
    if(this.selectSearchTerm.length !== 0){
      this.filteredItems = this.items.filter(item => item[this.optionName].toLowerCase().includes(this.selectSearchTerm.toLocaleLowerCase()));
    }else{
      this.filteredItems = this.items;
    }
  }

  inputPlaceholderContentChange(){
    let getItemsNames: string[] = [];
    this.selectedItems.forEach(item => {
      getItemsNames.push(item[this.optionName]);
    });
    let joined = getItemsNames.join(', ');
    if(getItemsNames.length > 0){
      this.placeholderDisplay = joined;
    }else {
      this.placeholderDisplay = this.placeholder;
    }
  }

}