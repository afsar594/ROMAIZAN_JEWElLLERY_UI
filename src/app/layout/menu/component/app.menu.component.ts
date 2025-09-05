import { VisacompanymasterComponent } from './../../../routes/view/master/visacompanymaster/visacompanymaster.component';
import { Component, OnInit } from '@angular/core';
import { MegaMenuItem } from 'primeng';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-menu',
  templateUrl: './app.menu.component.html',
  styles: [`
  ::ng-deep {
      .ui-megamenu {
          background-color: #0d526b !important;
  
          .ui-megamenu-submenu-header {
              background-color: #246f8b !important;
              color: white !important;
          }
  
          .ui-megamenu-panel {
              background-color: #0d526b !important;
              overflow-y: scroll !important;
              height: 300px !important;
             
          }
  
          .ui-menuitem-link {
              color: beige !important;
              background-color: #0d526b !important;
  
              .ui-menuitem-text {
                  color: beige !important;
              }
  
              .ui-menuitem-icon {
                  color: beige !important;
              }
  
              .ui-submenu-icon {
                  color: beige !important;
              }  
          }
  
          .ui-megamenu-submenu {
              width: 17.5em !important;
          }
  
          .ui-menuitem.ui-menuitem-active>.ui-menuitem-link {
              background-color: #246f8b !important;
              border: 1px solid #246f8b !important;
          }
  
          .ui-menuitem-link:not(.ui-state-disabled):hover {
              background-color: #246f8b !important;
          }
      }
  }`]
})
export class AppMenuComponent implements OnInit {

  model: any[];
  items: MegaMenuItem[];
  constructor(public app: AppComponent) { }

