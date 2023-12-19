import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetManagerNavbarComponent } from './asset-manager-navbar.component';

describe('AssetManagerNavbarComponent', () => {
  let component: AssetManagerNavbarComponent;
  let fixture: ComponentFixture<AssetManagerNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssetManagerNavbarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssetManagerNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
