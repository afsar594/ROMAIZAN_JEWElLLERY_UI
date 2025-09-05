import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HotTableRegisterer } from '@handsontable/angular';
import { TranslateService } from '@ngx-translate/core';
import { defaults } from 'src/app/shared/service/settings';
import Handsontable from 'handsontable';
import { MasterApiService } from 'src/app/routes/service/master.api.services';
import { TransactionService } from 'src/app/routes/service/transaction-service.service';
import { StaffMaster } from 'src/app/routes/domain/StaffMaster';
import { MessageService } from 'primeng';

@Component({
  selector: 'app-leave-settlement',
  templateUrl: './leave-settlement.component.html',
  styleUrls: ['./leave-settlement.component.scss']
})
export class LeaveSettlementComponent implements OnInit {
  title: string;
  subtitle: string;
  leavesettlementForm: FormGroup;
  index: number = 0;
  licensekey: string;
  airTicketObj: any;
  staffName: string;
  leaveSalaryObj: any;
  LoanDetailsArray: any[] = [];
  leavedetailsArray: any[] = [];
  OnlineRequestArray: any[] = [];
  AllottedPropertyArray: any[] = [];
  SalaryDetailsArray: any[] = [];
  PendingSalaryArray: any[] = [];
  gratuityObj: any;
  designationName: string;
  gratuityAmnt: any = 0;
  varDedAmnt: any = 0;
  varAddAmnt: any = 0;
  airticketAmnt: any = 0;
  currentPayrollAmnt: number = 0;
  pendingPayrollAmnt: number = 0;
  summaryNetAmnt: any = 0;
  leavesalaryAmnt: number;
  historyStaffId: null;
  HistoryDataArray: any[];
  // hotlicensekey: any;
  handleChange(e) {
    this.index = e.index;
  }
  listModal: boolean = false
  isEdit: boolean = false
  leavedetails: Handsontable.GridSettings;
  private hotRegisterer = new HotTableRegisterer();
  hotid = 'leavedetails';
  SalaryDetailsGrid: Handsontable.GridSettings;
  hotid2 = 'SalaryDetailsGrid';
  History: Handsontable.GridSettings;
  hotid1 = 'History';
  PendingSalaryGrid: Handsontable.GridSettings;
  LoanDetailsGrid: Handsontable.GridSettings;
  // private hotRegisterer = new HotTableRegisterer();
  hotid3 = 'LoanDetailsGrid';
  hotid4 = 'PendingSalaryGrid';

  OnlineRequestGrid: Handsontable.GridSettings;
  OnlineRequestTable = 'OnlineRequest';
  AllottedPropertyGrid: Handsontable.GridSettings;
  AllottedPropertyTable = 'AllottedProperty';
  constructor(private activatedroute: ActivatedRoute, private translate: TranslateService, private fb: FormBuilder,
    public masterApiService: MasterApiService, public transactionService: TransactionService, private messageService: MessageService) {
    this.activatedroute.data.subscribe(data => {
      this.title = data.title;
      this.subtitle = data.subtitle;
      this.licensekey = defaults.hotlicensekey;
    });
  }

  ngOnInit(): void {
    this.initForm()
    this.LeaveDetailsGrid();
    this.HistoryGrid();
    this.SalaryDetailGrid();
    this.PendingSalarysGrid();
    this.LoanDetailGrid();
    this.OnlineRequestsGrid()
    this.AllottedPropertysGrid()
    this.masterApiService.getAllStaffMasterWithSubscribe()
    this.masterApiService.getAllDesignationWithSubscribe()
    this.masterApiService.GetAllHrStaffTypeWithSubs()
    this.transactionService.GetAllLeaveSalary()
    this.leavesettlementForm.disable()
    this.leavesettlementForm.updateValueAndValidity()
    this.masterApiService.GetAllHrNationalityWithSubs()
  }

