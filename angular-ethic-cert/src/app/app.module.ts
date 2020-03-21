import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { TagsComponent } from './tags/tags.component';
import { NavbarComponent } from './navbar/navbar.component';
import { Routes, RouterModule } from '@angular/router';
import { TaglistComponent } from './taglist/taglist.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSliderModule } from '@angular/material/slider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { MatListModule } from '@angular/material/list';

import { ProductsComponent } from './products/products.component';
import { VendorsComponent } from './vendors/vendors.component';
import { CategoriesComponent } from './categories/categories.component';
import { CoolstatsComponent } from './coolstats/coolstats.component';
import { FillerlistComponent } from './fillerlist/fillerlist.component';
import { AddproductComponent } from './addproduct/addproduct.component'; 

const appRoutes: Routes = [
  { path: 'products', component: ProductsComponent },
  { path: 'taglist', component: TaglistComponent },
  { path: 'vendors', component: VendorsComponent },
  { path: 'categories', component: CategoriesComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    TagsComponent,
    NavbarComponent,
    TaglistComponent,
    ProductsComponent,
    VendorsComponent,
    CategoriesComponent,
    AddproductComponent,
    FillerlistComponent,
    CoolstatsComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes, { enableTracing: true } //deebugging only
    ),
    BrowserModule,
    HttpClientModule,
    HttpClientJsonpModule,
    FontAwesomeModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
 	  AngularFirestoreModule,
    BrowserAnimationsModule,

    MatSliderModule,
    MatToolbarModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatExpansionModule,
    MatDividerModule,
    MatChipsModule,
    MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
