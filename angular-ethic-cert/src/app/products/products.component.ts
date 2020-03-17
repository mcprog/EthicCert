import { Component, OnInit } from '@angular/core';


export interface Product {
  name: string;
  vendor: string;
  tags: string[];
}

const tempProducts: Product[] = [
  {name: "ProductA", vendor: "Vendor1", tags: ["tag1", "tag2", "tag3", "tag4"]},
  {name: "ProductB", vendor: "Vendor1", tags: ["tag1", "tag4"]},
  {name: "ProductC", vendor: "Vendor2", tags: ["tag1", "tag2", "tag3", "tag5"]},
  {name: "ProductD", vendor: "Vendor3", tags: []},
];

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.less']
})
export class ProductsComponent implements OnInit {

  products = tempProducts;

  constructor() { }

  ngOnInit() {
  }

}
