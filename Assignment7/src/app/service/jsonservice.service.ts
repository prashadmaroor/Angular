import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RequestOptions , Headers} from '@angular/http';
import { Observable } from 'rxjs/internal/observable';
import {ModelClass}  from  '../service/ModelClass';
import { catchError } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class JsonserviceService {


 // JSON_URL:string =  'http://localhost:3000/testObject';
  JSON_URL:string= 'https://jsonplaceholder.typicode.com/posts' ;
  
  constructor(private httpClient:HttpClient) {

   }
    
  insertData(data:ModelClass):Observable<any>{
    let observables = this.httpClient.post(this.JSON_URL,data)
    
    return observables;
 }

 getData():Observable<any>{
let observables=this.httpClient.get(this.JSON_URL);
 return observables;
}

getDataByID(id:string):Observable<any>{
  let observables=this.httpClient.get(this.JSON_URL + '/' + id);
  return observables;
}

deleteDataViaHttpDelete(id:string):Observable<any>{
  let observables= this.httpClient.delete(this.JSON_URL + '/' + id);
  return observables;    
}

updateDataviaHttpPost(data:ModelClass):Observable<any>
{
  let cpHeaders = new Headers({ 'Content-Type': 'application/json' });

  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  }

  let observables= this.httpClient.put(this.JSON_URL+ '/' +data.id, data, httpOptions);
  return observables;    
}

}
