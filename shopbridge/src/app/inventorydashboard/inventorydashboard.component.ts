import { Component, AfterViewInit,OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ItemFormComponent } from '../item-form/item-form.component';
import { InventorydataService } from '../services/inventorydata.service';
import {Item} from './item.model';
 
@Component({
  selector: 'app-inventorydashboard',
  templateUrl: './inventorydashboard.component.html',
  styleUrls: ['./inventorydashboard.component.css']
})
export class InventorydashboardComponent implements OnInit ,AfterViewInit{
  displayedColumns:string[] = ['id', 'name', 'description','price', 'mfd','action'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<Item>;
  constructor(private dialog:MatDialog,
    private inventoryService:InventorydataService) { }
  inventoryData:Item[] ;
  ngOnInit(): void {
   this.loadInventoryData();
  }
  onAdd(){
    this.openDialog(0)
 }
 loadInventoryData()
 {
  this.inventoryService.getInventoryData().subscribe(result=>{
    this.inventoryData=result;
    this.dataSource=new MatTableDataSource(this.inventoryData)
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  })
 }
 openDialog(id:number) {
   const dialogRef = this.dialog.open(ItemFormComponent,{
     autoFocus:false,
     height:'auto',
     width:'40%' ,
     data:id
   });

   dialogRef.afterClosed().subscribe((result) => {
    this.loadInventoryData();
      if(result=='added')
      {
        alert('Item has been added to inventory successfuly')
       
      }
      else if(result=='updated')
      {
        alert('Item has been Updated successfuly')
       
      }
     });
 }
 onDelete(id:number)
 { alert(`Item with ID:${id} is about to delete`)
  this.inventoryService.deleteItem(id).subscribe(result=>{
    this.loadInventoryData();
    alert('Item has been Deleted successfuly')

  })
 }
 onEdit(id:number)
 {
  this.openDialog(id)
 }
 ngAfterViewInit() {
  
}
}