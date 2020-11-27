/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ViewproductsService } from './viewproducts.service';

describe('Service: Viewproducts', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ViewproductsService]
    });
  });

  it('should ...', inject([ViewproductsService], (service: ViewproductsService) => {
    expect(service).toBeTruthy();
  }));
});
