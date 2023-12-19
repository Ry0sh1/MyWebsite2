import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetManagerNavbarOptionsComponent } from './asset-manager-navbar-options.component';

describe('AssetManagerNavbarOptionsComponent', () => {
  let component: AssetManagerNavbarOptionsComponent;
  let fixture: ComponentFixture<AssetManagerNavbarOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssetManagerNavbarOptionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssetManagerNavbarOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
