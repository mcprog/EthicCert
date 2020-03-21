import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';



export interface Tag {
  name: string;
  category: string;
  description: string;
  weight: number;
}



const tempTags: Tag[] = [
    { name: 'tag1', category: 'cate1', description: "desc1", weight: 0.3 },
    { name: 'tag2', category: 'cate2', description: "desc2", weight: 0.35 },
    { name: 'tag3', category: 'cate3', description: "desc3", weight: -0.235 },
    { name: 'tag4', category: 'cate4', description: "desc4", weight: 0.125 },
]

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
    this.tags = this.tagsCollection.valueChanges();
  }

  getPath(docRef: DocumentReference): string {
    return docRef.path;
  }

  ngOnInit() {
  }

}
