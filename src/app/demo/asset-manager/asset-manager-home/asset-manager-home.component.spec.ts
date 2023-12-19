import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetManagerHomeComponent } from './asset-manager-home.component';

describe('AssetManagerHomeComponent', () => {
  let component: AssetManagerHomeComponent;
  let fixture: ComponentFixture<AssetManagerHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssetManagerHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssetManagerHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
