import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validator} from "@angular/forms";
import { Validators } from '@angular/forms';
import {JsonserviceService} from '../service/jsonservice.service';
import {ModelClass} from '../service/ModelClass'
import { ToasterService } from '../toaster.service';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  ngOnInit() {
  }

  jsonForm:FormGroup;

  constructor(private jsonService:JsonserviceService, private toaster:ToasterService ) { 

  

    this.jsonForm=new FormGroup({

      userId:new FormControl('',Validators.required),
      id: new FormControl('',Validators.required),
      title:new FormControl('',[Validators.required,Validators.pattern('[a-z A-Z 0-9]{1,200}')]),
      body:new FormControl('',[Validators.required,Validators.pattern('[a-z A-Z 0-9]{1,}')]),
     
    })
  }

  formHandler(){
   // console.log(this.jsonForm.value)
    this.insertData(this.jsonForm.value);
  }

  insertData(data:ModelClass){
    
    this.jsonService.insertData(data).subscribe(
        (data)=>{
         // console.log('succesfully inserted');
          this.toaster.successMessages("User with id" + data.id  +"has been successfully registered");
        },
        (error)=>{
          this.toaster.deleteMessages("An ACTIVE User with the entered id:"+ data.id+"already exists!!Please retry with an another id");
          //console.log("Error Code = " + error.status)
        } )
      
        this.resetHandler();

  }

  resetHandler(){
    this.jsonForm.reset()
  }

}
