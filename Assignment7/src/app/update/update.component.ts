import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validator, FormBuilder} from "@angular/forms";
import {ActivatedRoute, ParamMap} from "@angular/router";
import { Validators } from '@angular/forms';
import {JsonserviceService} from '../service/jsonservice.service';
import {ModelClass} from '../service/ModelClass'
import { ToasterService } from '../toaster.service';
import {switchMap,tap} from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  data:ModelClass;
  
  ngOnInit() {
  
  }
   

  updateForm:FormGroup;


  constructor(private activatedRoute:ActivatedRoute,private jsonService:JsonserviceService, private toaster:ToasterService ) { 

  
    this.activatedRoute.paramMap.pipe(
      switchMap((params: ParamMap) =>
            this.jsonService.getDataByID(params.get('id')))
     ).subscribe((data:ModelClass)=>{ 
      this.data=data;  
     // console.log(data)
     this.toaster.infoMessages("The effects of Update Operations cannot be reversed!!!") 
    this.toaster.warningMessages("The effects of Update Operations cannot be reversed!!!") 
      this.updateForm= new FormGroup({
      userId: new FormControl(data.userId,Validators.required),
      id:  new FormControl(data.id),
      title: new FormControl(data.title,[Validators.required,Validators.pattern('[a-z A-Z 0-9]{1,200}')] ),
      body: new FormControl(data.body,[Validators.required,Validators.pattern('[a-z A-Z 0-9]{1,}')]) 
      })
      
      //console.dir(this.updateForm);
      }
    );


    this.updateForm=new FormGroup({

      id: new FormControl({value:'', disabled:true},Validators.required),
      userId:new FormControl('',Validators.required),
      title:new FormControl('',[Validators.required,Validators.pattern('[a-z A-Z 0-9]{1,200}')]),
      body:new FormControl('',[Validators.required,Validators.pattern('[a-z A-Z 0-9]{1,}')]),
     
    })
   
  }

  formHandler(){
  //  console.log(this.updateForm.value)  
    this.updateDataviaHttpPost(this.updateForm.value);
  }


  updateDataviaHttpPost(data){
    
    this.jsonService.updateDataviaHttpPost(data).subscribe(
        (data)=>{
        //  console.log('succesfully inserted');
        //  console.dir(data)
          this.toaster.successMessages("User with id" + data.id  +"has been successfully registered");
        },
        (error)=>{
          this.toaster.deleteMessages("An ACTIVE User with the entered id:"+ data.id+"already exists!!Please retry with an another id");
          //console.log("Error Code = " + error.status)
        } )
      

  }



}
