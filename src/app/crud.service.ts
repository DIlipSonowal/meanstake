import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  
  constructor(private http: HttpClient) { }

  getData(){
      return this.http.get('http://localhost:8080/createPost');
  }

  addData(dataObj){
    return this.http.post('http://localhost:8080/createPost', dataObj, httpOptions);
  }

  deleteData(id){
     return this.http.delete('http://localhost:8080/createPost/'+id, httpOptions);
  }

  editData(id, data){
    return this.http.put('http://localhost:8080/createPost/'+id, data, httpOptions);
  }

  searchData(data){
    //console.log(data);
    return this.http.post('http://localhost:8080/search', data, httpOptions);
  }
}
