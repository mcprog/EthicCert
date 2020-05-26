import { Component, OnInit } from '@angular/core';
import { Tag } from '../taglist/taglist.component';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Category extends Data {
  name: string;
  description: string;
  tags: any[];
}



@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.less']
})
export class CategoriesComponent implements OnInit {


  categories: Observable<Category[]>;
  private categoryCollection: AngularFirestoreCollection<Category>;

  private lookupTags(data: Category) {
    for (let i = 0; i < data.tags.length; ++i) {
      data.tags[i].get().then(snap => {
        data.tags[i] = snap.get('name');
      });
    } 
    
  }

  noTags(tags: string[]): string {
    /*if (tags.length == 0) {
      return "No tags";
    }*/
    return "no tags";
  }

  constructor(private db : AngularFirestore) {
    this.categoryCollection = db.collection<Category>('categories');
    this.categories = this.categoryCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Category;
        //this.lookupVendor(data);
        //this.lookupTags(data);
        return data;
      }))
    );
  }

  getPath(docRef: DocumentReference): string {
    return docRef.path;
  }

  ngOnInit() {
  }

}
