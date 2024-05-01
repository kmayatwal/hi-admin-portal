import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-hi-select-box',
  templateUrl: './hi-select-box.component.html',
  styleUrls: ['../common.style.scss', './hi-select-box.component.scss']
})
export class HiSelectBoxComponent implements OnInit {

  // Type of Select
  @Input('type') type: string;

  // Type of Select
  @Input('selectedList') selectedList: any;

  // Search Enable
  @Input('searchEnable') searchEnable: boolean;

  // Show Typed Text
  @Input('showTyped') showTyped: boolean;

  // Show Typed Text
  @Input('typedValue') typedValue: string;

  // Data List
  @Input('dataList') dataList: any;

  // TODO : for sending back the data object from the original list
  @Input('originalDataList') originalDataList: any;

  // Set Item in Parent Component
  @Output('setItemInComponent') setItemInComponent: EventEmitter<any> = new EventEmitter<any>();

  // width of Parent Element
  @Input('width') elmentWidth: any;

  // Text Style of Select Box Text
  @Input('textStyle') textStyle: any;

  // For Serach Value
  search = '';

  // Serarch Icon Show or not
  @Input('showSearchIcon') showSearchIcon: boolean = true;

  constructor() { }

  ngOnInit(): void {
    // Check of originalDataList
    if (this.searchEnable && !this.originalDataList) {
      throw Error('Please pass originalDataList');
    }

    // Arrange Already Selected data
    if (this.type === 'multiSelect') {
      this.selectedList.map((item) => {
        let indexOf = this.originalDataList.findIndex((ele) => { return ele.value === item });
        let tempItem = this.originalDataList[indexOf];
        if (tempItem) {
          tempItem.isSelected = true;
          this.originalDataList[indexOf] = tempItem;
          this.dataList[indexOf] = tempItem;
        }
      });
    }
  }

  // For Search Item
  serachItem(val) {

    let list = [];
    this.originalDataList.map((item) => {
      if (item?.value?.toUpperCase()?.indexOf(val?.toUpperCase()) > -1 || item.name?.toUpperCase().indexOf(val.toUpperCase()) > -1) {
        list.push(item);
      }
    });

    this.dataList = list;
  }

  // For Setting Item in Original Component
  setItem(item, index = 0) {
    if (this.type === 'multiSelect') {
      let indexOf = this.originalDataList.findIndex((ele) => { return ele.value === item.value });
      let tempItem = this.originalDataList[indexOf];
      tempItem.isSelected = !tempItem.isSelected;
      this.originalDataList[indexOf] = tempItem;
      this.dataList[index] = tempItem;
    }
    this.setItemInComponent.next(item);
  }

}
