import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
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

import { AuthService } from './auth.service';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireAuthGuardModule } from '@angular/fire/auth-guard';
import { LandingComponent } from './landing/landing.component';
import { AuthGuardGuard } from './auth-guard.guard';
import { NotFoundComponent } from './not-found/not-found.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LandingComponent },
  { path: 'products', component: ProductsComponent, canActivate: [AuthGuardGuard] },
  { path: 'taglist', component: TaglistComponent },
  { path: 'vendors', component: VendorsComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: '**', component: NotFoundComponent }
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
    CoolstatsComponent,
    LandingComponent,
    NotFoundComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes, { enableTracing: true, useHash: false } //deebugging only
    ),
  
    BrowserModule,
    HttpClientModule,
    HttpClientJsonpModule,
    
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
 	  AngularFirestoreModule,
    BrowserAnimationsModule,
    AngularFireAuthModule,
    AngularFireAuthGuardModule,

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
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
