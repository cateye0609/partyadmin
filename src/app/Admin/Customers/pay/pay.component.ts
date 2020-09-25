import { Component, OnInit, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

// Services
import { PaymentService } from '../../../_services/payment.service';
// Models
import { Bill, Bill_item } from '../../../_models/bill.model';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.css']
})
export class PayComponent implements OnInit {
  bill_info: Bill[] = [];
  haveBill: boolean;
  bill_detail: Bill_item[] = [];
  current_bill: Bill;

  current_user_bill: string;
  constructor(
    public paymentService: PaymentService,
    private toastr: ToastrService
  ) { }

  ngOnInit() { }

  // Khi click vào bill trong list
  itemClicked(item: Bill) {
    this.current_bill = item;
    this.bill_detail = item.dishes;
  }

  // Tìm danh sách đơn hàng theo username nhập vào
  searchBill(data: {
    username: string
  }) {
    this.current_user_bill = data.username;
    this.paymentService.get_bills_by_username(data.username).subscribe(
      res => {
        this.bill_info = res.data as Bill[];
        this.haveBill = true;
      },
      err => {
        this.toastr.error("Error while searching bills");
        console.log("Error: " + err.error.message);
        this.haveBill = false;
      }
    )
  }

  // Thanh toán đơn hàng
  pay(id: string) {
    if (confirm("Pay this bill?")) {
      this.paymentService.pay_bill(id);
    };
  }

  // Xác nhận đơn hàng
  confirm_bill(note: string) {
    this.paymentService.confirm_bill(this.current_bill._id, note).subscribe(
      res => {
        this.toastr.success("Confirm bill success!");
        this.searchBill({ username: this.current_user_bill });
      },
      err => {
        this.toastr.error("Failed confirm bill!");
        console.error("Error: " + err.error.message);
      }
    )
  }

  // Hủy đơn hàng
  cancel_bill(note: string) {
    this.paymentService.cancel_bill(this.current_bill._id, note).subscribe(
      res => {
        this.toastr.success("Cancel bill success!");
        this.searchBill({ username: this.current_user_bill });
      },
      err => {
        this.toastr.error("Failed cancel bill!");
        console.error("Error: " + err.error.message);
      }
    )
  }
}