  LeaveDetailsGrid() {
    this.leavedetails = {
      rowHeaders: true,
      viewportColumnRenderingOffset: 27,
      viewportRowRenderingOffset: 'auto',
      colWidths: 150,
      minRows: 10,
      height: 'auto',
      rowHeights: 23,
      fillHandle: {
        direction: 'vertical',
        autoInsertRow: true
      },


      data: [],
      minSpareRows: 1,
      allowInsertRow: true,
      stretchH: "all",
      manualRowResize: true,
      manualColumnResize: true,
      columns: [
        {

          data: 'leaveId',
          type: 'text',
        },
        {

          data: 'leavecode',
          type: 'text',
        },
        {

          data: 'noofdays',
          type: 'text',
        },
        {

          data: 'appleavefrom',
          type: 'text',
        },
        {

          data: 'appleaveto',
          type: 'text',
        },
      ],
      colHeaders: [
        this.translate.instant('Leave ID'),
        this.translate.instant('Leave Code'),
        this.translate.instant('No.Of Days'),
        this.translate.instant('Leave From'),
        this.translate.instant('Leave To'),
      ],
      manualRowMove: true,
      manualColumnMove: true,
      contextMenu: true,
      filters: true,
      dropdownMenu: true,
    };


  }

  HistoryGrid() {
    this.History = {
      rowHeaders: true,
      viewportColumnRenderingOffset: 27,
      viewportRowRenderingOffset: 'auto',
      colWidths: 150,
      minRows: 10,
      height: 'auto',
      rowHeights: 23,
      fillHandle: {
        direction: 'vertical',
        autoInsertRow: true
      },


      data: [],
      minSpareRows: 1,
      allowInsertRow: true,
      stretchH: "all",
      manualRowResize: true,
      manualColumnResize: true,
      columns: [
        {

          data: 'ssid',
          type: 'text',
        },
        {

          data: 'settleDate',
          type: 'text',
        },
        {

          data: 'lsAmt',
          type: 'text',
        },
        {

          data: 'alStartDate',
          type: 'text',
        },
        {

          data: 'alEndDate',
          type: 'text',
        },
        {

          data: 'exHolDys',
          type: 'text',
        },
        {

          data: 'lvDays',
          type: 'text',
        },
        {
          data: 'payrollDate',
          type: 'text',
        },
        {
          data: 'payrollAmt',
          type: 'text',
        },
        {
          data: 'varAdd',
          type: 'text',
        },
        {
          data: 'varDed',
          type: 'text',
        },
        {
          data: 'ticketSettDate',
          type: 'text',
        },
        {
          data: 'airticketAmt',
          type: 'text',
        },
        {
          data: 'lastWorkingDay',
          type: 'text',
        },
        {
          data: 'gratuityAmt',
          type: 'text',
        },
        {
          data: 'netAmt',
          type: 'text',
        },
      ],
      colHeaders: [
        this.translate.instant('SSID'),
        this.translate.instant('Leave Salary Date'),
        this.translate.instant('Leave Salary Amount'),
        this.translate.instant('Leave Start'),
        this.translate.instant('Leave End'),
        this.translate.instant('Exclude Holidays'),
        this.translate.instant('Holidays'),
        this.translate.instant('Total Days'),
        this.translate.instant('Payroll Date'),
        this.translate.instant('Payroll Amount'),
        this.translate.instant('Variable Additions'),
        this.translate.instant('Variable Deductions'),
        this.translate.instant('Air Ticket Date'),
        this.translate.instant('Air Ticket Amount'),
        this.translate.instant('Gratuity Date'),
        this.translate.instant('Gratuity Amount'),
        this.translate.instant('Net Amount'),
      ],
      manualRowMove: true,
      manualColumnMove: true,
      contextMenu: true,
      filters: true,
      dropdownMenu: true,
    };


  }

