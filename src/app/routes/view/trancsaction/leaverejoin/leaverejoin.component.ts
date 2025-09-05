import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MasterApiService } from 'src/app/routes/service/master.api.services';
import { TransactionService } from 'src/app/routes/service/transaction-service.service';

@Component({
  selector: 'app-leaverejoin',
  templateUrl: './leaverejoin.component.html',
  styleUrls: ['./leaverejoin.component.scss']
})
export class LeaverejoinComponent implements OnInit {
  rejoinType: any[] = [{ name: "Same Month" }, { name: "Next Month" }]
  title: string;
  subtitle: string;
  index: number = 0;
  handleChange(e) {
    this.index = e.index;
  }
  constructor(private activatedroute: ActivatedRoute, public masterApi: MasterApiService, public _TransactionService: TransactionService) { }

  ngOnInit(): void {
    this._TransactionService.GetLeaveRejoiningData()
    this.activatedroute.data.subscribe(data => {
      this.title = data.title;
      this.subtitle = data.subtitle;
    }
    );
  }


}


