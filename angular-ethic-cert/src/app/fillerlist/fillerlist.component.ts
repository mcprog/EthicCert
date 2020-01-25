import { Component, OnInit } from '@angular/core';
import { faSortAlphaDown, faSortNumericDown } from '@fortawesome/free-solid-svg-icons'
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Product } from '../product';

//export interface Product { name: string, price: number, vendor: string, tags: string[] };

@Component({
  selector: 'app-fillerlist',
  templateUrl: './fillerlist.component.html',
  styleUrls: ['./fillerlist.component.less']
})
export class FillerlistComponent implements OnInit {

  faSortAlphaDown = faSortAlphaDown;
  faSortNumericDown = faSortNumericDown;

  selectVerb = "Select";
  private productCollection: AngularFirestoreCollection<Product>;
  products: Observable<Product[]>;

  constructor(private db: AngularFirestore) {
    this.productCollection = db.collection<Product>('products');
    this.products = this.productCollection.valueChanges();
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

}