  SalaryDetailGrid() {
    this.SalaryDetailsGrid = {
      rowHeaders: true,
      viewportColumnRenderingOffset: 27,
      viewportRowRenderingOffset: 'auto',
      colWidths: 150,
      minRows: 10,
      height: 'auto',
      rowHeights: 23,
      fillHandle: {
        direction: 'vertical',
        autoInsertRow: true
      },


      data: [],
      minSpareRows: 1,
      allowInsertRow: true,
      stretchH: "all",
      manualRowResize: true,
      manualColumnResize: true,
      columns: [
        {

          data: 'shid',
          type: 'text',
        },
        {

          data: 'shname',
          type: 'text',
        },
        {

          data: 'amount',
          type: 'text',
        },
      ],
      colHeaders: [
        this.translate.instant('ID'),
        this.translate.instant('Head'),
        this.translate.instant('Amount'),
      ],
      manualRowMove: true,
      manualColumnMove: true,
      contextMenu: true,
      filters: true,
      dropdownMenu: true,
    };
  }

  LoanDetailGrid() {
    this.LoanDetailsGrid = {
      rowHeaders: true,
      viewportColumnRenderingOffset: 27,
      viewportRowRenderingOffset: 'auto',
      colWidths: 150,
      minRows: 10,
      height: 'auto',
      rowHeights: 23,
      fillHandle: {
        direction: 'vertical',
        autoInsertRow: true
      },


      data: [],
      minSpareRows: 1,
      allowInsertRow: true,
      stretchH: "all",
      manualRowResize: true,
      manualColumnResize: true,
      columns: [
        {

          data: 'loanID',
          type: 'text',
        },
        {

          data: 'shName',
          type: 'text',
        },
        {

          data: 'issueDate',
          type: 'text',
        },
        {

          data: 'loanAmount',
          type: 'text',
        },
        {

          data: 'amountPaid',
          type: 'text',
        },
        {

          data: 'balance',
          type: 'text',
        },
      ],
      colHeaders: [
        this.translate.instant('Loan ID'),
        this.translate.instant('Loan'),
        this.translate.instant('Issue Date'),
        this.translate.instant('Loan Amount'),
        this.translate.instant('Paid'),
        this.translate.instant('Balance'),
      ],
      manualRowMove: true,
      manualColumnMove: true,
      contextMenu: true,
      filters: true,
      dropdownMenu: true,
    };
  }

  PendingSalarysGrid() {
    this.PendingSalaryGrid = {
      rowHeaders: true,
      viewportColumnRenderingOffset: 27,
      viewportRowRenderingOffset: 'auto',
      colWidths: 150,
      minRows: 10,
      height: 'auto',
      rowHeights: 23,
      fillHandle: {
        direction: 'vertical',
        autoInsertRow: true
      },


      data: [],
      minSpareRows: 1,
      allowInsertRow: true,
      stretchH: "all",
      manualRowResize: true,
      manualColumnResize: true,
      columns: [
        {

          data: 'payyear',
          type: 'text',
        },
        {

          data: 'paymonth',
          type: 'text',
        },
        {

          data: 'netsal',
          type: 'text',
        },
      ],
      colHeaders: [
        this.translate.instant('Pay Year'),
        this.translate.instant('Pay Month'),
        this.translate.instant('Net Salary'),
      ],
      manualRowMove: true,
      manualColumnMove: true,
      contextMenu: true,
      filters: true,
      dropdownMenu: true,
    };
  }

  OnlineRequestsGrid() {
    this.OnlineRequestGrid = {
      rowHeaders: true,
      viewportColumnRenderingOffset: 27,
      viewportRowRenderingOffset: 'auto',
      colWidths: 150,
      minRows: 10,
      height: 'auto',
      rowHeights: 23,
      fillHandle: {
        direction: 'vertical',
        autoInsertRow: true
      },


      data: [],
      minSpareRows: 1,
      allowInsertRow: true,
      stretchH: "all",
      manualRowResize: true,
      manualColumnResize: true,
      columns: [
        {

          data: 'servicereqid',
          type: 'text',
        },
        {

          data: 'servicereqdate',
          type: 'text',
        },
        {

          data: 'servicereqtypename',
          type: 'text',
        },

        {

          data: 'servicereqstatus',
          type: 'text',
        },

        {

          data: 'servicereqreason',
          type: 'text',
        },
      ],
      colHeaders: [
        this.translate.instant('Req ID'),
        this.translate.instant('Req Date'),
        this.translate.instant('Req Type'),
        this.translate.instant('Req Status'),
        this.translate.instant('Req Reason'),
      ],
      manualRowMove: true,
      manualColumnMove: true,
      contextMenu: true,
      filters: true,
      dropdownMenu: true,
    };
  }

