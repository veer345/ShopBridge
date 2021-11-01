import { HttpClient, HttpClientModule, HttpResponse } from '@angular/common/http';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { Item } from '../inventorydashboard/item.model';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { InventorydataService } from './inventorydata.service';
import { delay } from 'rxjs/operators';
import { createSpyFromClass, Spy } from 'jasmine-auto-spies';

describe('InventorydataService', () => {
  let httpSpy: Spy<HttpClient>;
  let service: InventorydataService;
  let obj:Item[]=[{
    id:1,
    name:'testName',
    description:'test',
    price:3,
    mfd:new Date()
    }]
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ ],
      imports: [
        HttpClientModule,
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers : [HttpClient,InventorydataService,
        { provide: HttpClient, useValue: createSpyFromClass(HttpClient) }]
    });
    service = TestBed.inject(InventorydataService);
    httpSpy = TestBed.inject<any>(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should call adddata', (done) => {
    var obj1 = obj[0]
    httpSpy.post.and.nextWith(obj1);

    service.addData(obj1).subscribe(
      result => {
        expect(result).toEqual(obj1);
        done();
      },
      done.fail
    );
    expect(httpSpy.post.calls.count()).toBe(1);
  });

  it('should call getItemData and fetch data', (done) => {
    httpSpy.get.and.nextWith(obj);
    let id = obj[0].id
    service.getItemData(id).subscribe(
      result => {
        expect(result).toHaveSize(obj.length);
        done();
      },
      done.fail
    );
    expect(httpSpy.get.calls.count()).toBe(1);
  });

  it('should call getInventoryData and fetch data', (done: DoneFn) => {
    httpSpy.get.and.nextWith(obj);

    service.getInventoryData().subscribe(
      result => {
        console.log("resultss",result)
        expect(result).toHaveSize(obj.length);
        done();
      },
      done.fail
    );
    expect(httpSpy.get.calls.count()).toBe(1);
  });

 
it('should call updateInventoryData', (done) => {
  var obj1 = obj[0];
  obj1.name = "NewTest";

  httpSpy.put.and.nextWith(obj1);

  service.updateInventoryData(obj1.id,obj1).subscribe(
    result => {
      expect(result.name).toEqual("NewTest");
      done();
    },
    done.fail
  );
  expect(httpSpy.put.calls.count()).toBe(1);
});
it('should call deleteItem', (done) => {
  httpSpy.delete.and.nextWith(new HttpResponse ({
    status: 200
  }));

  service.deleteItem(1).subscribe(
    response => {
      expect(response.status).toEqual(200);
      done();
    },
    done.fail
  );
  expect(httpSpy.delete.calls.count()).toBe(1);
});

});
function asyncData(expectedHeroes: any): any {
  throw new Error('Function not implemented.');
}