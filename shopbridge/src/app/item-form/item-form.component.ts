import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Item } from '../inventorydashboard/item.model';
import { InventorydataService } from '../services/inventorydata.service';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.css']
})
export class ItemFormComponent implements OnInit {
  itemForm :FormGroup;
  itemData:Item
  constructor( public dialogRef: MatDialogRef<ItemFormComponent>,
    @Inject(MAT_DIALOG_DATA)
    public itemId:any,
    private formBuilder: FormBuilder,
    private inventoryService:InventorydataService) { }
    errMsg={'name':'Please Enter Name',
    'description':'Please Enter Description',
    'price':'Please Enter a valid Price',
    'mfd':'Please Enter Manufacturing Date'
  }
  ngOnInit(): void {
    this.itemForm = this.formBuilder.group({
      name: ["", Validators.required],
      description: ["",Validators.required],
      price: ["",Validators.required],
      mfd: ["", Validators.required],
    });
    if(this.itemId>0)
    {
      this.inventoryService.getItemData(this.itemId).subscribe(result=>{
        this.itemForm.patchValue({
        name: result.name,
        description:result.description,
        price:result.price,
        mfd:result.mfd,
        })
      })
    }
  }
  onClose()
  {
    this.dialogRef.close();
  }
  onAdd(){
    if(this.itemForm.valid){
    this.itemData=this.itemForm.value
    console.log('Item data',this.itemData)
    this.inventoryService.addData(this.itemData).subscribe((result)=>{
      console.log('Sucessfully added',result);
      this.dialogRef.close('added');
    },(error) => {
      console.log('Failed! Error occurred while adding a Item.', error);
    })
   }
   else{
    this.validateAllFormFields(this.itemForm);
     alert('Please fill form correctly')
   }
  }
  onEdit(){
    
    if(this.itemForm.pristine)
    {
      alert('Please Edit form First')
    }
    else{
      if(this.itemForm.valid){
    this.itemData=this.itemForm.value
    this.inventoryService.updateInventoryData(this.itemId,this.itemData).subscribe((result)=>{
      this.dialogRef.close('updated');
    },(error) => {
      console.log('Failed! Error occurred while Edting a Item.', error);
    })
   }
   else{
    this.validateAllFormFields(this.itemForm);
     alert('Please fill form correctly')
   }
  }
  }
  validateAllFormFields(form: FormGroup) {
    Object.keys(form.controls).forEach(field => {
      const control = form.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }
  get controls() {
    return this.itemForm.controls;
  }
}