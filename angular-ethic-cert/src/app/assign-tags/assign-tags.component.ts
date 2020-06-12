import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Tag } from '../tag';
import { map } from 'rxjs/operators';

const nullProduct: Product = {id: "0", name: "Null Product", vendor: "Null Vendor", tags: []}

@Component({
  selector: 'app-assign-tags',
  templateUrl: './assign-tags.component.html',
  styleUrls: ['./assign-tags.component.less']
})
export class AssignTagsComponent implements OnInit {




  product: Product = nullProduct;
  id: string;
  productRef: DocumentReference;

  tags: Observable<Tag[]>;

  private subscription: any;


  constructor(private afs: AngularFirestore, private route: ActivatedRoute) { }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.afs.collection('products').doc(this.id).get().subscribe(doc => {
        this.product = doc.data() as Product;
      });
    });

    this.tags = this.afs.collection('categories').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const id = a.payload.doc.id;
        const data = a.payload.doc.data() as Tag;
        data.id = id;

        return data;
      }))
    );
  }

}