  AllottedPropertysGrid() {
    this.AllottedPropertyGrid = {
      rowHeaders: true,
      viewportColumnRenderingOffset: 27,
      viewportRowRenderingOffset: 'auto',
      colWidths: 150,
      minRows: 10,
      height: 'auto',
      rowHeights: 23,
      fillHandle: {
        direction: 'vertical',
        autoInsertRow: true
      },
      data: [],
      minSpareRows: 1,
      allowInsertRow: true,
      stretchH: "all",
      manualRowResize: true,
      manualColumnResize: true,
      columns: [
        {

          data: 'assetname',
          type: 'text',
        },
        {

          data: 'issuedate',
          type: 'text',
        },
        {

          data: 'returndate',
          type: 'text',
        },
        {

          data: 'status',
          type: 'text',
        },
        {

          data: 'remarks',
          type: 'text',
        },
      ],
      colHeaders: [
        this.translate.instant('Asset'),
        this.translate.instant('Issue Date'),
        this.translate.instant('Return Date'),
        this.translate.instant('status'),
        this.translate.instant('Remarks'),
      ],
      manualRowMove: true,
      manualColumnMove: true,
      contextMenu: true,
      filters: true,
      dropdownMenu: true,
    };
  }

  initForm() {
    this.leavesettlementForm = new FormGroup({
      leaveSalId: new FormControl(0),
      staffid: new FormControl(null, Validators.required),

      StaffName: new FormControl(null),
      DesignationName: new FormControl(null),
      StaffTypeName: new FormControl(null),
      DOJ: new FormControl(null),

      lastSettDate: new FormControl(new Date(new Date().setFullYear(new Date().getFullYear())), null),
      settDate: new FormControl(new Date(new Date().setFullYear(new Date().getFullYear())), null),
      leaveSalaryDate: new FormControl(new Date(new Date().setFullYear(new Date().getFullYear())), null),
      alstartDate: new FormControl(new Date(new Date().setFullYear(new Date().getFullYear())), null),
      alendDate: new FormControl(new Date(new Date().setFullYear(new Date().getFullYear())), null),
      rejoinDate: new FormControl(new Date(new Date().setFullYear(new Date().getFullYear())), null),
      leaveDays: new FormControl(null, null),
      totalDays: new FormControl(null, null),
      totalDaysWorked: new FormControl(null, null),
      eligibleDays: new FormControl(null, null),
      leaveSalary: new FormControl(null, null),
      varAdd: new FormControl(null, null),
      varDed: new FormControl(null, null),
      totalLeaveSalary: new FormControl(null, null),
      remarks: new FormControl(null, null),
      takenDays: new FormControl(null, null),
      totEarnings: new FormControl(null, null),
      payrollId: new FormControl(null, null),
      loanAmt: new FormControl(null, null),
      pendingPayollAmt: new FormControl(null, null),
      airTicketAmt: new FormControl(null, null),
      gratuityAmt: new FormControl(null, null),
      payrollAmt: new FormControl(null, null),
      netAmt: new FormControl(null, null),
      alopnBal: new FormControl(null, null),
      settlementType: new FormControl(null, null),
      rmkVarAdd: new FormControl(null, null),
      rmkVarDed: new FormControl(null, null),
      curLeaveDys: new FormControl(null, null),
      calculateBasedOn: new FormControl(null, null),
      noofTicket: new FormControl(null, null),
      prvMthSalary: new FormControl(null, null),
      prvPayrollMonth: new FormControl(null, null),

      approve: new FormControl(false, null),
      createLeave: new FormControl(false, null),
      createPayroll: new FormControl(false, null),
      addLspayroll: new FormControl(false, null),
      rejoinStatus: new FormControl(false, null),
      alongWithPayroll: new FormControl(false, null),

      depDate: new FormControl(null, null),
      issueDate: new FormControl(null, null),
      lastTicketTaken: new FormControl(null, null),
      retDate: new FormControl(null, null),
      ticketSettDate: new FormControl(null, null),
      lastWorkingDate: new FormControl(null, null),
      grtCalcChangeDate: new FormControl(null, null),
    });
  }

