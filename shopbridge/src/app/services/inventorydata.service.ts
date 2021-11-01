import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Item } from '../inventorydashboard/item.model';

@Injectable({
  providedIn: 'root'
})
export class InventorydataService {
  constructor(private http:HttpClient) { }

  addData(data:Item)
  {
    return this.http.post<any>('http://localhost:3000/posts',data)
    .pipe(map((result:any)=>{
      return result
    }))
  }
  getItemData(id:number)
  {
    return this.http.get<any>(`http://localhost:3000/posts/${id}`)
    .pipe(map((result:any)=>{
      return result
    }))
  }
  getInventoryData()
  {
    return this.http.get<any>('http://localhost:3000/posts')
    .pipe(map((result:any)=>{
      return result
    }))
  }
  updateInventoryData(id:number,data:Item)
  {
    return this.http.put<any>(`http://localhost:3000/posts/${id}`,data)
    .pipe(map((result:any)=>{
      return result
    }))
  }
  deleteItem(id:number)
  {
    return this.http.delete<any>(`http://localhost:3000/posts/${id}`)
    .pipe(map((result:any)=>{
      return result
    }))
  }
}