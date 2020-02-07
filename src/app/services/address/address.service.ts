import {Injectable} from '@angular/core';
import {from, Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor() {
  }

  getAddress(userInput: string) {
    console.log('doing searching');
    return from(new Promise((res, rej) => {
      if (userInput.length > 0) {
        console.log('found addresses');
        const url = 'http://ws1.postescanada-canadapost.ca/AddressComplete/Interactive/AutoComplete/v1.00/json3.ws';
        let params = '';
        params += '&Key=' + encodeURIComponent('EE77-JU96-FM31-NM51');
        params += '&SearchTerm=' + encodeURIComponent(userInput);
        params += '&Country=' + encodeURIComponent('CAN');
        params += '&LanguagePreference=' + encodeURIComponent('EN');
        const http = new XMLHttpRequest();
        http.open('POST', url, true);
        http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        http.onreadystatechange = () => {
          if (http.readyState === 4 && http.status === 200) {
            const response = JSON.parse(http.responseText);
            if (response.Items.length === 1 && typeof (response.Items[0].Error) !== 'undefined') {
              rej(response.Items[0].Description);
            } else {
              if (response.Items.length === 0) {
                rej('Sorry, there were no results');
              } else {
                res({address: response.Items.map(r => r.Text), location: response.Items.map(r => r.Description)});
                console.log({address: response.Items.map(r => r.Text), location: response.Items.map(r => r.Description)});
              }
            }
          }
        };
        http.send(params);
      } else {
        console.log('no address input');
        return of([]);
      }
    }));

  }
}