  ngOnInit() {
    this.model = [
      { label: 'Dashboard', icon: 'fa fa-fw fa-home', routerLink: ['/'] },
      {
        label: 'Master', icon: 'fa fa-fw fa-gg',
        items: [
          {
            label: 'Currency', icon: 'fa fa-fw fa-sign-in', routerLink: ['/master/currencymaster']
          },
          {
            label: 'Company Master', icon: 'fa fa-fw fa-sign-in', routerLink: ['/master/companymaster']
          },
          {
            label: 'Visa Company Master', icon: 'fa fa-fw fa-sign-in', routerLink: ['/master/visacompanymaster']
          },
          {
            label: 'Staff Master', icon: 'fa fa-fw fa-sign-in', routerLink: ['/master/staffmaster']
          },
          {
            label: 'Department Master', icon: 'fa fa-fw fa-sign-in', routerLink: ['/master/departmentmaster']
          },
          {
            label: 'Designation Master', icon: 'fa fa-fw fa-sign-in', routerLink: ['/master/designationmaster']
          },
          {
            label: 'Visa Company Designation', icon: 'fa fa-fw fa-sign-in', routerLink: ['/master/visacompanydesignation']
          },
          {
            routerLink: ['/master/cadermaster'],
            label: 'Cader Master',
            icon: 'fa fa-fw fa-sign-in'
          },
          {
            routerLink: ['/master/dashboard'],
            label: 'Dashboard',
            icon: 'fa fa-fw fa-sign-in'
          },
          {
            routerLink: ['/master/grade'],
            label: 'Grade / Level',
            icon: 'fa fa-fw fa-sign-in'
          },
          {
            routerLink: ['/master/qualification'],
            label: 'Qualification Master',
            icon: 'fa fa-fw fa-sign-in'
          },
          {
            routerLink: ['/master/language'],
            label: 'Language',
            icon: 'fa fa-fw fa-sign-in'
          },
          {
            routerLink: ['/master/gratuityamountpolicy'],
            label: 'Gratuity Amount Policy',
            icon: 'fa fa-fw fa-sign-in'
          },
          {
            routerLink: ['/master/leavesalaryamountpolicy'],
            label: 'Leave Salary Amount Policy',
            icon: 'fa fa-fw fa-sign-in'
          },
          {
            routerLink: ['/master/nationalmaster'],
            label: 'Nationality Master',
            icon: 'fa fa-fw fa-sign-in'
          },
          {
            routerLink: ['/master/bloodgroup'],
            label: 'Blood Group',
            icon: 'fa fa-fw fa-sign-in'
          },
          {
            routerLink: ['/master/religionmaster'],
            label: 'Religion Master',
            icon: 'fa fa-fw fa-sign-in'
          },
          {
            routerLink: ['/master/relationmaster'],
            label: 'Relation Master',
            icon: 'fa fa-fw fa-sign-in'
          },
          {
            routerLink: ['/master/shifttype'],
            label: 'Shift Types',
            icon: 'fa fa-fw fa-sign-in'
          },
          {
            routerLink: ['/master/shiftmaster'],
            label: 'Shift Master',
            icon: 'fa fa-fw fa-sign-in'
          },
          {
            routerLink: ['/master/documenttype'],
            label: 'Document Type',
            icon: 'fa fa-fw fa-sign-in'
          },
          {
            routerLink: ['/master/sitemaster'],
            label: 'Site Master',
            icon: 'fa fa-fw fa-sign-in'
          },
          {
            routerLink: ['/master/agentmaster'],
            label: 'Agent Master',
            icon: 'fa fa-fw fa-sign-in'
          },
          {
            routerLink: ['/master/bankmaster'],
            label: 'Bank Master',
            icon: 'fa fa-fw fa-sign-in'
          },
          {
            routerLink: ['/master/addresstypes'],
            label: 'Address Properties',
            icon: 'fa fa-fw fa-sign-in'
          },
          {
            routerLink: ['/master/increment'],
            label: 'Increment',
            icon: 'fa fa-fw fa-sign-in'
          },
          {
            routerLink: ['/master/stafftype'],
            label: 'Staff Type',
            icon: 'fa fa-fw fa-sign-in'
          },
          {
            routerLink: ['/master/leavetypes'],
            label: 'Leave Type',
            icon: 'fa fa-fw fa-sign-in'
          },
          {
            routerLink: ['/master/vehiclemaster'],
            label: 'Vehicle Master',
            icon: 'fa fa-fw fa-sign-in'
          },
          {
            routerLink: ['/master/salaryheads'],
            label: 'Salary Heads',
            icon: 'fa fa-fw fa-sign-in'
          },
          {
            routerLink: ['/master/assetmaster'],
            label: 'Asset Master',
            icon: 'fa fa-fw fa-sign-in'
          },
          {
            routerLink: ['/master/airportlocation'],
            label: 'Airport Location',
            icon: 'fa fa-fw fa-sign-in'
          },
          {
            routerLink: ['/master/address'],
            label: 'Address',
            icon: 'fa fa-fw fa-sign-in'
          },
          {
            routerLink: ['/master/addairticket'],
            label: 'Air Ticket',
            icon: 'fa fa-fw fa-sign-in'
          },

        ]
      },
      {
        label: 'Account', icon: 'fa fa-fw fa-book',
        items: [
          { label: 'Menu1', icon: 'fa fa-fw fa-gear', routerLink: ['/documentation'] },
          { label: 'Menu2', icon: 'fa fa-fw fa-wrench', routerLink: ['/utils'] }
        ]
      },
      // {
      //   label: 'Store And WareHouses', icon: 'fa fa-fw fa-book',
      //   items: [
      //     { label: 'Menu1', icon: 'fa fa-fw fa-gear', routerLink: ['/documentation'] },
      //     { label: 'Menu2', icon: 'fa fa-fw fa-wrench', routerLink: ['/utils'] }
      //   ]
      // },
      // {
      //   label: 'Sales', icon: 'fa fa-fw fa-book',
      //   items: [
      //     { label: 'Menu1', icon: 'fa fa-fw fa-gear', routerLink: ['/documentation'] },
      //     { label: 'Menu2', icon: 'fa fa-fw fa-wrench', routerLink: ['/utils'] }
      //   ]
      // },


      // {
      //   label: 'Procurement', icon: 'fa fa-fw fa-book',
      //   items: [
      //     { label: 'Menu1', icon: 'fa fa-fw fa-gear', routerLink: ['/documentation'] },
      //     { label: 'Menu2', icon: 'fa fa-fw fa-wrench', routerLink: ['/utils'] }
      //   ]
      // },
      // {
      //   label: 'MIS Report', icon: 'fa fa-fw fa-book',
      //   items: [
      //     { label: 'Document Detail', icon: 'fa fa-fw fa-gear', routerLink: ['/misreport/documentdetail'] },
      //     { label: 'Staff Detail', icon: 'fa fa-fw fa-gear', routerLink: ['/misreport/staffdetail'] },
      //     { label: 'Loan Detail', icon: 'fa fa-fw fa-gear', routerLink: ['/misreport/loandetail'] },
      //     { label: 'Leave Detail', icon: 'fa fa-fw fa-gear', routerLink: ['/misreport/leavedetail'] },
      //     { label: 'Passport In/Out Detail', icon: 'fa fa-fw fa-gear', routerLink: ['/misreport/passport'] },
      //     { label: 'Birthday Alert', icon: 'fa fa-fw fa-gear', routerLink: ['/misreport/birthdayalert'] },
      //     { label: 'Loan History', icon: 'fa fa-fw fa-gear', routerLink: ['/misreport/loanhistory'] },
      //     { label: 'Increment History', icon: 'fa fa-fw fa-gear', routerLink: ['/misreport/incrementhistory'] },
      //     { label: 'Salary Package', icon: 'fa fa-fw fa-gear', routerLink: ['/misreport/salarypackagereport'] },
      //     { label: 'Gratuity / Leave Salary History', icon: 'fa fa-fw fa-gear', routerLink: ['/misreport/graruity-leave-salary'] },
      //     { label: 'Air Ticket', icon: 'fa fa-fw fa-gear', routerLink: ['/misreport/airticket'] },
      //     { routerLink: ['/misreport/nationalitygrade'], label: 'Nationality Grade', icon: 'fa fa-fw fa-sign-in' }
      //   ]
      // },
      {
        label: 'Administration', icon: 'fa fa-fw fa-book',
        items: [
          { label: 'Menu1', icon: 'fa fa-fw fa-gear', routerLink: ['/documentation'] },
          { label: 'Menu2', icon: 'fa fa-fw fa-wrench', routerLink: ['/utils'] }
        ]
      },
      {
        label: 'Transaction', icon: 'fa fa-fw fa-book',
        items: [
          {
            label: 'Loan Entry', icon: 'fa fa-fw fa-sign-in', routerLink: ['/transaction/Loanentry']
          },
          {
            label: 'Multi Leave Entry', icon: 'fa fa-fw fa-sign-in', routerLink: ['/transaction/multileaveentry']
          },
          {
            label: 'Leave openings', icon: 'fa fa-fw fa-sign-in', routerLink: ['/transaction/leaveopenings']
          },
          {
            label: 'Leave/Finel Settlement', icon: 'fa fa-fw fa-sign-in', routerLink: ['/transaction/leavesettlement']
          },
          {
            label: 'TimeSheet', icon: 'fa fa-fw fa-sign-in', routerLink: ['/transaction/timesheet']
          },
          // {
          //   label: 'Insert Salary Details', icon: 'fa fa-fw fa-sign-in', routerLink: ['/transaction/insertsalarydetails']
          // },
          {
            label: 'Employee Promotion Entry', icon: 'fa fa-fw fa-sign-in', routerLink: ['/transaction/employeepromotion']
          },
          {
            label: 'Asset Master', icon: 'fa fa-fw fa-sign-in', routerLink: ['/transaction/assetmaster']
          },
          {
            label: 'Agent Master', icon: 'fa fa-fw fa-sign-in', routerLink: ['/transaction/agentmaster']
          },
          {
            label: 'Salary Heads', icon: 'fa fa-fw fa-gear', routerLink: ['/transaction/salaryheads']
          },
          {
            label: ' Bank Master', icon: 'fa fa-fw fa-wrench', routerLink: ['/transaction/bankmaster']
          },
          {
            label: 'Other Expense Properties', icon: 'fa fa-fw fa-gear', routerLink: ['/transaction/expenseproperties']
          },
          {
            label: ' Allotted Property', icon: 'fa fa-fw fa-wrench', routerLink: ['/transaction/allottedproperty']
          },
          { label: 'Documents', icon: 'fa fa-fw fa-wrench', routerLink: ['/transaction/documents'] },
          { label: 'Allowance / Deduction', icon: 'fa fa-fw fa-wrench', routerLink: ['/transaction/allowance'] },
          { label: 'Leave', icon: 'fa fa-fw fa-wrench', routerLink: ['/transaction/leave'] },
          { label: 'Calendar', icon: 'fa fa-fw fa-wrench', routerLink: ['/transaction/calendar'] },
          { label: 'Change Department', icon: 'fa fa-fw fa-wrench', routerLink: ['/transaction/changedepartment'] },
          { label: 'Mobilization', icon: 'fa fa-fw fa-wrench', routerLink: ['/transaction/mobilization'] },
          { label: 'Passport', icon: 'fa fa-fw fa-wrench', routerLink: ['/transaction/passport'] },
          { label: 'Increment Entry', icon: 'fa fa-fw fa-wrench', routerLink: ['/transaction/increment'] },
          { label: 'Increment Posting', icon: 'fa fa-fw fa-wrench', routerLink: ['/transaction/incrementposting'] },
          { label: 'Salary Package', icon: 'fa fa-fw fa-wrench', routerLink: ['/transaction/salarypckg'] },
          { label: 'Payroll Master', icon: 'fa fa-fw fa-wrench', routerLink: ['/transaction/payroll'] },
          { label: 'Leave Rejoining', icon: 'fa fa-fw fa-wrench', routerLink: ['/transaction/leaverejoining'] },
          { label: 'Staff OT Rate Entry', icon: 'fa fa-fw fa-wrench', routerLink: ['/transaction/otrateentry'] },
          { label: 'Active Status Change', icon: 'fa fa-fw fa-wrench', routerLink: ['/transaction/activestatuschange'] },
        ]
      },
      {
        label: 'Report', icon: 'fa fa-fw fa-book',
        items: [
          { label: 'Leave Report', icon: 'fa fa-fw fa-gear', routerLink: ['/report/leavereport'] },
          { label: 'Payroll History', icon: 'fa fa-fw fa-wrench', routerLink: ['/report/payrollhistoryreport'] },
          { label: 'Advance Search', icon: 'fa fa-fw fa-wrench', routerLink: ['/report/advance-search'] },
          { label: 'Custom Print', icon: 'fa fa-fw fa-wrench', routerLink: ['/report/custom-print'] },
          { label: 'Document Detail', icon: 'fa fa-fw fa-gear', routerLink: ['/misreport/documentdetail'] },
          { label: 'Staff Detail', icon: 'fa fa-fw fa-gear', routerLink: ['/misreport/staffdetail'] },
          { label: 'Loan Detail', icon: 'fa fa-fw fa-gear', routerLink: ['/misreport/loandetail'] },
          { label: 'Leave Detail', icon: 'fa fa-fw fa-gear', routerLink: ['/misreport/leavedetail'] },
          { label: 'Passport In/Out Detail', icon: 'fa fa-fw fa-gear', routerLink: ['/misreport/passport'] },
          { label: 'Birthday Alert', icon: 'fa fa-fw fa-gear', routerLink: ['/misreport/birthdayalert'] },
          { label: 'Loan History', icon: 'fa fa-fw fa-gear', routerLink: ['/misreport/loanhistory'] },
          { label: 'Increment History', icon: 'fa fa-fw fa-gear', routerLink: ['/misreport/incrementhistory'] },
          { label: 'Salary Package', icon: 'fa fa-fw fa-gear', routerLink: ['/misreport/salarypackagereport'] },
          { label: 'Gratuity / Leave Salary History', icon: 'fa fa-fw fa-gear', routerLink: ['/misreport/graruity-leave-salary'] },
          { label: 'Air Ticket', icon: 'fa fa-fw fa-gear', routerLink: ['/misreport/airticket'] },
          { routerLink: ['/misreport/nationalitygrade'], label: 'Nationality Grade', icon: 'fa fa-fw fa-sign-in' }
        ]
      },
      {
        label: 'Utility', icon: 'fa fa-fw fa-book',
        items: [
          { label: 'Family Details Entry', icon: 'fa fa-fw fa-gear', routerLink: ['/utility/familydetails'] },
          { label: 'Incr/Reward Property', icon: 'fa fa-fw fa-gear', routerLink: ['/utility/rewardproperty'] },
          { label: 'Training Details Properties', icon: 'fa fa-fw fa-gear', routerLink: ['/utility/trainingdetail'] },
          { label: 'Fine/Penalty Entry', icon: 'fa fa-fw fa-gear', routerLink: ['/utility/fineentry'] },
          { label: 'Menu2', icon: 'fa fa-fw fa-wrench', routerLink: ['/utility/'] },

        ]
      },
    ];
    this.items = [
      {
        label: 'Videos', icon: 'pi pi-fw pi-video',
        items: [
          [
            {
              label: 'Video 1',
              items: [{ label: 'Video 1.1' }, { label: 'Video 1.2' }]
            },
            {
              label: 'Video 2',
              items: [{ label: 'Video 2.1' }, { label: 'Video 2.2' }]
            }
          ],
          [
            {
              label: 'Video 3',
              items: [{ label: 'Video 3.1' }, { label: 'Video 3.2' }]
            },
            {
              label: 'Video 4',
              items: [{ label: 'Video 4.1' }, { label: 'Video 4.2' }]
            }
          ]
        ]
      },
      {
        label: 'Users', icon: 'pi pi-fw pi-users',
        items: [
          [
            {
              label: 'User 1',
              items: [{ label: 'User 1.1' }, { label: 'User 1.2' }]
            },
            {
              label: 'User 2',
              items: [{ label: 'User 2.1' }, { label: 'User 2.2' }]
            },
          ],
          [
            {
              label: 'User 3',
              items: [{ label: 'User 3.1' }, { label: 'User 3.2' }]
            },
            {
              label: 'User 4',
              items: [{ label: 'User 4.1' }, { label: 'User 4.2' }]
            }
          ],
          [
            {
              label: 'User 5',
              items: [{ label: 'User 5.1' }, { label: 'User 5.2' }]
            },
            {
              label: 'User 6',
              items: [{ label: 'User 6.1' }, { label: 'User 6.2' }]
            }
          ]
        ]
      },
      {
        label: 'Events', icon: 'pi pi-fw pi-calendar',
        items: [
          [
            {
              label: 'Event 1',
              items: [{ label: 'Event 1.1' }, { label: 'Event 1.2' }]
            },
            {
              label: 'Event 2',
              items: [{ label: 'Event 2.1' }, { label: 'Event 2.2' }]
            }
          ],
          [
            {
              label: 'Event 3',
              items: [{ label: 'Event 3.1' }, { label: 'Event 3.2' }]
            },
            {
              label: 'Event 4',
              items: [{ label: 'Event 4.1' }, { label: 'Event 4.2' }]
            }
          ]
        ]
      },
      {
        label: 'Settings', icon: 'pi pi-fw pi-cog',
        items: [
          [
            {
              label: 'Setting 1',
              items: [{ label: 'Setting 1.1' }, { label: 'Setting 1.2' }]
            },
            {
              label: 'Setting 2',
              items: [{ label: 'Setting 2.1' }, { label: 'Setting 2.2' }]
            },
            {
              label: 'Setting 3',
              items: [{ label: 'Setting 3.1' }, { label: 'Setting 3.2' }]
            }
          ],
          [
            {
              label: 'Technology 4',
              items: [{ label: 'Setting 4.1' }, { label: 'Setting 4.2' }]
            }
          ]
        ]
      }
    ]
  }

