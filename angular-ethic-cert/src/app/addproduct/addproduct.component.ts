import { Component, OnInit } from '@angular/core';
import { Product } from '../product';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.less']
})
export class AddproductComponent implements OnInit {

  product: Product = {
    name: "P name",
    price: -6.70,
    tags: ["tag1", "tag2", "tag3fullyColorV"],
    vendor: "P vendor"
  };

  readonly Up2Date = 0;
  readonly RetrievalError = 1;
  readonly AheadDB = 2;
  readonly BehindDB = 3;
  readonly Unknown = 4;

  status = this.Unknown;

  getStatus() {
    if (this.status == this.Up2Date) {
      return "Up to Date";
    }
    else if (this.status == this.RetrievalError) {
      return "Data Retrival Error";
    }
    else if (this.status == this.AheadDB) {
      return "Ahead of Database";
    }
    else if (this.status == this.BehindDB) {
      return "Behind Database";
    }
    else if (this.status == this.Unknown) {
      return "Unknown Status";
    } else {
      return "Invalid Error";
    }
  }

  

  constructor() { }

  ngOnInit() {
  }

}
