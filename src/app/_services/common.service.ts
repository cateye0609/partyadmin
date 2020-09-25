import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
// Services
import { api } from '../_api/apiUrl';
// Models
import { ApiResponse } from '../_models/response.model';
import { throwError } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class CommonService {

    constructor(
        private http: HttpClient,
        private toastr: ToastrService
    ) { }

    // Upload ảnh
    upload_image(images: any[]) {
        let headers = new HttpHeaders({
            'Authorization': localStorage.getItem('token')
        });
        let body = new FormData();
        for (let i = 0; i < images.length; i++) {
            body.append('image', images[i]);
        }
        return this.http.post<ApiResponse>(api.upload_image, body, { headers: headers });
    }

    // Xử lí lỗi
    public handleError(error: HttpErrorResponse, errorText: string) {
        if (error.error instanceof ErrorEvent) {
            console.error("Client side error: ", error.error.message);
        } else {
            console.error("Server side error: ", error.error.message);
        }
        this.toastr.error(errorText);
        return throwError(error);
    }
}
