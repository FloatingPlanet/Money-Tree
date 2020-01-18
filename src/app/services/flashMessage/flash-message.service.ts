import {Injectable} from '@angular/core';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class FlashMessageService {
  constructor(private toastr: ToastrService) {
  }

  success(title, msg) {
    this.toastr.success(msg, title);
  }

  info(title, msg) {
    this.toastr.info(msg, title);
  }

  warning(title, msg) {
    this.toastr.warning(msg, title);
  }

  error(title, msg) {
    this.toastr.error(msg, title);
  }

  wait(title, msg) {
    this.toastr.info(msg, title, {timeOut: 3000});
  }
}
