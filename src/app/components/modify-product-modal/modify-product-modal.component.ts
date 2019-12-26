import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-modify-product-modal',
  templateUrl: './modify-product-modal.component.html',
  styleUrls: ['./modify-product-modal.component.scss']
})
export class ModifyProductModalComponent implements OnInit {
  closeResult: string;
  signupForm: FormGroup;
  constructor(private modalService: NgbModal, private formBuilder: FormBuilder) { }
  ngOnInit() {
  }
  open(modifyProduct) {
    this.modalService.open(modifyProduct, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
    });
  }


}
