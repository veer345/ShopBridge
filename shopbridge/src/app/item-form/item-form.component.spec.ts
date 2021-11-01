import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { of } from 'rxjs';
import { ComplexOuterSubscriber } from 'rxjs/internal/innerSubscribe';
import { delay } from 'rxjs/operators';
import { InventorydataService } from '../services/inventorydata.service';
import { ItemFormComponent } from './item-form.component';

describe('ItemFormComponent', () => {
  let component: ItemFormComponent;
  let fixture: ComponentFixture<ItemFormComponent>;
  let service :any
  let matdialog:any;
  const dialogMock = {
    close: () => { }
   };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemFormComponent ],
      imports: [
        HttpClientModule
      ],
      providers : [HttpClient,FormBuilder,{
        provide : MAT_DIALOG_DATA,
        useValue : {}
      },
      {provide: MatDialogRef, useValue: dialogMock}
    ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemFormComponent);
    component = fixture.componentInstance;
    service=fixture.debugElement.injector.get(InventorydataService)
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('on ngoninit',fakeAsync(()=>{
    component.itemId=1
    let spy = spyOn(service,"getItemData").and.callFake(() => {
      return of([]).pipe(delay(100));
    });
    component.ngOnInit();
    tick(100);
    expect(spy).toHaveBeenCalled()
  }))
  it('Should open edit Item', fakeAsync(() => {
    component.itemId=1
    expect(component).toBeTruthy();
    const form=component.itemForm
    fixture.detectChanges();
    //first button on
    const fromheader = document.getElementsByTagName('h1')[0] as HTMLHeadElement;
    expect(fromheader.innerText).toEqual('Edit Inventory Item');
  }));
  it('Should open Add item ', () => {
    component.itemId=0
    expect(component).toBeTruthy();
    const form=component.itemForm
    component.onAdd();
    fixture.detectChanges();
    console.log(component.itemId)
    //first button on
    const fromheader = document.getElementsByTagName('h1')[0] as HTMLHeadElement;
    expect(fromheader.innerText).toEqual('Add Inventory Item');
  });
  it('should call edit method and service',fakeAsync(()=>{
    component.itemForm.patchValue({
      name:'test',
      description:'testq',
      price:300,
      mfd:new Date()

    })
    component.itemId=1;
    let spy = spyOn(service,"updateInventoryData").and.callFake(() => {
      return of([]).pipe(delay(100));
    });
    component.itemForm.markAsDirty();
    component.onEdit();
    tick(100);
    expect(spy).toHaveBeenCalled()
  }))
 
  it('should call Add method and service',fakeAsync(()=>{
    component.itemForm.patchValue({
      name:'test',
      description:'testq',
      price:300,
      mfd:new Date()

    })
    let spy = spyOn(service,"addData").and.callFake(() => {
      return of([]).pipe(delay(100));
    });
    component.onAdd();
    tick(100);
    expect(spy).toHaveBeenCalled()
  }))
  it('onclose',fakeAsync(()=>{
    let spy = spyOn(component.dialogRef,"close").and.callFake(() => {
      return of([]).pipe(delay(100));
    });
    component.onClose();
    tick(100);
    expect(spy).toHaveBeenCalled()
  }))
  it('form invalid when empty', () => {
    expect(component.itemForm.valid).toBeFalsy();
  });
  it('should validate form fields', () => {
    component.validateAllFormFields(component.itemForm);
    const errmsg = document.getElementsByTagName('mat-error')[0] as HTMLHeadElement;
    expect(errmsg.innerText).toEqual('Please Enter Name');
  });
});