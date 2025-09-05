import { Component, OnInit, Input } from '@angular/core';
import { MenuItem } from 'primeng/api/menuitem';
@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent implements OnInit {
  @Input() title = '';
  @Input() subtitle = '';
  @Input() nav: MenuItem[] = [];
  @Input() showBreadCrumb = true;
  constructor() { }

  ngOnInit(): void {
  }

}
