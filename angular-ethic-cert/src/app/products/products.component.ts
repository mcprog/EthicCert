import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';


export interface Product {
  name: string;
  vendor: string;
  tags: string[];
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.less']
})
export class ProductsComponent implements OnInit {

  products: Observable<Product[]>;
  private productsCollection: AngularFirestoreCollection<Product>;

  constructor(private db: AngularFirestore) { 
    this.productsCollection = db.collection<Product>('products');
    this.products = this.productsCollection.valueChanges();
    
  }

  getVendor(vendorRef: DocumentReference): string {
    return vendorRef.path;
  }

  getTag(tagRef: DocumentReference): string {
    return tagRef.path;
  }

  ngOnInit() {
  }

}
