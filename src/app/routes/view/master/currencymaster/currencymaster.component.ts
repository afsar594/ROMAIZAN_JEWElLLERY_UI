import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MasterApiService } from 'src/app/routes/service/master.api.services';
import { CurrencyMaster } from 'src/app/routes/domain';
import { MenuItem } from 'primeng/api/menuitem';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-currencymaster',
  templateUrl: './currencymaster.component.html',
  styleUrls: ['./currencymaster.component.scss']
})
export class CurrencyMasterComponent implements OnInit {

  constructor(private activatedroute: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private api: MasterApiService) {
    this.getCurrencyList();
  }
  title: string;
  breadcumbmodel: MenuItem[];
  currencyFormGroup: FormGroup;
  btnlabel: string = 'Submit';
  operation: { insert: boolean, update: boolean, delete: boolean } = { insert: false, update: false, delete: false };
  displayedColumns: string[] = ['code', 'name', 'rate', 'symbol', 'denomination', 'short_name', 'action'];
  currencyList: CurrencyMaster[] = [];
  ngOnInit(): void {
    this.operation.insert = true;
    this.breadcumbmodel = this.router.url.slice(1).split('/').map((k) => ({ label: k }));
    this.activatedroute.data.subscribe(data => {
      this.title = data.title;
    });
    this.currencyFormGroup = this.fb.group({
      currencyId: [0],
      currencyName: [null, [Validators.required]],
      currencySymbol: [null],
      currencyRate: [null, [Validators.required]],
      currencyRemarks: [''],
      currencyType: [''],
      // CurrencyRemarks: [null],
      // CurrencyType: [null],
      currencyUserId: [null],
      status: [true],
      // CurrencyShortName: [null, [Validators.required]],
      // CurrencyDenomination: [null, [Validators.required]]
    });
    this.api.GetLastCurrencyCode().subscribe(response => {
      this.currencyFormGroup.controls['CurrencyId'].setValue(response.currencyId + 1);
    });
  }

  public getCurrencyList() {
    this.api.GetAllCurrency().subscribe((data) => {
      this.currencyList = data;
    });
  }

  saveCurrency() {
    this.currencyFormGroup.markAsDirty();
    this.currencyFormGroup.markAllAsTouched();
    if (this.currencyFormGroup.valid) {
      if (this.operation.insert) {
        this.insertCurrency(this.currencyFormGroup.value);
      } else if (this.operation.update) {
        this.updateCurrency(this.currencyFormGroup.value);
      } else {
      }
    }

  }
  updateValues(data: CurrencyMaster) {
    this.operation = { insert: false, update: true, delete: false };
    this.btnlabel = 'Update';
    this.currencyFormGroup.patchValue(data);
  }
  removeCurrency(data: CurrencyMaster) {
    if (confirm("Are you sure. You want to delete this record ?")) {
      this.operation = { insert: true, update: false, delete: false };
      this.btnlabel = 'Submit';
      this.deleteCurrency(data);
    }
  }
  public get f() {
    return this.currencyFormGroup.controls;
  }
  public reset() {
    this.operation = { insert: true, update: false, delete: false };
    this.btnlabel = 'Submit';
    this.currencyFormGroup.reset();
  }

  public insertCurrency(currency: CurrencyMaster) {
    delete currency.CurrencyId
    this.api.InsertCurrency(currency).subscribe((data) => {
      this.currencyList = data;
      this.reset();
    });
  }


  public updateCurrency(currency: CurrencyMaster) {
    this.api.UpdateCurrency(currency).subscribe((data) => {
      this.currencyList = data;
      this.reset();
    });
  }

  public deleteCurrency(currency: CurrencyMaster) {
    this.btnlabel = 'Submit';
    this.api.DeleteCurrency(currency).subscribe((data) => {
      this.currencyList = data;
      this.reset();
    });
  }

}