  get f() {
    return this.leavesettlementForm.controls;
  }

  onChangeStaff() {
    var staffObj: StaffMaster = this.masterApiService.staffMasterArrayDuplicate.find(o => o.staffId == this.f.staffid.value?.staffId)
    this.designationName = this.masterApiService.designatinMasterArrayDuplicate.find(o => o.designationId == staffObj?.designationId)?.designation
    this.f.DesignationName.setValue(this.designationName)
    var staffTypeName = this.masterApiService.StaffTypeArray.find(o => o.staffTypeId == staffObj?.staffTypeId)?.staffType
    this.f.StaffTypeName.setValue(staffTypeName)
    this.f.DOJ.setValue(new Date(staffObj?.doj))
  }

  onChangeStaffGetData() {
    this.getLeaveSalaryByID(0, this.f.staffid.value?.staffId)
  }

  onAdd() {
    this.leavesettlementForm.enable()
    this.leavesettlementForm.updateValueAndValidity()
    this.isEdit = false
    this.initForm()
  }

  onSave() {
    debugger
    var staffID = this.f.staffid.value?.staffId
    if (this.leavesettlementForm.invalid) {
      return
    }
    this.varDedAmnt = this.gratuityObj?.varDed
    this.varAddAmnt = this.gratuityObj?.varAdd

    var leaveSalaryObj = this.leavesettlementForm.value;
    leaveSalaryObj.staffid = staffID
    leaveSalaryObj.netAmt = this.summaryNetAmnt;
    leaveSalaryObj.pendingPayollAmt = this.getPendingSalaryTotal()
    leaveSalaryObj.airTicketAmt = this.airTicketObj?.amount
    leaveSalaryObj.gratuityAmt = this.gratuityObj?.totAmt
    leaveSalaryObj.payrollAmt = 0;

    delete leaveSalaryObj.StaffName
    delete leaveSalaryObj.DesignationName
    delete leaveSalaryObj.StaffTypeName
    delete leaveSalaryObj.DOJ
    delete leaveSalaryObj.ticketSettDate
    delete leaveSalaryObj.retDate
    delete leaveSalaryObj.lastTicketTaken
    delete leaveSalaryObj.issueDate
    delete leaveSalaryObj.depDate
    if (this.isEdit) {
      this.transactionService.UpdateLeaveSalary(leaveSalaryObj)
      this.transactionService.EditLeaveSalary.subscribe(res => {
        if (res) {
          this.initForm()
        }
      })
    }
    else {
      this.transactionService.InsertLeaveSalary(leaveSalaryObj)
      this.transactionService.SaveLeaveSalary.subscribe(res => {
        if (res) {
          this.initForm()
        }
      })
    }
  }

  onEdit() {
    this.isEdit = true
    this.leavesettlementForm.enable()
    this.leavesettlementForm.updateValueAndValidity()
  }

  onDelete() {
    this.transactionService.DeleteLeaveSalary(this.f.leaveSalId.value);
    this.transactionService.RemoveLeaveSalary.subscribe(res => {
      if (res) {
        this.leavedetailsArray = []
        this.OnlineRequestArray = []
        this.AllottedPropertyArray = []
        this.SalaryDetailsArray = []
        this.PendingSalaryArray = []
        this.initForm()
      }
    })
  }

