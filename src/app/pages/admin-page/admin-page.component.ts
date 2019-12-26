import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit {
  private currentPage = 'orders';
  constructor(private ar: ActivatedRoute, private router: Router) {
    this.ar.params.subscribe((params) => {
      if (params.p !== 'orders' || params.p !== 'products') {
        this.router.navigate(['admin/orders']);
      }
      this.currentPage = params.p;
    });
  }

  ngOnInit() {
  }

}
