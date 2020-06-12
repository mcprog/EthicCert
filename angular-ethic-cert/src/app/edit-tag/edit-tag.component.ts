import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { AuthGuardGuard } from '../auth-guard.guard';
import { map } from 'rxjs/operators';
import { Category } from '../category';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-tag',
  templateUrl: './edit-tag.component.html',
  styleUrls: ['./edit-tag.component.less']
})
export class EditTagComponent implements OnInit {

  nameControl: FormControl = new FormControl('unset');
  descriptionControl: FormControl = new FormControl('unset');
  categoryControl: FormControl = new FormControl('unset');
  weightControl: FormControl = new FormControl(0);
  options: FormGroup;

  id: string;
  private subscription: any;

  categories: Observable<Category[]>;

  tagRef: DocumentReference;

  constructor(fb: FormBuilder, private afs: AngularFirestore, private route: ActivatedRoute, private authGuard: AuthGuardGuard) { 
    this.options = fb.group({
      name: this.nameControl,
      description: this.descriptionControl,
      category: this.categoryControl,
      weight: this.weightControl
    });
  }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.tagRef = this.afs.collection('tags').doc(this.id).ref;
      var that = this;
      this.tagRef.get().then(function(doc) {
        if (doc.exists) {
          var actualTag = doc.data();
          that.nameControl.setValue(actualTag.name);
          that.descriptionControl.setValue(actualTag.description);
          var categoryKey = actualTag.category.id;
          that.categoryControl.setValue(categoryKey);

          that.weightControl.setValue(actualTag.weight * 10);
        } else {
          that.authGuard.notFound();
        }
      });
    });

    this.categories = this.afs.collection('categories').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const id = a.payload.doc.id;
        const data = a.payload.doc.data() as Category;
        data.id = id;

        return data;
      }))
    )

  }

  getRealWeight(oldWeight: number) {
    return oldWeight / 10.0;
  }

  formatLabel(value: number) {
    return value / 10.0;
  }

  

  updateTag() {
    
    if (this.nameControl.value == "" || this.descriptionControl.value == "") {
      return;
    }

    this.tagRef.set({
      name: this.nameControl.value,
      description: this.descriptionControl.value,
      //category might be harder to build properly
      weight: this.getRealWeight(this.weightControl.value)
    }, {merge: true});
    console.log("updated tag");
  }

}
