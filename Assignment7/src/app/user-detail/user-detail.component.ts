import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap} from "@angular/router";
import {JsonserviceService} from '../service/jsonservice.service';
import {ModelClass} from '../service/ModelClass';
import {switchMap,tap} from 'rxjs/operators';
import { ToasterService } from '../toaster.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  data:ModelClass;
  


  constructor(private activatedRoute:ActivatedRoute, private jsonService:JsonserviceService, private toasterService:ToasterService) {
    //console.log('In user details'); 
   }

  ngOnInit() {
   
    this.loadData();
  }



  loadData(){

   // console.log('eneter');
    this.activatedRoute.paramMap.pipe(
      switchMap((params: ParamMap) =>
            this.jsonService.getDataByID(params.get('id')))
     ).subscribe((data:ModelClass)=>{ 
      
      if(data){
        this.toasterService.infoMessages("This Page gives data of the induvidual user. Please click on User Detail in the navigate bar to redirect back to the User List Page");
         
      }
    
      this.data=data;
      }
    );
  }
}
