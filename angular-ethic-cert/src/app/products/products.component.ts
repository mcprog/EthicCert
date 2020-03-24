import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Tag } from '../taglist/taglist.component';
import { map } from 'rxjs/operators';


export interface Product {
  name: string;
  vendor: any;
  tags: any[];
  
}

export class ParsedProduct implements Product {
  name: string;  vendor: any;
  tags: string[];
  parsed: string[];

  constructor() {
    //this.parsed = new string[this.tags.length];
    for (let i = 0; i < this.tags.length; ++i) {
      this.parsed[i] = "test";
    }
  }

  
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.less']
})
export class ProductsComponent implements OnInit {

  products: Observable<Product[]>;
  private productsCollection: AngularFirestoreCollection<Product>;
  snapshot: any;

  constructor(private afs: AngularFirestore) {  
  }

  private lookupVendor(data: Product) {
    data.vendor.get().then(snap => {
      data.vendor = snap.get('name');
    });
  }

  noTags(tags: string[]): string {
    if (tags.length == 0) {
      return "No tags";
    }
    return "";
  }

  private lookupTags(data: Product) {
    for (let i = 0; i < data.tags.length; ++i) {
      data.tags[i].get().then(snap => {
        data.tags[i] = snap.get('name');
      });
    } 
    
  }

  ngOnInit() {
    this.productsCollection = this.afs.collection('products', ref => {
      return ref.orderBy('name', 'asc');
    })
    this.products = this.productsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Product;
        this.lookupVendor(data);
        this.lookupTags(data);
        return data;
      }))
    );
  }

  

}