  changeTheme(theme) {
    const themeLink: HTMLLinkElement = document.getElementById('theme-css') as HTMLLinkElement;
    const href = 'assets/theme/theme-' + theme + '.css';

    this.replaceLink(themeLink, href);
  }
  changeLayout(layout) {
    const layoutLink: HTMLLinkElement = document.getElementById('layout-css') as HTMLLinkElement;
    const href = 'assets/layout/css/layout-' + layout + '.css';

    this.replaceLink(layoutLink, href);
  }

  isIE() {
    return /(MSIE|Trident\/|Edge\/)/i.test(window.navigator.userAgent);
  }

  replaceLink(linkElement, href) {
    if (this.isIE()) {
      linkElement.setAttribute('href', href);
    } else {
      const id = linkElement.getAttribute('id');
      const cloneLinkElement = linkElement.cloneNode(true);

      cloneLinkElement.setAttribute('href', href);
      cloneLinkElement.setAttribute('id', id + '-clone');

      linkElement.parentNode.insertBefore(cloneLinkElement, linkElement.nextSibling);

      cloneLinkElement.addEventListener('load', () => {
        linkElement.remove();
        cloneLinkElement.setAttribute('id', id);
      });
    }
  }

  onMenuClick() {
    this.app.onMenuClick();
  }
}
