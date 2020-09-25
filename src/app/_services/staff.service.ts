import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs/operators';

// Services
import { api } from '../_api/apiUrl';
import { CommonService } from './common.service';
// Models
import { ApiResponse } from '../_models/response.model';

@Injectable()
export class StaffService {

    headers = new HttpHeaders({
        'Authorization': localStorage.getItem('token')
    });
    ////////////////////
    constructor(
        private http: HttpClient,
        private toastr: ToastrService,
        private commonService: CommonService
    ) { }

    // Lấy danh sách nhân viên
    get_staffsList(page: number) {
        return this.http.get<ApiResponse>(api.get_staffList + "?page=" + page, { headers: this.headers });
    }

    // Lấy danh sách khách hàng
    get_customersList(page: number) {
        return this.http.get<ApiResponse>(api.get_customerList + "?page=" + page, { headers: this.headers });
    }

    // Hạ cấp tài khoản nhân viên
    downgradeStaff(user_id: string) {
        let headers = new HttpHeaders({
            'Content-type': 'application/x-www-form-urlencoded',
            'Authorization': localStorage.getItem('token')
        });
        let body = `user_id=${user_id}`;
        return this.http.put(api.downgrade_role, body, { headers: headers })
            .pipe(
                catchError(err => this.commonService.handleError(err, "Error downgrade user!"))
            );
    }

    // Nâng cấp tài khoản khách hàng
    upgradeCustomer(user_id: string) {
        let headers = new HttpHeaders({
            'Content-type': 'application/x-www-form-urlencoded',
            'Authorization': localStorage.getItem('token')
        });
        let body = `user_id=${user_id}`;
        return this.http.put(api.upgrade_role, body, { headers: headers })
            .pipe(
                catchError(err => this.commonService.handleError(err, "Error upgrade user!"))
            );
    }
}