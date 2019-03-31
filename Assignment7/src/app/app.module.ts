import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';
import { RegisteredListComponent } from './registered-list/registered-list.component';
import { NavigationComponent } from './navigation/navigation.component';
import {RouterModule} from '@angular/router';
import {HttpModule} from '@angular/http';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import { JsonserviceService } from './service/jsonservice.service';
import { HttpClientModule } from '@angular/common/http';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UpdateComponent } from './update/update.component';
import { HomeComponentComponent } from './home-component/home-component.component';


@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    RegisteredListComponent,
    NavigationComponent,
    UserDetailComponent,
    UpdateComponent,
    HomeComponentComponent,
 
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {
        path:'POST/posts',
        component:RegistrationComponent
      },
      {
        path:'GET/posts',
        component:RegisteredListComponent
      },
      {
        path:'GET/posts/:id',
        component:UserDetailComponent
      },
      {
        path:'PUT/posts/:id',
        component:UpdateComponent
      },
      {
        path:'**',
        component:HomeComponentComponent
      }
    ])
  ],
  providers: [JsonserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
