import { Component, OnInit } from '@angular/core';
import { Product, ProductsComponent } from '../products/products.component';

export interface Vendor {
  name: string;
  products: Product[]
}

const tempVendors: Vendor[] = [
  { name: "FakeCorp1", products: [
    {name: "ProductA", vendor: "FakeCorp1", tags: ["tag1", "tag2", "tag3", "tag4"]},
    {name: "ProductB", vendor: "FakeCorp1", tags: ["tag1", "tag4"]},
    {name: "ProductC", vendor: "FakeCorp1", tags: ["tag1", "tag2", "tag3", "tag5"]},
    {name: "ProductD", vendor: "FakeCorp1", tags: []},
  ]},
  { name: "Fake.com", products: [
    {name: "ProductE", vendor: "Fake.com", tags: ["tag1", "tag5", "tag6", "tag7"]},
    {name: "ProductF", vendor: "Fake.com", tags: ["tag1", "tag5"]}
  ]},
];

@Component({
  selector: 'app-vendors',
  templateUrl: './vendors.component.html',
  styleUrls: ['./vendors.component.less']
})
export class VendorsComponent implements OnInit {

  vendors = tempVendors;

  constructor() { }

  ngOnInit() {
  }

}
