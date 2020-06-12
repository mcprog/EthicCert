import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Tag } from '../tag';









@Component({
  selector: 'app-taglist',
  templateUrl: './taglist.component.html',
  styleUrls: ['./taglist.component.less']
})

export class TaglistComponent implements OnInit {

  displayedColumns: string[] = ['name', 'category', 'description', 'weight', 'edit'];


  tags: Observable<Tag[]>;
  private tagsCollection: AngularFirestoreCollection<Tag>;

  constructor(private db : AngularFirestore) {
    this.tagsCollection = db.collection<Tag>('tags');
    this.tags = this.tagsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const id = a.payload.doc.id;
        const data = a.payload.doc.data() as Tag;
        data.id = id;

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