  PatchValue(dataObj: any) {
    this.leavesettlementForm.patchValue({
      leaveSalId: dataObj?.leaveSalId,
      staffid: dataObj?.staffid,
      lastSettDate: new Date(dataObj?.lastSettDate),
      settDate: new Date(dataObj?.settDate),
      leaveSalaryDate: new Date(dataObj?.leaveSalaryDate),
      alstartDate: new Date(dataObj?.alstartDate),
      rejoinDate: new Date(dataObj?.rejoinDate),
      leaveDays: dataObj?.leaveDays,
      totalDays: dataObj?.totalDays,
      totalDaysWorked: dataObj?.totalDaysWorked,
      eligibleDays: dataObj?.eligibleDays,
      leaveSalary: dataObj?.leaveSalary,
      varAdd: dataObj?.varAdd,
      varDed: dataObj?.varDed,
      totalLeaveSalary: dataObj?.totalLeaveSalary,
      remarks: dataObj?.remarks,
      totEarnings: dataObj?.totEarnings,
      takenDays: dataObj?.takenDays,
      payrollId: dataObj?.payrollId,
      loanAmt: dataObj?.loanAmt,
      pendingPayollAmt: dataObj?.pendingPayollAmt,
      airTicketAmt: dataObj?.airTicketAmt,
      gratuityAmt: dataObj?.gratuityAmt,
      payrollAmt: dataObj?.payrollAmt,
      netAmt: dataObj?.netAmt,
      alopnBal: dataObj?.alopnBal,
      settlementType: dataObj?.settlementType,
      rmkVarAdd: dataObj?.rmkVarAdd,
      rmkVarDed: dataObj?.rmkVarDed,
      curLeaveDys: dataObj?.curLeaveDys,
      calculateBasedOn: dataObj?.calculateBasedOn,
      noofTicket: dataObj?.noofTicket,
      prvMthSalary: dataObj?.prvMthSalary,
      prvPayrollMonth: dataObj?.prvPayrollMonth,
      approve: dataObj?.approve,
      createLeave: dataObj?.createLeave,
      createPayroll: dataObj?.createPayroll,
      addLspayroll: dataObj?.addLspayroll,
      rejoinStatus: dataObj?.rejoinStatus,
      alongWithPayroll: dataObj?.alongWithPayroll,
    })
  }

