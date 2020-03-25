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

const tempCategories: Category[] = [
  { name: "Material", description: "How the material this product is made from affect the earth.", tags: [
    { name: 'tag1', category: 'Material', description: "desc1", weight: 0.3 },
    { name: 'tag2', category: 'Material', description: "desc2", weight: 0.35 },
    { name: 'tag3', category: 'Material', description: "desc3", weight: -0.235 },
    { name: 'tag4', category: 'Material', description: "desc4", weight: 0.125 },
  ]},
  { name: "Animal Impact", description: "This product has low or no impact on animals and animal habitats", tags: [
    { name: 'tag5', category: 'Animal Impact', description: "desc1", weight: 0.3 },
    { name: 'tag6', category: 'Animalt Impact', description: "desc2", weight: 0.375 },
  ]}
];

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
    if (tags.length == 0) {
      return "No tags";
    }
    return "";
  }

  constructor(private db : AngularFirestore) {
    this.categoryCollection = db.collection<Category>('categories');
    this.categories = this.categoryCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Category;
        //this.lookupVendor(data);
        this.lookupTags(data);
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
