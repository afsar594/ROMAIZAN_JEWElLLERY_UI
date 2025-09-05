import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { get } from 'http';
import { MessageService } from 'primeng/api';
// import { MessageService } from 'primeng';
import { Builder } from 'protractor';
import { AddressTypeMaster } from 'src/app/routes/domain/AddressType';
import { MasterApiService } from 'src/app/routes/service/master.api.services';

@Component({
  selector: 'app-addresstypes',
  templateUrl: './addresstypes.component.html',
  styleUrls: ['./addresstypes.component.scss']
})
export class AddresstypesComponent implements OnInit {
  submitted:boolean=false
  title: string;
  dataset: any;
  subtitle: string;
  AddressPForm: FormGroup;
  gridHeader: string;
  displayMaximizeable:boolean;
  cols:Array<any> = []
constructor(
    private activatedroute: ActivatedRoute,
    private fb: FormBuilder,
    private translate: TranslateService,
    private masterApi:MasterApiService,
    private messageService:MessageService
  ) {
    this.cols = [
      {field:'addressTypeId',header : 'Address Code'},
      {field:'addressType',header : 'Address Type'},
      {field:'',header : 'Actions'}
    ];
    this.displayMaximizeable = false;
   }

  ngOnInit(): void {
    this.activatedroute.data.subscribe(data => {
      this.title = data.title;
      this.subtitle = data.subtitle;
    });
this.initFOrm()
    //this.AddressPForm.controls['AddressCode'].disable();
  }

  initFOrm(){
    this.AddressPForm = new FormGroup({
      addressTypeId: new FormControl(0),
      addressType: new FormControl('', Validators.required)
    }); 
  }
 
  get f() {
    return this.AddressPForm.controls;
  }

  addressTypeArray:Array<AddressTypeMaster> = [];
  getAllAddressTypes(){
    this.masterApi.getAllAddressTypes().subscribe(response =>{
      this.addressTypeArray = response;
      this.displayMaximizeable = true;
    },
    error=>{
      this.messageService.add({severity:'error',summary:'Api response error',detail:error});
    });
  }
  insertAddressTypes(){
    this.submitted=true
    if(this.AddressPForm.invalid){
      return
    }
    this.masterApi.insertAddressTypes(this.AddressPForm.value).subscribe(response =>{
      this.submitted=false
      this.initFOrm()
      this.messageService.add({severity:'Success',summary:'Success!',detail:'New Record Added Successflly!'});
    },
    error=>{
      this.messageService.add({severity:'error',summary:'Api response error',detail:error});
    });
  }
  selectedItemForEdit:AddressTypeMaster = {};
  selectAddressTypeForEdit(item:AddressTypeMaster){
this.AddressPForm.patchValue(item)
    this.displayMaximizeable = false;
  }
  // selectAddressTypeForDelete(item:AddressTypeMaster){
  //   this.selectedItemForEdit = item;
  //   this.AddressPForm.controls['AddressType'].setValue(item.addressType);
  //   this.AddressPForm.controls['AddressCode'].setValue(item.addressTypeId);
  //   this.AddressPForm.controls['AddressCode'].enable();
  //   this.displayMaximizeable = false;
  // }
  updateAddressTypes(){
    this.submitted=true
    if(this.AddressPForm.invalid){
      return
    }
    this.masterApi.updateAddressTypes(this.AddressPForm.value).subscribe(response =>{
      this.submitted=false
      this.initFOrm()
      this.messageService.add({severity:'Success',summary:'Success!',detail:'Record Updated Successflly!'});
    },
    error=>{
      this.messageService.add({severity:'error',summary:'Api response error',detail:error});
    });
  }
  selectAddressTypeForDelete(payload){
    this.masterApi.deleteAddressTypes(payload).subscribe(response =>{
      this.messageService.add({severity:'Success',summary:'Success!',detail:'Record Deleted Successflly!'});
    },
    error=>{
      this.messageService.add({severity:'error',summary:'Api response error',detail:error});
    });
  }

