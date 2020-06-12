import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';


const nullProduct: Product = {id: "0", name: "Null Product", vendor: "Null Vendor", tags: []}

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.less']
})
export class PreviewComponent implements OnInit {

  product: Product = nullProduct;
  id: string;
  score: number = 0;
  private subscription: any;
  tooltips: any = {};

  categories = [];
  categoryTooltips = {};
  categorizedTags = {};

  constructor(private afs: AngularFirestore, private route: ActivatedRoute) { }



  private lookupTags(data: Product, that: any) {
    if (!data.tags) {
      return;
    }
    for (let i = 0; i < data.tags.length; ++i) {
      data.tags[i].get().then(snap => {
        data.tags[i] = snap.get('name');
        that.tooltips[data.tags[i]] = snap.get('description');
        var category = snap.get("category");
        category.get().then(snap2 => {
          category = snap2.get('name');
          if (!that.categories.includes(category)) {
            that.categories.push(category);
          }
          that.categoryTooltips[category] = snap2.get('description');
          if (category in that.categorizedTags) {
            that.categorizedTags[category].push(data.tags[i]);
          } else {
            that.categorizedTags[category] = [data.tags[i]];
          }
          console.log(that.categorizedTags);
        });
        

        var weight = snap.get('weight');
        console.log(weight);
        that.score += weight;
        that.score = Math.round((that.score + Number.EPSILON) * 100) / 100;
      });
    } 
    
  }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(params => {
      this.id = params['id'];
      var docRef = this.afs.collection('products').doc(this.id).ref;
      var productRef = this.product; // need to pass it on to inner class because 'this' DNE in below's scope
      var lookupTagsFunc = this.lookupTags;
      var that = this;
      docRef.get().then(function(doc) {
        if (doc.exists) {
          console.log("FOUND document")
          console.log(doc.data());
          productRef.id = doc.id;
          productRef.name = doc.data().name;
          productRef.vendor = doc.data().vendor;
          productRef.tags = doc.data().tags;
          lookupTagsFunc(productRef, that);

        } else {
          console.error("document could not be fround");
        }
      });
    });
  }

  getTooltip(tag: string) {
    if (this.tooltips && this.tooltips[tag]) {
      return this.tooltips[tag];
    }
    return "Undefined";
  }

  getCategoryTooltip(category: string) {
    if (this.categoryTooltips && this.categoryTooltips[category]) {
      return this.categoryTooltips[category];
    }
    return "Undefined";
  }

  getCategorizedTags(category: string) {
    if (this.categorizedTags && this.categorizedTags[category]) {
      return this.categorizedTags[category];
    }
    return [];
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
