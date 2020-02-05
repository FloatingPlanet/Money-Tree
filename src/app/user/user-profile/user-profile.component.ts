import {Component, OnInit} from '@angular/core';
import {AuthService} from 'src/app/services/login/auth.service';
import {Router} from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  closeResult: string;
  saFormGroup: FormGroup;

  constructor(private as: AuthService, private router: Router,
              private modalService: NgbModal, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.saFormGroup = this.addressFormBuilder();
  }

  private addAddress() {

  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  private addressFormBuilder() {
    return this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        phoneNumber: ['', Validators.required],
      }),
      address: this.formBuilder.group({
        street1: ['', Validators.required],
        street2: ['', Validators.required],
        city: ['', Validators.required],
        province: ['', Validators.required],
        postalCode: ['', Validators.required],
        country: ['', Validators.required],
      }),
    });
  }
}
