import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {AddressService} from '../../services/address/address.service';

@Component({
  selector: 'app-no-access',
  templateUrl: './no-access.component.html',
  styleUrls: ['./no-access.component.scss']
})
export class NoAccessComponent implements OnInit {
  private addresses: any;
  private userInput: string;

  constructor(private as: AddressService) {
  }

  ngOnInit() {
  }


  findAddress() {

  }
}
