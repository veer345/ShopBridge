import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ElementRef } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ItemFormComponent } from '../item-form/item-form.component';
import { InventorydataService } from '../services/inventorydata.service';

import { InventorydashboardComponent } from './inventorydashboard.component';
class dialogMock {
  open() {
    return {
      afterClosed: () => of({})
    };
  }
}
describe('InventorydashboardComponent', () => {
  let component: InventorydashboardComponent;
  let fixture: ComponentFixture<InventorydashboardComponent>;
  let dialogSpy: jasmine.Spy;
  let dialogRefSpyObj = jasmine.createSpyObj({ afterClosed : of({}), close: 
  null });
  let service:any;
dialogRefSpyObj.componentInstance = { body: '' };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventorydashboardComponent ],
      imports: [
        HttpClientModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        MatDialogModule,
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers : [HttpClient]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventorydashboardComponent);
    dialogSpy = spyOn(TestBed.get(MatDialog), 'open').and.returnValue(dialogRefSpyObj)
    service=fixture.debugElement.injector.get(InventorydataService)
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call ngOnInit', () => {
    let spy_getPostDetails = spyOn(component,"loadInventoryData").and.returnValue();
    component.ngOnInit();
    expect(spy_getPostDetails).toHaveBeenCalled();
  })
  it('should load dashboard Data', fakeAsync(()  => {
    let spy_getPosts = spyOn(service,"getInventoryData").and.callFake(() => {
      return of([]).pipe(delay(100));
    });
    component.loadInventoryData();
    tick(100);
    //expect(spy_getPosts).toHaveBeenCalled()
    expect(component.inventoryData).toEqual([]);
    
  }));
  it('should Delete ', fakeAsync(()  => {
    let spy = spyOn(service,"deleteItem").and.callFake(() => {
      return of([]).pipe(delay(100));
    });
    component.onDelete(0);
    tick(100);
    expect(spy).toHaveBeenCalled()
    
  }));
  it('should call onAdd and open dialog ', fakeAsync(()  => {
    let spy = spyOn(component,"openDialog");
    component.onAdd();
    tick(100);
    expect(spy).toHaveBeenCalled()
    
  }));
  it('should call onEdit and open dialog', fakeAsync(()  => {
    let spy = spyOn(component,"openDialog");
    component.onEdit(0);
    tick(100);
    expect(spy).toHaveBeenCalled()
    
  }));

  it('should call openDialog', () => {
    component.openDialog(0);
    fixture.detectChanges();
    const popUpHeader = document.getElementsByTagName('button')[1] as HTMLHeadElement;
    expect(popUpHeader.innerText).toEqual('Cancel');

  })
});
