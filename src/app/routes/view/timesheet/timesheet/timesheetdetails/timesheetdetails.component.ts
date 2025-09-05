import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import * as ExcelProper from 'exceljs';
import * as Excel from "exceljs/dist/exceljs.min.js";
import * as moment from 'moment';
import { MasterApiService } from 'src/app/routes/service/master.api.services';
import { TimesheetService } from 'src/app/routes/service/timesheet.service';
import { StaffMaster } from 'src/app/routes/domain/StaffMaster';
import { TimeSheet2 } from 'src/app/routes/domain/TimeSheet2';
import { MessageService } from 'primeng/api';
import { TimeSheet2Details } from 'src/app/routes/domain/TimeSheet2Details';

@Component({
    selector: 'app-timesheetdetails',
    templateUrl: './timesheetdetails.component.html',
    styleUrls: ['./timesheetdetails.component.scss']
})
export class TimesheetdetailsComponent implements OnInit {
    first = 0;
    rows = 10;
    enableButtons: boolean = true
    staffSearch: string = ""
    staffModal: boolean = false
    TSForm: FormGroup;
    gridHeader: string;
    dataArray: any[];
    tableData: TimeSheet2Details[] = [];
    workbook: ExcelProper.Workbook = new Excel.Workbook();
    blobType: string = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    submitted: boolean = false
    enableActionBtn: boolean = true;
    isListEdit: boolean;
    constructor(private fb: FormBuilder, private translate: TranslateService, public masterApiService: MasterApiService,
        private timeSheetService: TimesheetService, private messageService: MessageService) {

    }
    ngOnInit(): void {
        this.initForm()
    }

    initForm() {
        this.TSForm = new FormGroup({
            TsDate: new FormControl({ value: new Date(new Date().setFullYear(new Date().getFullYear())), disabled: false }, Validators.required),
            TemplateDate: new FormControl({ value: new Date(new Date().setFullYear(new Date().getFullYear())), disabled: false }),
            TsID: new FormControl({ value: 0, disabled: false }),
            Remarks: new FormControl({ value: '', disabled: false }),
            StaffId: new FormControl(''),
            StaffName: new FormControl({ value: '', disabled: false }, Validators.required),
            DocType: new FormControl('TimeSheetDetails'),
            SubmitTs: new FormControl(true)
        });
    }

    get f() {
        return this.TSForm.controls;
    }

    setStaffName(staffObj: StaffMaster) {
        this.TSForm.controls.StaffId.setValue(staffObj.staffId)
        this.TSForm.controls.StaffName.setValue(staffObj.fullName)
        this.staffModal = false
    }

