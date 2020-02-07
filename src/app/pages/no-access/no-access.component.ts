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

  constructor() {
  }

  ngOnInit() {
  }


  findAddress(e: any) {
    if (e.target.value.length > 0) {
      const url = 'http://ws1.postescanada-canadapost.ca/AddressComplete/Interactive/AutoComplete/v1.00/json3.ws';
      let params = '';
      params += '&Key=' + encodeURIComponent('EE77-JU96-FM31-NM51');
      params += '&SearchTerm=' + encodeURIComponent(e.target.value);
      params += '&Country=' + encodeURIComponent('CAN');
      params += '&LanguagePreference=' + encodeURIComponent('EN');
      const http = new XMLHttpRequest();
      http.open('POST', url, true);
      http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      http.onreadystatechange = () => {
        if (http.readyState === 4 && http.status === 200) {
          const response = JSON.parse(http.responseText);
          if (response.Items.length === 1 && typeof (response.Items[0].Error) !== 'undefined') {
            alert(response.Items[0].Description);
          } else {
            if (response.Items.length === 0) {
              alert('Sorry, there were no results');
            } else {
              console.log(response);
              this.addresses = response.Items;
            }
          }
        }
      };
      http.send(params);
    }
  }
}