  getLeaveSalaryByID(leavealID: number, staffId: number) {
    this.transactionService.GetLeaveSalaryDetilsByID(leavealID, staffId).subscribe((res: any) => {
      if (res) {
        this.listModal = false
        this.leaveSalaryObj = res
        var staffObj: StaffMaster = this.masterApiService.staffMasterArrayDuplicate.find(o => o.staffId == res?.hrLeaveSalaryObj?.staffid)
        this.PatchValue(res?.hrLeaveSalaryObj)
        this.f.staffid.setValue(staffObj)
        this.staffName = staffObj?.fullName
        this.f.leaveSalary.setValue(res?.leaveSalaryStaff?.leaveSalary)
        this.f.curLeaveDys.setValue(res?.leaveSalaryStaff?.currentLeave)
        this.f.eligibleDays.setValue(res?.leaveSalaryStaff?.elgDays)
        this.f.totalDaysWorked.setValue(res?.leaveSalaryStaff?.totday)
        this.f.takenDays.setValue(res?.leaveSalaryStaff?.takenDays)

        this.LoanDetailsArray = res?.loanDetails

        // this.leavedetails.data = res?.leaveDetailList
        // this.OnlineRequestGrid.data = res?.onlineRequestList
        // this.AllottedPropertyGrid.data = res?.allottedPropertyList
        // this.SalaryDetailsGrid.data = res?.salaryDetailList
        // this.PendingSalaryGrid.data = res?.pendingPayrollList
        this.leavedetailsArray = res?.leaveDetailList == null ? [] : res?.leaveDetailList
        this.OnlineRequestArray = res?.onlineRequestList == null ? [] : res?.onlineRequestList
        this.AllottedPropertyArray = res?.allottedPropertyList == null ? [] : res?.allottedPropertyList
        this.SalaryDetailsArray = res?.salaryDetailList == null ? [] : res?.salaryDetailList
        this.PendingSalaryArray = res?.pendingPayrollList == null ? [] : res?.pendingPayrollList

        this.airTicketObj = res?.airTicketDetail
        this.gratuityObj = res?.gratuityDetail
        this.f.depDate.setValue(new Date(this.airTicketObj?.depDate))
        this.f.issueDate.setValue(new Date(this.airTicketObj?.issueDate))
        this.f.lastTicketTaken.setValue(new Date(this.airTicketObj?.lastTicketTaken))
        this.f.retDate.setValue(new Date(this.airTicketObj?.retDate))
        this.f.ticketSettDate.setValue(new Date(this.airTicketObj?.ticketSettDate))

        this.f.varAdd.setValue(this.gratuityObj?.varAdd)
        this.f.rmkVarAdd.setValue(this.gratuityObj?.addRemarks)
        this.f.varDed.setValue(this.gratuityObj?.varDed)
        this.f.rmkVarDed.setValue(this.gratuityObj?.dedRemarks)
        this.f.lastWorkingDate.setValue(new Date(this.gratuityObj?.lastWorkingDay))
        this.f.grtCalcChangeDate.setValue(new Date(this.gratuityObj?.grtCalcChangeDate))
        debugger
        this.gratuityAmnt = this.gratuityObj?.totAmt
        this.varDedAmnt = this.gratuityObj?.varDed
        this.varAddAmnt = this.gratuityObj?.varAdd
        this.airticketAmnt = this.airTicketObj?.amount
        this.currentPayrollAmnt = this.getEarningTotal()
        this.pendingPayrollAmnt = this.getPendingSalaryTotal()
        this.leavesalaryAmnt = this.f.leaveSalary.value
        this.summaryNetAmnt = this.leavesalaryAmnt + this.gratuityAmnt + this.varAddAmnt - this.varDedAmnt + this.airticketAmnt + this.currentPayrollAmnt + this.pendingPayrollAmnt

        this.onChangeStaff()
        console.log(res)
      }
    }, error => {
    })
  }

  getNationalityName(Id: number) {
    return this.masterApiService.NationalityArray.find(o => o.nationalityId == Id)?.nationality
  }

  AddLeaveSalaryToPayrollProcess(type: string) {
    var dataObj = {
      StaffID: this.f.staffid.value?.staffId,
      Month: "JAN",
      Year: 1,
      LeaveSalaryID: this.f.leaveSalId.value,
      LeaveSalaryAmount: this.leaveSalaryObj?.leaveSalary,
      EligibleAmount: this.leaveSalaryObj?.elgDays
    }
    this.transactionService.AddLeaveSalaryToPayrollProcess(dataObj, type);
  }

  DeletedPayroll() {
    this.transactionService.DeletePayroll(this.f.staffid.value)
  }

  getLoanTotal() {
    var value = 0
    this.LoanDetailsArray.forEach(elemt => {
      value += elemt.balance
    })
    return value
  }

  getEarningTotal() {
    var value = 0
    this.SalaryDetailsArray.forEach(elemt => {
      value += elemt.amount
    })
    return value
  }

  getPendingSalaryTotal() {
    var value = 0
    this.PendingSalaryArray.forEach(elemt => {
      value += elemt.netsal
    })
    return value
  }

  onChangeHistoryStaff(event: any) {
    this.historyStaffId = event.value.staffId
  }

  onClickLoadHistory() {
    if (this.historyStaffId == null || this.historyStaffId == undefined) {
      // alert("Please select staff")
      return
    }
    // this.transactionService.LoadHistory(this.historyStaffId).subscribe(res => {
    //   this.HistoryDataArray = res as any[]
    // }, error => {

    // })
  }
}