    downloadTemplate(): void {
        const workbook: ExcelProper.Workbook = new Excel.Workbook();
        const worksheet = workbook.addWorksheet('Time Sheet Details Template');
        const title = 'Time Sheet Details';
        const header = ['Code', 'Name', 'Designation', 'Site', 'TotalHour', 'OT', 'Remarks'];
        const titleRow = worksheet.addRow([title]);
        titleRow.font = { name: 'Corbel', family: 4, size: 16, underline: 'double', bold: true };
        worksheet.addRow([]);
        worksheet.addRow([]);
        const subTitleRow = worksheet.addRow([`Template Date : ${moment(this.TSForm.controls.TemplateDate.value).format('MM/DD/YYYY')}`]);
        worksheet.mergeCells('A1:D2');
        worksheet.addRow([]);
        const headerRow = worksheet.addRow(header);
        headerRow.eachCell((cell, number) => {
            cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: '8eb0e7' },
                bgColor: { argb: '8eb0e7' }
            };
            cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        });
        worksheet.getColumn(3).width = 30;
        worksheet.getColumn(4).width = 30;
        worksheet.addRow([]);
        worksheet.addRow([]);
        worksheet.addRow([]);
        worksheet.addRow([]);
        worksheet.addRow([]);
        worksheet.addRow([]);
        worksheet.addRow([]);
        worksheet.addRow([]);
        worksheet.addRow([]);
        // Footer Row
        const footerRow = worksheet.addRow(['Please dot not change anything except data.']);
        footerRow.getCell(1).fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFCCFFE5' }
        };
        footerRow.getCell(1).border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        // Merge Cells
        worksheet.mergeCells(`A${footerRow.number}:F${footerRow.number}`);
        workbook.xlsx.writeBuffer().then(data => {
            const blob = new Blob([data], { type: this.blobType });
            FileSaver.saveAs(blob, 'Time Sheet Details');
        });
    }

    importFromFile(bstr: string): XLSX.AOA2SheetOpts {
        const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
        const wsname: string = wb.SheetNames[0];
        const ws: XLSX.WorkSheet = wb.Sheets[wsname];
        var data = <XLSX.AOA2SheetOpts>(XLSX.utils.sheet_to_json(ws, { header: 1 }));
        return data;
    }

    UploadFile(evt: any) {
        try {
            const target: DataTransfer = <DataTransfer>(evt.target);
            const reader: FileReader = new FileReader();
            reader.onload = (e: any) => {
                const bstr: string = e.target.result;
                const data = <any[]>this.importFromFile(bstr);
                const header: string[] = Object.getOwnPropertyNames(new SheetModel());
                this.dataArray = data.map(arr => {
                    const obj = {};
                    for (let i = 0; i < header.length; i++) {
                        const k = header[i];
                        obj[k] = arr[i];
                    }
                    return <SheetModel>obj;
                })
            };
            reader.readAsBinaryString(target.files[0]);
            setTimeout(() => {
                this.tableData = []
                var sheetData = this.dataArray.filter(o => o.Code != 'Code' && o.Code != undefined
                    && o.Code != 'Please dot not change anything except data.'
                    && o.Code != 'Time Sheet Details' && !o.Code.includes('Template Date'))
                sheetData.forEach(o => {
                    this.tableData.push({
                        tsDetailsId: null,
                        staffCode: o.Code,
                        staffName: o.Name,
                        designationName: o.Designation,
                        siteName: o.Site,
                        totlHrs: o.TotalHour,
                        ot: o.OT,
                        remarks: o.Remarks,
                    })
                })
                this.isListEdit = false
                console.log(this.tableData)
            }, 1000);
        }
        catch (e) {
        }
    }

    OnClick() {
        document.getElementById('file').click();
    }

    onSearch(value: string) {
        this.masterApiService.staffMasterArray = this.masterApiService.staffMasterArrayDuplicate.filter(o => o.staffCode.toLowerCase().includes(value.toLowerCase()) || o.fullName.toLowerCase().includes(value.toLowerCase()))
    }

    onClickNew() {
        this.enableActionBtn = false
    }

    next() {
        this.first = this.first + this.rows;
    }

    prev() {
        this.first = this.first - this.rows;
    }

    reset() {
        this.first = 0;
    }

    isLastPage(): boolean {
        return this.tableData ? this.first === this.tableData.length - this.rows : true;
    }

    isFirstPage(): boolean {
        return this.tableData ? this.first === 0 : true;
    }

    onSave() {
        this.submitted = true
        if (this.TSForm.invalid) {
            return;
        }
        else {
            this.TSForm.controls.TsDate.enable()
            this.TSForm.controls.Remarks.enable()
            this.timeSheetService.InsertHrTimeSheet2(this.TSForm.value).subscribe((res: TimeSheet2[]) => {
                this.TSForm.controls.TsID.setValue(res[res.length - 1].tsID)
                this.enableButtons = false
                this.submitted = false
                this.messageService.add({ severity: 'success', summary: 'Saved', detail: 'Saved Successfully.' });
            }, (error: any) => {
                this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
            })
        }
    }

    onSaveTSDetails() {
        if (this.TSForm.controls.TsID.value == 0 || this.TSForm.controls.TsID.value == null) {
            this.messageService.add({ severity: 'error', summary: 'Api response error', detail: "Save time sheet first" });
            return
        }
        var TS2DetailsArray: TimeSheet2Details[] = []
        this.tableData.forEach((elemt: TimeSheet2Details) => {
            TS2DetailsArray.push({
                tsDetailsId: elemt.tsDetailsId == null || elemt.tsDetailsId == undefined ? 0 : elemt.tsDetailsId,
                tSID: this.TSForm.controls.TsID.value,
                staffID: this.masterApiService.staffMasterArrayDuplicate.find(o => o.staffCode == elemt.staffCode).staffId,
                siteId: this.masterApiService.siteMasterArrayDuplicate.find(o => o.siteName.toLocaleLowerCase() == elemt.siteName.toLocaleLowerCase()).siteId,
                desigId: this.masterApiService.designatinMasterArrayDuplicate.find(o => o.designation.toLocaleLowerCase() == elemt.designationName.toLocaleLowerCase()).designationId,
                totlHrs: +elemt.totlHrs,
                ot: elemt.totlHrs - 8,
                remarks: elemt.remarks
            })
        })
        console.log(TS2DetailsArray)
        if (!this.isListEdit) {
            this.timeSheetService.InsertHrTimeSheet2Details(TS2DetailsArray).subscribe((res: TimeSheet2Details[]) => {
                this.tableData = []
                this.initForm()
                this.messageService.add({ severity: 'success', summary: 'Saved', detail: 'Saved Successfully.' });
            }, (error: any) => {
                this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
            })
        }
        else {
            this.timeSheetService.UpdateHrTimeSheet2Details(TS2DetailsArray).subscribe((res: TimeSheet2Details[]) => {
                this.tableData = []
                this.initForm()
                this.messageService.add({ severity: 'success', summary: 'Saved', detail: 'Updated Successfully.' });
            }, (error: any) => {
                this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
            })
        }
    }

    LoadTimeSheetData() {
        this.timeSheetService.GetTimeSheetDataDateWise(moment(this.TSForm.controls.TsDate.value).format('YYYY-MM-DD')).subscribe((res: any[]) => {
            console.log(res)
            this.tableData = res as TimeSheet2Details[]
            this.isListEdit = true
            this.enableButtons = false
        }, (error: any) => {
            this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
        })
    }

    onCancel() {
        this.initForm()
        this.tableData = []
        this.enableActionBtn = true
        this.enableButtons = true
    }
}

export class SheetModel {
    Code: any = "";
    Name?: any = ''
    Designation?: any = ''
    Site: any = "";
    TotalHour?: any = ''
    OT?: any = ''
    Remarks?: any = ''
}
