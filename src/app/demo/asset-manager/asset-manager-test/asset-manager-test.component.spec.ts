import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetManagerTestComponent } from './asset-manager-test.component';

describe('AssetManagerTestComponent', () => {
  let component: AssetManagerTestComponent;
  let fixture: ComponentFixture<AssetManagerTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssetManagerTestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssetManagerTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
