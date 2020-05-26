import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Product } from '../product';
import { RestService } from '../rest.service'

//export interface Product { name: string, price: number, vendor: string, tags: string[] };

@Component({
  selector: 'app-fillerlist',
  templateUrl: './fillerlist.component.html',
  styleUrls: ['./fillerlist.component.less']
})
export class FillerlistComponent implements OnInit {



  selectVerb = "Select";
  private productCollection: AngularFirestoreCollection<Product>;
  products: Observable<Product[]>;
  restService : RestService;

  constructor(private db: AngularFirestore, private rest : RestService) {
    this.productCollection = db.collection<Product>('products');
    this.products = this.productCollection.valueChanges();
    this.restService = rest;
  }
  addProduct(product: Product) {
    this.productCollection.add(product);
  }

  ngOnInit() {
  }

  selectAllClicked() {
    if (this.selectVerb == "Select") {
      this.selectVerb = "Deselect";
    } else {
      this.selectVerb = "Select";
    }
  }

  loadProducts() {
  }

}
