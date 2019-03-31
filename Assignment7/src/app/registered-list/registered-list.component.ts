import { Component, OnInit } from '@angular/core';

import {JsonserviceService} from '../service/jsonservice.service';
import {ModelClass} from '../service/ModelClass';
import { ToasterService } from '../toaster.service';

@Component({
  selector: 'app-registered-list',
  templateUrl: './registered-list.component.html',
  styleUrls: ['./registered-list.component.css']
})

export class RegisteredListComponent implements OnInit {

  data:ModelClass[]=[];
  count:number =0;
  constructor(private jsonService:JsonserviceService, private toastrService:ToasterService) { }

  ngOnInit() {
    this.count = 0;
    this.loadData();
  }

  loadData(){
    let observable=this.jsonService.getData();
    observable.subscribe(
      
      (data:ModelClass[])=>{
      
     if(data && this.count == 0){
       this.toastrService.infoMessages("This Page displays the list of all the Registered users - Click on the Id to view details particular to User");
      }
    else{
      this.toastrService.successMessages("User List table updated !!!"); 
    }
      this.data=data
    },

  )
  
  }

  deleteDataViaHttpDelete(id)
  {
  //  console.log('id=' + id);
    this.toastrService.warningMessages("The effects of Delete Operations cannot be reversed!!!")    
    let observable=this.jsonService.deleteDataViaHttpDelete(id);
    observable.subscribe(response => {
    this.toastrService.deleteMessages("User details for id:" + id + "has been deleted as per your request");
    this.count =1;
    this.loadData();   
  }
  );

}




}
