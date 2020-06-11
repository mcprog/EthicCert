import { Component, OnInit } from '@angular/core';
import { ProductsComponent } from '../products/products.component';
import { Product } from '../product';

export interface Vendor {
  name: string;
  products: Product[]
}

const tempVendors: Vendor[] = [
  { name: "FakeCorp1", products: [
    {id: "0", name: "ProductA", vendor: "FakeCorp1", tags: ["tag1", "tag2", "tag3", "tag4"]},
    {id: "0", name: "ProductB", vendor: "FakeCorp1", tags: ["tag1", "tag4"]},
    {id: "0", name: "ProductC", vendor: "FakeCorp1", tags: ["tag1", "tag2", "tag3", "tag5"]},
    {id: "0", name: "ProductD", vendor: "FakeCorp1", tags: []},
  ]},
  { name: "Fake.com", products: [
    {id: "0", name: "ProductE", vendor: "Fake.com", tags: ["tag1", "tag5", "tag6", "tag7"]},
    {id: "0", name: "ProductF", vendor: "Fake.com", tags: ["tag1", "tag5"]}
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
