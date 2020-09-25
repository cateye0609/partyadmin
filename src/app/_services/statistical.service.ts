import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
// Services
import { api } from '../_api/apiUrl';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from './common.service';
// Models
import { ApiResponse } from '../_models/response.model';
import { ServerUsage } from '../_models/statistic.model';

@Injectable()
export class StatisticalService {

    headers = new HttpHeaders({
        'Authorization': localStorage.getItem('token')
    });
    constructor(
        private http: HttpClient,
        private toastr: ToastrService,
        private commonService: CommonService
    ) { }

    // Thống kê tổng hóa đơn theo 7 ngày gần nhất
    get_moneyStatistics() {
        return this.http.get<ApiResponse>(api.moneyStatistics, { headers: this.headers });
    }

    // Thống kê món ăn được gọi
    get_productStatistics(type: string, date?: string) {
        if (type == 'custom') {
            return this.http.get<ApiResponse>(api.productStatistics + `?type=${type}&date=${date}`, { headers: this.headers });
        } else {
            return this.http.get<ApiResponse>(api.productStatistics + `?type=${type}`, { headers: this.headers });
        }
    }

    // Thống kê tiền khách hàng thanh toán
    get_customerStatistics(type: string, payment_status: number, date?: string) {
        if (type == 'custom') {
            return this.http.get<ApiResponse>(api.customerStatistics + `?type=${type}&date=${date}`, { headers: this.headers });
        } else {
            return this.http.get<ApiResponse>(api.customerStatistics + `?type=${type}&payment_status=${payment_status}`, { headers: this.headers });
        }
    }

    // Thống kê số tiền nhân viên đã thanh toán
    get_staffStatistics(type: string, date?: string) {
        if (type == 'custom') {
            return this.http.get<ApiResponse>(api.staffStatistics + `?type=${type}&date=${date}`, { headers: this.headers });
        } else {
            return this.http.get<ApiResponse>(api.staffStatistics + `?type=${type}`, { headers: this.headers });
        }
    }

    // Thống kê nhanh các cập nhật mới trong tuần
    get_newUpdate() {
        return this.http.get<ApiResponse>(api.new_update, { headers: this.headers })
            .pipe(
                catchError(err => this.commonService.handleError(err, "Error while getting new updates!"))
            );
    }

    // Lấy thông số của server
    get_server_usage() {
        return this.http.get<ServerUsage>(api.server_usage, { headers: this.headers })
            .pipe(
                catchError(err => this.commonService.handleError(err, "Error while getting server usage!"))
            );
    }
}