  newEntry(){
    this.masterApi.getLastAddressCode().subscribe(response =>{

    },
    error=>[
      this.messageService.add({severity:''})
    ]) 
    this.AddressPForm.controls['AddressType'].enable();
  }
}




// import { Component, OnInit } from '@angular/core';
// import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
// import { ActivatedRoute } from '@angular/router';
// import { TranslateService } from '@ngx-translate/core';
// import { get } from 'http';
// import { MessageService } from 'primeng';
// import { Builder } from 'protractor';
// import { AddressTypeMaster } from 'src/app/routes/domain/AddressType';
// import { MasterApiService } from 'src/app/routes/service/master.api.services';

// @Component({
//   selector: 'app-addresstypes',
//   templateUrl: './addresstypes.component.html',
//   styleUrls: ['./addresstypes.component.scss']
// })
// export class AddresstypesComponent implements OnInit {
//   title: string;
//   dataset: any;
//   subtitle: string;
//   AddressPForm: FormGroup;
//   gridHeader: string;
// constructor(
//     private activatedroute: ActivatedRoute,
//     private fb: FormBuilder,
//     private translate: TranslateService,
//     private masterApi:MasterApiService,
//     private messageService:MessageService
//   ) { }

//   ngOnInit(): void {
//     this.activatedroute.data.subscribe(data => {
//       this.title = data.title;
//       this.subtitle = data.subtitle;
//     }
//     );
//     this.AddressPForm = new FormGroup({
//       ContactPerson: new FormControl('', Validators.required),
//       AddressType: new FormControl('', Validators.required),
//       Nationality: new FormControl('', Validators.required),
//       HouseName: new FormControl('', Validators.required),
//       StreetName: new FormControl('', Validators.required),
//       Phone: new FormControl('', Validators.required),
//       Email: new FormControl('', Validators.required),
//       Mobile: new FormControl('', Validators.required),
//       Fax: new FormControl('', Validators.required),
//       PoBox: new FormControl('', Validators.required)
//     }); 
    
//   }
 
//   get f() {
//     return this.AddressPForm.controls;
//   }

//   addressTypeArray:Array<AddressTypeMaster> = [];
//   getAllAddressTypes(){
//     this.masterApi.getAllAddressTypes().subscribe(response =>{
//       this.addressTypeArray = response;
//     },
//     error=>{
//       this.messageService.add({severity:'error',summary:'Api response error',detail:error});
//     });
//   }
//   insertAddressTypes(){
//     let payload:AddressTypeMaster = {
//       AddressTypeId:100,
//       AddressType:''
//     }
//     this.masterApi.insertAddressTypes(payload).subscribe(response =>{
//       this.messageService.add({severity:'Success',summary:'Success!',detail:'New Record Added Successflly!'});
//     },
//     error=>{
//       this.messageService.add({severity:'error',summary:'Api response error',detail:error});
//     });
//   }


//   selectAddressTypeForEdit:AddressTypeMaster = {};

//   updateAddressTypes(){
//     let payload:AddressTypeMaster = {
//       AddressTypeId:100,
//       AddressType:''
//     }
//     this.masterApi.updateAddressTypes(payload).subscribe(response =>{
//       this.messageService.add({severity:'Success',summary:'Success!',detail:'Record Updated Successflly!'});
//     },
//     error=>{
//       this.messageService.add({severity:'error',summary:'Api response error',detail:error});
//     });
//   }
//   deleteAddressTypes(){
//     let payload:AddressTypeMaster = {
//       AddressTypeId:100,
//       AddressType:''
//     }
//     this.masterApi.deleteAddressTypes(payload).subscribe(response =>{
//       this.messageService.add({severity:'Success',summary:'Success!',detail:'Record Deleted Successflly!'});
//     },
//     error=>{
//       this.messageService.add({severity:'error',summary:'Api response error',detail:error});
//     });
//   }
// }


