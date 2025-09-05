import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { AssetsMaster } from 'src/app/routes/domain/AssetsMaster';
import { MasterApiService } from 'src/app/routes/service/master.api.services';

@Component({
  selector: 'app-assetmaster',
  templateUrl: './assetmaster.component.html',
  styleUrls: ['./assetmaster.component.scss'],
})
export class AssetmasterComponent implements OnInit {
title:string;
subtitle:string;
AMForm:FormGroup;
displayMaximizeable: boolean = false;
index:number=0;
handleChange(e){
  this.index=e.index;
}
  constructor(private activatedroute:ActivatedRoute,
    private fb:FormBuilder,
    private translate :TranslateService,
    private masterApiService: MasterApiService,
    private messageService: MessageService,
    ) { }
 
  ngOnInit(): void {
  
    this.activatedroute.data.subscribe(data=>{
    this.title=data.title;
    this.subtitle=data.subtitle
    });
    this.cols = [
      { field: 'asId', header: 'Asset Code' },
      { field: 'assetName', header: 'Asset Name' },
      { field: '', header: 'Actions' }
    ]
    this.displayMaximizeable = false;
    this.AMForm=new FormGroup({
      AssetCode:new FormControl('' ,Validators.required),
      AssetName: new FormControl('', Validators.required),
    });
    this.getAllAssetsMAster();
  }
  assetsMAsterList: Array<AssetsMaster> = [];
  cols: Array<any> = [
  ];
  getAllAssetsMAster() {
    this.masterApiService.GetAllHrAssetMaster().subscribe((response: any) => {
      this.assetsMAsterList = response;
      this.displayMaximizeable = true;
      //console.log('Visa designation list :',this.visadesignationList)
    });
  }
  insertassetsMaster() {
    let payload: AssetsMaster = {
      assetName: String(this.AMForm.controls['AssetName'].value),
      asId:Number(this.AMForm.controls['AssetCode'].value),

    } 
    this.masterApiService.InsertHrAssetMaster(payload).subscribe(response => {
      this.messageService.add({ severity: 'Success', summary: 'Success!', detail: 'New Record Added Successflly!' });
    },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
      });
  }
  selectForEdit(item: AssetsMaster) {
     
    this.displayMaximizeable = false;
    this.AMForm.controls['AssetName'].setValue(item.assetName);
    this.AMForm.controls['AssetCode'].setValue(item.asId);
  }
  updateassetsMaster() {
    let payload: AssetsMaster = {
      assetName: String(this.AMForm.controls['AssetName'].value),
      asId: Number(this.AMForm.controls['AssetCode'].value),
    }
    this.masterApiService.UpdateHrAssetMaster(payload).subscribe(response => {
      this.messageService.add({ severity: 'success', summary: 'Success!', detail: 'Record Updated Successflly!' });
    },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
      });
  }
  
  deleteassetsMaster(asId:AssetsMaster){
    this.masterApiService.DeleteHrAssetMaster(asId).subscribe(response=>{
      this.messageService.add({severity:'success',summary:'Success',detail:'Record deleted successfully!',closable:true});
    },
    error=>{
      this.messageService.add({severity:'error',summary:'Failed',detail:'Delete Operation failed!',closable:true});
    })
  }
  get f(){
    return this.AMForm.controls;
  }

}
