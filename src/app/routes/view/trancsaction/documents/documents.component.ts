import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { MasterApiService } from 'src/app/routes/service/master.api.services';
import { TransactionService } from 'src/app/routes/service/transaction-service.service';
import * as FileSaver from 'file-saver';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent implements OnInit {
  @Input('fileInput')
  fileInput: ElementRef
  viewDocumentsData: boolean = false
  title: string;
  subtitle: string;
  index: number = 0;
  isEditBtndisable: boolean = true;
  submitted: boolean = false;
  first: any;
  rows: any;
  displayMaximizeable = false
  staffdocumentForm: FormGroup
  vehicledocumentForm: FormGroup
  documentDetailArray: any[] = [];
  viewDetailModal: boolean = false
  modalHeader: string = ""
  fileData: any;
  documentImagesArray: any[];
  viewDocumentImageModal: boolean = false;
  image: any;
  imageFileStaff: any;
  staffDocumentsMasterArray: any;
  DocImagesArray: any[] = [];
  vehicleDocumentsMasterArray: any;
  constructor(public masterApiService: MasterApiService, private fb: FormBuilder, public transactionService: TransactionService,
    public sanitizer: DomSanitizer, private activatedroute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedroute.data.subscribe(data => {
      this.title = data.title;
      this.subtitle = data.subtitle
    });
    this.initForm()
    this.masterApiService.GetAllHrDocumentStatus()
    this.masterApiService.GetAllDocumentTypes()
    this.masterApiService.getAllStaffMasterWithSubscribe()
    // this.masterApiService.GetAllHrVehicleMaster()
    this.transactionService.GetAllDocumentsStaff()
    this.transactionService.GetAllDocumentsVehicle()
    // this.transactionService.GetAllStaffDocumentMaster()
    // this.transactionService.GetAllVehicleDocumentMaster()
    // this.transactionService.GetAllHrDocumentImages()
  }

  initForm() {
    this.staffdocumentForm = this.fb.group({
      documentId: [0],
      documentTypeId: [null, Validators.required],
      docStatusId: [null, Validators.required],
      staffId: [null, Validators.required],
      companyId: [null],
      vehicleId: [null],
      otherId: [null],
      masterType: [null],
      docName: [null, Validators.required],
      docNo: [null, Validators.required],
      remarks: [null, Validators.required],
      issueDate: [new Date()],
      expDate: [new Date()],
      docImage: [null],
      status: [null],
    })
    this.vehicledocumentForm = this.fb.group({
      documentId: [0],
      documentTypeId: [null, Validators.required],
      docStatusId: [null, Validators.required],
      staffId: [null],
      companyId: [null],
      vehicleId: [null, Validators.required],
      otherId: [null],
      masterType: [null],
      docName: [null, Validators.required],
      docNo: [null, Validators.required],
      remarks: [null, Validators.required],
      issueDate: [new Date()],
      expDate: [new Date()],
      docImage: [null],
      status: [null],
    })
  }

  handleChange(e) {
    this.index = e.index;
    console.log(this.index)
  }

  get f() {
    return this.staffdocumentForm.controls
  }

  get d() {
    return this.vehicledocumentForm.controls
  }

  onSave() {
    console.log(this.staffdocumentForm.controls.docImage.value)
    // return
    var staffFormValue = this.staffdocumentForm.value
    var veicleFormValue = this.vehicledocumentForm.value
    var payload = {
      status: this.index == 0 ? staffFormValue.status : veicleFormValue.status,
      vehicleId: this.index == 0 ? staffFormValue.vehicleId?.id : veicleFormValue.vehicleId?.id,
      companyId: this.index == 0 ? staffFormValue.companyId : veicleFormValue.companyId,
      docName: this.index == 0 ? staffFormValue.docName : veicleFormValue.docName,
      docImage: "",
      docNo: this.index == 0 ? staffFormValue.docNo : veicleFormValue.docNo,
      expDate: this.index == 0 ? staffFormValue.expDate : veicleFormValue.expDate,
      issueDate: this.index == 0 ? staffFormValue.issueDate : veicleFormValue.issueDate,
      masterType: this.index == 0 ? "Staff" : "Vehicle",
      otherId: this.index == 0 ? staffFormValue.otherId : veicleFormValue.otherId,
      remarks: this.index == 0 ? staffFormValue.remarks : veicleFormValue.remarks,
      docStatusId: this.index == 0 ? staffFormValue.docStatusId?.docStatusId : veicleFormValue.docStatusId?.docStatusId,
      documentTypeId: this.index == 0 ? staffFormValue.documentTypeId?.documentTypeId : veicleFormValue.documentTypeId?.documentTypeId,
      staffId: this.index == 0 ? staffFormValue.staffId?.staffId : veicleFormValue.staffId?.staffId
    }
    this.submitted = true
    if (this.index == 0) {// staff
      if (this.staffdocumentForm.invalid) {
        return
      }
      this.transactionService.InsertHrDocumentMaster(payload).subscribe((res: any[]) => {

        var documentObj = res[res.length - 1]
        var DocumentContent = null
        let fileReader = new FileReader();
        fileReader.onload = () => {
          DocumentContent = fileReader.result.toString();
          var dataObj = {
            DocImageId: 0,
            DocumentId: +documentObj.documentId,
            DocImage: DocumentContent,
            Extension: this.imageFileStaff.target.files[0].type,
            DocName: this.imageFileStaff.target.files[0].name,
          }
          this.transactionService.InsertHrDocumentImage(dataObj).subscribe(res => {
            // this.transactionService.GetAllHrDocumentImages()
            // this.viewDocumentsData = false
          }, error => {
          })
        }
        fileReader.readAsDataURL(this.imageFileStaff.target.files[0]);
        this.submitted = false
        this.transactionService.StaffDocumentMasterArray = res as any[]
        // this.transactionService.GetAllStaffDocumentMaster()
        this.initForm()
      }, error => {

      })
    }
    else {
      if (this.vehicledocumentForm.invalid) {
        return
      }
      this.transactionService.InsertHrDocumentMaster(payload).subscribe(res => {
        this.initForm()
        this.submitted = false
        this.transactionService.StaffDocumentMasterArray = res as any[]
        this.transactionService.GetAllVehicleDocumentMaster()
      }, error => {

      })
    }
  }

  getStaffName(staffId: number) {
    return this.masterApiService.staffMasterArrayDuplicate.find(o => o.staffId == staffId)?.fullName
  }

  getVehicleName(vehiceId: number) {
    return this.masterApiService.AllHrVehicleMasterArray.find(o => o.id == vehiceId)?.vehicleNo
  }

  getDocumentType(documentTypeId: number) {
    return this.masterApiService.HrDocumentTypesArray.find(o => o.documentTypeId == documentTypeId)?.documentType
  }

  getDocumentStatus(docStatusId: number) {
    return this.masterApiService.HrDocumentStatusArray.find(o => o.docStatusId == docStatusId)?.docStatus
  }

  viewStaffDocumentData(staffId: number) {
    this.modalHeader = this.getStaffName(staffId)
    this.transactionService.GetDocumentMasterByStaffID(staffId).subscribe(res => {
      this.documentDetailArray = res as any[]
      this.viewDetailModal = true
    }, error => {

    })
  }

  viewVehicleDocumentData(vehicleId: number) {
    this.modalHeader = this.getVehicleName(vehicleId)
    this.transactionService.GetDocumentMasterByVehicleID(vehicleId).subscribe(res => {
      this.documentDetailArray = res as any[]
      this.viewDetailModal = true
    }, error => {

    })
  }

  ViewDocumentIMagesByMasterID(documentID: number) {
    this.documentImagesArray = this.transactionService.DocumentIMagesArray.filter(o => o.documentId == documentID)
    this.viewDocumentImageModal = true
  }

  selectFile(event: any) {
    this.imageFileStaff = event
  }

  selectFileAdd(event: any, documentId: any) {
    if (confirm("Are you sure. You want to upload this document ?")) {
      var DocumentContent = null
      let fileReader = new FileReader();
      fileReader.onload = () => {
        DocumentContent = fileReader.result.toString();
        var dataObj = {
          DocImageId: 0,
          DocumentId: +documentId,
          DocImage: DocumentContent,
          Extension: event.target.files[0].type,
          DocName: event.target.files[0].name,
        }
        console.log(dataObj)
        this.transactionService.InsertHrDocumentImage(dataObj).subscribe(res => {
          this.transactionService.GetAllHrDocumentImages()
          this.viewDocumentsData = false
        }, error => {
        })
      }
      fileReader.readAsDataURL(event.target.files[0]);
    }
  }

  public b64toBlob(b64Data, contentType) {
    contentType = contentType || '';
    let sliceSize = 512;
    var byteCharacters = atob(b64Data);
    var byteArrays = [];
    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      var slice = byteCharacters.slice(offset, offset + sliceSize);
      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      var byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    var blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }

  getImage(data, extension, docName) {
    var blob = this.b64toBlob(data, extension);
    let a = document.createElement("a");
    document.body.appendChild(a);
    var url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = String(docName);
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  }

  openDocument(data, extension, docName) {
    this.getImage(data, extension, docName)
  }

  viewDetails(item: any) {
    this.staffDocumentsMasterArray = item.masterList
  }

  viewDetailsVehicle(item: any) {
    this.vehicleDocumentsMasterArray = item.masterList
  }

  getDocType(Id: any) {
    return this.masterApiService.HrDocumentTypesArray.find(o => o.documentTypeId == Id)?.documentType
  }

  getDocStatus(Id: any) {
    return this.masterApiService.HrDocumentStatusArray.find(o => o.docStatusId == Id)?.docStatus
  }

  ViewDocImages(Id: any) {
    this.transactionService.getDocumentImagesByMasterId(Id).subscribe((res: any[]) => {
      this.DocImagesArray = res as any[]
      this.viewDocumentImageModal = true
    }, (error: any) => {
    });
  }
}


