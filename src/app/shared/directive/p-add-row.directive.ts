import { Directive, Input, HostListener, AfterViewInit } from '@angular/core';
import { Table } from 'primeng/table';

@Directive({
  selector: '[appPAddRow]'
})
export class PAddRowDirective implements AfterViewInit {

  @Input() table: Table;
  @Input() newRow: any;
  @Input() initRow: any;
  @HostListener('click', ['$event'])
  onClick(event: Event) {

    // Insert a new row
    this.table.value.push(this.newRow);

    // Set the new row in edit mode
    this.table.initRowEdit(this.newRow);

    event.preventDefault();
  }
  ngAfterViewInit() {
        // Insert a new row
        this.table.value.push(this.initRow);

        // Set the new row in edit mode
        this.table.initRowEdit(this.initRow);
  }

}
